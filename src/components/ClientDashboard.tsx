import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  LayoutDashboard, 
  UserCheck, 
  Lock, 
  Unlock, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileCheck, 
  Send, 
  LogOut, 
  ArrowLeft, 
  Layers, 
  User,
  Sparkles,
  ChevronLeft,
  Briefcase,
  HelpCircle,
  PenTool,
  Trash2,
  ShieldCheck,
  FileSignature,
  Download,
  RotateCcw
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Inquiry } from "../types";

interface Milestone {
  name: string;
  status: "completed" | "active" | "pending";
  date: string;
}

interface ProjectLog {
  date: string;
  title: string;
  details: string;
}

interface ClientProject {
  id: string;
  projectName: string;
  clientName: string;
  email: string;
  progress: number;
  category: string;
  advisorName: string;
  startDate: string;
  budgetedHours: number;
  actualHours: number;
  milestones: Milestone[];
  chartData: { week: string; percentage: number }[];
  logs: ProjectLog[];
}

// Pre-defined premium demo projects to showcase Recharts immediately on click
const DEMO_PROJECTS: ClientProject[] = [
  {
    id: "proj-demo-1",
    projectName: "تطبيق ومنصة ريادة كارت المحدودة",
    clientName: "م. أحمد الرويلي",
    email: "ahmed@reyadacart.com",
    progress: 85,
    category: "تطبيقات وحلول رقمية (Flutter / Node.js)",
    advisorName: "مستشار أول: م. عبد الإله الشهري",
    startDate: "1 مارس 2026",
    budgetedHours: 240,
    actualHours: 210,
    milestones: [
      { name: "صياغة دراسة الجدوى وتأسيس نموذج العمل (BMC)", status: "completed", date: "10 مارس 2026" },
      { name: "تصميم واجهة المستخدم وتجربة العميل (UI/UX)", status: "completed", date: "30 مارس 2026" },
      { name: "تطوير لوحة التحكم والـ API الخلفية", status: "completed", date: "25 أبريل 2026" },
      { name: "تطوير تطبيق الهاتف الذكي (Flutter iOS/Android)", status: "active", date: "في المرحلة التجريبية" },
      { name: "فحص جودة الكود البرمجي وتدقيق الثغرات والحماية", status: "pending", date: "متوقع 10 يوليو" },
      { name: "الإطلاق الرسمي في المتاجر وعقد التحكيم الفني", status: "pending", date: "متوقع 1 أغسطس" }
    ],
    chartData: [
      { week: "الأسبوع 1", percentage: 10 },
      { week: "الأسبوع 2", percentage: 22 },
      { week: "الأسبوع 3", percentage: 35 },
      { week: "الأسبوع 4", percentage: 48 },
      { week: "الأسبوع 5", percentage: 60 },
      { week: "الأسبوع 6", percentage: 72 },
      { week: "الأسبوع 7", percentage: 80 },
      { week: "الأسبوع 8", percentage: 85 }
    ],
    logs: [
      { date: "22 يونيو 2026", title: "رفع الإصدار التجريبي للآيفون", details: "تم رفع التطبيق على منصة TestFlight ومشاركته مع فريق العمل للاختبار الداخلي للمبيعات والمدفوعات." },
      { date: "15 يونيو 2026", title: "تكامل بوابات الدفع وشبكات الشحن", details: "تم ربط نظام الدفع السريع ببطاقات مدى وفيزا بنجاح، وربط نظام التتبع الجغرافي للشحنات." },
      { date: "1 يونيو 2026", title: "اعتماد الهوية البصرية النهائية", details: "تمت الموافقة من العميل على دليل الهوية البصرية، والخطوط، والرموز الخاصة بمشروع ريادة كارت." }
    ]
  },
  {
    id: "proj-demo-2",
    projectName: "إعادة هيكلة وحوكمة مجموعة الراجحي الفنية",
    clientName: "أ. سليمان الراجحي",
    email: "s.rajhi@rajhicontracts.com",
    progress: 60,
    category: "إدارة وتخطيط (هيكلة تنظيمية وسياست)",
    advisorName: "مستشار إداري: د. سليمان الحبيب",
    startDate: "15 أبريل 2026",
    budgetedHours: 180,
    actualHours: 115,
    milestones: [
      { name: "تحليل الوضع الراهن وإجراء المقابلات الفردية", status: "completed", date: "30 أبريل 2026" },
      { name: "صياغة الهيكل التنظيمي الجديد وتحديث الأدوار", status: "completed", date: "15 مايو 2026" },
      { name: "كتابة وتوثيق أدلة التشغيل والسياسات المعيارية SOPs", status: "active", date: "قيد الصياغة والتدقيق" },
      { name: "بناء بطاقات الأداء المتوازن ومؤشرات الأداء KPIs", status: "pending", date: "متوقع 15 يوليو" },
      { name: "تدريب الموظفين وإطلاق نظام الحوكمة الشامل", status: "pending", date: "متوقع 1 أغسطس" }
    ],
    chartData: [
      { week: "الأسبوع 1", percentage: 12 },
      { week: "الأسبوع 2", percentage: 25 },
      { week: "الأسبوع 3", percentage: 38 },
      { week: "الأسبوع 4", percentage: 45 },
      { week: "الأسبوع 5", percentage: 52 },
      { week: "الأسبوع 6", percentage: 60 }
    ],
    logs: [
      { date: "20 يونيو 2026", title: "تسليم المسودة الأولى لأدلة التشغيل", details: "تم تسليم مسودة أدلة الإجراءات لـ 4 أقسام رئيسية تشمل: المبيعات، المستودعات، الصيانة والدعم." },
      { date: "10 يونيو 2026", title: "اعتماد الأوصاف الوظيفية التفصيلية", details: "تم التوقيع والموافقة على الأوصاف الوظيفية والصلاحيات الإدارية لـ 35 منصباً تشغيلياً في المجموعة." },
      { date: "20 مايو 2026", title: "عقد ورشة العمل الاستراتيجية الكبرى", details: "تم تحديد الرؤية والرسالة ومحاور النمو الخمسة لمجموعة الراجحي الفنية للسنوات الثلاث القادمة." }
    ]
  },
  {
    id: "proj-demo-3",
    projectName: "فض النزاع والتحكيم الفني لمنصة عقاري بلس",
    clientName: "أ. عبد اللطيف الشريف",
    email: "shaneef@aqariplus.sa",
    progress: 95,
    category: "تحكيم تقني وخبرة قضائية (Code Audit)",
    advisorName: "خبير ومحكم تقني: م. فواز الغامدي",
    startDate: "10 مايو 2026",
    budgetedHours: 90,
    actualHours: 86,
    milestones: [
      { name: "استلام وتحليل وثائق العقود والملاحق الفنية", status: "completed", date: "15 مايو 2026" },
      { name: "فحص الكود المصدري وإجراء اختبارات الاختراق والأمان", status: "completed", date: "30 مايو 2026" },
      { name: "صياغة تقرير الخبرة الفنية الهندسي التفصيلي", status: "completed", date: "15 يونيو 2026" },
      { name: "عقد جلسة المواجهة والتحكيم الودية بين الطرفين", status: "active", date: "في مرحلة الصياغة العقدية" },
      { name: "توقيع اتفاقية الفض الودي وإغلاق الملف القضائي", status: "pending", date: "متوقع 30 يونيو" }
    ],
    chartData: [
      { week: "الأسبوع 1", percentage: 20 },
      { week: "الأسبوع 2", percentage: 45 },
      { week: "الأسبوع 3", percentage: 70 },
      { week: "الأسبوع 4", percentage: 88 },
      { week: "الأسبوع 5", percentage: 95 }
    ],
    logs: [
      { date: "18 يونيو 2026", title: "الموافقة المبدئية على التسوية المالية", details: "تم إبرام اتفاقية تسوية مالية مبدئية يرجع بموجبها المقاول المطور 65% من الدفعة المالية للعميل." },
      { date: "12 يونيو 2026", title: "تسليم التقرير الهندسي التقني المعتمد", details: "تم إصدار وتسليم التقرير النهائي المكون من 64 صفحة يوضح الثغرات الأمنية والخلل التشغيلي في كود التطبيق." },
      { date: "28 مايو 2026", title: "العثور على ثغرات برمجية حرجة في قاعدة البيانات", details: "تم فحص الكود البرمجي ورصد 4 أخطاء معمارية عميقة تهدد حماية البيانات ولا تتطابق مع اشتراطات العقد." }
    ]
  }
];

