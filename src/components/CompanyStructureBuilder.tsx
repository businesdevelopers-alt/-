import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Layers, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Printer, 
  HelpCircle, 
  Info, 
  TrendingUp, 
  ShieldCheck, 
  DollarSign, 
  Activity, 
  Briefcase, 
  Sparkles,
  RefreshCw,
  Award,
  ChevronLeft
} from "lucide-react";

// --- Types ---
interface OrgNode {
  id: string;
  name: string;
  title: string;
  description: string;
  kpis: string[];
  sops: string[];
  parentId: string | null;
  custom?: boolean;
}

interface SectorConfig {
  id: string;
  label: string;
  icon: string;
  description: string;
  nodes: OrgNode[];
}

// --- Predefined Sector Structuring Data ---
const SECTOR_CONFIGS: SectorConfig[] = [
  {
    id: "family",
    label: "الشركات العائلية والمجموعات القائمة",
    icon: "Briefcase",
    description: "مخصصة للمؤسسات والشركات العائلية الساعية للتحول من العشوائية الفردية إلى مأسسة الأعمال، الحوكمة، واستمرارية الأجيال.",
    nodes: [
      {
        id: "fam-board",
        name: "مجلس العائلة والشركاء",
        title: "مجلس الإدارة الأعلى وحوكمة العائلة",
        description: "رسم السياسات العامة للعائلة والمنشأة وفصل الملكية عن الإدارة لتفادي النزاعات البينية.",
        parentId: null,
        kpis: [
          "معدل الالتزام بميثاق العائلة والدستور الاستثماري.",
          "نسبة رضا الشركاء العائليين عن التقارير الدورية.",
          "تأسيس مجلس المديرين ولجان الحوكمة خلال الربع الأول."
        ],
        sops: [
          "آلية عقد اجتماعات الجمعية العمومية والتصويت.",
          "دليل حل الخلافات وتوزيع الحصص وصندوق الاستثمار المشترك.",
          "برنامج تأهيل وتوظيف أفراد الجيل الثاني والثالث في المنشأة."
        ]
      },
      {
        id: "fam-ceo",
        name: "الرئيس التنفيذي للمجموعة",
        title: "الرئيس التنفيذي (CEO / Managing Director)",
        description: "قيادة العمليات التنفيذية وتحقيق مستهدفات النمو وحماية الأصول الاستثمارية للمجموعة.",
        parentId: "fam-board",
        kpis: [
          "معدل نمو الأرباح السنوي الصافي (Net Margin).",
          "العائد على الأصول المستثمرة (ROA) بنسبة مستهدفة 12% سنوياً.",
          "الالتزام بالموازنة التقديرية المعتمدة للمجموعة."
        ],
        sops: [
          "دليل الصلاحيات المالية والإدارية المعيارية للرئيس التنفيذي.",
          "آلية رفع التقارير ربع السنوية لمجلس الإدارة.",
          "إجراءات مراجعة خطط التوسع الرأسمالي والاستحواذ."
        ]
      },
      {
        id: "fam-gov",
        name: "إدارة الحوكمة والمخاطر والامتثال",
        title: "مدير الحوكمة والرقابة الداخلية",
        description: "التأكد من التزام الشركة بكافة القوانين واللوائح التنظيمية وتطبيق معايير الشفافية والرقابة الفعالة.",
        parentId: "fam-ceo",
        kpis: [
          "صفر مخالفات تنظيمية أو قانونية من الجهات الرسمية.",
          "سرعة الكشف عن الثغرات التشغيلية أو المالية ومعالجتها.",
          "نسبة تغطية التدقيق الداخلي لعمليات كافة الفروع."
        ],
        sops: [
          "لائحة الرقابة الداخلية وإجراءات الإفصاح والشفافية.",
          "دليل إدارة المخاطر المؤسسية والبيئية والمالية.",
          "لائحة تعارض المصالح والتعاملات مع الأطراف ذات العلاقة."
        ]
      },
      {
        id: "fam-ops",
        name: "إدارة التشغيل وسلاسل الإمداد",
        title: "مدير العمليات والتشغيل (COO)",
        description: "إدارة الأنشطة اليومية، وتحسين جودة المخرجات، وتقليل الهدر في المواد والوقت.",
        parentId: "fam-ceo",
        kpis: [
          "رفع الكفاءة التشغيلية للمصانع/الفروع بنسبة 20%.",
          "نسبة خفض الهدر التشغيلي السنوي (Target 5% - 10%).",
          "معدل دوران المخزون السلعي والمواد الخام."
        ],
        sops: [
          "دليل الممارسات القياسية للإنتاج والتشغيل اليومي.",
          "دليل إدارة المخازن وضبط حركة التوريد والمشتريات.",
          "دليل صيانة الآلات وحماية الأصول المادية والمستودعات."
        ]
      },
      {
        id: "fam-fin",
        name: "الإدارة المالية والاستثمار",
        title: "المدير المالي (CFO)",
        description: "تنظيم الدفاتر، وإدارة السيولة النقدية، وإعداد الخطط والتقارير المالية والضريبية بدقة.",
        parentId: "fam-ceo",
        kpis: [
          "دقة التوقعات التدفق النقدية الأسبوعية بنسبة 95%.",
          "معدل تحصيل الذمم المدينة المستحقة (DSO) بأقل من 45 يوماً.",
          "الالتزام بتقديم القوائم المالية المدققة قبل الموعد بـ 10 أيام."
        ],
        sops: [
          "دليل التحصيل والائتمان وإغلاق الحسابات الشهرية.",
          "لائحة المشتريات والصرف والاعتمادات البنكية والتعميدات.",
          "دليل التخطيط المالي وتوزيع التدفقات والموازنات التقديرية."
        ]
      },
      {
        id: "fam-hr",
        name: "الموارد البشرية والمأسسة",
        title: "مدير رأس المال البشري والتطوير التنظيمي",
        description: "استقطاب الكفاءات، وتطوير مهارات العاملين، ومراقبة الإنتاجية وبناء بيئة عمل محفزة ومستدامة.",
        parentId: "fam-ceo",
        kpis: [
          "معدل دوران الموظفين الإجمالي (هدف أقل من 8% سنوياً).",
          "نسبة تحقيق خطة التدريب والتمكين السنوية للكوادر الوطنية.",
          "متوسط تقييم أداء الموظفين وربطها بالحوافز بنسبة 100%."
        ],
        sops: [
          "لائحة تنظيم العمل الداخلية المعتمدة من وزارة الموارد البشرية.",
          "دليل التوظيف والاستقطاب والمقابلات الفنية للمرشحين.",
          "برنامج تقييم الأداء السنوي (KPIs Performance Review) والمكافآت."
        ]
      }
    ]
  },
  {
    id: "tech",
    label: "الشركات التقنية والناشئة (Tech & Startups)",
    icon: "Cpu",
    description: "مصممة للشركات التقنية والمنصات الرقمية الساعية لحماية كودها المصدري، وتسريع إطلاق MVP، وتنظيم خطوط الإنتاج البرمجي.",
    nodes: [
      {
        id: "tech-board",
        name: "مجلس المديرين والمستثمرين",
        title: "مجلس الإدارة الاستراتيجي",
        description: "إقرار الجولات الاستثمارية وتوسيع الأسواق وحماية حقوق الملكية الفكرية الكودية.",
        parentId: null,
        kpis: [
          "معدل تقييم الشركة الاستثماري (Company Valuation).",
          "تحقيق تطلعات المستثمرين والشركاء التقنيين.",
          "عدد الأسواق الدولية الجديدة التي تم التوسع إليها."
        ],
        sops: [
          "إجراءات إقرار الموازنات وتوسيع رأس المال والاستحواذ.",
          "دليل حماية براءات الاختراع والملكية الفكرية للأكواد البرمجية.",
          "سياسات توزيع الحصص وخيارات الأسهم للموظفين (ESOP)."
        ]
      },
      {
        id: "tech-ceo",
        name: "الرئيس التنفيذي / المؤسس الشريك",
        title: "الرئيس التنفيذي (CEO)",
        description: "قيادة الرؤية التقنية والتجارية السريعة والعمل كحلقة وصل مع المستثمرين وقادة الأقسام.",
        parentId: "tech-board",
        kpis: [
          "نسبة نمو الإيرادات المتكررة شهرياً (MRR Growth) بـ 15% شهرياً.",
          "تكلفة الاستحواذ على العميل (CAC) مقارنة بالقيمة الإجمالية (LTV).",
          "معدل الاحتفاظ بالعملاء النشطين (Retention Rate)."
        ],
        sops: [
          "لائحة إدارة فرق العمل الرشيقة (Agile Scrum Management).",
          "دليل الاستعداد للعروض الاستثمارية (Pitching to Investors).",
          "سياسات بناء الشراكات الاستراتيجية والـ API المفتوحة."
        ]
      },
      {
        id: "tech-cto",
        name: "إدارة التقنية وهندسة البرمجيات",
        title: "المدير التقني التنفيذي (CTO)",
        description: "قيادة فرق التطوير، وهندسة المعمارية السحابية للأنظمة، وضمان جودة واستقرار الأكواد البرمجية وقواعد البيانات.",
        parentId: "tech-ceo",
        kpis: [
          "استقرار الخدمة بنسبة 99.9% (Uptime uptime of Cloud systems).",
          "سرعة معالجة الثغرات البرمجية والخلل الفني (MTTR).",
          "الالتزام بجدول تسليم الميزات البرمجية الجديدة للمنتج (Sprint Velocity)."
        ],
        sops: [
          "دليل جودة ومراجعة الأكواد (Code Review & Clean Code Standards).",
          "دليل النشر التلقائي وحفظ النسخ الاحتياطية (CI/CD Pipelines & Backups).",
          "دليل فحص الثغرات الأمنية والامتثال لحماية البيانات واختبارات الاختراق."
        ]
      },
      {
        id: "tech-product",
        name: "إدارة نمو وتطوير المنتج",
        title: "مدير المنتج والتسويق الرقمي (CPO / CMO)",
        description: "مراقبة وتحليل سلوك المستخدمين، وتصميم الواجهات UI/UX، وتنفيذ حملات النمو السريع والاستحواذ الرقمي.",
        parentId: "tech-ceo",
        kpis: [
          "معدل تحويل الزوار إلى مستخدمين نشطين (Conversion Rate).",
          "نسبة الرضا عن واجهات تجربة المستخدم (UI/UX Usability Score).",
          "الوصول للجمهور المستهدف وتخفيض تكلفة الإعلان الرقمي."
        ],
        sops: [
          "دليل اختبار واجهات المستخدم وتحليل خرائط الحرارة والـ AB testing.",
          "دليل تهيئة منصات محركات البحث والتسويق بالمحتوى والنمو (SEO & Growth Hacking).",
          "إجراءات إطلاق الميزات الجديدة وتحديث التطبيقات بمتجر Apple & Google."
        ]
      },
      {
        id: "tech-success",
        name: "دعم العملاء ونجاح المستخدم",
        title: "مدير تجربة ونجاح العملاء (CSM)",
        description: "مساعدة المستخدمين على حل مشاكلهم الفنية، وجمع آرائهم وملاحظاتهم ونقلها لفريق التطوير.",
        parentId: "tech-ceo",
        kpis: [
          "متوسط زمن الاستجابة لأول تذكرة دعم فني (Target < 10 دقائق).",
          "معدل تقييم رضا العميل عن الخدمة (CSAT) بنسبة تفوق 92%.",
          "نسبة تقليل إلغاء الاشتراكات (Churn Rate Reduction)."
        ],
        sops: [
          "دليل الردود الجاهزة وحل المشكلات الفنية والتقنية للمستخدمين.",
          "سياسة تصعيد التذاكر الحرجة والمشاكل الأمنية أو توقف السيرفرات.",
          "إجراءات توثيق مقترحات وطلبات التطوير من المستخدمين وإرسالها للمنتج."
        ]
      }
    ]
  },
  {
    id: "service",
    label: "الشركات الخدمية والتشغيلية",
    icon: "Activity",
    description: "مثالي لشركات المقاولات والاستشارات والتفتيش والخدمات اللوجستية التي تعاني من بطء تسليم المشاريع وتداخل المهام.",
    nodes: [
      {
        id: "serv-gm",
        name: "المدير العام والشركاء",
        title: "المدير العام (General Manager)",
        description: "توجيه بوصلة الشركة ووضع الاستراتيجية وضمان الحصة السوقية واستدامة العقود الاستشارية والتشغيلية.",
        parentId: null,
        kpis: [
          "النمو السنوي في حجم المبيعات والعقود المستقطبة.",
          "الهامش الربحي الصافي للمشاريع المنفذة بشكل إجمالي.",
          "مستوى سمعة وتقييم الشركة في القطاع الحكومي والخاص."
        ],
        sops: [
          "سياسات دراسة واعتماد الصفقات والعقود الاستراتيجية الكبرى.",
          "لائحة حماية الأسرار والعلامات التجارية وشبكة العلاقات الاستشارية.",
          "إجراءات تقييم الأثر المالي قبل الدخول في مشاريع أو استثمارات جديدة."
        ]
      },
      {
        id: "serv-pmo",
        name: "مكتب إدارة المشاريع (PMO)",
        title: "مدير المشاريع والعمليات الاستشارية",
        description: "التخطيط لخطوات التنفيذ، ومتابعة الجداول الزمنية لتسليم المشاريع، وضمان الجودة الفنية وخفض التكاليف التشغيلية.",
        parentId: "serv-gm",
        kpis: [
          "نسبة الالتزام بالجداول الزمنية لتسليم المشاريع (Target > 90%).",
          "معدل الإنتاجية اليومي لفرق الاستشارة والمتابعة والميدان.",
          "نسبة التزام المشاريع بالميزانية المخصصة لها لمنع تآكل الربح."
        ],
        sops: [
          "دليل تسيير وإدارة المشاريع وبناء خطط العمل والمراحل (Milestones).",
          "آلية معالجة انحرافات الجدول الزمني للمشروعات وطلب التمديد.",
          "دليل صياغة التقارير الفنية الدورية والمخرجات الاستشارية المعتمدة."
        ]
      },
      {
        id: "serv-sales",
        name: "إدارة المبيعات وتطوير الأعمال",
        title: "مدير المبيعات وتطوير الأعمال",
        description: "بناء قنوات بيع جديدة، وإعداد العروض الفنية والمالية للمناقصات والمشاريع، ومتابعة التواصل مع كبار العملاء.",
        parentId: "serv-gm",
        kpis: [
          "قيمة المبيعات المحققة مقارنة بالمستهدف الشهري (Sales Quota).",
          "معدل تحويل الفرص البيعية لتعاقدات حقيقية مؤكدة.",
          "نسبة رضا كبار العملاء واستبقاء عقودهم لسنوات قادمة."
        ],
        sops: [
          "دليل كتابة وصياغة العروض الفنية والمالية والتسعير المالي الذكي.",
          "آلية متابعة الفرص والتفاوض وإجراء المقابلات مع متخذي القرار.",
          "سياسات تسجيل وإدارة بيانات العملاء في نظام الـ CRM لمتابعة المبيعات."
        ]
      },
      {
        id: "serv-quality",
        name: "إدارة الجودة وضمان الامتثال",
        title: "مشرف الجودة والرقابة الفنية",
        description: "مراجعة المخرجات التقنية والإدارية للتأكد من مطابقتها للمعايير والاتفاقيات وضمان خلو التقارير من الأخطاء.",
        parentId: "serv-gm",
        kpis: [
          "معدل قبول مخرجات وتقارير الشركة من العملاء والجهات الرقابية من المرة الأولى.",
          "نسبة معالجة شكاوى العملاء بخصوص جودة الخدمات والمتابعة.",
          "عدد الجولات الرقابية والزيارات الميدانية للتفتيش والتأكد من الجودة."
        ],
        sops: [
          "معايير التدقيق الفني والجودة لكافة التقارير والمخرجات الصادرة.",
          "آلية التعامل مع المخرجات المعيبة أو غير المطابقة وإعادة تهيئتها.",
          "دليل تتبع شكاوى واعتراضات العملاء والتحسين المستمر."
        ]
      }
    ]
  },
  {
    id: "retail",
    label: "قطاع التجارة والتجزئة (Retail & Trade)",
    icon: "Layers",
    description: "خاص بشركات البيع بالتجزئة والاستيراد، لمعالجة هدر المستودعات، وتنظيم فروع البيع، وربط المبيعات بالمخزون سحابياً.",
    nodes: [
      {
        id: "ret-gm",
        name: "المدير العام والشركاء",
        title: "المدير العام لشركة التجارة",
        description: "قيادة الخطط الاستيرادية والتوسعية، وتحديد خطوط المنتجات المستهدفة، وعلاقات كبار الموردين.",
        parentId: null,
        kpis: [
          "العائد الإجمالي على رأس المال المستثمر في البضائع (GMROI).",
          "معدل زيادة الحصة السوقية وافتتاح فروع ومعارض بيع جديدة.",
          "نسبة صافي الربح السنوي الإجمالي للمؤسسة التجارية."
        ],
        sops: [
          "سياسة اختيار واعتماد العلامات الوكالات والمنتجات المستوردة.",
          "دليل التسعير الذكي وحساب هوامش الربح وإقرار العروض والتصفيات.",
          "إجراءات مراجعة خطط الشراء والتمويل والاستيراد السنوية."
        ]
      },
      {
        id: "ret-purchasing",
        name: "إدارة المشتريات والاستيراد",
        title: "مدير المشتريات وسلاسل الإمداد",
        description: "التواصل مع الموردين، التفاوض للحصول على أفضل الأسعار والجودة، وإدارة عمليات الشحن والتخليص الجمركي.",
        parentId: "ret-gm",
        kpis: [
          "نسبة خفض تكلفة الشراء المباشر للبضائع (Target 5%).",
          "دقة مواعيد وصول الشحنات للمستودعات دون غرامات تأخير.",
          "معدل تقييم الموردين والتزامهم بمواصفات الشحن والتغليف الفني."
        ],
        sops: [
          "دليل التفاوض مع الموردين وإرسال طلبات التسعير والتعميد المالي الرسمية.",
          "دليل الاستيراد والشحن الدولي وإجراءات التخليص الجمركي والموانئ.",
          "آلية المطابقة والفحص الفني للبضائع فور وصولها للتأكد من سلامتها من العيوب."
        ]
      },
      {
        id: "ret-logistics",
        name: "إدارة المستودعات والخدمات اللوجستية",
        title: "مدير المستودعات والخدمات اللوجستية",
        description: "تنظيم تخزين البضائع بكفاءة عالية، وجرد المخزون دورياً، وتأمين التوزيع الفوري والسريع للفروع والعملاء.",
        parentId: "ret-gm",
        kpis: [
          "دقة مخزون المستودعات مطابقة للنظام السحابي (Target 99%).",
          "معدل خفض الهدر والتلف أو الضياع في البضائع المخزنة.",
          "سرعة تحضير وشحن طلبات الفروع والعملاء بالمواعيد المحددة."
        ],
        sops: [
          "دليل استلام وتكويد البضائع وادخالها للنظام السحابي لإدارة المخازن.",
          "سياسة الصرف والتحويل الداخلي للبضائع بين الفروع والمستودعات.",
          "دليل الأمن والسلامة بالمستودعات وإجراءات الجرد الدوري والمفاجئ."
        ]
      },
      {
        id: "ret-branches",
        name: "إدارة الفروع ونقاط البيع",
        title: "مدير الفروع والتجزئة (Retail Manager)",
        description: "الإشراف المباشر على معارض البيع، ومتابعة المبيعات اليومية، وتطوير أداء موظفي المبيعات وخدمة العملاء.",
        parentId: "ret-gm",
        kpis: [
          "تحقيق المستهدف البيعي لكل فرع بشكل شهري (Target 100%).",
          "متوسط قيمة سلة المشتريات للعميل الواحد في المعرض.",
          "معدل تقييم جودة الخدمة ورضا الزوار داخل الفروع الميدانية."
        ],
        sops: [
          "دليل العمليات اليومي للفروع (الفتح، الإغلاق، تسوية المبيعات اليومية ونقاط البيع).",
          "سياسات استقبال العملاء والمبيعات المتقاطعة (Cross-selling / Up-selling).",
          "إجراءات التعامل مع المرتجعات والاستبدال وحل مشاكل الدفع والشبكة البنكية."
        ]
      }
    ]
  }
];

