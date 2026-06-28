import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client on the server side
// The GEMINI_API_KEY is retrieved from environment variables securely
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    }
  }
});

// API route for AI Project Assistant Chat
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { message, history, projectDetails } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "مفتاح API الخاص بـ Gemini غير مهيأ بعد. يرجى إضافته في الإعدادات." 
      });
    }

    // Format project details for the model
    let projectName = "غير محدد";
    let category = "غير محدد";
    let advisorName = "غير محدد";
    let startDate = "غير محدد";
    let progress = 0;
    let milestonesText = "لا توجد محطات زمنية مسجلة.";
    let logsText = "لا توجد تحديثات مسجلة.";

    if (projectDetails) {
      projectName = projectDetails.projectName || projectName;
      category = projectDetails.category || category;
      advisorName = projectDetails.advisorName || advisorName;
      startDate = projectDetails.startDate || startDate;
      progress = projectDetails.progress || progress;

      if (projectDetails.milestones && Array.isArray(projectDetails.milestones)) {
        milestonesText = projectDetails.milestones
          .map((m: any, idx: number) => `- ${m.name} [الحالة: ${m.status === "completed" ? "مكتملة" : m.status === "active" ? "جارية" : "مجدولة"}] (التاريخ: ${m.date})`)
          .join("\n");
      }

      if (projectDetails.logs && Array.isArray(projectDetails.logs)) {
        logsText = projectDetails.logs
          .map((l: any) => `* [${l.date}] ${l.title}: ${l.details}`)
          .join("\n");
      }
    }

    // System instruction for the Gemini model to behave as the AI Project Assistant
    const systemInstruction = `
أنت المساعد الذكي للمشروع "AI Project Assistant" التابع لشركة "بيزنس ديفلوبرز" (Business Developers) للاستشارات وإدارة الأعمال والحلول الرقمية.
مهمتك هي الإجابة عن استفسارات العميل حول مسار مشروعه الحالي، أو شرح المصطلحات التقنية المستخدمة في تقارير الإنجاز ومعايير التشغيل والمحطات الزمنية (مثل: SOPs, UI/UX, Flutter, APIs, TestFlight, NDA, KPIs, BMC, SOW إلخ) بأسلوب مهني، واضح، ودود ومبسط باللغة العربية.

فيما يلي تفاصيل ومواصفات المشروع الحالي للعميل لتستخدمها كمرجع رئيسي للإجابة بدقة فائقة وبشكل مخصص عن أي استفسار يتعلق بتقدم مشروعه، حالته ومساره:
- اسم المشروع: ${projectName}
- تصنيف وحزمة المشروع: ${category}
- المستشار الفني المشرف: ${advisorName}
- تاريخ بدء العمل: ${startDate}
- نسبة الإنجاز الكلية للتقدم: ${progress}%

قائمة المحطات الزمنية الزمنية وخريطة الطريق للمشروع (Milestones):
${milestonesText}

سجل التحديثات البرمجية والتشغيلية الأخير للتقدم المباشر:
${logsText}

يرجى الالتزام التام بالقواعد التالية أثناء الإجابة:
1. أجب بلغة عربية فصيحة، مهنية، دافئة وودية للغاية تبعث على الاطمئنان والثقة والاحترافية. استخدم اسم العميل إذا كان متوفراً بلطف (العميل الحالي: ${projectDetails?.clientName || "العزيز"}).
2. إذا سأل العميل عن "أين وصلنا" أو "ما هي الخطوة القادمة" أو "تفاصيل التقدم"، استخدم جدول المحطات الزمنية وسجل التحديثات أعلاه لإعطائه إجابة دقيقة وتفصيلية تصف ما تم إنجازه، وما هو جارٍ العمل عليه حالياً، وما هي المحطة التالية بدقة.
3. إذا سأل عن مصطلح تقني وارد في تفاصيل مشروعه (مثل APIs، قواعد البيانات، حماية 256-bit، الاختبار الداخلي TestFlight، إلخ)، اشرحه له بأسلوب شيق ومبسط جداً مع توضيح الفائدة والربط المباشر بمشروعه.
4. إذا لم يكن الاستفسار متعلقاً بالمشروع بشكل مباشر، أجب عليه بلطف وأعد توجيهه لمشروعه وكيف يمكن تحسين نموذج أعمالهم.
5. حافظ على سرية المعلومات الخاصة بالمشاريع الأخرى ولا تشارك أي معلومات وهمية أو تفترض أرقاماً غير مذكورة في بيانات المشروع أعلاه.
`;

    // Map history to the required format of Contents for generateContent
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.sender === "client" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }

    // Add the current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call Gemini API using the recommended gemini-3.5-flash model
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "عذراً، لم أستطع توليد رد في الوقت الحالي. يرجى المحاولة مرة أخرى.";
    res.json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ 
      error: "حدث خطأ أثناء معالجة طلبك بواسطة الذكاء الاصطناعي.",
      details: error.message 
    });
  }
});

// API route for summarizing Google Docs via Gemini 3.5 Flash
app.post("/api/summarize-doc", async (req, res) => {
  try {
    const { docTitle, docText } = req.body;

    if (!docText) {
      return res.status(400).json({ error: "Document text is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "مفتاح API الخاص بـ Gemini غير مهيأ بعد. يرجى إضافته في الإعدادات." 
      });
    }

    const prompt = `
أنت خبير إداري ومستشار استراتيجي لشركة "بيزنس ديفلوبرز" لاستشارات ريادة الأعمال وحلول التحول الرقمي.
لقد قام العميل بتحميل مستند من مستندات جوجل (Google Docs) بعنوان: "${docTitle || "مستند بدون عنوان"}".
مهمتك هي قراءة نص هذا المستند بتمعن وتحليله تحليلاً استراتيجياً وتقديم تقرير تلخيصي احترافي، مبهج، ومنظم بشكل ممتاز باللغة العربية.

فيما يلي نص المستند الكامل المراد تحليله وتلخيصه:
"""
${docText}
"""

يرجى هيكلة التلخيص الإداري في الأقسام التالية مع استخدام علامات التنسيق Markdown بشكل جميل:
1. **الخلاصة والبيان التنفيذي**: (فقرة ملخصة بليغة تبين الفكرة العامة للمستند وأهمية محتواه)
2. **النقاط والبنود الرئيسية**: (قائمة نقطية جذابة توضح أهم الأفكار، الشروط، المعايير أو الالتزامات الواردة)
3. **التوصيات والخطوات الاستشارية القادمة**: (3-4 نقاط ملموسة وعملية تنصح العميل باتخاذها كخطوة تالية بناءً على هذا المستند من منظور إداري وتقني)

حافظ على لغة راقية، دافئة، واحترافية تماماً تليق بشركة "بيزنس ديفلوبرز".
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.3, // Lower temperature for more consistent, analytical summaries
      }
    });

    const summary = response.text || "عذراً، لم أستطع توليد تلخيص لهذا المستند في الوقت الحالي.";
    res.json({ summary });

  } catch (error: any) {
    console.error("Gemini Doc Summarizer Error:", error);
    res.status(500).json({ 
      error: "حدث خطأ أثناء معالجة وتلخيص المستند بواسطة الذكاء الاصطناعي.",
      details: error.message 
    });
  }
});

// Vite middleware setup or Static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Full-Stack Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