interface DocumentToSign {
  id: string;
  title: string;
  category: string;
  date: string;
  clauses: string[];
  requiresApprovalOfPhase: string;
}

const getPendingDocuments = (projectId: string): DocumentToSign[] => {
  if (projectId === "proj-demo-1") {
    return [
      {
        id: "doc-demo-1-sow",
        title: "الملحق الفني الإضافي للمرحلة التجريبية والمدفوعات",
        category: "SOW ملحق فني ونطاق عمل",
        date: "26 يونيو 2026",
        clauses: [
          "المادة الأولى: يلتزم الطرف الثاني (بيزنس ديفلوبرز) بإنهاء تكامل بوابات دفع مدى وفيزا وتجربة المبيعات خلال 14 يوم عمل من توقيع هذا الملحق الفني.",
          "المادة الثانية: يوافق الطرف الأول (ريادة كارت المحدودة) على تقديم كافة بيانات الربط وبوابات التجار فوراً تفادياً لأي تأخير خارج النطاق.",
          "المادة الثالثة: يتم ترحيل دفعة الإنجاز التشغيلي البالغة 15% من القيمة الإجمالية فور اعتماد لوحة التحكم والبيانات بنجاح."
        ],
        requiresApprovalOfPhase: "تطوير تطبيق الهاتف الذكي (Flutter iOS/Android)"
      },
      {
        id: "doc-demo-1-nda",
        title: "اتفاقية سرية المعلومات وتبادل البيانات الهندسية المتبادلة NDA",
        category: "NDA حماية سرية البيانات",
        date: "26 يونيو 2026",
        clauses: [
          "المادة الأولى: يتعهد الطرفان بحماية وتشفير كافة قواعد البيانات والـ API Keys المشتركة وتشفير كلمات السر بنظام 256-bit.",
          "المادة الثانية: لا يحق لأي من الطرفين مشاركة الكود البرمجي المصدري مع أي مطور خارجي دون موافقة كتابية صريحة مسبقة.",
          "المادة الثالثة: تسري هذه الاتفاقية لمدة 5 سنوات من تاريخ التوقيع الإلكتروني وتخضع لأنظمة ومحاكم المملكة العربية السعودية."
        ],
        requiresApprovalOfPhase: "فحص جودة الكود البرمجي وتدقيق الثغرات والحماية"
      }
    ];
  } else if (projectId === "proj-demo-2") {
    return [
      {
        id: "doc-demo-2-sop",
        title: "وثيقة اعتماد السياسات وتوزيع الأوصاف الوظيفية للمبيعات والمستودعات",
        category: "SOPs اعتماد هيكلي وتشغيلي",
        date: "26 يونيو 2026",
        clauses: [
          "المادة الأولى: يقر العميل باعتماد الهياكل التنظيمية والأوصاف الوظيفية لـ 35 منصباً كمسودة نهائية صالحة لبدء التطبيق والمأسسة.",
          "المادة الثانية: تبدأ المرحلة التشغيلية لنظام الرقابة وربط الـ KPIs للمبيعات والمستودعات ابتداءً من مطلع الشهر القادم.",
          "المادة الثالثة: يتم تدريب الموظفين المعنيين بورش عمل تفاعلية هجينة لمدة 10 ساعات عمل مكثفة مقسمة على الأسبوعين القادمين."
        ],
        requiresApprovalOfPhase: "كتابة وتوثيق أدلة التشغيل والسياسات المعيارية SOPs"
      }
    ];
  } else if (projectId === "proj-demo-3") {
    return [
      {
        id: "doc-demo-3-settle",
        title: "اتفاقية ومحضر التسوية الودية النهائية لملف منصة عقاري بلس",
        category: "اتفاقية فض النزاع الفني الودية",
        date: "26 يونيو 2026",
        clauses: [
          "المادة الأولى: يوافق الطرفان على مخرجات التقرير الهندسي الفني المعتمد والمعد من قبل المحكم التقني لشركة بيزنس ديفلوبرز.",
          "المادة الثانية: يلتزم المقاول المطور بإرجاع نسبة 65% من القيمة المدفوعة خلال 30 يوماً كأثر مالي للتسوية الودية المرضية للطرفين.",
          "المادة الثالثة: يعتبر هذا المحضر سنداً تنفيذياً ودياً يغلق النزاع والملف القضائي المنظور كلياً فور التوقيع الإلكتروني الثنائي."
        ],
        requiresApprovalOfPhase: "توقيع اتفاقية الفض الودي وإغلاق الملف القضائي"
      }
    ];
  } else {
    return [
      {
        id: "doc-local-nda",
        title: "بروتوكول سرية المعلومات المتبادلة وحوكمة الملفات الاستشارية (NDA)",
        category: "NDA اتفاقية حماية الخصوصية والسرية",
        date: "26 يونيو 2026",
        clauses: [
          "المادة الأولى: يتعهد الطرف الاستشاري (بيزنس ديفلوبرز) بالحفاظ الكامل والمطلق على سرية الفكرة والبيانات والملفات المستلمة من العميل.",
          "المادة الثانية: يتم تشفير كافة البيانات المدخلة في استمارات التواصل ولا يتم إفشاؤها لأي منافس أو مستشار خارجي غير معتمد بالملف.",
          "المادة الثالثة: يبدأ العمل ودراسة النطاق والتشخيص الأولي فور التوقيع الإلكتروني التلقائي على هذا بروتوكول الآمن."
        ],
        requiresApprovalOfPhase: "توقيع العقد واتفاقية سرية المعلومات (NDA)"
      }
    ];
  }
};