export default function CompanyStructureBuilder() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>("family");
  const [nodes, setNodes] = useState<OrgNode[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  
  // Custom Node form states
  const [isAddingNode, setIsAddingNode] = useState(false);
  const [newNodeName, setNewNodeName] = useState("");
  const [newNodeTitle, setNewNodeTitle] = useState("");
  const [newNodeDesc, setNewNodeDesc] = useState("");
  const [newNodeParentId, setNewNodeParentId] = useState("");
  const [newNodeKpi, setNewNodeKpi] = useState("");
  const [newNodeSop, setNewNodeSop] = useState("");
  const [newNodeKpis, setNewNodeKpis] = useState<string[]>([]);
  const [newNodeSops, setNewNodeSops] = useState<string[]>([]);

  // Restructuring ROI Calculator States
  const [employeeCount, setEmployeeCount] = useState<number>(35);
  const [averageSalary, setAverageSalary] = useState<number>(8500);
  const [hoursWastedPerWeek, setHoursWastedPerWeek] = useState<number>(6); // hours wasted per employee per week due to role overlap / lack of SOPs

  // Active Tab: Builder vs Calculator vs SOP Guide
  const [activeTab, setActiveTab] = useState<"builder" | "calculator" | "sops">("builder");

  // Load Sector Data
  useEffect(() => {
    const config = SECTOR_CONFIGS.find(s => s.id === selectedSectorId);
    if (config) {
      setNodes(config.nodes);
      // Select first node by default
      if (config.nodes.length > 0) {
        setSelectedNodeId(config.nodes[0].id);
      } else {
        setSelectedNodeId(null);
      }
    }
  }, [selectedSectorId]);

  const activeSector = SECTOR_CONFIGS.find(s => s.id === selectedSectorId) || SECTOR_CONFIGS[0];
  const activeNode = nodes.find(n => n.id === selectedNodeId);

  // --- Org Chart Node Operations ---
  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNodeName.trim() || !newNodeTitle.trim()) return;

    const customNodeId = `node-custom-${Date.now()}`;
    const newNode: OrgNode = {
      id: customNodeId,
      name: newNodeName,
      title: newNodeTitle,
      description: newNodeDesc || "إدارة متخصصة مضافة لخدمة أهداف المنشأة وهيكلتها الرشيقة.",
      parentId: newNodeParentId || null,
      kpis: newNodeKpis.length > 0 ? newNodeKpis : ["تحقيق مستهدفات الإدارة بنسبة 100%.", "تطوير الدليل الإجرائي المخصص للإدارة خلال الربع الأول."],
      sops: newNodeSops.length > 0 ? newNodeSops : ["دليل العمليات والمهام الإدارية التفصيلية الخاص بـ " + newNodeName],
      custom: true
    };

    setNodes(prev => [...prev, newNode]);
    setSelectedNodeId(customNodeId);
    
    // Reset Form
    setNewNodeName("");
    setNewNodeTitle("");
    setNewNodeDesc("");
    setNewNodeParentId("");
    setNewNodeKpis([]);
    setNewNodeSops([]);
    setIsAddingNode(false);
  };

  const handleRemoveNode = (id: string) => {
    // If the node being removed has children, we update their parentId to the node's parentId
    const targetNode = nodes.find(n => n.id === id);
    if (!targetNode) return;

    setNodes(prev => {
      return prev
        .filter(n => n.id !== id)
        .map(n => n.parentId === id ? { ...n, parentId: targetNode.parentId } : n);
    });

    if (selectedNodeId === id) {
      const remaining = nodes.filter(n => n.id !== id);
      if (remaining.length > 0) {
        setSelectedNodeId(remaining[0].id);
      } else {
        setSelectedNodeId(null);
      }
    }
  };

  const handleAddKpiToNewNode = () => {
    if (newNodeKpi.trim()) {
      setNewNodeKpis(prev => [...prev, newNodeKpi.trim()]);
      setNewNodeKpi("");
    }
  };

  const handleAddSopToNewNode = () => {
    if (newNodeSop.trim()) {
      setNewNodeSops(prev => [...prev, newNodeSop.trim()]);
      setNewNodeSop("");
    }
  };

  const handleResetToPredefined = () => {
    if (window.confirm("هل أنت متأكد من رغبتك في إعادة ضبط الهيكل إلى النموذج القياسي للقطاع؟ سيتم حذف أي إدارات مخصصة قمت بإضافتها.")) {
      const config = SECTOR_CONFIGS.find(s => s.id === selectedSectorId);
      if (config) {
        setNodes(config.nodes);
        if (config.nodes.length > 0) {
          setSelectedNodeId(config.nodes[0].id);
        }
      }
    }
  };

  // --- Restructuring ROI Calculator Logic ---
  // Monthly salary cost
  const totalMonthlyPayroll = employeeCount * averageSalary;
  // Hourly salary (Assuming 160 hours per month)
  const averageHourlyRate = averageSalary / 160;
  // Yearly wasted hours
  const totalWastedHoursYearly = employeeCount * hoursWastedPerWeek * 52;
  // Yearly financial leak due to overlaps/lack of SOPs
  const annualFinancialLeak = totalWastedHoursYearly * averageHourlyRate;
  // Restructuring savings (We guarantee an average of 30% reduction in this leakage via structuring)
  const estimatedSavingsYearly = annualFinancialLeak * 0.32;
  // Efficiency recovery score
  const efficiencyMultiplier = Math.min(98, 45 + (hoursWastedPerWeek * 7.5));

  const handlePreFillInquiry = () => {
    // Scroll to contact form and prefill
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const formText = `مرحباً فريق بيزنس ديفلوبرز، قمت باستخدام "مُهندس الهياكل والتنظيم" واخترت قطاع (${activeSector.label}).
لقد قمت بمحاكاة الكفاءة المالية لشركتي التي تضم (${employeeCount}) موظفاً، ووجدت أن حجم الهدر المالي السنوي التقريبي لدينا يصل إلى (${annualFinancialLeak.toLocaleString("ar-SA", { maximumFractionDigits: 0 })} ريال سعودي) بسبب التداخلات التشغيلية وغياب أدلة العمل المكتوبة SOPs.
أرغب في الحصول على استشارة تفصيلية مجانية لمراجعة الهيكل التنظيمي المقترح لشركتنا وتأصيل الأدلة الإجرائية لنوفر ما يقارب (${estimatedSavingsYearly.toLocaleString("ar-SA", { maximumFractionDigits: 0 })} ريال سعودي) سنوياً وتحسين الأداء.`;
      
      const inquirySelect = document.getElementById("service-select") as HTMLSelectElement;
      if (inquirySelect) {
        inquirySelect.value = "mgmt";
      }
      
      const notesArea = document.getElementById("notes-textarea") as HTMLTextAreaElement;
      if (notesArea) {
        notesArea.value = formText;
        // Trigger synthetic inputs change events if any
        notesArea.dispatchEvent(new Event("input", { bubbles: true }));
      }

      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Build a tree hierarchy recursively helper
  const renderTreeNodes = (parentId: string | null) => {
    const childNodes = nodes.filter(n => n.parentId === parentId);
    if (childNodes.length === 0) return null;

    return (
      <div className="flex flex-wrap justify-center gap-4 pt-4 relative">
        {childNodes.map((node) => {
          const isSelected = selectedNodeId === node.id;
          const hasChildren = nodes.some(n => n.parentId === node.id);
          
          return (
            <div key={node.id} className="flex flex-col items-center min-w-[150px] relative">
              {/* Connector lines (rendered via Tailwind border utilities) */}
              {parentId !== null && (
                <div className="absolute -top-4 w-px h-4 bg-slate-300" />
              )}
              
              <motion.div
                layout
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedNodeId(node.id)}
                className={`px-4 py-3 rounded-xl border text-center cursor-pointer transition-all w-48 shadow-sm flex flex-col justify-between h-24 ${
                  isSelected 
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" 
                    : node.custom 
                      ? "bg-purple-50/70 border-purple-200 text-purple-950 hover:bg-purple-100/50"
                      : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-350"
                }`}
              >
                <div>
                  <span className={`text-[9px] font-bold block truncate uppercase ${isSelected ? "text-blue-100" : node.custom ? "text-purple-600" : "text-blue-600"}`}>
                    {node.title.split(" (")[0]}
                  </span>
                  <h5 className="text-xs font-black truncate mt-1 leading-snug">{node.name}</h5>
                </div>
                
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100/10">
                  <span className={`text-[8px] ${isSelected ? "text-blue-200" : "text-slate-400"}`}>
                    {node.custom ? "إدارة مخصصة" : "إدارة قياسية"}
                  </span>
                  {node.custom && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNode(node.id);
                      }}
                      className={`p-0.5 rounded-md transition-colors ${
                        isSelected ? "text-white hover:bg-blue-700" : "text-rose-500 hover:bg-rose-50"
                      }`}
                      title="حذف هذه الإدارة"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>

              {/* Recursion for sub-nodes */}
              {hasChildren && (
                <div className="relative pt-4 w-full flex flex-col items-center">
                  <div className="w-px h-4 bg-slate-300" />
                  <div className="absolute top-4 left-1/4 right-1/4 h-px bg-slate-300" />
                  {renderTreeNodes(node.id)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="structure-builder" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      
      {/* Background Decorative Art */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-y-12" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none translate-y-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-right">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">مهندس الهياكل والتنظيم التفاعلي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            مُهندس الهياكل التنظيمية <span className="text-blue-600 font-extrabold">والأدلة الإجرائية</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            اختبر فاعلية هيكلتك الإدارية مجاناً! صمم هيكل شركتك التفاعلي، واكشف حجم الهدر السنوي في العمليات اليدوية وتكامل الأدلة، وحمّل مسودتك الأولية فوراً.
          </p>
        </div>

        {/* 1. Sector Selection Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm mb-8">
          <span className="block text-xs font-bold text-slate-400 mb-3 pr-1">1. اختر قطاع أو طبيعة نشاط شركتك لتوليد الهيكل القياسي المعتمد:</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SECTOR_CONFIGS.map((sector) => {
              const isSelected = selectedSectorId === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setSelectedSectorId(sector.id)}
                  className={`p-3.5 rounded-xl border text-right transition-all cursor-pointer flex flex-col justify-between h-24 ${
                    isSelected 
                      ? "border-blue-600 bg-blue-50 text-blue-950 shadow-sm" 
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-350"
                  }`}
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <span className="text-2xl">
                      {sector.id === "family" ? "🏢" : sector.id === "tech" ? "💻" : sector.id === "service" ? "⚙️" : "🏪"}
                    </span>
                    <h4 className="text-xs sm:text-sm font-extrabold leading-snug">{sector.label.split(" (")[0]}</h4>
                  </div>
                  <p className="text-[10px] text-slate-400 font-light truncate w-full">{sector.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Tool Tabs (Builder vs Calculator vs SOPs) */}
        <div className="flex border-b border-slate-200 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab("builder")}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "builder" 
                ? "border-blue-600 text-blue-600 font-extrabold" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الهيكل التنظيمي التفاعلي ({nodes.length} إدارات)</span>
          </button>
          <button
            onClick={() => setActiveTab("calculator")}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "calculator" 
                ? "border-blue-600 text-blue-600 font-extrabold" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>حاسبة الهدر والوفر المالي التشغيلي 💸</span>
          </button>
          <button
            onClick={() => setActiveTab("sops")}
            className={`py-3 px-6 text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              activeTab === "sops" 
                ? "border-blue-600 text-blue-600 font-extrabold" 
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>أدلة السياسات التشغيلية والـ KPIs</span>
          </button>
        </div>

        {/* 3. Main Dynamic Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Work Area (Left 8 columns on large screens) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* TAB 1: INTERACTIVE ORG CHART BUILDER */}
            {activeTab === "builder" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm min-h-[500px] flex flex-col justify-between">
                
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">مخطط الهيكل التنظيمي المقترح لشركتك</h3>
                    <p className="text-xs text-slate-500 font-light mt-1">انقر على أي إدارة في الرسم التخطيطي لعرض بطاقة الوصف والـ KPIs المخصصة لها بالعمود الأيسر.</p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setIsAddingNode(true)}
                      className="py-2 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>إضافة إدارة مخصصة</span>
                    </button>
                    <button
                      onClick={handleResetToPredefined}
                      className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-slate-200"
                      title="إعادة تعيين الهيكل الأصلي"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>إعادة ضبط النموذج</span>
                    </button>
                  </div>
                </div>

                {/* Adding Custom Node Form (Modal Inline overlay) */}
                <AnimatePresence>
                  {isAddingNode && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="p-5 border border-purple-200 bg-purple-50/40 rounded-2xl mb-6 space-y-4 text-right"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs sm:text-sm font-extrabold text-purple-900 flex items-center gap-1.5">
                          <Plus className="w-4 h-4 text-purple-600" />
                          <span>إضافة قسم أو إدارة جديدة مخصصة للهيكل</span>
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsAddingNode(false)}
                          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          إلغاء ×
                        </button>
                      </div>

                      <form onSubmit={handleAddNode} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500">اسم الإدارة / القسم: *</label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: إدارة التحول الرقمي، إدارة الشؤون القانونية"
                            value={newNodeName}
                            onChange={(e) => setNewNodeName(e.target.value)}
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-right"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500">المسمى الوظيفي للمشرف: *</label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: مدير تقنية المعلومات، مستشار التدقيق الفني"
                            value={newNodeTitle}
                            onChange={(e) => setNewNodeTitle(e.target.value)}
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-right"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[11px] font-bold text-slate-500">الوصف العام للمهام والصلاحيات:</label>
                          <textarea
                            placeholder="صياغة موجزة لدور هذه الإدارة وصلاحياتها..."
                            rows={2}
                            value={newNodeDesc}
                            onChange={(e) => setNewNodeDesc(e.target.value)}
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-right resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-500">الإدارة الأعلى (التبعية الإدارية):</label>
                          <select
                            value={newNodeParentId}
                            onChange={(e) => setNewNodeParentId(e.target.value)}
                            className="w-full text-xs p-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-right"
                          >
                            <option value="">لا يوجد (مجلس الإدارة الأعلى)</option>
                            {nodes.map(n => (
                              <option key={n.id} value={n.id}>{n.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[11px] font-bold text-slate-500 block">مؤشرات الأداء المستهدفة (KPIs):</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="أدخل مؤشر أداء واضغط أضف..."
                              value={newNodeKpi}
                              onChange={(e) => setNewNodeKpi(e.target.value)}
                              className="flex-1 text-xs p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-right"
                            />
                            <button
                              type="button"
                              onClick={handleAddKpiToNewNode}
                              className="px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg font-bold"
                            >
                              أضف
                            </button>
                          </div>
                          {newNodeKpis.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {newNodeKpis.map((kpi, idx) => (
                                <span key={idx} className="bg-purple-100 text-purple-900 text-[10px] py-1 px-2.5 rounded-full flex items-center gap-1.5">
                                  <span>{kpi}</span>
                                  <button type="button" onClick={() => setNewNodeKpis(prev => prev.filter((_, i) => i !== idx))} className="text-purple-600 hover:text-purple-900 font-bold">×</button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-[11px] font-bold text-slate-500 block">أدلة الإجراءات والسياسات (SOPs):</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="أدخل اسم الإجراء الإداري واضغط أضف..."
                              value={newNodeSop}
                              onChange={(e) => setNewNodeSop(e.target.value)}
                              className="flex-1 text-xs p-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-blue-500 text-right"
                            />
                            <button
                              type="button"
                              onClick={handleAddSopToNewNode}
                              className="px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-lg font-bold"
                            >
                              أضف
                            </button>
                          </div>
                          {newNodeSops.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {newNodeSops.map((sop, idx) => (
                                <span key={idx} className="bg-indigo-100 text-indigo-900 text-[10px] py-1 px-2.5 rounded-full flex items-center gap-1.5">
                                  <span>{sop}</span>
                                  <button type="button" onClick={() => setNewNodeSops(prev => prev.filter((_, i) => i !== idx))} className="text-indigo-600 hover:text-indigo-900 font-bold">×</button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="sm:col-span-2 pt-3 flex justify-end gap-2 border-t border-slate-100">
                          <button
                            type="submit"
                            className="py-2 px-5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-sm"
                          >
                            حفظ الإدارة الجديدة للمخطط
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddingNode(false)}
                            className="py-2 px-4 bg-slate-200 text-slate-700 hover:bg-slate-350 rounded-lg text-xs font-bold"
                          >
                            إلغاء
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hierarchical Visual Render Wrapper */}
                <div className="overflow-x-auto py-12 px-4 bg-slate-50/60 border border-slate-100 rounded-2xl flex items-center justify-center min-h-[350px]">
                  <div className="flex flex-col items-center">
                    {/* Render from Top Level (Where parentId is null) */}
                    {renderTreeNodes(null)}
                  </div>
                </div>

                <div className="text-center pt-6 text-[11px] text-slate-400 font-mono tracking-wider border-t border-slate-100 mt-6 uppercase">
                  BUSINESS_DEVELOPERS // ORGANIZATIONAL_ARCHITECTURE_MODEL_v2.5
                </div>

              </div>
            )}

            {/* TAB 2: ROI & RESTRENGTHENING LEAK CALCULATOR */}
            {activeTab === "calculator" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
                
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">حاسبة العائد المالي من إعادة الهيكلة والتنظيم</h3>
                  <p className="text-xs text-slate-500 font-light mt-1">تحديد الهدر التشغيلي السنوي المترتب عن عشوائية الصلاحيات وغياب أدلة السياسات SOPs.</p>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Left Column Sliders */}
                  <div className="space-y-6">
                    
                    {/* Slider 1: Employee Count */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">عدد موظفي المنشأة الإجمالي:</span>
                        <span className="text-sm font-black text-blue-600 font-mono">{employeeCount} موظفاً</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="250"
                        step="5"
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>5 موظفين</span>
                        <span>250 موظفاً</span>
                      </div>
                    </div>

                    {/* Slider 2: Average Salary */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">متوسط الرواتب الشهرية للموظف:</span>
                        <span className="text-sm font-black text-blue-600 font-mono">{averageSalary.toLocaleString("ar-SA")} ر.س</span>
                      </div>
                      <input
                        type="range"
                        min="4000"
                        max="35000"
                        step="500"
                        value={averageSalary}
                        onChange={(e) => setAverageSalary(Number(e.target.value))}
                        className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>4,000 ر.س</span>
                        <span>35,000 ر.س</span>
                      </div>
                    </div>

                    {/* Slider 3: Hours Wasted */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">الساعات المهدرة أسبوعياً بسبب عشوائية الصلاحيات / الموظف:</span>
                        <span className="text-sm font-black text-rose-600 font-mono">{hoursWastedPerWeek} ساعات أسبوعياً</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={hoursWastedPerWeek}
                        onChange={(e) => setHoursWastedPerWeek(Number(e.target.value))}
                        className="w-full accent-rose-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>ساعة واحدة</span>
                        <span>20 ساعة</span>
                      </div>
                      <div className="p-3 bg-amber-50 border border-amber-100 text-[10px] rounded-xl text-amber-800 leading-relaxed font-light">
                        💡 تشتمل الساعات المهدورة على: تكرار العمل، التأخر في دورات الموافقات، البحث عن الملفات غير الموثقة، حل تداخل الصلاحيات الشفهية، وغياب أدلة SOPs واضحة لتسليم وتسلم المهام اليومية.
                      </div>
                    </div>

                  </div>

                  {/* Right Column Visual ROI Output Card */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl space-y-6 relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                    
                    <div>
                      <span className="text-[10px] text-blue-400 font-mono tracking-wider font-bold block">OPERATIONAL LOSS AUDIT</span>
                      <h4 className="text-base font-extrabold text-white mt-1">التقرير التحليلي التقريبي للهدر المالي والتشغيلي</h4>
                    </div>

                    {/* Metric 1 */}
                    <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-light">إجمالي الساعات المهدرة سنوياً:</span>
                        <span className="text-base font-black text-white font-mono mt-1 block">
                          {totalWastedHoursYearly.toLocaleString("ar-SA")} <span className="text-xs font-normal text-slate-400">ساعة</span>
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-light">معدل تكلفة الساعة للموظف:</span>
                        <span className="text-base font-black text-blue-400 font-mono mt-1 block">
                          {averageHourlyRate.toLocaleString("ar-SA", { maximumFractionDigits: 1 })} <span className="text-xs font-normal text-slate-400">ر.س/ساعة</span>
                        </span>
                      </div>
                    </div>

                    {/* Metric 2: Huge red alert */}
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                      <div className="flex items-center space-x-2 space-x-reverse text-rose-400">
                        <span className="text-lg">🚨</span>
                        <span className="text-xs font-extrabold">إجمالي الهدر المالي السنوي التراكمي (التسرب المالي):</span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-rose-500 font-mono mt-2 block text-center">
                        {annualFinancialLeak.toLocaleString("ar-SA", { maximumFractionDigits: 0 })} <span className="text-sm font-bold">ريال سعودي</span>
                      </span>
                    </div>

                    {/* Metric 3: Profit back via Restructuring */}
                    <div className="p-4 bg-emerald-500/15 border border-emerald-500/20 rounded-xl">
                      <div className="flex items-center space-x-2 space-x-reverse text-emerald-400">
                        <Check className="w-4.5 h-4.5 text-emerald-400" />
                        <span className="text-xs font-extrabold">الوفورات المالية السنوية المضمونة بعد الهيكلة (32% كحد أدنى):</span>
                      </div>
                      <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-2 block text-center">
                        {estimatedSavingsYearly.toLocaleString("ar-SA", { maximumFractionDigits: 0 })} <span className="text-sm font-bold">ريال سعودي / سنوياً</span>
                      </span>
                    </div>

                    {/* Progress score */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-350">مؤشر تحسن الكفاءة والإنتاجية المتوقع:</span>
                        <span className="text-emerald-400 font-black font-mono">+{efficiencyMultiplier}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${efficiencyMultiplier}%` }} />
                      </div>
                    </div>

                  </div>

                </div>

                {/* Call to action inside calculator */}
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4 text-right">
                  <div className="space-y-1">
                    <h4 className="text-sm font-extrabold text-slate-800">أوقف هذا التسرب المالي فوراً وابدأ في حوكمة أعمالك</h4>
                    <p className="text-xs text-slate-500 font-light">يمكننا تحويل هذه الأرقام والوفورات النظرية إلى واقع حقيقي ملموس عبر صياغة وبناء أدلتك الإجرائية.</p>
                  </div>
                  <button
                    onClick={handlePreFillInquiry}
                    className="py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    أرغب في تفعيل الهيكلة وطلب الاستشارة 🚀
                  </button>
                </div>

              </div>
            )}

            {/* TAB 3: CUSTOMIZABLE SOP GUIDE GENERATOR */}
            {activeTab === "sops" && (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
                
                <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">مسودة دليل الإجراءات والـ KPIs القياسية</h3>
                    <p className="text-xs text-slate-500 font-light mt-1">توليد المسودة التشغيلية المعتمدة لقطاع {activeSector.label} لإعداد ملفات الـ SOPs وتوزيع المهام.</p>
                  </div>
                  
                  {/* Export and Print Options */}
                  <button
                    onClick={handlePrint}
                    className="py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-slate-200 shrink-0"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>طباعة / حفظ كملف PDF</span>
                  </button>
                </div>

                {/* SOP Outline List per node */}
                <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2">
                  {nodes.map((node) => (
                    <div key={node.id} className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl text-right space-y-4">
                      
                      {/* Node Header */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-200/60">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                          <h4 className="text-sm font-extrabold text-slate-900">{node.name}</h4>
                          <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">{node.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-light">{node.custom ? "إدارة مخصصة مضافة" : "نموذج تشغيلي قياسي"}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 font-light leading-relaxed">{node.description}</p>

                      {/* KPIs */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-800 block">🎯 مؤشرات قياس الأداء المقترحة (KPIs):</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {node.kpis.map((kpi, idx) => (
                            <div key={idx} className="flex items-start space-x-2 space-x-reverse p-2.5 rounded-xl bg-white border border-slate-100">
                              <span className="text-blue-500 font-bold text-xs shrink-0 mt-0.5">✓</span>
                              <span className="text-xs text-slate-600 font-light leading-relaxed">{kpi}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SOP procedures */}
                      <div className="space-y-2 pt-2">
                        <span className="text-[11px] font-bold text-slate-800 block">📑 أدلة الإجراءات والسياسات الموصى بصياغتها (SOPs):</span>
                        <div className="space-y-2">
                          {node.sops.map((sop, idx) => (
                            <div key={idx} className="flex items-start space-x-2.5 space-x-reverse p-2.5 rounded-xl bg-blue-50/30 border border-blue-100/60">
                              <span className="w-5 h-5 rounded-lg bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-xs text-slate-700 font-medium leading-relaxed">{sop}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Print Guide Info Notice */}
                <div className="p-4 bg-sky-50 border border-sky-100 text-[11px] rounded-xl text-sky-800 leading-relaxed font-light">
                  ⚠️ <strong>ملاحظة فنية هامة:</strong> لحفظ الهيكل التنظيمي والسياسات السابقة، انقر على زر "طباعة / حفظ كملف PDF" أعلاه، ثم اختر "حفظ بتنسيق PDF" كوجهة للطابعة في نافذة المتصفح المفتوحة لديك لتنزيل المسودة على جهازك.
                </div>

              </div>
            )}

          </div>

          {/* Details Sidebar Panel (Right 4 columns) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. Sector Briefing Card */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl space-y-4 text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center space-x-2.5 space-x-reverse">
                <span className="text-3xl">🎯</span>
                <div>
                  <span className="text-[9px] text-blue-400 font-mono block uppercase">SELECTED OUTLINE</span>
                  <h4 className="text-base font-black text-white">{activeSector.label}</h4>
                </div>
              </div>

              <p className="text-xs text-slate-350 leading-relaxed font-light">
                {activeSector.description}
              </p>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="font-light">عدد الإدارات الموثقة:</span>
                  <span className="font-bold text-white font-mono">{nodes.length} إدارات</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-light">مؤشرات الأداء (KPIs):</span>
                  <span className="font-bold text-white font-mono">{nodes.reduce((acc, n) => acc + n.kpis.length, 0)} مؤشر</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-light">الأدلة الإجرائية المقترحة:</span>
                  <span className="font-bold text-white font-mono">{nodes.reduce((acc, n) => acc + n.sops.length, 0)} دليل SOP</span>
                </div>
              </div>
            </div>

            {/* 2. Interactive Selected Node Details Card */}
            {activeNode ? (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-5 text-right">
                
                <div className="pb-3 border-b border-slate-100 flex items-start justify-between gap-2 flex-row-reverse">
                  <span className="text-[10px] font-mono text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg shrink-0">
                    بطاقة الإدارة المختارة
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">{activeNode.name}</h4>
                    <span className="text-xs text-slate-500 block font-light mt-1">{activeNode.title}</span>
                  </div>
                </div>

                {/* Node details */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">الوصف الوظيفي والمسؤوليات:</span>
                    <p className="text-xs text-slate-600 leading-relaxed font-light">{activeNode.description}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">أهم مؤشرات الأداء (KPIs):</span>
                    <ul className="space-y-1.5">
                      {activeNode.kpis.map((kpi, idx) => (
                        <li key={idx} className="flex items-start space-x-2 space-x-reverse text-xs text-slate-600">
                          <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                          <span className="font-light leading-relaxed">{kpi}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-1 border-t border-slate-150">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">أدلة الإجراءات والسياسات (SOPs):</span>
                    <ul className="space-y-1.5">
                      {activeNode.sops.map((sop, idx) => (
                        <li key={idx} className="flex items-start space-x-2 space-x-reverse text-xs text-slate-700">
                          <span className="text-blue-600 font-bold shrink-0 mt-0.5">✓</span>
                          <span className="font-medium leading-relaxed">{sop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Custom node actions */}
                {activeNode.custom && (
                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => handleRemoveNode(activeNode.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 transition-colors flex items-center gap-1 font-bold cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف هذه الإدارة المخصصة</span>
                    </button>
                  </div>
                )}

              </div>
            ) : (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 text-center text-slate-400 font-light text-xs">
                ⚠️ لا توجد إدارات محددة حالياً في المخطط التفاعلي.
              </div>
            )}

            {/* 3. Expert Consultation CTA */}
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-right space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">هل تحتاج لمراجعة ودعم فني من مستشارنا؟</h4>
                <p className="text-xs text-slate-650 leading-relaxed font-light">
                  نحن في بيزنس ديفلوبرز لا نوفر مجرد هياكل جاهزة، بل نقوم بعمل ورش عمل تفصيلية لصياغة الأدلة الإجرائية وبناء مؤشرات الأداء الحقيقية المربوطة رقمياً بسيستم شركتك.
                </p>
              </div>
              <button
                onClick={handlePreFillInquiry}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>احجز موعد مراجعة الهيكل مجاناً</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
