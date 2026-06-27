import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BookOpen, 
  Search, 
  Filter, 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  FileText, 
  Share2, 
  ChevronLeft, 
  MessageSquare,
  Sparkles,
  Bookmark,
  X
} from "lucide-react";
import InteractiveQuiz from "./InteractiveQuiz";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: "entrepreneurship" | "management" | "arbitration";
  categoryLabel: string;
  readTime: string;
  author: string;
  authorRole: string;
  date: string;
  isDownloadable: boolean;
  downloadName?: string;
  content: string[];
  templateBody?: string; // If it's a copyable document template
}

const RESOURCES_DATA: Article[] = [
  {
    id: "art-1",
    title: "الدليل الذهبي لتفادي النزاعات البرمجية وصياغة الشروط الفنية (SLA)",
    excerpt: "كيف تصيغ ملحقاً فنياً يحميك من تسويف المطورين والمقاولين ويضمن لك استلام كود برمجي بجودة استثنائية ومعيارية.",
    category: "arbitration",
    categoryLabel: "التحكيم وفحص الكود",
    readTime: "7 دقائق",
    author: "م. فواز الغامدي",
    authorRole: "مستشار ومحكم تقني معتمد",
    date: "12 يونيو 2026",
    isDownloadable: false,
    content: [
      "في سوق تطوير البرمجيات السريع، تُعزى غالبية النزاعات القضائية والودية بين العملاء والشركات البرمجية إلى غياب الملاحق الفنية المفصلة، أو غموض صياغة شروط استلام البرمجيات.",
      "تعتمد صياغة اتفاقية مستوى الخدمة البرمجية (SLA - Service Level Agreement) الناجحة على ركائز واضحة لا غنى عنها:",
      "أولاً: تحديد معمارية النظام والبيئة التشغيلية المستهدفة (مثال: اختيار قواعد البيانات، خوادم الاستضافة، واللغات المستخدمة مثل Flutter أو React Native) لمنع المطورين من الارتجال أو كتابة كود متهالك.",
      "ثانياً: تقسيم دفعات المشروع الاقتصادية وربطها بمخرجات فنية دقيقة وقابلة للفحص الفعلي (Milestones) بدلاً من تواريخ زمنية عمياء. لا تدفع قيمة أي مرحلة دون الحصول على الكود المصدري واختباره بنجاح في بيئة تجريبية (Staging Env).",
      "ثالثاً: النص بوضوح على معايير فحص جودة الكود (Code Quality Metrics). ضع شروطاً صريحة تفيد بأن الكود يجب أن يمر بنجاح عبر أدوات التحليل الساكن، مع نسبة تغطية اختبار لا تقل عن 70%، وخلوه التام من الثغرات الأمنية من تصنيف OWASP Top 10.",
      "رابعاً: تحديد الملكية الفكرية المطلقة (Intellectual Property). يجب إيراد بند صريح ينص على انتقال ملكية السورس كود، وقواعد البيانات، والحسابات السحابية للعميل بمجرد سداد الدفعات المقابلة لها تلقائياً ودون الحاجة لإجراءات إضافية."
    ]
  },
  {
    id: "art-2",
    title: "صيغة اتفاقية حماية السرية وعدم الإفصاح (NDA) المعتمدة",
    excerpt: "نموذج قانوني وفني متكامل لحماية فكرتك التجارية الريادية، بيانات عملائك، وأسرارك التشغيلية قبل مناقشتها مع أي مطور أو مستثمر.",
    category: "entrepreneurship",
    categoryLabel: "رواد الأعمال والتأسيس",
    readTime: "5 دقائق",
    author: "د. سليمان الحبيب",
    authorRole: "مستشار حوكمة وحماية الملكية الفكرية",
    date: "18 مايو 2026",
    isDownloadable: true,
    downloadName: "اتفاقية_سرية_المعلومات_NDA.txt",
    content: [
      "اتفاقية عدم الإفصاح (Non-Disclosure Agreement) هي خط الدفاع الأول لأي رائد أعمال أو منشأة تجارية تسعى للحفاظ على تنافسيتها المبتكرة.",
      "قبل أن تطرح ميزات فكرتك البرمجية أو نموذج عملك الاستراتيجي على جهة تطوير خارجية أو مستثمر محتمل، يجب أن تحصل على توقيع ملزم باتفاقية NDA.",
      "لقد أعددنا لك صيغة احترافية معتمدة تغطي نطاقاً شاملاً لسرية البيانات، وبنود التعويض الصارمة في حال الإخلال بالتسريب الرقمي أو الشفهي.",
      "بإمكانك نسخ هذا النموذج مباشرة وتعبئة بيانات الأطراف والبدء في استخدامه فوراً لحماية أصولك الرقمية والفكرية الحساسة."
    ],
    templateBody: `اتفاقية سرية المعلومات وعدم الإفصاح (NDA)

إنه في يوم [التاريخ] تم الاتفاق بين كل من:
الطرف الأول (صاحب المشروع/الفكرة الحصرية):
الاسم: ............................................ البريد: ............................................
الطرف الثاني (الجهة المستقبلة للمعلومات/المطور):
الاسم/الشركة: .................................... البريد: ............................................

تمهيد:
يرغب الطرف الأول في إطلاع الطرف الثاني على معلومات سرية وتقنية تتعلق بـ [اسم المشروع أو الفكرة] لغرض التقييم والتطوير البرمجي والتعاون التجاري، وبناءً عليه اتفق الطرفان على الشروط التالية:

1. تعريف المعلومات السرية:
تشمل كافة البيانات التقنية، الأكواد المصدرية، التصميمات (UI/UX)، النماذج الاقتصادية، قواعد البيانات، أرقام المبيعات، ومسارات العمل الشفهية أو المكتوبة أو الرقمية المتبادلة بين الطرفين.

2. التزامات الطرف الثاني:
- يلتزم الطرف الثاني بالحفاظ التام على سرية المعلومات المستلمة وعدم مشاركتها مع أي طرف ثالث تحت أي ظرف.
- تقتصر مشاركة المعلومات داخل المنشأة على الموظفين ذوي العلاقة المباشرة بالتنفيذ والموقعين على اتفاقية سرية مماثلة.
- يلتزم الطرف الثاني بعدم استغلال المعلومات السرية لبناء مشروع منافس بشكل مباشر أو غير مباشر خلال مدة سريان الاتفاقية.

3. مدة الاتفاقية:
تسري هذه الاتفاقية طوال فترة التفاوض والتنفيذ ولمدة [5 سنوات] تبدأ من تاريخ توقيعها، وتظل التزامات السرية ملزمة حتى بعد انتهاء العلاقة التعاقدية.

4. الشرط الجزائي والتعويضات:
في حال ثبوت إخلال الطرف الثاني بأي بند من بنود السرية، يلتزم بدفع تعويض مالي فوري متفق عليه للطرف الأول بقيمة لا تقل عن [أدخل المبلغ، مثال: 100,000 ريال سعودي] بالإضافة إلى تحمل كافة الأضرار التشغيلية والقانونية المترتبة على ذلك.

توقيع الطرف الأول: ....................................
توقيع الطرف الثاني: ....................................`
  },
  {
    id: "art-3",
    title: "حوكمة الإجراءات المعيارية (SOPs): تحويل العشوائية إلى سيستم عمل",
    excerpt: "كيف تصمم أدلة إجراءات مكتوبة لأقسام شركتك تضمن استدامة المبيعات والتشغيل بكفاءة كاملة بمعزل عن التغييرات البشرية.",
    category: "management",
    categoryLabel: "الهيكلة والتخطيط الإداري",
    readTime: "9 دقائق",
    author: "أ. رائد العتيبي",
    authorRole: "خبير استشارات التمكين وإدارة الجودة",
    date: "1 يونيو 2026",
    isDownloadable: false,
    content: [
      "تعاني العديد من الشركات الصغيرة والمتوسطة من 'فخ عشوائية الأفراد'، حيث تتركز المعرفة التشغيلية العميقة لخط العمل في أدمغة موظفين محددين، وعند مغادرتهم ينهار توازن المنشأة بالكامل.",
      "صياغة أدلة الإجراءات التشغيلية القياسية (SOPs - Standard Operating Procedures) هي المصل التشغيلي الذي يحمي شركتك من هذا السيناريو.",
      "تبدأ خطوات صياغة أدلة الإجراءات بتحديد المهام المتكررة (مثل خطوات استقبال شكاوى العملاء، آليات الشحن، ومراحل إغلاق المبيعات) ثم توثيقها عبر 3 مستويات:",
      "المستوى الأول: تدفق العملية البصري (Workflow Diagram) والذي يوضح تسلسل اتخاذ القرار والانتقال بين الأقسام بصرياً.",
      "المستوى الثاني: دليل المهام التفصيلي (Step-by-Step Narrative) والذي يكتب بلغة واضحة وبسيطة للمنفذين تحدد المسؤوليات والمدد الزمنية المتوقعة للحل والمتابعة.",
      "المستوى الثالث: النماذج وقوائم التحقق (Checklists & Templates) والتي يرجع إليها الموظف يومياً لضمان عدم إغفال أي معيار تشغيلي هام.",
      "إن الاستثمار في بناء أدلة الـ SOPs يمهد لشركتك التوسع عبر الامتياز التجاري (Franchising) ويسهل تدريب الكوادر الجديدة بكفاءة قياسية."
    ]
  },
  {
    id: "art-4",
    title: "من الفكرة إلى الـ MVP: نموذج تخطيط المنتجات التقنية لرواد الأعمال",
    excerpt: "دليل عملي لرواد الأعمال حول صياغة نطاق العمل المصغر، وإطلاق نسخة برمجية سريعة واقتصادية تختبر واقع السوق السعودي.",
    category: "entrepreneurship",
    categoryLabel: "رواد الأعمال والتأسيس",
    readTime: "6 دقائق",
    author: "م. عبد الإله الشهري",
    authorRole: "مستشار أول في هندسة البرمجيات وتطبيقات الـ MVP",
    date: "28 أبريل 2026",
    isDownloadable: false,
    content: [
      "يقع العديد من رواد الأعمال في مصيدة 'التطوير الزائد'، حيث يقضون شهوراً طويلة وينفقون ميزانيات ضخمة لبناء منتج تقني مكتظ بالميزات قبل معرفة ما إذا كان السوق يحتاجه فعلياً.",
      "الحل المنهجي يكمن في تطوير 'المنتج الأدنى القابل للنمو' (MVP - Minimum Viable Product).",
      "الـ MVP ليس منتجاً رديئاً أو غير مكتمل الكود، بل هو النسخة الأكثر اقتصادية وسرعة والتي تحتوي فقط على 'الميزة الجوهرية الفريدة' (Core Killer Feature) التي تحل فجوة العميل الرئيسية.",
      "كيف تنجح في بناء MVP؟",
      "1. ابدأ برسم رحلة العميل البسيطة جداً: تسجيل الدخول &gt; حل المشكلة &gt; إتمام الدفع &gt; الخروج. لا تضيف ميزات تجميلية مثل المحادثات الفورية المعقدة، التخصيص اللوني اللانهائي، أو الولاء الافتراضي في البدايات.",
      "2. استخدم منصات وتقنيات حديثة تتيح التطوير السريع والمرن مع كود نظيف وسيرفرات سحابية سريعة تضمن استدامة وترقية النظام مستقبلاً.",
      "3. قم بإطلاق الـ MVP لجمهور محدود ومستهدف (Beta Testers) واجمع ردود أفعالهم بعناية تامة. الآراء والبيانات الحقيقية التي ستحصدها في شهر تشغيل حقيقي أهم بكثير من عامين من التخمينات النظرية."
    ]
  },
  {
    id: "art-5",
    title: "التحقيق الجنائي الرقمي: دليل فحص جودة وثغرات الأكواد البرمجية",
    excerpt: "كيف تتعرف على جودة البناء البرمجي لتطبيقاتك، واكتشاف الأبواب الخلفية، والتحقق من التزام المقاول بالمعايير الهندسية لكتابة الأكواد.",
    category: "arbitration",
    categoryLabel: "التحكيم وفحص الكود",
    readTime: "8 دقائق",
    author: "م. فواز الغامدي",
    authorRole: "خبير ومحكم تقني معتمد",
    date: "5 أبريل 2026",
    isDownloadable: false,
    content: [
      "كثيراً ما يتسلم أصحاب الأعمال تطبيقات تعمل في الظاهر بشكل طبيعي، لكنها في العمق تحتوي على ثغرات برمجية كارثية، كود غير قابل للتعديل (Spaghetti Code)، أو حتى أكواد مسروقة من مشاريع أخرى دون ترخيص.",
      "فحص وتدقيق الأكواد (Code Auditing) يهدف إلى تشريح البناء البرمجي الداخلي عبر خطوات دقيقة ومستقلة:",
      "أولاً: التحقق من التزام المطور بهياكل البرمجة الكائنية والأنماط المعمارية المعترف بها (مثل MVC أو Clean Architecture) لتسهيل التطوير المستقبلي.",
      "ثانياً: فحص الثغرات الأمنية والثغرات الجسيمة. يتم فحص مسارات تدفق البيانات للتأكد من تشفير كلمات المرور وحماية قواعد البيانات من هجمات الحقن (SQL Injection).",
      "ثانياً: مراجعة تراخيص المكتبات الخارجية (Open-Source License Audit). استخدام مكتبات ذات تراخيص مقيدة قد يعرض منشأتك مستقبلاً لمطالبات قضائية دولية.",
      "إن إجراء فحص برمجيات مستقل ومحايد يمنحك شهادة أمان متكاملة تعزز ثقة المستثمرين والمستخدمين بمنتجك وتضمن ملكيتك التامة له."
    ]
  }
];

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<"all" | "entrepreneurship" | "management" | "arbitration">("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredArticles = RESOURCES_DATA.filter((art) => {
    const matchesCategory = activeCategory === "all" || art.category === activeCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          art.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyTemplate = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleDownloadTemplate = (art: Article) => {
    if (!art.templateBody) return;
    const element = document.createElement("a");
    const file = new Blob([art.templateBody], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = art.downloadName || "template.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="resources" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        {/* Header Block */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <BookOpen className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">المعرفة والموارد الرقمية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            مكتبة <span className="text-blue-600 font-extrabold">بيزنس ديفلوبرز الاستشارية</span> الحرة
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            مقالات هندسية وقانونية متخصصة ومقترحات صياغة العقود والنماذج التشغيلية مجاناً لدعم ونمو منشأتك.
          </p>
        </div>

        {/* Interactive Knowledge Measurement Quizzes */}
        <InteractiveQuiz />

        {/* Filter Toolbar: Search and Category Tabs */}
        <div className="bg-slate-50 border border-slate-200 p-4 sm:p-6 rounded-3xl mb-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Categories Tab Filter */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start w-full lg:w-auto">
            <button
              id="res-tab-all"
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === "all"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              جميع الموارد
            </button>
            <button
              id="res-tab-entre"
              onClick={() => setActiveCategory("entrepreneurship")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === "entrepreneurship"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              رواد الأعمال والتأسيس
            </button>
            <button
              id="res-tab-mgmt"
              onClick={() => setActiveCategory("management")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === "management"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              الهيكلة والتخطيط الإداري
            </button>
            <button
              id="res-tab-arbit"
              onClick={() => setActiveCategory("arbitration")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === "arbitration"
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              التحكيم وفحص الكود
            </button>
          </div>

          {/* Search bar input */}
          <div className="relative w-full lg:w-80 shrink-0">
            <input
              id="res-search-input"
              type="text"
              placeholder="ابحث في المقالات والمستندات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 pl-10 text-right font-sans"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Badge and reading time metadata */}
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    {art.categoryLabel}
                  </span>
                  <span className="text-slate-400 flex items-center space-x-1 space-x-reverse font-sans">
                    <Clock className="w-3.5 h-3.5" />
                    <span>قراءة: {art.readTime}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-2 hover:text-blue-600 transition-colors leading-snug">
                  {art.title}
                </h3>

                {/* Article Excerpt */}
                <p className="text-xs text-slate-500 font-light line-clamp-3 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              {/* Card Footer controls */}
              <div className="border-t border-slate-100 pt-5 mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-xs shrink-0 border border-slate-200">
                    👤
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-extrabold text-slate-800 block leading-tight">{art.author}</span>
                    <span className="text-[8px] text-slate-400 block font-light leading-none">{art.authorRole}</span>
                  </div>
                </div>

                <button
                  id={`res-btn-read-${art.id}`}
                  onClick={() => setSelectedArticle(art)}
                  className="text-xs text-blue-600 hover:text-blue-500 font-bold flex items-center space-x-0.5 space-x-reverse transition-all cursor-pointer"
                >
                  <span>{art.isDownloadable ? "عرض وتنزيل الملف" : "اقرأ المقال بالكامل"}</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full text-center py-16 bg-slate-50 border border-dashed border-slate-300 rounded-3xl">
              <span className="text-4xl block mb-2">📂</span>
              <p className="text-slate-500 font-light text-sm">لم نجد أي مخرجات تطابق بحثك حالياً.</p>
              <button
                id="res-reset-search"
                onClick={() => { setSearchTerm(""); setActiveCategory("all"); }}
                className="text-xs text-blue-600 font-bold hover:underline mt-2 cursor-pointer"
              >
                مسح مرشحات البحث والبدء من جديد
              </button>
            </div>
          )}
        </div>

        {/* Modal / Slide-over Reader for reading full content */}
        <AnimatePresence>
          {selectedArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                id="res-reader-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedArticle(null)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
              />

              {/* Reader Box Container */}
              <motion.div
                id="res-reader-box"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-2xl w-full text-right overflow-hidden z-10 flex flex-col justify-between max-h-[90vh] md:max-h-none"
              >
                {/* Header */}
                <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {selectedArticle.categoryLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-sans">{selectedArticle.date}</span>
                  </div>

                  <button
                    id="res-reader-close"
                    onClick={() => setSelectedArticle(null)}
                    className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                    title="إغلاق"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 overflow-y-auto flex-grow max-h-[60vh] sm:max-h-none space-y-6">
                  {/* Title & Author Info */}
                  <div className="space-y-3">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
                      {selectedArticle.title}
                    </h2>
                    
                    <div className="flex items-center space-x-3 space-x-reverse bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-slate-600 text-lg border border-blue-100 font-sans">
                        👤
                      </div>
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900 block leading-tight">{selectedArticle.author}</span>
                        <span className="text-[10px] text-slate-500 block font-light mt-0.5">{selectedArticle.authorRole}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Copyable template module if applicable */}
                  {selectedArticle.templateBody && (
                    <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-[10px] sm:text-xs leading-relaxed overflow-x-auto relative group text-left" dir="ltr">
                      <div className="absolute top-3 right-3 flex items-center space-x-1.5">
                        <button
                          id={`res-btn-copy-${selectedArticle.id}`}
                          onClick={() => handleCopyTemplate(selectedArticle.templateBody!, selectedArticle.id)}
                          className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md transition-colors flex items-center space-x-1 text-[10px] cursor-pointer"
                          title="نسخ العقد"
                        >
                          {copiedId === selectedArticle.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-sans">تم النسخ!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span className="font-sans">نسخ الصيغة</span>
                            </>
                          )}
                        </button>
                        
                        <button
                          id={`res-btn-down-${selectedArticle.id}`}
                          onClick={() => handleDownloadTemplate(selectedArticle)}
                          className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-md transition-colors flex items-center space-x-1 text-[10px] cursor-pointer"
                          title="تنزيل كـ TXT"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span className="font-sans">تنزيل</span>
                        </button>
                      </div>
                      <pre className="whitespace-pre-wrap pt-8 font-mono">{selectedArticle.templateBody}</pre>
                    </div>
                  )}

                  {/* Regular Article paragraphs */}
                  <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed font-light">
                    {selectedArticle.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Footer safety statement */}
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-start space-x-2.5 space-x-reverse text-[11px] text-blue-900 leading-relaxed">
                    <span className="text-lg shrink-0">⚠️</span>
                    <span><strong>إخلاء مسؤولية استشاري:</strong> يُنشر هذا المحتوى وتلك النماذج لغرض التثقيف وتقديم استرشاد عام لرواد الأعمال. لا تُغني هذه النماذج بأي حال عن الاستشارة التشخيصية والقانونية الدقيقة لكل منشأة وحالة بحد ذاتها.</span>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
                  <div className="text-slate-400 text-xs font-sans">
                    زمن القراءة: {selectedArticle.readTime}
                  </div>
                  
                  <button
                    id="res-reader-close-bottom"
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    فهمت، إغلاق القارئ
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