export default function ClientDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<ClientProject | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  const [chatLogs, setChatLogs] = useState<Record<string, { sender: "client" | "advisor"; text: string; time: string }[]>>({});
  const [userInquiries, setUserInquiries] = useState<Inquiry[]>([]);
  const [isDemoUser, setIsDemoUser] = useState<boolean>(false);

  // --- Signature Pad & Contract Approval States ---
  const [signedDocuments, setSignedDocuments] = useState<Record<string, { signatureDataUrl: string, signeeName: string, signedAt: string, certId: string }>>({});
  const [selectedDocId, setSelectedDocId] = useState<string>("");
  const [signeeName, setSigneeName] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);
  
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // --- AI Project Assistant States ---
  const [activeTab, setActiveTab] = useState<"advisor" | "ai">("advisor");
  const [aiMessageText, setAiMessageText] = useState<string>("");
  const [aiChatLogs, setAiChatLogs] = useState<Record<string, { sender: "client" | "ai"; text: string; time: string }[]>>({});
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Initialize AI Welcome Message
  useEffect(() => {
    if (selectedProject) {
      const projectId = selectedProject.id;
      if (!aiChatLogs[projectId]) {
        const initialMsg = {
          sender: "ai" as const,
          text: `مرحباً بك يا ${selectedProject.clientName}! أنا مساعدك الاستشاري والتقني الذكي المدعوم بـ Gemini لشركة بيزنس ديفلوبرز. 🤖✨

يمكنني مساعدتك في:
1. فهم خريطة طريق مشروعك الحالي وإعطائك نظرة شاملة على تقدمك.
2. شرح المصطلحات الفنية المعقدة في تقارير إنجازك (مثل SOPs, UI/UX, Flutter, APIs, NDA, KPIs).
3. تقديم اقتراحات ذكية لتطوير نموذج الأعمال الخاص بك.

ما الذي تود الاستفسار عنه اليوم بخصوص مشروعك؟`,
          time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
        };
        setAiChatLogs(prev => ({
          ...prev,
          [projectId]: [initialMsg]
        }));
      }
    }
  }, [selectedProject]);

  // Load signed documents from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bd_signed_docs");
      if (stored) {
        setSignedDocuments(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // When selectedProject changes, select its first pending document to sign
  useEffect(() => {
    if (selectedProject) {
      const docs = getPendingDocuments(selectedProject.id);
      if (docs.length > 0) {
        setSelectedDocId(docs[0].id);
      }
      // Reset inputs
      setSigneeName("");
      setAgreeToTerms(false);
      setHasSignature(false);
    }
  }, [selectedProject]);

  // Canvas drawing event handlers
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    return { x, y };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#1e40af"; // Deep blue ink
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const coords = getCoordinates(e);
    if (!coords) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleAutoSign = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#1e40af"; // Deep blue ink
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(30, canvas.height / 2 + 10);
    ctx.quadraticCurveTo(60, canvas.height / 2 - 30, 90, canvas.height / 2 + 20);
    ctx.quadraticCurveTo(110, canvas.height / 2 - 40, 130, canvas.height / 2 + 10);
    ctx.quadraticCurveTo(145, canvas.height / 2 - 20, 160, canvas.height / 2 + 5);
    ctx.quadraticCurveTo(180, canvas.height / 2 - 35, 200, canvas.height / 2 + 15);
    ctx.moveTo(25, canvas.height / 2 + 25);
    ctx.quadraticCurveTo(120, canvas.height / 2 + 35, 240, canvas.height / 2 + 20);
    ctx.stroke();

    setHasSignature(true);
  };

  const onSubmitSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedProject) return;

    const signatureDataUrl = canvas.toDataURL();
    const currentDocs = getPendingDocuments(selectedProject.id);
    const activeDoc = currentDocs.find(d => d.id === selectedDocId);
    if (!activeDoc) return;

    const certId = "BD-CERT-" + Math.floor(100000 + Math.random() * 900000);
    const signedAt = new Date().toLocaleString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const updatedSigned = {
      ...signedDocuments,
      [activeDoc.id]: {
        signatureDataUrl,
        signeeName,
        signedAt,
        certId,
      }
    };

    setSignedDocuments(updatedSigned);
    localStorage.setItem("bd_signed_docs", JSON.stringify(updatedSigned));

    // Update milestones and logs
    const updatedMilestones = selectedProject.milestones.map(m => {
      if (m.name.toLowerCase().includes(activeDoc.requiresApprovalOfPhase.toLowerCase()) || 
          activeDoc.requiresApprovalOfPhase.toLowerCase().includes(m.name.toLowerCase())) {
        return { ...m, status: "completed" as const, date: new Date().toLocaleDateString("ar-SA") };
      }
      return m;
    });

    const newLog = {
      date: "اليوم",
      title: `✍️ توقيع إلكتروني معتمد: ${activeDoc.title}`,
      details: `تم توقيع وثيقة (${activeDoc.category}) بنجاح للمصادقة وبدء تنفيذ الباقة التشغيلية فوراً. المفوّض بالتوقيع: ${signeeName}. شهادة التوثيق: ${certId}.`
    };

    const nextProgress = Math.min(100, selectedProject.progress + 5);

    const updatedProject = {
      ...selectedProject,
      progress: nextProgress,
      milestones: updatedMilestones,
      logs: [newLog, ...selectedProject.logs]
    };

    setSelectedProject(updatedProject);

    // Dynamic Advisor chat reply
    setTimeout(() => {
      const projectId = selectedProject.id;
      const currentChat = chatLogs[projectId] || [];
      const advisorReply = {
        sender: "advisor" as const,
        text: `🎉 رائع جداً! استلمنا توقيعكم الإلكتروني المعتمد لـ (${activeDoc.title}) برمز توثيق (${certId}). سنبدأ العمل على نطاق المشروع فوراً مع فريق الإدارة والبرمجة وسنطلعكم على نسب الإنجاز ههنا أولاً بأول. شكراً لثقتكم وسرعة تفاعلكم!`,
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
      };
      setChatLogs(prev => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), advisorReply]
      }));
    }, 2000);
  };

  // Load registered client inquiries from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bd_inquiries");
      if (stored) {
        setUserInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, [isLoggedIn]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = emailInput.trim().toLowerCase();

    if (!cleanEmail) {
      setAuthError("يرجى إدخال البريد الإلكتروني للعميل.");
      return;
    }

    // 1. Check pre-defined demo accounts
    const foundDemo = DEMO_PROJECTS.find(p => p.email.toLowerCase() === cleanEmail);
    if (foundDemo) {
      setSelectedProject(foundDemo);
      setIsLoggedIn(true);
      setIsDemoUser(true);
      setAuthError("");
      return;
    }

    // 2. Check local registered user inquiries
    const foundLocal = userInquiries.find(inq => inq.email.toLowerCase() === cleanEmail);
    if (foundLocal) {
      // Map local inquiry to a beautiful project structure dynamically!
      const mockLocalProject: ClientProject = {
        id: foundLocal.id,
        projectName: foundLocal.company !== "شخصي / فردي" ? `مشروع تطوير لـ: ${foundLocal.company}` : `مشروع تأسيس للعميل ${foundLocal.name}`,
        clientName: foundLocal.name,
        email: foundLocal.email,
        progress: 15,
        category: getServiceName(foundLocal.serviceId),
        advisorName: "مستشار علاقات العملاء: م. رائد العتيبي",
        startDate: foundLocal.date.split(" ")[0] || "قبل أيام",
        budgetedHours: 120,
        actualHours: 12,
        milestones: [
          { name: "استلام الطلب الاستشاري ودراسة النطاق", status: "completed", date: foundLocal.date.split(" ")[0] },
          { name: "تحديد موعد الجلسة الاستشارية التشخيصية", status: "active", date: "قيد المتابعة والتأكيد" },
          { name: "صياغة الملحق الفني والعرض الاقتصادي", status: "pending", date: "بانتظار الجلسة" },
          { name: "توقيع العقد واتفاقية سرية المعلومات (NDA)", status: "pending", date: "بانتظار العقد" },
          { name: "بدء التمكين والعمليات الإجرائية والبرمجية", status: "pending", date: "قريباً" }
        ],
        chartData: [
          { week: "الأسبوع 1", percentage: 5 },
          { week: "الأسبوع 2", percentage: 15 }
        ],
        logs: [
          { date: foundLocal.date.split(" ")[0], title: "تسجيل فكرة ونطاق العمل بنجاح", details: `تم استقبال وتخزين رسالتكم الاستشارية: "${foundLocal.message.substring(0, 90)}..."، وجاري مراجعتها من قبل مستشاري الإدارة والتقنية.` }
        ]
      };

      setSelectedProject(mockLocalProject);
      setIsLoggedIn(true);
      setIsDemoUser(false);
      setAuthError("");
      return;
    }

    setAuthError("البريد الإلكتروني المدخل غير مرتبط ببروتوكول نشط. بإمكانك الدخول بنقرة واحدة عبر حسابات العينات أدناه.");
  };

  const getServiceName = (id: string) => {
    const names: Record<string, string> = {
      mgmt: "خدمات إدارة الأعمال وهيكلة الشركات",
      plan: "التخطيط الاستراتيجي وبناء بطاقات الأداء",
      arbit: "التحكيم والخبرة التقنية وفض النزاعات",
      entre: "خدمات رواد الأعمال واحتضان الأفكار",
      apps: "تصميم وتطوير تطبيقات الهواتف والويب",
    };
    return names[id] || "طلب استشارة عامة";
  };

  const handleDemoLogin = (proj: ClientProject) => {
    setSelectedProject(proj);
    setEmailInput(proj.email);
    setIsLoggedIn(true);
    setIsDemoUser(true);
    setAuthError("");
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedProject) return;

    const projectId = selectedProject.id;
    const currentChat = chatLogs[projectId] || [];

    const newMsg = {
      sender: "client" as const,
      text: messageText,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
    };

    const updatedChat = [...currentChat, newMsg];
    setChatLogs({ ...chatLogs, [projectId]: updatedChat });
    setMessageText("");

    // Simulate Advisor intelligent reply
    setTimeout(() => {
      const replyMsg = {
        sender: "advisor" as const,
        text: `أهلاً بك يا ${selectedProject.clientName}، شكراً لتواصلك الفوري. تم استلام رسالتك بخصوص المشروع وسنقوم بالاطلاع عليها والرد خلال اجتماع المتابعة التشغيلي القادم. دمتم بنمو!`,
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
      };
      setChatLogs(prev => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), replyMsg]
      }));
    }, 1500);
  };

  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiMessageText.trim() || !selectedProject || isAiLoading) return;

    const projectId = selectedProject.id;
    const currentChat = aiChatLogs[projectId] || [];

    const newMsg = {
      sender: "client" as const,
      text: aiMessageText,
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
    };

    const updatedChat = [...currentChat, newMsg];
    setAiChatLogs(prev => ({ ...prev, [projectId]: updatedChat }));
    setAiMessageText("");
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: newMsg.text,
          history: currentChat,
          projectDetails: selectedProject
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI Assistant");
      }

      const data = await response.json();
      
      const aiReply = {
        sender: "ai" as const,
        text: data.reply,
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
      };

      setAiChatLogs(prev => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), aiReply]
      }));

    } catch (err: any) {
      console.error(err);
      const errorReply = {
        sender: "ai" as const,
        text: "عذراً، حدث خطأ أثناء الاتصال بمساعد المشروع الذكي. يرجى التأكد من ضبط مفتاح API لـ Gemini بشكل صحيح وإعادة المحاولة.",
        time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })
      };
      setAiChatLogs(prev => ({
        ...prev,
        [projectId]: [...(prev[projectId] || []), errorReply]
      }));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedProject(null);
    setEmailInput("");
  };

  const activeChat = selectedProject ? (chatLogs[selectedProject.id] || []) : [];
  const activeAiChat = selectedProject ? (aiChatLogs[selectedProject.id] || []) : [];
  const pendingDocs = selectedProject ? getPendingDocuments(selectedProject.id) : [];
  const activeDoc = selectedProject 
    ? getPendingDocuments(selectedProject.id).find((d) => d.id === selectedDocId) 
    : null;

  return (
    <section id="dashboard" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      {/* Background aesthetics */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        {/* Title Block */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-indigo-600 text-xs sm:text-sm font-semibold shadow-inner">
            <LayoutDashboard className="w-4 h-4 text-indigo-600" />
            <span className="text-indigo-600 font-bold">بوابة العميل التفاعلية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            لوحة بيانات <span className="text-blue-600 font-extrabold">متابعة المشاريع والتقدم</span> الرقمي
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            منطقتك الآمنة لمتابعة سير تنفيذ الخدمات الاستشارية والبرمجية، والاطلاع على المخططات التحليلية لنسب الإنجاز والمحطات المكتملة.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            /* Auth Login view */
            <motion.div
              key="login-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
                <div className="text-center space-y-2">
                  <span className="text-4xl">🔐</span>
                  <h3 className="text-xl font-extrabold text-slate-900">تسجيل الدخول لبوابة المشروعات</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-light max-w-sm mx-auto">
                    أدخل البريد الإلكتروني الذي سجلت به طلب الاستشارة سابقاً لمتابعة حالة مشروعك التمكيني مباشرة.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="dashboard-email" className="text-xs sm:text-sm font-bold text-slate-800 block">
                      البريد الإلكتروني للعميل
                    </label>
                    <div className="relative">
                      <input
                        id="dashboard-email"
                        type="email"
                        placeholder="example@domain.com"
                        value={emailInput}
                        onChange={(e) => { setEmailInput(e.target.value); setAuthError(""); }}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans pl-10"
                        dir="ltr"
                      />
                      <User className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                    </div>
                    {authError && (
                      <p className="text-xs text-rose-500 flex items-center space-x-1 space-x-reverse mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{authError}</span>
                      </p>
                    )}
                  </div>

                  <button
                    id="btn-login-dashboard"
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-500 text-white py-3.5 px-6 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md"
                  >
                    <span>الدخول للوحة البيانات</span>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </form>

                {/* Interactive Demo login options */}
                <div className="border-t border-slate-200 pt-6 space-y-4">
                  <span className="block text-xs font-bold text-slate-500 text-center">أو اختبر البوابة فوراً عبر مشاريع نموذجية حقيقية:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {DEMO_PROJECTS.map((demo) => (
                      <button
                        id={`btn-demo-login-${demo.id}`}
                        key={demo.id}
                        onClick={() => handleDemoLogin(demo)}
                        className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-500 hover:bg-blue-50/20 text-right transition-all group cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">
                            مشروع عينة
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-1 group-hover:text-blue-650">
                            {demo.projectName}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                          <span className="font-semibold text-blue-600">{demo.progress}% منجز</span>
                          <ChevronLeft className="w-3 h-3 group-hover:translate-x-[-2px] transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Context Tip if they registered on local storage */}
                {userInquiries.length > 0 && (
                  <div className="bg-green-50 border border-green-150 rounded-2xl p-4 flex items-start space-x-3 space-x-reverse">
                    <span className="text-xl shrink-0">✨</span>
                    <div className="text-xs text-green-950 font-light leading-relaxed">
                      <strong>تم رصد تقديم طلب استشاري سابقاً!</strong> بإمكانك الدخول بكتابة بريدك الإلكتروني (<strong>{userInquiries[0].email}</strong>) لرؤية كيف يتكامل طلبك الاستشاري ديناميكياً مع لوحة المتابعة كخط تشغيل متكامل.
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            /* Dashboard Panel view (Logged In) */
            <motion.div
              key="panel-view"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Dashboard Subheader Controls */}
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-200 shadow-inner shrink-0">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-1">
                      <span className="text-sm font-bold text-slate-500">مرحباً بك عميلنا العزيز:</span>
                      <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {selectedProject?.clientName}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-1">
                      {selectedProject?.projectName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center space-x-3 space-x-reverse shrink-0 self-end md:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] text-slate-400 block font-light">المشرف المتابع:</span>
                    <span className="text-xs font-bold text-slate-700 block">{selectedProject?.advisorName}</span>
                  </div>
                  <button
                    id="btn-logout"
                    onClick={handleLogout}
                    className="flex items-center space-x-1.5 space-x-reverse px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:text-rose-600 text-xs font-bold transition-all cursor-pointer text-slate-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>خروج</span>
                  </button>
                </div>
              </div>

              {/* Main Dashboard Layout grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Right Side: Milestones and Logs (8 Cols) */}
                <div className="lg:col-span-8 space-y-8">
                  
                  {/* Recharts Analytics Visualization Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-right">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 flex-wrap gap-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <TrendingUp className="w-5 h-5 text-blue-600 animate-pulse" />
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">منحنى صعود تقدم المشروع ونسب الإنجاز</h4>
                      </div>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 font-mono shadow-inner">
                        Recharts Live Area
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-light mb-6">
                      يوضح المخطط البياني أدناه التقدم الأسبوعي التراكمي للمشروع حتى تحقيق الأهداف المأمولة.
                    </p>

                    {/* Chart Container */}
                    <div className="w-full h-64 sm:h-72 font-sans text-xs">
                      {selectedProject && (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={selectedProject.chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.01}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                              dataKey="week" 
                              tickLine={false} 
                              axisLine={false} 
                              stroke="#64748b" 
                            />
                            <YAxis 
                              domain={[0, 100]} 
                              tickLine={false} 
                              axisLine={false} 
                              stroke="#64748b" 
                              unit="%"
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#ffffff', 
                                border: '1px solid #e2e8f0', 
                                borderRadius: '12px',
                                textAlign: 'right',
                                direction: 'rtl'
                              }} 
                              formatter={(value) => [`${value}%`, 'نسبة الإنجاز التراكمية']}
                              labelFormatter={(label) => `التوقيت: ${label}`}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="percentage" 
                              stroke="#2563eb" 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorProgress)" 
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>

                    {/* Hours budgeting visualizer via Recharts BarChart */}
                    <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h5 className="text-xs sm:text-sm font-bold text-slate-800">تفاصيل استهلاك الميزانية الساعية للمستشارين:</h5>
                        <ul className="space-y-2 text-xs text-slate-500 font-light">
                          <li className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span>ساعات الاستشارة المخصصة الإجمالية:</span>
                            <strong className="text-slate-800">{selectedProject?.budgetedHours} ساعة استشارية</strong>
                          </li>
                          <li className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span>ساعات الاستشارة المستهلكة فعلياً:</span>
                            <strong className="text-blue-600">{selectedProject?.actualHours} ساعة استشارية</strong>
                          </li>
                          <li className="flex justify-between items-center bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            <span>ساعات الاستشارة المتبقية الرصيد:</span>
                            <strong className="text-emerald-600">{(selectedProject?.budgetedHours || 0) - (selectedProject?.actualHours || 0)} ساعة استشارية</strong>
                          </li>
                        </ul>
                      </div>

                      {/* Side small Bar chart */}
                      <div className="h-40 font-sans text-[10px]">
                        {selectedProject && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: "الساعات الاستشارية", "المخصصة": selectedProject.budgetedHours, "المستهلكة": selectedProject.actualHours }
                              ]}
                              margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" tickLine={false} axisLine={false} stroke="#64748b" />
                              <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#ffffff', 
                                  border: '1px solid #e2e8f0', 
                                  borderRadius: '12px',
                                  textAlign: 'right',
                                  direction: 'rtl'
                                }}
                              />
                              <Legend verticalAlign="top" height={36}/>
                              <Bar dataKey="المخصصة" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="المستهلكة" fill="#2563eb" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contract Signing & Digital Approvals Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-right space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 flex-wrap gap-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <PenTool className="w-5 h-5 text-blue-600" />
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">المصادقة وتوقيع العقود والموافقات الفورية</h4>
                      </div>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 flex items-center gap-1 font-bold shadow-inner">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>آمن ومحمي 256-bit</span>
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed">
                      سعياً لسرعة البدء في المشاريع وتجاوز الإجراءات الورقية البيروقراطية، يمكنك الآن توقيع الملاحق الفنية واتفاقيات سرية المعلومات (NDA) إلكترونياً ومباشرة بلمسة واحدة.
                    </p>

                    {/* Document selector tabs */}
                    {pendingDocs.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-500">اختر المستند المطلوب توقيعه:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {pendingDocs.map((doc) => {
                            const isSigned = !!signedDocuments[doc.id];
                            const isSelected = selectedDocId === doc.id;
                            return (
                              <button
                                key={doc.id}
                                onClick={() => setSelectedDocId(doc.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-2 ${
                                  isSelected
                                    ? "bg-blue-600 border-blue-600 text-white shadow-md"
                                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                              >
                                <span className={`w-2 h-2 rounded-full ${isSigned ? "bg-emerald-500" : "bg-amber-500 animate-pulse"}`} />
                                <span>{doc.title}</span>
                                {isSigned && (
                                  <span className="bg-emerald-500/20 text-emerald-100 text-[9px] px-1.5 py-0.5 rounded">
                                    مكتمل التوقيع ✓
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Active selected document content & signing area */}
                    {activeDoc ? (
                      <AnimatePresence mode="wait">
                        {signedDocuments[activeDoc.id] ? (
                          /* RENDER GORGEOUS COMPLETED CERTIFICATE */
                          <motion.div
                            key={`signed-${activeDoc.id}`}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 border-2 border-emerald-200 rounded-2xl p-6 relative overflow-hidden space-y-6 text-right"
                          >
                            {/* Decorative Seal Background */}
                            <div className="absolute top-4 left-4 w-16 h-16 text-emerald-200/40 opacity-50 select-none pointer-events-none">
                              <ShieldCheck className="w-full h-full" />
                            </div>

                            <div className="text-center space-y-2">
                              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm">
                                <ShieldCheck className="w-6 h-6" />
                              </div>
                              <h5 className="text-sm font-black text-emerald-950">شهادة مصادقة وتوقيع إلكتروني آمن</h5>
                              <p className="text-[11px] text-emerald-600 font-medium">موثقة ومعتمدة قانونياً تحت إشراف بيزنس ديفلوبرز</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs bg-white/85 p-4 rounded-xl border border-emerald-100/60 shadow-inner">
                              <div className="space-y-2">
                                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                                  <span className="text-slate-400">اسم المستند:</span>
                                  <span className="font-bold text-slate-800">{activeDoc.title}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                                  <span className="text-slate-400">تصنيف الوثيقة:</span>
                                  <span className="font-bold text-blue-600 bg-blue-50/60 px-2 py-0.5 rounded">{activeDoc.category}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">تاريخ التحرير:</span>
                                  <span className="font-semibold text-slate-700">{activeDoc.date}</span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                                  <span className="text-slate-400">اسم المفوّض الموقّع:</span>
                                  <span className="font-extrabold text-emerald-800">{signedDocuments[activeDoc.id].signeeName}</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                                  <span className="text-slate-400">توقيت التوقيع:</span>
                                  <span className="font-semibold text-slate-700 font-sans text-left" dir="ltr">{signedDocuments[activeDoc.id].signedAt}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">رقم المصادقة الرقمي:</span>
                                  <span className="font-mono font-black text-blue-600">{signedDocuments[activeDoc.id].certId}</span>
                                </div>
                              </div>
                            </div>

                            {/* Render Signature Image */}
                            <div className="flex flex-col items-center justify-center p-3 bg-white border border-emerald-150 rounded-xl space-y-1">
                              <span className="text-[10px] text-slate-400">صورة التوقيع الإلكتروني الموثّق:</span>
                              <img 
                                src={signedDocuments[activeDoc.id].signatureDataUrl} 
                                alt="Signature" 
                                className="max-h-20 object-contain max-w-full"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            {/* Actions on Signed Doc */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  alert(`تم توليد وتنزيل ملف PDF المصدق بالكامل للوثيقة (${activeDoc.title}) بنجاح برقم شهادة (${signedDocuments[activeDoc.id].certId}).`);
                                }}
                                className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <Download className="w-4 h-4" />
                                <span>حفظ وتنزيل وثيقة PDF المصدقة</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("هل أنت متأكد من رغبتك في إلغاء التوقيع وإعادته؟ سيتم مسح شهادة التوثيق الحالية.")) {
                                    const updated = { ...signedDocuments };
                                    delete updated[activeDoc.id];
                                    setSignedDocuments(updated);
                                    localStorage.setItem("bd_signed_docs", JSON.stringify(updated));
                                  }
                                }}
                                className="bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-600 hover:text-rose-600 text-xs font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                              >
                                <RotateCcw className="w-4 h-4" />
                                <span>إعادة التوقيع</span>
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          /* RENDER ACTIVE CONTRACT AND DRAWING CANVAS SIGNATURE PAD */
                          <motion.div
                            key={`unsigned-${activeDoc.id}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6 text-right"
                          >
                            {/* Contract Clauses Viewer */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 shadow-inner">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 flex-wrap gap-2">
                                <span className="text-xs font-extrabold text-blue-900 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                                  {activeDoc.category}
                                </span>
                                <span className="text-[10px] text-slate-400 font-sans">تاريخ التحرير: {activeDoc.date}</span>
                              </div>

                              <div className="space-y-3 font-light leading-relaxed">
                                {activeDoc.clauses.map((clause, i) => (
                                  <p key={i} className="text-xs text-slate-700 pr-1.5 border-r-2 border-blue-500 text-right">
                                    {clause}
                                  </p>
                                ))}
                              </div>
                            </div>

                            {/* Canvas drawing and signee name input */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                              
                              {/* Left Canvas Panel */}
                              <div className="space-y-2 text-right">
                                <div className="flex items-center justify-between">
                                  <label className="block text-xs font-bold text-slate-700">
                                    لوحة التوقيع الحي (ارسم توقيعك بالماوس أو الإصبع) <span className="text-rose-500">*</span>
                                  </label>
                                  <div className="flex gap-1.5">
                                    <button
                                      type="button"
                                      onClick={handleAutoSign}
                                      className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 px-2 py-1 rounded-md font-bold transition-all cursor-pointer"
                                      title="أضف توقيعاً منسقاً وسريعاً تلقائياً"
                                    >
                                      توقيع عشوائي
                                    </button>
                                    <button
                                      type="button"
                                      onClick={clearCanvas}
                                      className="text-[10px] text-slate-500 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200 px-2 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                      <span>مسح</span>
                                    </button>
                                  </div>
                                </div>

                                <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-inner">
                                  <canvas
                                    ref={canvasRef}
                                    width={400}
                                    height={180}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    className="touch-none bg-slate-50 cursor-crosshair w-full h-44"
                                  />
                                  {!hasSignature && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 select-none pointer-events-none p-4 text-center">
                                      <PenTool className="w-6 h-6 mb-1 text-slate-300" />
                                      <span className="text-[10px] font-light">ارسم توقيعك هنا داخل هذا المربع</span>
                                      <span className="text-[9px] text-slate-400 mt-0.5 font-light">يدعم شاشات اللمس والماوس بدقة عالية</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right Input and compliance controls */}
                              <div className="space-y-4 self-center text-right">
                                <div className="space-y-1.5">
                                  <label htmlFor="signee-name" className="block text-xs font-bold text-slate-700">
                                    الاسم الكامل للمفوّض بالتوقيع والموافقة <span className="text-rose-500">*</span>
                                  </label>
                                  <input
                                    id="signee-name"
                                    type="text"
                                    placeholder="مثال: أحمد بن محمد الراجحي"
                                    value={signeeName}
                                    onChange={(e) => setSigneeName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm focus:border-blue-500 focus:bg-white focus:outline-none transition-all text-right"
                                  />
                                </div>

                                <div className="space-y-1.5">
                                  <label className="flex items-start gap-2 cursor-pointer select-none">
                                    <input
                                      type="checkbox"
                                      checked={agreeToTerms}
                                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                                      className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    <span className="text-xs text-slate-600 leading-relaxed font-light text-right">
                                      أقر بموافقتي التامة على بنود الملحق الفني ونطاق العمل المذكور أعلاه، وأوافق على بدء العمليات الاستشارية والتقنية فوراً.
                                    </span>
                                  </label>
                                </div>

                                <button
                                  type="button"
                                  onClick={onSubmitSignature}
                                  disabled={!hasSignature || !signeeName.trim() || !agreeToTerms}
                                  className={`w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                                    hasSignature && signeeName.trim() && agreeToTerms
                                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/10"
                                      : "bg-slate-200 text-slate-400 border border-slate-250 cursor-not-allowed shadow-none"
                                  }`}
                                >
                                  <FileSignature className="w-4 h-4" />
                                  <span>اعتماد وتوقيع المستند رقمياً</span>
                                </button>
                              </div>

                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ) : (
                      <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xs text-slate-400">
                        لا توجد مستندات بانتظار التوقيع حالياً.
                      </div>
                    )}
                  </div>

                  {/* Milestones Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-right">
                    <div className="flex items-center space-x-2 space-x-reverse border-b border-slate-100 pb-4 mb-6">
                      <FileCheck className="w-5 h-5 text-blue-600" />
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">المحطات الزمنية وخريطة الطريق (Milestones)</h4>
                    </div>

                    <div className="relative border-r-2 border-slate-150 pr-4 mr-2 space-y-6">
                      {selectedProject?.milestones.map((ms, index) => {
                        const isCompleted = ms.status === "completed";
                        const isActive = ms.status === "active";
                        return (
                          <div key={index} className="relative text-right">
                            {/* Circle Dot indicator */}
                            <span className={`absolute right-[-24px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-md ${
                              isCompleted ? "bg-emerald-500" : isActive ? "bg-blue-600 animate-pulse" : "bg-slate-300"
                            }`} />
                            
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2 space-x-reverse flex-wrap gap-1">
                                <h5 className={`text-xs sm:text-sm font-bold ${
                                  isCompleted ? "text-slate-500 line-through font-medium" : isActive ? "text-blue-900" : "text-slate-600"
                                }`}>
                                  {ms.name}
                                </h5>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                                  isCompleted ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : isActive ? "bg-blue-50 text-blue-600 border border-blue-100 animate-pulse" : "bg-slate-100 text-slate-500"
                                }`}>
                                  {isCompleted ? "مكتملة" : isActive ? "جارية الآن" : "مجدولة"}
                                </span>
                              </div>
                              <span className="block text-[10px] text-slate-400 font-light font-sans">{ms.date}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeline updates Logs */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-right">
                    <div className="flex items-center space-x-2 space-x-reverse border-b border-slate-100 pb-4 mb-6">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <h4 className="text-base sm:text-lg font-bold text-slate-900">سجل التحديثات البرمجية والتشغيلية المباشر</h4>
                    </div>

                    <div className="space-y-4">
                      {selectedProject?.logs.map((log, index) => (
                        <div key={index} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-right space-y-1.5">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <h5 className="text-xs sm:text-sm font-extrabold text-slate-900">{log.title}</h5>
                            <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-light">
                            {log.details}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Left Side: Project details card and Dedicated Chat (4 Cols) */}
                <div className="lg:col-span-4 space-y-8">
                  
                  {/* Scope Details Summary */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-right space-y-4">
                    <div className="border-b border-slate-100 pb-4">
                      <h4 className="text-sm font-bold text-slate-500">مواصفات حزمة الأعمال الحالية</h4>
                    </div>

                    <ul className="space-y-3.5 text-xs">
                      <li className="flex justify-between items-center pb-2.5 border-b border-slate-50">
                        <span className="text-slate-550">تاريخ بدء البروتوكول:</span>
                        <strong className="text-slate-800 font-sans">{selectedProject?.startDate}</strong>
                      </li>
                      <li className="flex justify-between items-center pb-2.5 border-b border-slate-50">
                        <span className="text-slate-550">نوع وتصنيف الخدمة:</span>
                        <strong className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{selectedProject?.category.split(" ")[0]}</strong>
                      </li>
                      <li className="flex justify-between items-center pb-2.5 border-b border-slate-50">
                        <span className="text-slate-550">نسبة الإنجاز الكلية:</span>
                        <strong className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-150 font-mono">{selectedProject?.progress}%</strong>
                      </li>
                      <li className="flex justify-between items-center">
                        <span className="text-slate-550">سرية وأمان البيانات:</span>
                        <strong className="text-emerald-600 flex items-center space-x-1 space-x-reverse">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>تشفير 256-bit NDA</span>
                        </strong>
                      </li>
                    </ul>
                  </div>

                  {/* Dedicated Chat/Support Card */}
                  <div className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between min-h-[440px]">
                    
                    {/* Tab Switcher */}
                    <div className="flex border-b border-slate-100 bg-slate-50 p-1 shrink-0">
                      <button
                        onClick={() => setActiveTab("advisor")}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                          activeTab === "advisor"
                            ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        💬 المستشار المتابع
                      </button>
                      <button
                        onClick={() => setActiveTab("ai")}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                          activeTab === "ai"
                            ? "bg-blue-600 text-white shadow-md"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        <span>🤖 المساعد الذكي (AI)</span>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                      </button>
                    </div>

                    {activeTab === "advisor" ? (
                      <>
                        {/* Advisor header */}
                        <div className="p-4 bg-gradient-to-r from-blue-650 to-indigo-650 text-white flex items-center space-x-3 space-x-reverse border-b border-slate-100">
                          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
                            👤
                          </div>
                          <div className="text-right">
                            <h5 className="text-xs font-bold">{selectedProject?.advisorName.split(":")[1] || "مستشار الدعم المتكامل"}</h5>
                            <span className="text-[10px] text-white/80 font-light block">{selectedProject?.advisorName.split(":")[0]}</span>
                          </div>
                        </div>

                        {/* Chat Messages Log Area */}
                        <div className="p-4 flex-grow overflow-y-auto max-h-[250px] min-h-[200px] space-y-3 bg-slate-50 text-right">
                          {activeChat.length === 0 ? (
                            <div className="text-center py-10 space-y-2 text-slate-400 font-light text-xs">
                              <p>💬 لا توجد رسائل سابقة مع مستشارك حالياً.</p>
                              <p className="text-[10px]">اكتب استفسارك أدناه وسيقوم المشرف بالرد عليك فوراً.</p>
                            </div>
                          ) : (
                            activeChat.map((msg, index) => {
                              const isClient = msg.sender === "client";
                              return (
                                <div 
                                  key={index} 
                                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                                    isClient 
                                      ? "bg-blue-600 text-white mr-auto rounded-tl-none text-left" 
                                      : "bg-white border border-slate-200 text-slate-800 ml-auto rounded-tr-none text-right"
                                  }`}
                                >
                                  <p className="font-light">{msg.text}</p>
                                  <span className={`block text-[9px] mt-1 ${isClient ? "text-white/70" : "text-slate-400"}`}>
                                    {msg.time}
                                  </span>
                                </div>
                              );
                            })
                          )}
                        </div>

                        {/* Message submission input */}
                        <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2 space-x-reverse shrink-0">
                          <input
                            id="dashboard-chat-input"
                            type="text"
                            placeholder="اكتب استفسارك للمستشار المتابع هنا..."
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            className="flex-grow px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white focus:border-blue-500 text-right"
                          />
                          <button
                            id="dashboard-btn-send-chat"
                            type="submit"
                            className="p-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors cursor-pointer"
                            title="إرسال"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </>
                    ) : (
                      <>
                        {/* AI Header */}
                        <div className="p-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-between border-b border-slate-100">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 shadow-inner text-lg">
                              🤖
                            </div>
                            <div className="text-right">
                              <h5 className="text-xs font-bold">AI Project Assistant</h5>
                              <span className="text-[10px] text-indigo-100 font-light block">مستشار المشروعات الذكي (Gemini 3.5)</span>
                            </div>
                          </div>
                          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2.5 py-1 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                            <span>متصل ذكياً</span>
                          </span>
                        </div>

                        {/* AI Chat Messages Log Area */}
                        <div className="p-4 flex-grow overflow-y-auto max-h-[250px] min-h-[200px] space-y-3 bg-slate-50 text-right">
                          {activeAiChat.length === 0 ? (
                            <div className="text-center py-10 space-y-2 text-slate-400 font-light text-xs">
                              <p>🤖 مرحباً بك في قسم الذكاء الاصطناعي للمشروع.</p>
                            </div>
                          ) : (
                            activeAiChat.map((msg, index) => {
                              const isClient = msg.sender === "client";
                              return (
                                <div 
                                  key={index} 
                                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                                    isClient 
                                      ? "bg-blue-650 text-white mr-auto rounded-tl-none text-left" 
                                      : "bg-white border border-slate-200 text-slate-800 ml-auto rounded-tr-none text-right shadow-sm"
                                  }`}
                                >
                                  <p className="font-light whitespace-pre-wrap">{msg.text}</p>
                                  <span className={`block text-[9px] mt-1 ${isClient ? "text-white/70" : "text-slate-400"}`}>
                                    {msg.time}
                                  </span>
                                </div>
                              );
                            })
                          )}
                          {isAiLoading && (
                            <div className="bg-white border border-slate-150 text-slate-800 ml-auto rounded-tr-none max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed flex items-center gap-3 shadow-sm">
                              <div className="flex space-x-1 space-x-reverse shrink-0">
                                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-blue-650 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                              </div>
                              <span className="text-[11px] text-slate-500 font-medium">يحلل المساعد الذكي تفاصيل تقدم مشروعك...</span>
                            </div>
                          )}
                        </div>

                        {/* AI Message submission input */}
                        <form onSubmit={handleSendAiMessage} className="p-3 border-t border-slate-200 bg-white flex items-center space-x-2 space-x-reverse shrink-0">
                          <input
                            id="dashboard-ai-chat-input"
                            type="text"
                            placeholder="اسأل الذكاء الاصطناعي عن تقدم مشروعك أو مصطلح..."
                            value={aiMessageText}
                            onChange={(e) => setAiMessageText(e.target.value)}
                            disabled={isAiLoading}
                            className="flex-grow px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white focus:border-blue-500 text-right disabled:opacity-60"
                          />
                          <button
                            id="dashboard-btn-send-ai-chat"
                            type="submit"
                            disabled={isAiLoading || !aiMessageText.trim()}
                            className={`p-2 rounded-xl transition-all cursor-pointer ${
                              isAiLoading || !aiMessageText.trim()
                                ? "bg-slate-150 text-slate-400 cursor-not-allowed border border-slate-200"
                                : "bg-blue-650 hover:bg-blue-600 text-white shadow-md shadow-blue-550/10"
                            }`}
                            title="إرسال"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        </form>
                      </>
                    )}

                  </div>

                </div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
