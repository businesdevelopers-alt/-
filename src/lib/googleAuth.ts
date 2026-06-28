import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App if not already done
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google OAuth Provider
const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/documents");
provider.addScope("https://www.googleapis.com/auth/documents.readonly");
provider.addScope("https://www.googleapis.com/auth/drive.file");
provider.addScope("https://www.googleapis.com/auth/drive.readonly");

// Keep token in memory
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      // In a real app, if the token is not cached, we might need the user to re-authenticate 
      // or we retrieve it. We cache it on sign-in.
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // If logged in via Firebase but token is lost from memory, we allow them to log in again to get fresh credentials.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to get Google OAuth access token from auth results.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Error during Google Sign-in:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Logout from Google
export const googleLogout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Get current cached token
export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

// --- Google Drive & Docs API Wrappers ---

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime: string;
  modifiedTime: string;
  webViewLink: string;
  iconLink?: string;
}

export interface GoogleDocDetails {
  id: string;
  title: string;
  bodyText: string;
  webViewLink: string;
  rawJson: any;
}

// 1. List Google Docs from user's Drive
export const listGoogleDocs = async (token: string): Promise<GoogleDriveFile[]> => {
  const query = "mimeType='application/vnd.google-apps.document' and trashed=false";
  const fields = "files(id,name,mimeType,createdTime,modifiedTime,webViewLink,iconLink)";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&orderBy=modifiedTime%20desc&pageSize=30`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل جلب ملفات مستندات جوجل من حسابك (Code: ${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
};

// 2. Create a new Google Document
export const createGoogleDoc = async (token: string, title: string): Promise<string> => {
  const url = "https://docs.googleapis.com/v1/documents";
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل إنشاء مستند جوجل جديد (Code: ${response.status})`);
  }

  const data = await response.json();
  return data.documentId; // Return created doc ID
};

// Helper to extract plain text from Docs body structure
export const extractPlainText = (docJson: any): string => {
  if (!docJson.body || !docJson.body.content) return "";
  let text = "";
  for (const element of docJson.body.content) {
    if (element.paragraph && element.paragraph.elements) {
      for (const part of element.paragraph.elements) {
        if (part.textRun && part.textRun.content) {
          text += part.textRun.content;
        }
      }
    }
  }
  return text;
};

// 3. Get Google Doc contents (details + text extraction)
export const getGoogleDoc = async (token: string, docId: string): Promise<GoogleDocDetails> => {
  // Get doc structure
  const docUrl = `https://docs.googleapis.com/v1/documents/${docId}`;
  const docResponse = await fetch(docUrl, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!docResponse.ok) {
    const errData = await docResponse.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل جلب محتويات المستند (Code: ${docResponse.status})`);
  }

  const docData = await docResponse.json();
  const plainText = extractPlainText(docData);

  // We also want the webViewLink, which comes from Drive API
  let webViewLink = `https://docs.google.com/document/d/${docId}/edit`;
  try {
    const driveUrl = `https://www.googleapis.com/drive/v3/files/${docId}?fields=webViewLink`;
    const driveResponse = await fetch(driveUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (driveResponse.ok) {
      const driveData = await driveResponse.json();
      webViewLink = driveData.webViewLink || webViewLink;
    }
  } catch (err) {
    console.warn("Failed to fetch webViewLink from Google Drive API, fallback to default edit link:", err);
  }

  return {
    id: docId,
    title: docData.title || "مستند بدون عنوان",
    bodyText: plainText,
    webViewLink,
    rawJson: docData
  };
};

// 4. Append text content to Google Doc
export const appendGoogleDoc = async (token: string, docId: string, textToAppend: string): Promise<boolean> => {
  const url = `https://docs.googleapis.com/v1/documents/${docId}:batchUpdate`;

  // We append at index 1 (just after start of document) or we can append at end by fetching the doc index.
  // To keep it safe and reliable without knowing end index, we insert at index 1.
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      requests: [
        {
          insertText: {
            location: {
              index: 1
            },
            text: textToAppend
          }
        }
      ]
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل تعديل وإضافة نص إلى مستند جوجل (Code: ${response.status})`);
  }

  return true;
};

// 5. Delete a file from Google Drive (needs user confirmation in UI)
export const deleteGoogleFile = async (token: string, fileId: string): Promise<boolean> => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل حذف مستند جوجل (Code: ${response.status})`);
  }

  return true;
};

// 6. List Google Sheets from user's Drive
export const listGoogleSheets = async (token: string): Promise<GoogleDriveFile[]> => {
  const query = "mimeType='application/vnd.google-apps.spreadsheet' and trashed=false";
  const fields = "files(id,name,mimeType,createdTime,modifiedTime,webViewLink,iconLink)";
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=${encodeURIComponent(fields)}&orderBy=modifiedTime%20desc&pageSize=30`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل جلب ملفات جداول جوجل من حسابك (Code: ${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
};

// 7. Create a new Google Spreadsheet
export const createGoogleSheet = async (token: string, title: string): Promise<string> => {
  const url = "https://sheets.googleapis.com/v4/spreadsheets";
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title: title
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل إنشاء جدول جوجل جديد (Code: ${response.status})`);
  }

  const data = await response.json();
  return data.spreadsheetId;
};

// 8. Get spreadsheet values
export const getGoogleSheetValues = async (token: string, spreadsheetId: string, range: string): Promise<any[][]> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}`;
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل جلب بيانات جدول جوجل (Code: ${response.status})`);
  }

  const data = await response.json();
  return data.values || [];
};

// 9. Update spreadsheet values (or append rows)
export const updateGoogleSheetValues = async (token: string, spreadsheetId: string, range: string, values: any[][]): Promise<boolean> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`;
  
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      values: values
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `فشل تحديث بيانات جدول جوجل (Code: ${response.status})`);
  }

  return true;
};
