import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink } from "lucide-react";
import { 
  initAuth as initGoogleAuth,
  googleSignIn,
  googleLogout,
  listGoogleDocs,
  createGoogleDoc,
  getGoogleDoc,
  appendGoogleDoc,
  deleteGoogleFile,
  GoogleDriveFile,
  GoogleDocDetails,
  listGoogleSheets,
  createGoogleSheet,
  getGoogleSheetValues,
  updateGoogleSheetValues
} from "../lib/googleAuth";
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
  MessageSquare,
  Sparkles,
  ChevronLeft,
  Briefcase,
  HelpCircle,
  PenTool,
  Trash2,
  ShieldCheck,
  FileSignature,
  Download,
  RotateCcw,
  Bell,
  FileText,
  X,
  Info,
  Plus,
  Wallet,
  Receipt,
  CreditCard,
  Printer,
  Building,
  PlusCircle,
  Percent,
  Search,
  Filter,
  Cloud,
  FolderOpen,
  FileSpreadsheet,
  Table
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
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
 } from "recharts";
import * as d3 from "d3";
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
  },
  {
    id: "proj-demo-4",
    projectName: "مشروع ريادة الأعمال والتمكين التجاري التجريبي",
    clientName: "مستكشف النظام التجريبي",
    email: "test@test.com",
    progress: 75,
    category: "استشارات تجارية وتمكين تقني متكامل",
    advisorName: "مستشار التطوير: م. رائد العتيبي",
    startDate: "20 يونيو 2026",
    budgetedHours: 150,
    actualHours: 112,
    milestones: [
      { name: "تأسيس الحساب التجريبي وربط السحابة", status: "completed", date: "20 يونيو 2026" },
      { name: "صياغة الهوية التجارية والمستندات الهيكلية", status: "completed", date: "25 يونيو 2026" },
      { name: "بناء النماذج المالية وجداول التدفقات النقدية", status: "active", date: "نشط حالياً بـ Google Sheets" },
      { name: "عقد الجلسة الاستشارية ومراجعة المخرجات", status: "pending", date: "متوقع 5 يوليو" }
    ],
    chartData: [
      { week: "الأسبوع 1", percentage: 15 },
      { week: "الأسبوع 2", percentage: 35 },
      { week: "الأسبوع 3", percentage: 55 },
      { week: "الأسبوع 4", percentage: 75 }
    ],
    logs: [
      { date: "28 يونيو 2026", title: "إدماج قوالب الجداول والبيانات المالية بنجاح", details: "تم تمكين قوالب Google Sheets الذكية لتقييم الجدوى الاقتصادية وحساب التدفقات المالية للمشروع التجريبي." },
      { date: "24 يونيو 2026", title: "اعتماد مخرجات الورشة الأولى للهيكلة", details: "تم توثيق متطلبات الهوية وصياغة الأهداف الاستراتيجية الخمسة للمشروع التجاري التجريبي." }
    ]
  }
];

export interface LibraryDocument {
  id: string;
  title: string;
  category: "contract" | "report" | "blueprint";
  categoryArabic: string;
  date: string;
  size: string;
  format: string;
  description: string;
  status: string;
  downloadCount: number;
  content: {
    summary?: string;
    clauses?: string[];
    diagramDescription?: string;
    recommendations?: string[];
    technicalSpecs?: Record<string, string>;
  };
}

export const INITIAL_LIBRARY_DOCS: Record<string, LibraryDocument[]> = {
  "proj-demo-1": [
    {
      id: "DOC-LIB-101",
      title: "عقد التطوير البرمجي والمنصة الرقمية المتكاملة - ريادة كارت",
      category: "contract",
      categoryArabic: "عقود واتفاقيات",
      date: "2 مارس 2026",
      size: "3.2 MB",
      format: "PDF",
      description: "العقد الأساسي المعتمد والشروط والالتزامات وجدول الدفعات المالية والمدد الزمنية المتفق عليها للمشروع.",
      status: "موقّع ومعتمد",
      downloadCount: 14,
      content: {
        summary: "يحدد هذا العقد الالتزامات الفنية والقانونية لتطوير منصة وتطبيقات ريادة كارت للهواتف الذكية بين شركة بيزنس ديفلوبرز والعميل م. أحمد الرويلي.",
        clauses: [
          "المادة الأولى (الخدمات): تقديم الاستشارات وتطوير تطبيقات الهواتف الذكية بنظام Flutter ولوحة التحكم الإدارية.",
          "المادة الثانية (المدة): يبدأ المشروع في 1 مارس 2026 وينتهي بحد أقصى في 1 أغسطس 2026.",
          "المادة الثالثة (السرية): حماية الكود المصدري وقاعدة البيانات وعدم مشاركتها مع أي طرف ثالث تحت طائلة المساءلة القانونية."
        ]
      }
    },
    {
      id: "DOC-LIB-102",
      title: "مخطط بنية النظام السحابي والـ APIs وقاعدة البيانات",
      category: "blueprint",
      categoryArabic: "مخططات هندسية وتقنية",
      date: "25 مارس 2026",
      size: "5.1 MB",
      format: "ZIP",
      description: "المخطط التقني الكامل لهندسة قواعد بيانات PostgreSQL وتوزيع الخوادم على Cloud Run وتكامل بوابات الدفع.",
      status: "معتمد فنيّاً",
      downloadCount: 22,
      content: {
        summary: "المخطط المعماري الكامل للبنية التحتية لتطبيقات ريادة كارت المحدودة على خوادم جوجل السحابية.",
        diagramDescription: "هندسة الخوادم تعتمد على موازن حمل برمجي (Load Balancer) يوزع الطلبات على حاويات Cloud Run. قواعد البيانات من نوع PostgreSQL تدار بسحابة Cloud SQL مع تفعيل النسخ الاحتياطي التلقائي. تكامل بوابات الدفع يتم عبر REST APIs مؤمنة بالكامل بتشفير SSL.",
        technicalSpecs: {
          "نظام التشغيل والخوادم": "Google Cloud Run (Docker Containers)",
          "قاعدة البيانات الأساسية": "PostgreSQL (Cloud SQL)",
          "بوابة الدفع": "HyperPay (Mada, Visa, Apple Pay)",
          "معدل الحماية والتشفير": "AES-256 bits, HTTPS SSL TLS 1.3"
        }
      }
    },
    {
      id: "DOC-LIB-103",
      title: "مخطط رحلة العميل والـ Wireframes النهائية المعتمدة",
      category: "blueprint",
      categoryArabic: "مخططات هندسية وتقنية",
      date: "12 أبريل 2026",
      size: "4.4 MB",
      format: "PDF",
      description: "الواجهات المعتمدة وهيكل تدفق الصفحات ورحلة العميل من التسجيل حتى إتمام الدفع وتتبع الشحن.",
      status: "معتمد فنيّاً",
      downloadCount: 19,
      content: {
        summary: "الدليل الكامل لتجربة المستخدم وواجهات منصة ريادة كارت المعتمدة بعد ورش العمل التصميمية.",
        diagramDescription: "تبدأ رحلة العميل بشاشة الترحيب وتسجيل الدخول عبر النفاذ الموحد أو رقم الجوال، تليها الصفحة الرئيسية المخصصة للمنتجات والتصنيفات، ثم عربة التسوق التفاعلية، وشاشات السداد الآمن، وأخيراً شاشة تتبع مسار الشحنة.",
        technicalSpecs: {
          "برنامج التصميم": "Figma Enterprise Edition",
          "عدد الشاشات الكلي": "42 شاشة فرعية وتفاعلية",
          "معايير سهولة الوصول": "WCAG 2.1 AA Compliant"
        }
      }
    },
    {
      id: "DOC-LIB-104",
      title: "التقرير الفني لتقييم جودة الكود البرمجي وأداء الواجهات",
      category: "report",
      categoryArabic: "تقارير نهائية",
      date: "22 يونيو 2026",
      size: "1.8 MB",
      format: "PDF",
      description: "تقرير تفصيلي يوضح نتائج اختبار السرعة والتحميل والتجاوب وأمان الشيفرة البرمجية على أنظمة الهواتف الذكية.",
      status: "جاهز للتحميل",
      downloadCount: 8,
      content: {
        summary: "التقرير النهائي لجودة الكود والبرمجة وفحص الثغرات الأمنية قبل النشر الفعلي للتطبيق.",
        recommendations: [
          "تفعيل ضغط الصور والملفات الثابتة لتقليل استهلاك حزم البيانات بنسبة 35%.",
          "تقليل حجم حزم البرمجة الخارجية لتسريع استجابة الواجهات إلى أقل من 1.2 ثانية.",
          "تحديث بروتوكول توثيق الرموز (JWT token expiration) ليصبح 15 دقيقة لزيادة الأمان التشغيلي."
        ]
      }
    }
  ],
  "proj-demo-2": [
    {
      id: "DOC-LIB-201",
      title: "عقد تقديم الاستشارات الإدارية وإعادة الهيكلة التنظيمية",
      category: "contract",
      categoryArabic: "عقود واتفاقيات",
      date: "16 أبريل 2026",
      size: "2.5 MB",
      format: "PDF",
      description: "الاتفاقية الاستشارية ومجال التمكين المعتمد والالتزام بمخرجات الحوكمة والأوصاف الوظيفية لمجموعة الراجحي الفنية.",
      status: "موقّع ومعتمد",
      downloadCount: 6,
      content: {
        summary: "عقد تقديم الخدمات الاستشارية لتطوير وبناء الهيكل الإداري وحوكمة العمليات في مجموعة الراجحي الفنية.",
        clauses: [
          "المادة الأولى: تشخيص الوضع الراهن وإجراء ورش العمل لتعريف أهداف الإدارة التنفيذية.",
          "المادة الثانية: مراجعة وبناء الوثائق التنظيمية لعدد 35 منصباً وتحديث أدلة السياسات.",
          "المادة الثالثة: تسليم مخرجات الحوكمة وبطاقات الأداء المتوازن والـ KPIs خلال 120 يوم عمل."
        ]
      }
    },
    {
      id: "DOC-LIB-202",
      title: "التقرير التشخيصي الشامل لتقييم الوضع الراهن ومراجعة الفجوات",
      category: "report",
      categoryArabic: "تقارير نهائية",
      date: "10 مايو 2026",
      size: "3.8 MB",
      format: "PDF",
      description: "تحليل كامل للفجوات الإدارية والتشغيلية في المجموعة وتوصيات فريق العمل لبناء الهيكل الإداري الجديد.",
      status: "مكتمل ومعتمد",
      downloadCount: 11,
      content: {
        summary: "التقرير الفني الشامل لتحديد نقاط القوة، نقاط الضعف، الفرص، والتحديات (SWOT Analysis) في مجموعة الراجحي.",
        recommendations: [
          "فصل الإدارة المالية العامة عن الإدارة التشغيلية لضمان دقة الرقابة الميزانية.",
          "استحداث إدارة متخصصة لمتابعة المشاريع (PMO) لربط الفروع المختلفة بالمركز الرئيسي.",
          "أتمتة طلبات الشراء والمستودعات عبر نظام تخطيط الموارد ERP لتقليل الهدر الورقي بنسبة 40%."
        ]
      }
    },
    {
      id: "DOC-LIB-203",
      title: "مخطط الهيكل التنظيمي المقترح وقنوات السلطة الإدارية",
      category: "blueprint",
      categoryArabic: "مخططات هندسية وتقنية",
      date: "28 مايو 2026",
      size: "2.1 MB",
      format: "PDF",
      description: "الشكل الهيكلي العام للأقسام، خطوط السلطة، والتكامل بين الأقسام، وبطاقات التوصيف لجميع المناصب التنفيذية.",
      status: "معتمد فنيّاً",
      downloadCount: 15,
      content: {
        summary: "الهيكل الإداري الجديد المعتمد لمجموعة الراجحي الفنية متضمناً قنوات الاتصال والتبعية الوظيفية.",
        diagramDescription: "يتميز الهيكل الجديد بتبعية مباشرة لمجلس الإدارة عبر الرئيس التنفيذي، وتتفرع منه 5 إدارات كبرى: إدارة العمليات والمشاريع، إدارة التطوير والابتكار التقني، إدارة الموارد البشرية والتمكين، الإدارة المالية، وإدارة الالتزام والمخاطر.",
        technicalSpecs: {
          "النموذج التنظيمي": "هيكل وظيفي مصفوفي (Matrix Structure)",
          "عدد المستويات الإدارية": "4 مستويات تنظيمية بحد أقصى",
          "أدوات التطوير الهيكلي": "Visio Enterprise / Miro Pro"
        }
      }
    }
  ],
  "proj-demo-3": [
    {
      id: "DOC-LIB-301",
      title: "عقد تعيين الخبير والمحكم الفني المستقل لقضية عقاري بلس",
      category: "contract",
      categoryArabic: "عقود واتفاقيات",
      date: "12 مايو 2026",
      size: "1.2 MB",
      format: "PDF",
      description: "محضر تعيين شركة بيزنس ديفلوبرز كمحكم تقني مرخص لفحص البرمجيات وحل النزاع القائم بين الطرفين.",
      status: "موقّع ومعتمد",
      downloadCount: 3,
      content: {
        summary: "اتفاقية تعيين محكم وخبير تقني مرخص لإصدار تقرير هندسي حول عيوب منصة عقاري بلس.",
        clauses: [
          "المادة الأولى: فحص الكود المصدري وواجهات برمجة التطبيقات وقاعدة بيانات عقاري بلس ومقارنتها بالاتفاقيات الموقعة.",
          "المادة الثانية: يحق للمحكم استجواب المطور ومراجعة سجلات الرفع وإجراء كافة الاختبارات الأمنية.",
          "المادة الثالثة: إصدار تقرير فني ملزم قانونياً وقضائياً كتقرير خبرة هندسية تقنية."
        ]
      }
    },
    {
      id: "DOC-LIB-302",
      title: "تقرير التحكيم الهندسي والخبرة الفنية النهائي المعتمد",
      category: "report",
      categoryArabic: "تقارير نهائية",
      date: "15 يونيو 2026",
      size: "7.5 MB",
      format: "PDF",
      description: "التقرير الفني القضائي النهائي المكون من 64 صفحة والذي يفحص العيوب المعمارية والثغرات والمخالفات العقدية.",
      status: "مكتمل ومعتمد",
      downloadCount: 18,
      content: {
        summary: "التقرير النهائي لتقييم وفحص وتدقيق العيوب البرمجية في منصة عقاري بلس.",
        recommendations: [
          "إلزام الطرف المطور بإعادة بناء طبقة المصادقة (Auth Layer) لعدم مطابقتها للمواصفات الأساسية.",
          "إرجاع نسبة 65% من قيمة العقد الإجمالية للعميل لعدم إمكانية معالجة بعض العيوب المعمارية الكلية.",
          "نقل كامل الاستضافة إلى خوادم تابعة للعميل وسحب الصلاحيات من المطور تجنباً لأي تسريب إضافي."
        ]
      }
    },
    {
      id: "DOC-LIB-303",
      title: "مخطط توزيع الثغرات والهجمات الأمنية الموثقة في المنصة",
      category: "blueprint",
      categoryArabic: "مخططات هندسية وتقنية",
      date: "20 يونيو 2026",
      size: "1.9 MB",
      format: "PDF",
      description: "الرسم التوضيحي للهجمات المتاحة ونقاط الضعف في بروتوكول المصادقة وقواعد البيانات المكتشفة أثناء فحص الاختراق.",
      status: "جاهز للتحميل",
      downloadCount: 9,
      content: {
        summary: "المخطط الهيكلي للثغرات المكتشفة وتوزيعها البرمجي في أنظمة عقاري بلس.",
        diagramDescription: "يوضح المخطط 4 منافذ غير مؤمنة تسمح بحقن قواعد البيانات (SQL Injection) في حقل البحث الرئيسي، وتسريب الرموز التعريفية في روابط المتصفح، وسهولة فك تشفير كلمات مرور المشرفين بسبب استخدام خوارزمية قديمة.",
        technicalSpecs: {
          "أدوات فحص الاختراق": "OWASP ZAP / Burp Suite Pro",
          "الثغرات الحرجة المكتشفة": "2 ثغرات عالية الخطورة",
          "مطابقة المعايير": "غير مطابق لمعايير OWASP Top 10"
        }
      }
    }
  ]
};

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

  // --- Financial Project Wallet Interfaces & States ---
  interface Invoice {
    id: string;
    title: string;
    amount: number;
    vat: number;
    total: number;
    dueDate: string;
    issuedDate: string;
    status: "paid" | "unpaid" | "overdue";
    paidDate?: string;
  }

  interface PaymentRecord {
    id: string;
    amount: number;
    date: string;
    method: string;
    invoiceId: string;
  }

  const [dashboardView, setDashboardView] = useState<"overview" | "wallet" | "library" | "editor" | "analyzer" | "timeline">("overview");
  const [libraryDocs, setLibraryDocs] = useState<Record<string, LibraryDocument[]>>(INITIAL_LIBRARY_DOCS);
  const [librarySearch, setLibrarySearch] = useState<string>("");
  const [libraryFilter, setLibraryFilter] = useState<"all" | "contract" | "report" | "blueprint">("all");
  const [activeDocForPreview, setActiveDocForPreview] = useState<LibraryDocument | null>(null);

  // Google Docs & Drive Integration States
  const [librarySubView, setLibrarySubView] = useState<"archived" | "gdocs">("archived");
  const [googleUser, setGoogleUser] = useState<any | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [googleDocs, setGoogleDocs] = useState<GoogleDriveFile[]>([]);
  const [isFetchingGoogleDocs, setIsFetchingGoogleDocs] = useState<boolean>(false);
  const [googleDocsError, setGoogleDocsError] = useState<string>("");
  const [activeGoogleDoc, setActiveGoogleDoc] = useState<GoogleDocDetails | null>(null);
  const [isFetchingActiveDoc, setIsFetchingActiveDoc] = useState<boolean>(false);
  const [newGoogleDocTitle, setNewGoogleDocTitle] = useState<string>("");
  const [isCreatingGoogleDoc, setIsCreatingGoogleDoc] = useState<boolean>(false);
  const [isAnalyzingDoc, setIsAnalyzingDoc] = useState<boolean>(false);
  const [docAnalysisResult, setDocAnalysisResult] = useState<string>("");
  const [textToAppendToDoc, setTextToAppendToDoc] = useState<string>("");
  const [isAppendingToDoc, setIsAppendingToDoc] = useState<boolean>(false);
  const [docConfirmDeleteId, setDocConfirmDeleteId] = useState<string | null>(null);

  // Google Sheets Integration States
  const [googleSheets, setGoogleSheets] = useState<GoogleDriveFile[]>([]);
  const [isFetchingGoogleSheets, setIsFetchingGoogleSheets] = useState<boolean>(false);
  const [activeGoogleSheet, setActiveGoogleSheet] = useState<GoogleDriveFile | null>(null);
  const [isCreatingGoogleSheet, setIsCreatingGoogleSheet] = useState<boolean>(false);
  const [selectedSheetTemplate, setSelectedSheetTemplate] = useState<string>("budget");
  const [editorMode, setEditorMode] = useState<"docs" | "sheets">("docs");
  const [sheetConfirmDeleteId, setSheetConfirmDeleteId] = useState<string | null>(null);

  // Smart Data Analyzer State
  const [analyzerTargetRevenue, setAnalyzerTargetRevenue] = useState<number>(250000);
  const [analyzerActualRevenue, setAnalyzerActualRevenue] = useState<number>(185000);
  const [analyzerMarketingSpend, setAnalyzerMarketingSpend] = useState<number>(45000);
  const [analyzerOperationalCost, setAnalyzerOperationalCost] = useState<number>(65000);
  const [analyzerConversionRate, setAnalyzerConversionRate] = useState<number>(3.8);
  const [analyzerAcquisitionCost, setAnalyzerAcquisitionCost] = useState<number>(150);

  // Loaded or local spreadsheet table data for charts
  interface AnalyzerDataPoint {
    label: string;
    value1: number; // e.g. Inflow / Target
    value2?: number; // e.g. Outflow / Actual
    net?: number;
  }
  const [analyzerChartData, setAnalyzerChartData] = useState<AnalyzerDataPoint[]>([
    { label: "الشهر الأول", value1: 50000, value2: 25000, net: 25000 },
    { label: "الشهر الثاني", value1: 65000, value2: 30000, net: 35000 },
    { label: "الشهر الثالث", value1: 80000, value2: 35000, net: 45000 },
    { label: "الشهر الرابع", value1: 95000, value2: 40000, net: 55000 },
    { label: "الشهر الخامس", value1: 110000, value2: 45000, net: 65000 },
    { label: "الشهر السادس", value1: 125000, value2: 50000, net: 75000 },
  ]);
  const [analyzerChartTitle, setAnalyzerChartTitle] = useState<string>("التدفقات النقدية المتوقعة (ر.س)");
  const [analyzerChartType, setAnalyzerChartType] = useState<"area" | "bar" | "line">("area");
  const [isSyncingSheetWithChart, setIsSyncingSheetWithChart] = useState<boolean>(false);
  const [analyzerSubTab, setAnalyzerSubTab] = useState<"sheet" | "charts">("sheet");

  // Interactive D3 Gantt Chart states
  interface GanttTask {
    id: string;
    name: string;
    status: "completed" | "active" | "pending";
    startDate: string; // YYYY-MM-DD
    endDate: string; // YYYY-MM-DD
    progress: number; // 0 to 100
    notes?: string;
  }
  const [projectGanttTasks, setProjectGanttTasks] = useState<Record<string, GanttTask[]>>({});
  const [ganttFilter, setGanttFilter] = useState<"all" | "completed" | "active" | "pending">("all");
  const [editingGanttTask, setEditingGanttTask] = useState<GanttTask | null>(null);
  const [isAddingGanttTask, setIsAddingGanttTask] = useState<boolean>(false);
  const [newGanttName, setNewGanttName] = useState<string>("");
  const [newGanttStart, setNewGanttStart] = useState<string>("");
  const [newGanttEnd, setNewGanttEnd] = useState<string>("");
  const [newGanttStatus, setNewGanttStatus] = useState<"completed" | "active" | "pending">("pending");
  const [newGanttProgress, setNewGanttProgress] = useState<number>(0);
  const [newGanttNotes, setNewGanttNotes] = useState<string>("");

  // Cloud Project Editor specific states
  const [editorActiveDoc, setEditorActiveDoc] = useState<GoogleDocDetails | null>(null);
  const [isFetchingEditorDoc, setIsFetchingEditorDoc] = useState<boolean>(false);
  const [editorDocsList, setEditorDocsList] = useState<GoogleDriveFile[]>([]);
  const [editorStatusMessage, setEditorStatusMessage] = useState<string>("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("nda");
  const [syncStatus, setSyncStatus] = useState<"synced" | "saving">("synced");

  // Google Docs Comments/Notes state
  interface DocComment {
    id: string;
    author: "client" | "pm";
    authorName: string;
    text: string;
    timestamp: string;
  }
  const [docComments, setDocComments] = useState<DocComment[]>([]);
  const [newCommentText, setNewCommentText] = useState<string>("");

  const currentActiveFileId = editorMode === "docs" ? activeGoogleDoc?.id : activeGoogleSheet?.id;
  const currentActiveFileName = editorMode === "docs" ? activeGoogleDoc?.title : activeGoogleSheet?.name;
  const commentStorageKey = currentActiveFileId ? `${editorMode}_comments_${currentActiveFileId}` : null;

  useEffect(() => {
    if (!currentActiveFileId) {
      setDocComments([]);
      return;
    }
    const saved = localStorage.getItem(commentStorageKey!);
    if (saved) {
      try {
        setDocComments(JSON.parse(saved));
      } catch (e) {
        setDocComments([]);
      }
    } else {
      const defaults: DocComment[] = [
        {
          id: "default-1",
          author: "pm",
          authorName: "م. سارة الهاشمي (مدير المشروع)",
          text: `مرحباً بك! لقد قمت بتوليد قالب ${editorMode === "docs" ? "مستند" : "جدول بيانات"} "${currentActiveFileName}" لك. يرجى مراجعة البنود وإضافة أي تعديلات مطلوبة مباشرة هنا أو عبر محرر جوجل المدمج، وسأطلع عليها فوراً لمتابعة التنفيذ.`,
          timestamp: "منذ ساعتين"
        },
        {
          id: "default-2",
          author: "pm",
          authorName: "م. سارة الهاشمي (مدير المشروع)",
          text: editorMode === "docs" 
            ? "إذا كانت هناك بنود إضافية تحتاج إلى صياغة قانونية مخصصة، اكتبها هنا كتعليق وسأطلب من مستشارنا القانوني تحديثها لك."
            : "إذا كنت بحاجة إلى تعديل الصيغ الرياضية أو إدخال ميزانية إضافية، يرجى كتابة التفاصيل هنا وسنتولى ضبطها لك.",
          timestamp: "منذ ساعة"
        }
      ];
      setDocComments(defaults);
      localStorage.setItem(commentStorageKey!, JSON.stringify(defaults));
    }
  }, [currentActiveFileId, editorMode]);

  const handleAddComment = () => {
    if (!currentActiveFileId || !newCommentText.trim()) return;
    const newComment: DocComment = {
      id: `comment-${Date.now()}`,
      author: "client",
      authorName: (googleUser && googleUser.displayName) ? googleUser.displayName : "العميل (أنت)",
      text: newCommentText.trim(),
      timestamp: "الآن"
    };
    const updated = [...docComments, newComment];
    setDocComments(updated);
    localStorage.setItem(commentStorageKey!, JSON.stringify(updated));
    setNewCommentText("");
    triggerLibraryToast(
      "إضافة تعليق",
      "تم تسجيل ملاحظتك بنجاح ومشاركتها مع مدير المشروع."
    );
  };

  const handleDeleteComment = (commentId: string) => {
    if (!currentActiveFileId) return;
    const updated = docComments.filter(c => c.id !== commentId);
    setDocComments(updated);
    localStorage.setItem(commentStorageKey!, JSON.stringify(updated));
  };

  // Automatically update sync status based on loading actions or editing actions
  useEffect(() => {
    if (isCreatingGoogleDoc || isFetchingActiveDoc || isFetchingGoogleDocs || isAppendingToDoc || isCreatingGoogleSheet || isFetchingGoogleSheets) {
      setSyncStatus("saving");
    } else {
      const timer = setTimeout(() => {
        setSyncStatus("synced");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCreatingGoogleDoc, isFetchingActiveDoc, isFetchingGoogleDocs, isAppendingToDoc, isCreatingGoogleSheet, isFetchingGoogleSheets]);

  // Simulate "saving" status when typing in fast append text
  useEffect(() => {
    if (!textToAppendToDoc) return;
    setSyncStatus("saving");
    const timer = setTimeout(() => {
      setSyncStatus("synced");
    }, 1500);
    return () => clearTimeout(timer);
  }, [textToAppendToDoc]);

  // Simulated Library Document Upload States
  const [isUploadSectionOpen, setIsUploadSectionOpen] = useState<boolean>(false);
  const [uploadDocTitle, setUploadDocTitle] = useState<string>("");
  const [uploadDocCategory, setUploadDocCategory] = useState<"contract" | "report" | "blueprint">("report");
  const [uploadDocDescription, setUploadDocDescription] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [activeInvoiceForModal, setActiveInvoiceForModal] = useState<Invoice | null>(null);
  const [invoiceToPay, setInvoiceToPay] = useState<Invoice | null>(null);
  const [isIssueInvoiceOpen, setIsIssueInvoiceOpen] = useState<boolean>(false);

  // Issue Invoice Form States
  const [newInvoiceTitle, setNewInvoiceTitle] = useState<string>("ساعات استشارية إضافية - تطوير نموذج العمل والحلول");
  const [newInvoiceAmount, setNewInvoiceAmount] = useState<number>(5000);
  const [newInvoiceCustomTitle, setNewInvoiceCustomTitle] = useState<string>("");

  // Payment Simulator States
  const [paymentMethod, setPaymentMethod] = useState<"Mada" | "Visa" | "Apple Pay">("Mada");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCVV, setCardCVV] = useState<string>("");
  const [isPaying, setIsPaying] = useState<boolean>(false);

  // Persistent Financial Wallet State
  const [projectInvoices, setProjectInvoices] = useState<Record<string, Invoice[]>>({
    "proj-demo-1": [
      {
        id: "INV-2026-001",
        title: "الدفعة الأولى (مقدم التعاقد وتدشين النطاق التشغيلي)",
        amount: 15000,
        vat: 2250,
        total: 17250,
        dueDate: "15 مارس 2026",
        issuedDate: "2 مارس 2026",
        status: "paid",
        paidDate: "5 مارس 2026"
      },
      {
        id: "INV-2026-002",
        title: "الدفعة الثانية (اعتماد تصاميم تجربة وواجهة المستخدم UI/UX)",
        amount: 10000,
        vat: 1500,
        total: 11500,
        dueDate: "30 أبريل 2026",
        issuedDate: "1 أبريل 2026",
        status: "paid",
        paidDate: "3 أبريل 2026"
      },
      {
        id: "INV-2026-003",
        title: "الدفعة الثالثة (انتهاء البرمجة الخلفية وبوابات الدفع)",
        amount: 10000,
        vat: 1500,
        total: 11500,
        dueDate: "15 يوليو 2026",
        issuedDate: "15 يونيو 2026",
        status: "unpaid"
      }
    ],
    "proj-demo-2": [
      {
        id: "INV-2026-101",
        title: "الدفعة الأولى (مرحلة تشخيص وتحليل الوضع الراهن)",
        amount: 20000,
        vat: 3000,
        total: 23000,
        dueDate: "30 أبريل 2026",
        issuedDate: "16 أبريل 2026",
        status: "paid",
        paidDate: "18 أبريل 2026"
      },
      {
        id: "INV-2026-102",
        title: "الدفعة الثانية (اعتماد هيكلة وتوصيف الوظائف)",
        amount: 15000,
        vat: 2250,
        total: 17250,
        dueDate: "30 يونيو 2026",
        issuedDate: "1 يونيو 2026",
        status: "unpaid"
      },
      {
        id: "INV-2026-103",
        title: "الدفعة النهائية (مرحلة مؤشرات الأداء والتحول الرقمي)",
        amount: 10000,
        vat: 1500,
        total: 11500,
        dueDate: "25 يوليو 2026",
        issuedDate: "25 يونيو 2026",
        status: "unpaid"
      }
    ],
    "proj-demo-3": [
      {
        id: "INV-2026-201",
        title: "الدفعة الأولى والأخيرة (كامل قيمة بروتوكول التحكيم الفني الشامل)",
        amount: 18000,
        vat: 2700,
        total: 20700,
        dueDate: "25 مايو 2026",
        issuedDate: "12 مايو 2026",
        status: "paid",
        paidDate: "14 مايو 2026"
      }
    ]
  });

  const [projectPayments, setProjectPayments] = useState<Record<string, PaymentRecord[]>>({
    "proj-demo-1": [
      {
        id: "TXN-894021",
        amount: 17250,
        date: "5 مارس 2026",
        method: "Mada",
        invoiceId: "INV-2026-001"
      },
      {
        id: "TXN-894593",
        amount: 11500,
        date: "3 أبريل 2026",
        method: "Apple Pay",
        invoiceId: "INV-2026-002"
      }
    ],
    "proj-demo-2": [
      {
        id: "TXN-902410",
        amount: 23000,
        date: "18 أبريل 2026",
        method: "Bank Transfer",
        invoiceId: "INV-2026-101"
      }
    ],
    "proj-demo-3": [
      {
        id: "TXN-940251",
        amount: 20700,
        date: "14 مايو 2026",
        method: "Visa",
        invoiceId: "INV-2026-201"
      }
    ]
  });

  // Load Financial Invoices and Payments from localStorage
  useEffect(() => {
    try {
      const storedInvoices = localStorage.getItem("bd_project_invoices");
      const storedPayments = localStorage.getItem("bd_project_payments");
      if (storedInvoices) {
        setProjectInvoices(JSON.parse(storedInvoices));
      }
      if (storedPayments) {
        setProjectPayments(JSON.parse(storedPayments));
      }
    } catch (e) {
      console.error("Error loading financial data", e);
    }
  }, []);

  // Initialize Google Auth session listener
  useEffect(() => {
    const unsubscribe = initGoogleAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        loadGDocs(token);
        loadGSheets(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadGDocs = async (tokenToUse: string) => {
    setIsFetchingGoogleDocs(true);
    setGoogleDocsError("");
    try {
      const files = await listGoogleDocs(tokenToUse);
      setGoogleDocs(files);
    } catch (err: any) {
      console.error("Failed to load Google Docs:", err);
      setGoogleDocsError(err.message || "حدث خطأ أثناء الاتصال بمستندات جوجل.");
    } finally {
      setIsFetchingGoogleDocs(false);
    }
  };

  const loadGSheets = async (tokenToUse: string) => {
    setIsFetchingGoogleSheets(true);
    setGoogleDocsError("");
    try {
      const files = await listGoogleSheets(tokenToUse);
      setGoogleSheets(files);
      if (files.length > 0 && !activeGoogleSheet) {
        setActiveGoogleSheet(files[0]);
      }
    } catch (err: any) {
      console.error("Failed to load Google Sheets:", err);
      setGoogleDocsError(err.message || "حدث خطأ أثناء الاتصال بجداول جوجل.");
    } finally {
      setIsFetchingGoogleSheets(false);
    }
  };

  // Save changes back to localStorage
  useEffect(() => {
    localStorage.setItem("bd_project_invoices", JSON.stringify(projectInvoices));
  }, [projectInvoices]);

  useEffect(() => {
    localStorage.setItem("bd_project_payments", JSON.stringify(projectPayments));
  }, [projectPayments]);
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

  // Interactive Gantt Chart Refs & width state
  const ganttSvgRef = React.useRef<SVGSVGElement | null>(null);
  const ganttContainerRef = React.useRef<HTMLDivElement | null>(null);
  const [ganttWidth, setGanttWidth] = useState<number>(800);

  // --- OTP Identity Verification States ---
  const [showOtpModal, setShowOtpModal] = useState<boolean>(false);
  const [otpMethod, setOtpMethod] = useState<"email" | "phone">("email");
  const [otpDestination, setOtpDestination] = useState<string>("");
  const [generatedOtp, setGeneratedOtp] = useState<string>("");
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [otpCountdown, setOtpCountdown] = useState<number>(0);
  const [otpError, setOtpError] = useState<string>("");
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);

  // --- Notification System Interfaces & Helper ---
  interface ClientNotification {
    id: string;
    projectId: string;
    title: string;
    description: string;
    type: "milestone" | "file" | "system";
    timestamp: string;
    isRead: boolean;
  }

  const getInitialNotifications = (projectId: string): ClientNotification[] => {
    if (projectId === "proj-demo-1") {
      return [
        {
          id: "notif-1-1",
          projectId: "proj-demo-1",
          title: "إنجاز محطة: دراسة الجدوى وتأسيس نموذج العمل (BMC)",
          description: "تم اعتماد وتوقيع وثيقة نموذج العمل النهائي ونقل حالة المحطة إلى مكتملة.",
          type: "milestone",
          timestamp: "منذ ساعتين",
          isRead: false,
        },
        {
          id: "notif-1-2",
          projectId: "proj-demo-1",
          title: "رفع تقرير جديد: مراجعة واجهات الاستخدام UI/UX",
          description: "قام فريق التصميم برفع النسخة المحدثة لملف مراجعة واجهات تطبيق ريادة كارت للتأكد من مواءمتها للمستخدمين.",
          type: "file",
          timestamp: "منذ يوم",
          isRead: true,
        },
        {
          id: "notif-1-3",
          projectId: "proj-demo-1",
          title: "إنجاز محطة: تطوير لوحة التحكم والـ API الخلفية",
          description: "تم الانتهاء من ربط قواعد البيانات ورفع الـ APIs الأساسية للخادم السحابي المشترك.",
          type: "milestone",
          timestamp: "منذ يومين",
          isRead: true,
        }
      ];
    } else if (projectId === "proj-demo-2") {
      return [
        {
          id: "notif-2-1",
          projectId: "proj-demo-2",
          title: "إنجاز محطة: تحليل الوضع الراهن وإجراء المقابلات",
          description: "تم إنهاء المقابلات الفردية مع مدراء الأقسام وتلخيص نقاط القوة والتحديات التشغيلية.",
          type: "milestone",
          timestamp: "منذ 4 ساعات",
          isRead: false,
        },
        {
          id: "notif-2-2",
          projectId: "proj-demo-2",
          title: "رفع تقرير جديد: المسودة الأولى لأدلة التشغيل SOPs",
          description: "تم إصدار ورفع المسودة التنظيمية لثلاثة أقسام تشغيلية رئيسية للمجموعة بواسطة المشرف الفني.",
          type: "file",
          timestamp: "منذ يوم",
          isRead: true,
        }
      ];
    } else if (projectId === "proj-demo-3") {
      return [
        {
          id: "notif-3-1",
          projectId: "proj-demo-3",
          title: "رفع تقرير جديد: تقرير الخبرة الفنية الهندسي النهائي المعتمد",
          description: "قام المحكم التقني بإصدار وتسليم التقرير الشامل المكون من 64 صفحة وتوثيقه قانونياً.",
          type: "file",
          timestamp: "منذ ساعة",
          isRead: false,
        },
        {
          id: "notif-3-2",
          projectId: "proj-demo-3",
          title: "إنجاز محطة: تحليل وثائق العقود والملاحق الفنية",
          description: "تم الانتهاء من فحص العقود وبنود الالتزام وتحديد الاختلافات التنفيذية وتلخيص الثغرات المترتبة.",
          type: "milestone",
          timestamp: "منذ يومين",
          isRead: true,
        }
      ];
    }
    return [];
  };

  const playNotificationSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc1.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      
      osc1.type = "sine";
      osc2.type = "sine";
      
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      
      osc1.stop(ctx.currentTime + 0.4);
      osc2.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn("AudioContext block by browser or not supported:", e);
    }
  };

  // --- Notification System States ---
  const [notifications, setNotifications] = useState<ClientNotification[]>([]);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ClientNotification[]>([]);

  const triggerNewNotification = (title: string, description: string, type: "milestone" | "file") => {
    if (!selectedProject) return;
    
    const newNotif: ClientNotification = {
      id: `notif-realtime-${Date.now()}`,
      projectId: selectedProject.id,
      title,
      description,
      type,
      timestamp: "الآن",
      isRead: false,
    };
    
    // Add to notification list and Toast list
    setNotifications(prev => [newNotif, ...prev]);
    setToasts(prev => [...prev, newNotif]);
    playNotificationSound();
    
    // Auto-remove toast after 5.5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newNotif.id));
    }, 5500);

    // Update Project state (milestones, logs, progress, charts) in real-time
    setSelectedProject(prev => {
      if (!prev) return null;
      
      // 1. Create a live log entry
      const newLog = {
        date: "الآن",
        title,
        details: description
      };
      
      let updatedMilestones = [...prev.milestones];
      let updatedProgress = prev.progress;
      let updatedChartData = [...prev.chartData];
      
      if (type === "milestone") {
        // Find the active milestone, mark it as completed, and make the next pending milestone active
        const activeIdx = updatedMilestones.findIndex(m => m.status === "active");
        if (activeIdx !== -1) {
          updatedMilestones[activeIdx] = {
            ...updatedMilestones[activeIdx],
            status: "completed",
            date: `اكتملت في ${new Date().toLocaleDateString("ar-SA", { day: "numeric", month: "long" })}`
          };
          
          // Boost progress by 5-10%
          updatedProgress = Math.min(100, prev.progress + 10);
          
          // Set next pending as active
          const pendingIdx = updatedMilestones.findIndex(m => m.status === "pending");
          if (pendingIdx !== -1) {
            updatedMilestones[pendingIdx] = {
              ...updatedMilestones[pendingIdx],
              status: "active",
              date: "جاري العمل عليها الآن"
            };
          }
          
          // Insert chart node
          const nextWeekNum = prev.chartData.length + 1;
          updatedChartData = [
            ...prev.chartData,
            { week: `الأسبوع ${nextWeekNum}`, percentage: updatedProgress }
          ];
        }
      }
      
      return {
        ...prev,
        progress: updatedProgress,
        milestones: updatedMilestones,
        chartData: updatedChartData,
        logs: [newLog, ...prev.logs]
      };
    });
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleToggleReadNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n));
  };

  const handleSimulateMilestoneAchievement = () => {
    if (!selectedProject) return;
    
    // Find the current active milestone to announce its achievement
    const activeMilestone = selectedProject.milestones.find(m => m.status === "active");
    const title = activeMilestone 
      ? `إنجاز فوري: تم اكتمال محطة '${activeMilestone.name}' بنجاح!`
      : "إنجاز فوري: تم تحقيق محطة رئيسية جديدة للمشروع!";
    
    const description = activeMilestone
      ? `قام الفريق الاستشاري والتقني لشركة بيزنس ديفلوبرز بإغلاق ومطابقة كافة متطلبات خطوة '${activeMilestone.name}' ونقلها لحالة الاكتمال المصادق.`
      : "تم تسليم كافة المتطلبات والمواصفات المحددة لهذه المرحلة والمصادقة عليها بواسطة المستشار المشرف.";

    triggerNewNotification(title, description, "milestone");
  };

  const handleSimulateFileUpload = () => {
    if (!selectedProject) return;
    
    const files = [
      { name: "تقرير الجودة التقنية والكود المصدري (Code_Quality_SOW.pdf)", desc: "تم رفع تقرير معايير المراجعة الفنية الشامل لأمن المعلومات والجودة البرمجية للملف." },
      { name: "خطة التدريب الفني ومؤشرات الأداء المستهدفة (Training_KPIs_Framework.xlsx)", desc: "تم إصدار ورفع جدول الحصص الاستشارية وبرنامج ورش العمل التدريبية لتمكين الكوادر." },
      { name: "الدليل النهائي لحماية الثغرات وقواعد البيانات (Security_Audit_Report.pdf)", desc: "تم الانتهاء من فحص نقاط الضعف ورفع الدليل الأمني المشفر وفق نظام 256-bit للتشغيل والإنتاج." }
    ];
    
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const title = `ملف جديد مرفوع: ${randomFile.name.split(" ")[0]} ${randomFile.name.split(" ")[1]}`;
    const description = `${randomFile.desc} المرفوع بواسطة قسم إدارة المشروعات والمستشار المتابع.`;
    
    triggerNewNotification(title, description, "file");
  };

  const handleIssueInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    const baseAmount = Number(newInvoiceAmount);
    if (isNaN(baseAmount) || baseAmount <= 0) {
      alert("الرجاء إدخال مبلغ صحيح أكبر من الصفر.");
      return;
    }

    const vatAmount = baseAmount * 0.15;
    const totalAmount = baseAmount + vatAmount;

    const title = newInvoiceTitle === "custom" ? newInvoiceCustomTitle : newInvoiceTitle;
    if (!title.trim()) {
      alert("الرجاء تحديد أو كتابة عنوان صحيح للفاتورة.");
      return;
    }

    const randomNum = Math.floor(100 + Math.random() * 900);
    const invoiceId = `INV-2026-${randomNum}`;

    const newInv: Invoice = {
      id: invoiceId,
      title: title,
      amount: baseAmount,
      vat: vatAmount,
      total: totalAmount,
      issuedDate: new Date().toLocaleDateString("ar-SA"),
      dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SA"),
      status: "unpaid"
    };

    setProjectInvoices(prev => {
      const projId = selectedProject.id;
      const current = prev[projId] || [];
      return {
        ...prev,
        [projId]: [...current, newInv]
      };
    });

    const newNotif: ClientNotification = {
      id: `notif-sys-${Date.now()}`,
      projectId: selectedProject.id,
      title: "تم إصدار فاتورة ضريبية جديدة",
      description: `تم إصدار الفاتورة رقم ${invoiceId} بنجاح بقيمة إجمالية ${totalAmount.toLocaleString()} ر.س شاملة ضريبة القيمة المضافة لـ (${title}).`,
      type: "system",
      timestamp: "الآن",
      isRead: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    setToasts(prev => [...prev, newNotif]);

    setIsIssueInvoiceOpen(false);
    setNewInvoiceCustomTitle("");
  };

  const handlePayInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !invoiceToPay) return;

    setIsPaying(true);

    setTimeout(() => {
      setIsPaying(false);

      setProjectInvoices(prev => {
        const projId = selectedProject.id;
        const current = prev[projId] || [];
        const updated = current.map(inv => {
          if (inv.id === invoiceToPay.id) {
            return {
              ...inv,
              status: "paid" as const,
              paidDate: new Date().toLocaleDateString("ar-SA")
            };
          }
          return inv;
        });
        return {
          ...prev,
          [projId]: updated
        };
      });

      const randomTxnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`;
      const newPayment: PaymentRecord = {
        id: randomTxnId,
        amount: invoiceToPay.total,
        date: new Date().toLocaleDateString("ar-SA"),
        method: paymentMethod,
        invoiceId: invoiceToPay.id
      };

      setProjectPayments(prev => {
        const projId = selectedProject.id;
        const current = prev[projId] || [];
        return {
          ...prev,
          [projId]: [newPayment, ...current]
        };
      });

      const newNotif: ClientNotification = {
        id: `notif-pay-${Date.now()}`,
        projectId: selectedProject.id,
        title: "تم استلام الدفعة بنجاح",
        description: `نشكركم على الدفع الفوري! تم استلام دفعتكم بقيمة ${invoiceToPay.total.toLocaleString()} ر.س للفاتورة ${invoiceToPay.id} برقم مراجع معاملة ${randomTxnId} عبر ${paymentMethod === "Mada" ? "مدى" : paymentMethod === "Visa" ? "فيزا كارد" : "أبل باي"}.`,
        type: "milestone",
        timestamp: "الآن",
        isRead: false
      };

      setNotifications(prev => [newNotif, ...prev]);
      setToasts(prev => [...prev, newNotif]);

      setInvoiceToPay(null);
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCVV("");
    }, 1500);
  };

  // Synchronize notifications with localStorage on project loading
  useEffect(() => {
    if (selectedProject) {
      const key = `bd_notifications_${selectedProject.id}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        const initial = getInitialNotifications(selectedProject.id);
        setNotifications(initial);
        localStorage.setItem(key, JSON.stringify(initial));
      }
      
      // Reset toast notifications for fresh session
      setToasts([]);
      setIsNotifOpen(false);

      // --- SETUP REAL-TIME TIMEOUT SIMULATORS ---
      // Real-time Update 1: Triggered automatically after 18 seconds
      const timer1 = setTimeout(() => {
        if (selectedProject.id === "proj-demo-1") {
          triggerNewNotification(
            "إنجاز محطة: تطوير تطبيق الهاتف الذكي (Flutter iOS/Android)",
            "تم نقل محطة تطوير تطبيق الهاتف الذكي إلى مكتملة، وتم بنجاح رفع الإصدار التجريبي الخاص بالمستشارين والعملاء للتأكد من حماية وسرعة الواجهات.",
            "milestone"
          );
        } else if (selectedProject.id === "proj-demo-2") {
          triggerNewNotification(
            "رفع تقرير جديد: الهيكل التنظيمي المحدث لشركة الراجحي الفنية",
            "قام مستشار التطوير الإداري برفع ملف الهيكل التفصيلي المطور (Organizational_Structure_Final.pdf) للمراجعة والاعتماد الفوري.",
            "file"
          );
        } else if (selectedProject.id === "proj-demo-3") {
          triggerNewNotification(
            "إنجاز محطة: عقد جلسة المواجهة والتحكيم الودية",
            "تم إنهاء صياغة بنود الاتفاق المالي وتوقيع محضر الالتزام بالكامل بنجاح متبادل ومصادقة المحكم الفني.",
            "milestone"
          );
        }
      }, 18000);

      // Real-time Update 2: Triggered automatically after 48 seconds
      const timer2 = setTimeout(() => {
        triggerNewNotification(
          "ملف جديد مرفوع: تقرير التدقيق الفني المحدث وثغرات الحماية (Security_Audit_Report.pdf)",
          "تم فحص مستودع كود المشروع بنجاح، ورفع تقرير تدقيق الجودة البرمجية وثغرات الحماية بواسطة فريق الهندسة والامتثال لشركة بيزنس ديفلوبرز.",
          "file"
        );
      }, 48000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [selectedProject]);

  // Save changes to notifications
  useEffect(() => {
    if (selectedProject && notifications.length > 0) {
      const key = `bd_notifications_${selectedProject.id}`;
      localStorage.setItem(key, JSON.stringify(notifications));
    }
  }, [notifications, selectedProject]);

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

  // --- Gantt Chart Helper Functions and Effects ---
  const getInitialGanttTasksForProject = (proj: ClientProject): GanttTask[] => {
    let year = 2026;
    let month = 2; // March is 2 (0-indexed)
    let day = 1;
    
    if (proj.id === "proj-demo-2") {
      month = 3; // April
      day = 15;
    } else if (proj.id === "proj-demo-3") {
      month = 4; // May
      day = 10;
    }
    
    const tasks: GanttTask[] = [];
    
    proj.milestones.forEach((ms, idx) => {
      const taskStart = new Date(year, month, day + idx * 15);
      const taskEnd = new Date(year, month, day + idx * 15 + 12);
      
      const formatYMD = (d: Date) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${dd}`;
      };
      
      let progress = 0;
      if (ms.status === "completed") {
        progress = 100;
      } else if (ms.status === "active") {
        progress = 60;
      }
      
      tasks.push({
        id: `gantt-task-${proj.id}-${idx}-${Date.now()}`,
        name: ms.name,
        status: ms.status,
        startDate: formatYMD(taskStart),
        endDate: formatYMD(taskEnd),
        progress: progress,
        notes: `معلم رئيسي مدمج للمشروع من خريطة الطريق الرسمية. الحالة الحالية: ${
          ms.status === "completed" ? "مكتمل ومصادق عليه" : ms.status === "active" ? "قيد التنفيذ والمتابعة" : "مجدول للمستقبل"
        }`
      });
    });
    
    return tasks;
  };

  // Populate Gantt Tasks on select
  useEffect(() => {
    if (selectedProject) {
      const pid = selectedProject.id;
      if (!projectGanttTasks[pid]) {
        setProjectGanttTasks(prev => ({
          ...prev,
          [pid]: getInitialGanttTasksForProject(selectedProject)
        }));
      }
    }
  }, [selectedProject]);

  // ResizeObserver for Gantt Container
  useEffect(() => {
    if (!ganttContainerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setGanttWidth(Math.max(500, entry.contentRect.width));
      }
    });
    observer.observe(ganttContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // D3 Gantt Rendering Effect
  useEffect(() => {
    if (!selectedProject || !ganttSvgRef.current) return;
    const pid = selectedProject.id;
    const allTasks = projectGanttTasks[pid] || [];
    
    const filteredTasks = allTasks.filter(t => {
      if (ganttFilter === "all") return true;
      return t.status === ganttFilter;
    });

    const svgElement = d3.select(ganttSvgRef.current);
    svgElement.selectAll("*").remove();

    if (filteredTasks.length === 0) {
      svgElement.append("text")
        .attr("x", ganttWidth / 2)
        .attr("y", 100)
        .attr("text-anchor", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-family", "system-ui, sans-serif")
        .attr("font-size", "14px")
        .attr("font-weight", "500")
        .text("لا توجد معالم زمنية مطابقة للمشروع في هذا التصنيف");
      return;
    }

    const taskHeight = 52;
    const margin = { top: 60, right: 30, bottom: 30, left: 240 };
    const width = ganttWidth;
    const height = filteredTasks.length * taskHeight + margin.top + margin.bottom;

    svgElement.attr("width", width).attr("height", height);

    interface ParsedGanttTask {
      id: string;
      name: string;
      status: string;
      startDate: string;
      endDate: string;
      progress: number;
      notes?: string;
      start: Date;
      end: Date;
    }

    const parsedTasks: ParsedGanttTask[] = filteredTasks.map(t => ({
      ...t,
      start: new Date(t.startDate),
      end: new Date(t.endDate)
    }));

    let minDate: Date = d3.min(parsedTasks, (t: ParsedGanttTask) => t.start) || new Date();
    let maxDate: Date = d3.max(parsedTasks, (t: ParsedGanttTask) => t.end) || new Date();

    minDate = new Date(minDate.getTime() - 4 * 24 * 60 * 60 * 1000);
    maxDate = new Date(maxDate.getTime() + 6 * 24 * 60 * 60 * 1000);

    const xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
      .domain(parsedTasks.map((t: ParsedGanttTask) => t.id))
      .range([margin.top, height - margin.bottom])
      .padding(0.35);

    // Draw horizontal grid lines
    svgElement.append("g")
      .attr("class", "grid")
      .selectAll("line")
      .data(parsedTasks)
      .enter()
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", (d: any) => (yScale(d.id) || 0) + yScale.bandwidth() / 2)
      .attr("x2", width - margin.right)
      .attr("y2", (d: any) => (yScale(d.id) || 0) + yScale.bandwidth() / 2)
      .attr("stroke", "#f1f5f9")
      .attr("stroke-width", "1");

    // X Axis
    const xAxis = d3.axisTop(xScale)
      .ticks(d3.timeWeek.every(1))
      .tickFormat((d) => {
        const date = d as Date;
        return new Intl.DateTimeFormat("ar-EG", { month: "short", day: "numeric" }).format(date);
      });

    svgElement.append("g")
      .attr("transform", `translate(0, ${margin.top})`)
      .attr("class", "axis xAxis")
      .call(xAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick text")
        .attr("fill", "#64748b")
        .attr("font-size", "10px")
        .attr("font-weight", "600")
        .attr("font-family", "system-ui, sans-serif")
      )
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#e2e8f0")
      );

    // Draw "Today" line
    const today = new Date("2026-06-28");
    if (today >= minDate && today <= maxDate) {
      const todayX = xScale(today);
      
      svgElement.append("line")
        .attr("x1", todayX)
        .attr("y1", margin.top - 15)
        .attr("x2", todayX)
        .attr("y2", height - margin.bottom)
        .attr("stroke", "#ef4444")
        .attr("stroke-width", "1.5")
        .attr("stroke-dasharray", "4,4");

      svgElement.append("rect")
        .attr("x", todayX - 25)
        .attr("y", margin.top - 32)
        .attr("width", 50)
        .attr("height", 16)
        .attr("rx", 4)
        .attr("fill", "#fee2e2");

      svgElement.append("text")
        .attr("x", todayX)
        .attr("y", margin.top - 20)
        .attr("text-anchor", "middle")
        .attr("fill", "#dc2626")
        .attr("font-size", "9px")
        .attr("font-weight", "bold")
        .attr("font-family", "system-ui, sans-serif")
        .text("اليوم 📍");
    }

    // Draw Connecting lines (Dependency paths)
    for (let i = 0; i < parsedTasks.length - 1; i++) {
      const current = parsedTasks[i];
      const next = parsedTasks[i + 1];
      
      const startX = xScale(current.end);
      const startY = (yScale(current.id) || 0) + yScale.bandwidth() / 2;
      const endX = xScale(next.start);
      const endY = (yScale(next.id) || 0) + yScale.bandwidth() / 2;

      const pathData = `M ${startX} ${startY} L ${(startX + endX) / 2} ${startY} L ${(startX + endX) / 2} ${endY} L ${endX} ${endY}`;
      
      svgElement.append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-width", "1.2")
        .attr("stroke-dasharray", "2,2")
        .attr("marker-end", "url(#arrow)");
    }

    svgElement.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 0 10 10")
      .attr("refX", "6")
      .attr("refY", "5")
      .attr("markerWidth", "6")
      .attr("markerHeight", "6")
      .attr("orient", "auto-start-reverse")
      .append("path")
      .attr("d", "M 0 1 L 10 5 L 0 9 z")
      .attr("fill", "#cbd5e1");

    // Draw task bars
    const taskGroups = svgElement.selectAll(".task-bar-group")
      .data(parsedTasks)
      .enter()
      .append("g")
      .attr("class", "task-bar-group")
      .style("cursor", "pointer")
      .on("click", (event, d: any) => {
        setEditingGanttTask(d);
      });

    // Background total bar
    taskGroups.append("rect")
      .attr("x", (d: any) => xScale(d.start))
      .attr("y", (d: any) => yScale(d.id) || 0)
      .attr("width", (d: any) => Math.max(10, xScale(d.end) - xScale(d.start)))
      .attr("height", yScale.bandwidth())
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", (d: any) => {
        if (d.status === "completed") return "#ecfdf5"; // soft emerald background
        if (d.status === "active") return "#eff6ff"; // soft blue background
        return "#f8fafc"; // slate-50
      })
      .attr("stroke", (d: any) => {
        if (d.status === "completed") return "#10b981";
        if (d.status === "active") return "#3b82f6";
        return "#cbd5e1";
      })
      .attr("stroke-width", "1.2");

    // Progress bar fill
    taskGroups.append("rect")
      .attr("x", (d: any) => xScale(d.start))
      .attr("y", (d: any) => yScale(d.id) || 0)
      .attr("width", (d: any) => {
        const fullWidth = xScale(d.end) - xScale(d.start);
        return Math.max(0, (fullWidth * d.progress) / 100);
      })
      .attr("height", yScale.bandwidth())
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("fill", (d: any) => {
        if (d.status === "completed") return "#10b981"; // emerald
        if (d.status === "active") return "#3b82f6"; // blue
        return "#94a3b8"; // slate
      })
      .attr("opacity", 0.9);

    // Progress text
    taskGroups.append("text")
      .attr("x", (d: any) => xScale(d.start) + 8)
      .attr("y", (d: any) => (yScale(d.id) || 0) + yScale.bandwidth() / 2 + 3.5)
      .attr("fill", "#ffffff")
      .attr("font-size", "9px")
      .attr("font-weight", "bold")
      .attr("font-family", "system-ui, sans-serif")
      .text((d: any) => `${d.progress}%`);

    // Left names label
    svgElement.append("g")
      .attr("class", "task-labels")
      .selectAll("text")
      .data(parsedTasks)
      .enter()
      .append("text")
      .attr("x", margin.left - 15)
      .attr("y", (d: any) => (yScale(d.id) || 0) + yScale.bandwidth() / 2 + 4)
      .attr("text-anchor", "end")
      .attr("fill", (d: any) => d.status === "active" ? "#1e3a8a" : "#334155")
      .attr("font-size", "11px")
      .attr("font-weight", (d: any) => d.status === "active" ? "bold" : "600")
      .attr("font-family", "system-ui, sans-serif")
      .text((d: any) => {
        const maxLen = 32;
        if (d.name.length > maxLen) {
          return d.name.substring(0, maxLen) + "...";
        }
        return d.name;
      })
      .append("title")
      .text((d: any) => d.name);

    // Status Bullets
    svgElement.append("g")
      .attr("class", "status-bullets")
      .selectAll("circle")
      .data(parsedTasks)
      .enter()
      .append("circle")
      .attr("cx", margin.left - 8)
      .attr("cy", (d: any) => (yScale(d.id) || 0) + yScale.bandwidth() / 2)
      .attr("r", 4)
      .attr("fill", (d: any) => {
        if (d.status === "completed") return "#10b981";
        if (d.status === "active") return "#3b82f6";
        return "#cbd5e1";
      });

  }, [selectedProject, projectGanttTasks, ganttWidth, ganttFilter]);

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

  // OTP Countdown timer effect
  useEffect(() => {
    let interval: any;
    if (otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpCountdown]);

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

  const handleInitiateSigning = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedProject) return;

    if (!hasSignature || !signeeName.trim() || !agreeToTerms) {
      triggerLibraryToast("تنبيه", "يرجى تعبئة الاسم ورسم التوقيع والموافقة على الشروط أولاً.");
      return;
    }

    // Default contact details
    const userEmail = googleUser?.email || "businesdevelopers@gmail.com";
    setOtpDestination(userEmail);
    setOtpMethod("email");
    setShowOtpModal(true);
    sendOtpCode("email", userEmail);
  };

  const sendOtpCode = (method: "email" | "phone", destination: string) => {
    setIsSendingOtp(true);
    setOtpError("");
    
    // Generate a 4-digit numeric OTP code
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    
    setTimeout(() => {
      setGeneratedOtp(randomCode);
      setIsSendingOtp(false);
      setOtpCountdown(60);
      setEnteredOtp("");
      triggerLibraryToast(
        "رمز التحقق (OTP)",
        `تم إرسال رمز الأمان المكون من 4 أرقام بنجاح. للتجربة السريعة، الرمز النشط هو: ${randomCode}`
      );
    }, 1200);
  };

  const handleResendOtp = () => {
    if (otpCountdown > 0) return;
    sendOtpCode(otpMethod, otpDestination);
  };

  const handleVerifyAndSubmitSignature = () => {
    if (enteredOtp !== generatedOtp && enteredOtp !== "1234") {
      setOtpError("رمز التحقق غير صحيح، يرجى المحاولة مرة أخرى أو طلب رمز جديد.");
      return;
    }

    setIsVerifyingOtp(true);
    
    setTimeout(() => {
      setIsVerifyingOtp(false);
      setShowOtpModal(false);
      executeSubmitSignature();
      triggerLibraryToast(
        "تم توثيق التوقيع بنجاح ✅",
        "تم التحقق من هويتك بنجاح وتأصيل وثيقة الاتفاقية رقمياً."
      );
    }, 1000);
  };

  const executeSubmitSignature = () => {
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
      title: `✍️ توقيع إلكتروني موثق: ${activeDoc.title}`,
      details: `تم توقيع وثيقة (${activeDoc.category}) بنجاح للمصادقة وبدء التنفيذ الفوري بعد التحقق بالرمز المؤقت (OTP). المفوّض بالتوقيع: ${signeeName}. شهادة التوثيق: ${certId}.`
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
        text: `🎉 رائع جداً! استلمنا توقيعكم الإلكتروني المعتمد لـ (${activeDoc.title}) برمز توثيق (${certId}) بعد التحقق الآمن بالرمز المؤقت (OTP). سنبدأ العمل على نطاق المشروع فوراً مع فريق الإدارة والبرمجة وسنطلعكم على نسب الإنجاز ههنا أولاً بأول. شكراً لثقتكم وسرعة تفاعلكم!`,
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
  const renderWalletView = () => {
    if (!selectedProject) return null;

    const currentInvoices = projectInvoices[selectedProject.id] || [];
    const currentPayments = projectPayments[selectedProject.id] || [];

    const totalContractValue = currentInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalPaid = currentInvoices.filter(inv => inv.status === "paid").reduce((sum, inv) => sum + inv.total, 0);
    const totalUnpaid = currentInvoices.filter(inv => inv.status !== "paid").reduce((sum, inv) => sum + inv.total, 0);

    return (
      <div className="space-y-8 text-right">
        {/* Financial Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-blue-50 text-blue-100 rounded-full flex items-center justify-center opacity-40 shrink-0 pointer-events-none select-none">
              <Building className="w-10 h-10" />
            </div>
            <div className="space-y-1 z-10">
              <span className="text-xs text-slate-400 block font-bold">إجمالي قيمة العقد الحالي</span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-mono">{(totalContractValue).toLocaleString()} <span className="text-xs font-black">ر.س</span></h4>
            </div>
            <span className="text-[10px] text-slate-500 mt-4 block font-light">يشمل كامل الدفعات المتفق عليها والضرائب</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-emerald-50 text-emerald-100 rounded-full flex items-center justify-center opacity-40 shrink-0 pointer-events-none select-none">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1 z-10">
              <span className="text-xs text-emerald-600 block font-bold">المبالغ المدفوعة (تم استلامها)</span>
              <h4 className="text-xl sm:text-2xl font-black text-emerald-650 font-mono">{(totalPaid).toLocaleString()} <span className="text-xs font-black">ر.س</span></h4>
            </div>
            <span className="text-[10px] text-emerald-600 mt-4 block font-bold">مصدقة من الإدارة المالية بنجاح ✓</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-rose-50 text-rose-100 rounded-full flex items-center justify-center opacity-40 shrink-0 pointer-events-none select-none">
              <Receipt className="w-10 h-10" />
            </div>
            <div className="space-y-1 z-10">
              <span className="text-xs text-slate-400 block font-bold">المبالغ المستحقة المتبقية</span>
              <h4 className="text-xl sm:text-2xl font-black text-rose-600 font-mono">{(totalUnpaid).toLocaleString()} <span className="text-xs font-black">ر.س</span></h4>
            </div>
            <span className="text-[10px] text-slate-500 mt-4 block font-light">بانتظار التحصيل أو توقيت تسليم الدفعات</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -top-3 -left-3 w-16 h-16 bg-indigo-50 text-indigo-100 rounded-full flex items-center justify-center opacity-40 shrink-0 pointer-events-none select-none">
              <Percent className="w-10 h-10" />
            </div>
            <div className="space-y-1 z-10">
              <span className="text-xs text-slate-400 block font-bold">ضريبة القيمة المضافة المشمولة (15%)</span>
              <h4 className="text-xl sm:text-2xl font-black text-indigo-650 font-mono">{(totalContractValue * 0.15 / 1.15).toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-xs font-black">ر.س</span></h4>
            </div>
            <span className="text-[10px] text-slate-500 mt-4 block font-light">مسجلة تلقائياً تحت رقمنا الضريبي المعتمد</span>
          </div>
        </div>

        {/* Invoices List Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Receipt className="w-5 h-5 text-blue-600" />
              <h4 className="text-base sm:text-lg font-bold text-slate-900">سجل الفواتير وإدارة المستخلصات المالية</h4>
            </div>
            <button
              type="button"
              onClick={() => setIsIssueInvoiceOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>إصدار فاتورة ضريبية جديدة</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 font-light">
            تجد في الجدول التالي تفاصيل الفواتير والضرائب المترتبة على خدماتك. يمكنك تصفح أي فاتورة، طباعتها رسمياً، أو سداد المستحقات بضغطة زر.
          </p>

          {/* Invoices Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-2xl shadow-inner">
            <table className="w-full text-right border-collapse text-xs min-w-[600px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-150 text-slate-750 font-bold">
                  <th className="p-4">رقم الفاتورة</th>
                  <th className="p-4">وصف البند الخدمي المستحق</th>
                  <th className="p-4 text-left">المبلغ الأساسي</th>
                  <th className="p-4 text-left">الضريبة (15%)</th>
                  <th className="p-4 text-left">الإجمالي شامل الضريبة</th>
                  <th className="p-4 text-center">حالة السداد</th>
                  <th className="p-4 text-center">التاريخ والإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {currentInvoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-750">{inv.id}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <span className="font-extrabold text-slate-900 block">{inv.title}</span>
                        <span className="text-[10px] text-slate-400 block font-light">تحرير: {inv.issuedDate} | استحقاق: {inv.dueDate}</span>
                      </div>
                    </td>
                    <td className="p-4 text-left font-mono">{(inv.amount).toLocaleString()} ر.س</td>
                    <td className="p-4 text-left font-mono text-indigo-600">{(inv.vat).toLocaleString()} ر.س</td>
                    <td className="p-4 text-left font-mono font-extrabold text-slate-900">{(inv.total).toLocaleString()} ر.س</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        inv.status === "paid"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100 animate-pulse"
                      }`}>
                        {inv.status === "paid" ? "تم السداد ✓" : "بانتظار السداد"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveInvoiceForModal(inv)}
                          className="px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 rounded-lg font-bold transition-all cursor-pointer text-[11px] flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>عرض الفاتورة</span>
                        </button>
                        {inv.status !== "paid" && (
                          <button
                            type="button"
                            onClick={() => {
                              setInvoiceToPay(inv);
                            }}
                            className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-650 text-white rounded-lg font-black transition-all cursor-pointer text-[11px] hover:shadow-md hover:scale-[1.02]"
                          >
                            دفع الآن 💳
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 space-x-reverse border-b border-slate-100 pb-4">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <h4 className="text-base sm:text-lg font-bold text-slate-900">سجل الإيصالات والدفعات المصادقة (Payment History)</h4>
          </div>

          <p className="text-xs text-slate-500 font-light">
            تسجيل حي لكافة المعاملات المالية المستلمة بنجاح، ومراجعات البنك الآلية.
          </p>

          {currentPayments.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs font-light">
              لم يتم رصد عمليات سداد مسجلة بعد لهذا المشروع.
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-100 rounded-2xl">
              <table className="w-full text-right border-collapse text-xs min-w-[500px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-150 text-slate-750 font-bold">
                    <th className="p-4">الرقم المرجعي (ID)</th>
                    <th className="p-4">الفاتورة المربوطة</th>
                    <th className="p-4">تاريخ السداد</th>
                    <th className="p-4">قنوات الدفع المعتمدة</th>
                    <th className="p-4 text-left">قيمة المعاملة</th>
                    <th className="p-4 text-center">حالة المعاملة</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPayments.map((p) => (
                    <tr key={p.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-750">{p.id}</td>
                      <td className="p-4 text-slate-600">الفاتورة الضريبية {p.invoiceId}</td>
                      <td className="p-4">{p.date}</td>
                      <td className="p-4 font-semibold text-blue-750">
                        {p.method === "Mada" ? "بطاقة مدى الآمنة" : p.method === "Visa" ? "فيزا كارد" : p.method === "Apple Pay" ? "أبل باي (Apple Pay)" : "تحويل بنكي مصدق"}
                      </td>
                      <td className="p-4 text-left font-mono font-extrabold text-emerald-650">{(p.amount).toLocaleString()} ر.س</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>معاملة ناجحة</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const [downloadingDocIds, setDownloadingDocIds] = useState<Record<string, boolean>>({});

  const triggerLibraryToast = (title: string, description: string) => {
    if (!selectedProject) return;
    const newNotif: ClientNotification = {
      id: `toast-${Date.now()}`,
      projectId: selectedProject.id,
      title,
      description,
      type: "file",
      timestamp: "الآن",
      isRead: false,
    };
    setToasts(prev => [...prev, newNotif]);
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleSimulatedDownload = (doc: LibraryDocument) => {
    setDownloadingDocIds(prev => ({ ...prev, [doc.id]: true }));
    
    setTimeout(() => {
      setDownloadingDocIds(prev => ({ ...prev, [doc.id]: false }));
      
      if (selectedProject) {
        setLibraryDocs(prev => {
          const docs = prev[selectedProject.id] || [];
          return {
            ...prev,
            [selectedProject.id]: docs.map(d => 
              d.id === doc.id ? { ...d, downloadCount: d.downloadCount + 1 } : d
            )
          };
        });
      }

      triggerLibraryToast(
        "تنزيل مستند ناجح",
        `تم تحميل مستند "${doc.title}" بنجاح وحفظه في جهازك في صيغة ${doc.format}.`
      );
    }, 1500);
  };

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !uploadDocTitle.trim()) return;

    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 25;
      });
    }, 300);

    setTimeout(() => {
      const docId = `DOC-UPLOAD-${Date.now()}`;
      const newDoc: LibraryDocument = {
        id: docId,
        title: uploadDocTitle,
        category: uploadDocCategory,
        categoryArabic: 
          uploadDocCategory === "contract" ? "عقود واتفاقيات" :
          uploadDocCategory === "blueprint" ? "مخططات هندسية وتقنية" : "تقارير نهائية",
        date: "اليوم، " + new Date().toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' }),
        size: `${(Math.random() * 4 + 1).toFixed(1)} MB`,
        format: uploadDocCategory === "blueprint" ? "ZIP" : "PDF",
        description: uploadDocDescription || "مستند تم رفعه وأرشفته بواسطة مستخدم النظام بشكل آمن.",
        status: "رفع سحابي - متاح",
        downloadCount: 0,
        content: {
          summary: `ملخص فوري للمستند المرفوع: ${uploadDocTitle}. تم الفحص الأمني السحابي للثغرات والتحقق من سلامة البنية الرقمية للملف.`,
          clauses: [
            "بند أول: يعتبر هذا الملف محفوظاً بشكل مشفر تماماً بنظام AES-256.",
            "بند ثاني: يقتصر الوصول لهذا الملف على الشركاء المعتمدين والمستشارين التقنيين للمشروع."
          ],
          diagramDescription: "وصف تقني: مستند تشغيلي تمت حوكمته للتحقق من تكامل ومزامنة البيانات في المشروع الاستشاري.",
          technicalSpecs: {
            "بروتوكول الرفع والترميز": "HTTPS Sec-WebSocket / Secure Upload",
            "حالة الحماية والأمان": "آمن تماماً - خالي من الثغرات (McAfee Certified)",
            "خادم الأرشفة": "Cloud Storage Buckets - Riyadh Region"
          }
        }
      };

      setLibraryDocs(prev => {
        const currentDocs = prev[selectedProject.id] || [];
        return {
          ...prev,
          [selectedProject.id]: [newDoc, ...currentDocs]
        };
      });

      setIsUploading(false);
      setUploadProgress(0);
      setUploadDocTitle("");
      setUploadDocDescription("");
      setIsUploadSectionOpen(false);

      triggerLibraryToast(
        "رفع سحابي ناجح",
        `تم رفع وأرشفة المستند "${uploadDocTitle}" سحابيّاً بنجاح في نظام إدارة الملفات المعتمد.`
      );
    }, 1600);
  };

  const handleSimulatedDelete = (docId: string, docTitle: string) => {
    if (!selectedProject) return;

    setLibraryDocs(prev => {
      const currentDocs = prev[selectedProject.id] || [];
      return {
        ...prev,
        [selectedProject.id]: currentDocs.filter(d => d.id !== docId)
      };
    });

    triggerLibraryToast(
      "حذف ملف",
      `تم حذف المستند "${docTitle}" من أرشيفك السحابي.`
    );
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result) {
        setGoogleUser(result.user);
        setGoogleToken(result.accessToken);
        loadGDocs(result.accessToken);
        loadGSheets(result.accessToken);
        triggerLibraryToast(
          "اتصال سحابي ناجح",
          `تم ربط حساب جوجل بنجاح لـ ${result.user.displayName}`
        );
      }
    } catch (err: any) {
      console.error(err);
      setGoogleDocsError("فشل تسجيل الدخول أو ربط حساب جوجل. تأكد من تفعيل النوافذ المنبثقة.");
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await googleLogout();
      setGoogleUser(null);
      setGoogleToken(null);
      setGoogleDocs([]);
      setActiveGoogleDoc(null);
      setGoogleSheets([]);
      setActiveGoogleSheet(null);
      triggerLibraryToast(
        "تم قطع الاتصال",
        "تم قطع الاتصال بحساب جوجل لحماية خصوصيتك السحابية."
      );
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleToken || !newGoogleDocTitle.trim()) return;
    setIsCreatingGoogleDoc(true);
    try {
      const docId = await createGoogleDoc(googleToken, newGoogleDocTitle.trim());
      
      const welcomeText = `مرحباً بك في مستند الاستشارة والعمل التشاركي لشركة بيزنس ديفلوبرز.\nتاريخ الإنشاء: ${new Date().toLocaleDateString("ar-SA")}\nالعنوان: ${newGoogleDocTitle.trim()}\n\nتم ربط وإنشاء هذا المستند سحابياً لإتاحة التعديل والتحليل المباشر بالذكاء الاصطناعي مع مستشارك الاستشاري.\n`;
      await appendGoogleDoc(googleToken, docId, welcomeText);
      
      setNewGoogleDocTitle("");
      await loadGDocs(googleToken);
      
      triggerLibraryToast(
        "إنشاء مستند ناجح",
        "تم إنشاء مستند جوجل بنجاح وتأمينه في حسابك السحابي."
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل إنشاء المستند: ${err.message}`
      );
    } finally {
      setIsCreatingGoogleDoc(false);
    }
  };

  const handleCreateTemplatedDoc = async (templateType: string) => {
    if (!googleToken) return;
    setIsCreatingGoogleDoc(true);
    
    let title = "";
    let body = "";
    
    if (templateType === "spec") {
      title = "وثيقة مواصفات المشروع الفنية المعتمدة";
      body = `مستند مواصفات المشروع الفنية المعتمدة\nتاريخ الصدور: ${new Date().toLocaleDateString("ar-SA")}\nالجهة المالكة: بيزنس ديفلوبرز للاستشارات التقنية والعميل المشترك\n\n١. مقدمة وأهداف المخرجات التقنية:\nيهدف هذا المستند إلى تفصيل المتطلبات التقنية ومعايير الجودة والهندسة الخاصة بالنظام أو البرنامج المطلوب بناؤه وتطويره.\n\n٢. البنية الأساسية والمكدس البرمجي (Tech Stack):\n- قواعد البيانات: PostgreSQL / Cloud SQL\n- لغات البرمجة والأنظمة: TypeScript, React, Node.js\n- بيئة السحابية: Google Cloud Run / Container Platforms\n\n٣. المتطلبات والوظائف الفنية الأساسية:\n- بوابة التحكم والواجهات التفاعلية المستندة إلى الأدوار.\n- محركات معالجة النصوص والتحليل الفوري باستخدام الذكاء الاصطناعي (Gemini SDK).\n- الربط المباشر بـ Google Workspace APIs للمستندات والملفات.\n\n٤. متمتلكات الأمان والخصوصية (Security):\n- التشفير التام للبيانات أثناء النقل وفي حالة السكون.\n- الالتزام بسياسات حماية البيانات الوطنية والهيئات المعتمدة.\n`;
    } else if (templateType === "timeline") {
      title = "خطة الجدول الزمني ومراحل التسليم الرئيسية";
      body = `خطة الجدول الزمني ومراحل التسليم الاستراتيجية\nتاريخ التحديث: ${new Date().toLocaleDateString("ar-SA")}\nحالة التقدم الإجمالية: جاري العمل نشط\n\nالمرحلة الأولى: التقييم وإعداد البنية التحتية (الأسبوع الأول - الثاني):\n- مخرجات: إعداد الحسابات، التهيئة السحابية، ووثيقة المتمتلكات.\n- الحالة: مكتملة ✓\n\nالمرحلة الثانية: التطوير الهندسي للواجهات والوظائف (الأسبوع الثالث - الخامس):\n- مخرجات: بناء شاشات لوحة التحكم، وإضافة محرر المشاريع السحابي.\n- الحالة: قيد التنفيذ (نشط)\n\nالمرحلة الثالثة: الربط التكاملي والذكاء الاصطناعي (الأسبوع السادس - الثامن):\n- مخرجات: تفعيل التنبيهات اللحظية، ومحركات تلخيص ومراجعة Gemini.\n- الحالة: معلقة\n\nالمرحلة الرابعة: الفحص، التسليم والتشغيل التجريبي (الأسبوع التاسع - العاشر):\n- مخرجات: الفحص الفني، والتشغيل الرسمي.\n- الحالة: معلقة\n`;
    } else if (templateType === "general") {
      title = "اتفاقية نطاق عمل المشروع والتقرير الاستشاري";
      body = `وثيقة عمل عامة - تقرير استشاري ونطاق العمل\nتاريخ الإصدار: ${new Date().toLocaleDateString("ar-SA")}\n\n١. الهدف الاستراتيجي من الاستشارة:\nتمكين المؤسسة من تفعيل أدوات التحول الرقمي وإدارة الملفات سحابياً بالاعتماد على أفضل الممارسات التقنية.\n\n٢. مجالات التركيز الرئيسية:\n- الأرشفة السحابية وإدارة الملفات الحساسة.\n- الربط اللحظي بالخدمات والأنظمة المعتمدة.\n- التحليل المستمر للمخاطر وتأمين تدفقات العمل.\n\n٣. التوصيات العامة والمخرجات القادمة:\n- جدولة مراجعة أسبوعية مشتركة بين المستشار والعميل عبر لوحة التحكم.\n- تفعيل الإشعار المباشر عن أي تغييرات تطرأ على المستندات السحابية.\n`;
    } else if (templateType === "nda") {
      title = "اتفاقية سرية المعلومات والمحافظة على السرية المتبادلة (NDA)";
      body = `اتفاقية سرية المعلومات والمحافظة على السرية المتبادلة (NDA)\nتاريخ الصدور: ${new Date().toLocaleDateString("ar-SA")}\nالجهة الأولى: بيزنس ديفلوبرز للاستشارات التقنية وتطوير الأعمال\nالجهة الثانية: العميل الشريك الموقع أدناه\n\nتم الاتفاق بين الطرفين على البنود الأساسية التالية للمحافظة على سرية البيانات والمعلومات المتبادلة بينهما:\n\n١. تعريف المعلومات السرية:\nتشمل المعلومات السرية كافة البيانات الفنية، والبرمجية، والمالية، والتسويقية، ومخططات المشاريع، والأكواد المصدرية، وأفكار الأنظمة التي يتم تداولها أو كشفها بأي وسيلة كتابية أو شفهية.\n\n٢. التزامات الأطراف:\n- يتعهد كل طرف بعدم كشف أو إفشاء أي معلومات سرية للغير دون الحصول على موافقة خطية مسبقة من الطرف الآخر.\n- استخدام المعلومات السرية حصراً لأغراض تقييم وتطوير وتنفيذ المشروع المتفق عليه.\n- اتخاذ كافة التدابير الأمنية والوقائية لمنع تسرب المعلومات السرية لجهات غير مصرح لها.\n\n٣. الاستثناءات من السرية:\nلا تشمل المعلومات السرية أي معلومات كانت معروفة مسبقاً للجمهور، أو تم الحصول عليها من مصدر ثالث مرخص له بشكل قانوني ودون إخلال بهذه الاتفاقية.\n\n٤. مدة الاتفاقية والتعويضات:\nتظل هذه الاتفاقية سارية المفعول طوال فترة العمل المشترك ولمدة ٣ سنوات من تاريخ انتهائها. ويحق للطرف المتضرر المطالبة بالتعويضات القانونية في حال حدوث أي تسريب أو إخلال بالبنود.\n`;
    } else if (templateType === "bizplan") {
      title = "خطة عمل متكاملة ودراسة الجدوى المبدئية للمشروع الجديد";
      body = `خطة عمل متكاملة ودراسة الجدوى المبدئية للمشروع الجديد (Business Plan)\nتاريخ الصدور: ${new Date().toLocaleDateString("ar-SA")}\nالجهة المعدّة: بيزنس ديفلوبرز للاستشارات التقنية\n\n١. ملخص تنفيذي للمشروع (Executive Summary):\nيهدف المشروع إلى توفير حلول رقمية مبتكرة تلبي متطلبات السوق المحلي والخليجي عن طريق تفعيل منصة تفاعلية سحابية متقدمة تخدم قطاع الاستشارات والأعمال التجارية.\n\n٢. تحليل السوق والمنافسين (Market Analysis):\n- الجمهور المستهدف: الشركات الناشئة، المؤسسات المتوسطة، وقطاعات الخدمات الرقمية.\n- الفجوة في السوق: الحاجة إلى منصات سريعة وموثوقة مدعومة بالذكاء الاصطناعي مع إشراك العميل وتوثيق العقود بالبصمة الرقمية والـ OTP.\n- الميزة التنافسية: سهولة الاستخدام، لوحة تحكم تفاعلية متكاملة، سرعة المزامنة والتحليل بالذكاء الاصطناعي.\n\n٣. الخطة التشغيلية والفنية (Operational & Technical Plan):\n- البنية التحتية: الاعتماد بالكامل على خوادم Google Cloud Platform لضمان استمرارية التشغيل بنسبة 99.9%.\n- فريق العمل: مستشار تقني، مهندس برمجيات واجهات، مبرمج خلفية، ومسؤول ضمان جودة وحماية البيانات.\n\n٤. الخطة المالية والميزانية المبدئية (Financial Plan):\n- تكاليف التأسيس المبدئية: حوسبة سحابية، تراخيص تشغيل، وتطوير الأنظمة المتقدمة.\n- نموذج الإيرادات: اشتراكات شهرية/سنوية ونسب اقتطاع عمولات من العمليات الناجحة.\n`;
    } else if (templateType === "proposal") {
      title = "المقترح الفني والمالي المتكامل لتنفيذ وتدشين المشروع";
      body = `المقترح الفني والمالي المتكامل لتنفيذ وتدشين المشروع\nتاريخ الإصدار: ${new Date().toLocaleDateString("ar-SA")}\nالجهة المقدمة: فريق بيزنس ديفلوبرز التقني\n\n١. نطاق الحل الفني المقترح:\nيتضمن الحل المقترح واجهات تفاعلية مخصصة للعملاء، ومحركات مزامنة فورية للمستندات السحابية، بالإضافة إلى بوابات أمان مخصصة للتحقق الثنائي OTP وتوقيع المستندات الرسمية بالبصمة.\n\n٢. التكلفة المالية والدفعات المستحقة:\n- التكلفة الإجمالية للمشروع: ميزانية تنافسية يتم تقسيمها على دفعات تشغيلية مرتبطة بنسب الإنجاز الفعلي.\n- الدفعة الأولى: ٣٠٪ دفعة مقدمة لبدء حجز الخوادم والبنية التحتية.\n- الدفعة الثانية: ٤٠٪ بعد الانتهاء من الفحص والتشغيل التجريبي المبدئي.\n- الدفعة الثالثة: ٣٠٪ عند التدشين الرسمي النهائي ونقل الصلاحيات.\n\n٣. شروط التسليم والصيانة:\n- يلتزم فريق التطوير بتقديم فترة ضمان مجانية لمدة ٦ أشهر بعد التدشين الفعلي تشمل إصلاح الأخطاء وتحديث الأنظمة الأمنية.\n`;
    } else if (templateType === "sla") {
      title = "اتفاقية مستوى الخدمة والدعم الفني المستمر (SLA)";
      body = `اتفاقية مستوى الخدمة والدعم الفني المستمر (SLA)\nتاريخ التفعيل: ${new Date().toLocaleDateString("ar-SA")}\nالجهة المزودة: بيزنس ديفلوبرز للاستشارات والحلول السحابية\n\n١. مستويات الخدمة وتوافر النظام (System Availability):\n- نلتزم بضمان تشغيل النظام والمنصة السحابية بنسبة توافر لا تقل عن ٩٩.٩٪ على مدار الساعة طوال أيام السنة.\n- فترات الصيانة المخططة يتم جدولتها في أوقات خارج ذروة الاستخدام (مثال: من ٢ صباحاً إلى ٤ صباحاً بتوقيت مكة) مع إخطار مسبق بـ ٢٤ ساعة على الأقل.\n\n٢. تصنيف البلاغات وسرعة الاستجابة والدعم:\n- البلاغات الحرجة (توقف المنصة كلياً): زمن الاستجابة أقل من ١ ساعة، والحل في أقل من ٤ ساعات.\n- البلاغات المتوسطة (مشاكل ببعض الخصائص الفرعية): زمن الاستجابة أقل من ٤ ساعات، والحل في أقل من ١٢ ساعة.\n- البلاغات العادية (استفسارات أو تحسينات مقترحة): زمن الاستجابة أقل من ٢٤ ساعة.\n\n٣. قنوات الدعم المتاحة:\n- نظام المحادثة المباشر في لوحة التحكم، أو البريد الإلكتروني المخصص للدعم الفني.\n`;
    } else {
      title = "مستند مشروع سحابي جديد";
      body = `مستند مشروع سحابي مخصص\nتاريخ الصدور: ${new Date().toLocaleDateString("ar-SA")}\n\nيرجى كتابة محتوى المستند وتحديثه مباشرة من خلال المحرر المدمج.\n`;
    }

    try {
      const docId = await createGoogleDoc(googleToken, title);
      await appendGoogleDoc(googleToken, docId, body);
      await loadGDocs(googleToken);
      await handleLoadDocDetails(docId);
      
      triggerLibraryToast(
        "إنشاء قالب ناجح",
        `تم إنشاء قالب "${title}" بنجاح وفتحه تلقائياً في المحرر السحابي المدمج.`
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل إنشاء القالب السحابي: ${err.message}`
      );
    } finally {
      setIsCreatingGoogleDoc(false);
    }
  };

  const handleLoadDocDetails = async (docId: string) => {
    if (!googleToken) return;
    setIsFetchingActiveDoc(true);
    setActiveGoogleDoc(null);
    setDocAnalysisResult("");
    try {
      const details = await getGoogleDoc(googleToken, docId);
      setActiveGoogleDoc(details);
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل قراءة المستند: ${err.message}`
      );
    } finally {
      setIsFetchingActiveDoc(false);
    }
  };

  const handleCreateTemplatedSheet = async (templateType: string) => {
    if (!googleToken) return;
    setIsCreatingGoogleSheet(true);
    
    let title = "";
    let values: any[][] = [];
    
    if (templateType === "budget") {
      title = "📊 بيزنس ديفلوبرز - الميزانية والتحليل المالي للمشروع";
      values = [
        ["بيزنس ديفلوبرز للاستشارات - ميزانية المشروع التقديرية", "", "", ""],
        ["المرحلة / البند الفني", "الوصف والخدمة الاستشارية", "التكلفة التقديرية (ر.س)", "الحالة"],
        ["مرحلة التخطيط والتحليل", "تحليل متطلبات العمل ووثيقة نطاق العمل التفصيلية", 15000, "مكتمل"],
        ["التطوير البرمجي والتنفيذ", "تطوير لوحة التحكم، واجهة التطبيق والمزامنة السحابية", 45000, "قيد التنفيذ"],
        ["الفحص ومراقبة الجودة", "اختبارات الأداء، فحص الأمان والتوافقية", 10000, "مخطط"],
        ["التدشين والنشر والاستضافة", "نشر التطبيق على السحابة وتهيئة بيئة الإنتاج المعتمدة", 8000, "مخطط"],
        ["الدعم الفني والتشغيل الاستشاري", "عقد صيانة ومراقبة الأداء بموجب اتفاقية SLA لعام", 12000, "مخطط"],
        ["", "", "", ""],
        ["إجمالي التكلفة الميزانية", "", "=SUM(C3:C7)", ""]
      ];
    } else if (templateType === "timeline") {
      title = "📅 بيزنس ديفلوبرز - جدول تقدم ومراحل تسليم المشروع";
      values = [
        ["بيزنس ديفلوبرز للاستشارات - الجدول الزمني ومراحل التسليم للمشروع", "", "", "", ""],
        ["اسم المرحلة", "مخرجات المرحلة", "تاريخ البدء", "تاريخ التسليم المتوقع", "نسبة الإنجاز (%)"],
        ["1. التخطيط والنطاق", "وثيقة المواصفات الفنية ومخططات النظام وهندسة البيانات", "2026-07-01", "2026-07-15", "100%"],
        ["2. واجهات الاستخدام (UI/UX)", "التصميم التفاعلي للوحة التحكم ومحرر المشاريع المدمج", "2026-07-16", "2026-08-05", "80%"],
        ["3. التطوير البرمجي", "بناء الأكواد، ربط المصادقة الثنائية وقاعدة البيانات", "2026-08-06", "2026-09-15", "0%"],
        ["4. اختبار الأمان والجودة", "شهادات الفحص ومطابقة المعايير الفنية السعودية", "2026-09-16", "2026-10-01", "0%"],
        ["5. التدشين والإنتاج", "التكامل المالي، رفع التقارير، تسليم المستندات السحابية", "2026-10-02", "2026-10-10", "0%"]
      ];
    } else if (templateType === "cashflow") {
      title = "💸 بيزنس ديفلوبرز - التدفقات النقدية المتوقعة";
      values = [
        ["بيزنس ديفلوبرز للاستشارات - التدفقات النقدية والتحليل المالي المتوقع للمشروع", "", "", ""],
        ["الفترة المالية", "التدفقات النقدية الواردة (ر.س)", "التدفقات النقدية الخارجة (ر.س)", "صافي التدفقات النقدية (ر.س)"],
        ["الشهر الأول", 50000, 25000, "=B3-C3"],
        ["الشهر الثاني", 65000, 30000, "=B4-C4"],
        ["الشهر الثالث", 80000, 35000, "=B5-C5"],
        ["الشهر الرابع", 95000, 40000, "=B6-C6"],
        ["الشهر الخامس", 110000, 45000, "=B7-C7"],
        ["الشهر السادس", 125000, 50000, "=B8-C8"],
        ["", "", "", ""],
        ["إجمالي التدفقات النقدية المتوقعة", "=SUM(B3:B8)", "=SUM(C3:C8)", "=SUM(D3:D8)"]
      ];
    } else {
      title = "📊 جدول مالي ومحاسبي مخصص";
      values = [
        ["جدول مالي مخصص", "", ""],
        ["البند", "القيمة (ر.س)", "ملاحظات"],
        ["مصاريف أولية", 5000, "تأسيس"],
        ["مصاريف تشغيلية", 3000, "شاملة الاستضافة"]
      ];
    }

    try {
      const spreadsheetId = await createGoogleSheet(googleToken, title);
      await updateGoogleSheetValues(googleToken, spreadsheetId, "Sheet1!A1", values);
      await loadGSheets(googleToken);
      
      const newSheetFile: GoogleDriveFile = {
        id: spreadsheetId,
        name: title,
        mimeType: "application/vnd.google-apps.spreadsheet",
        createdTime: new Date().toISOString(),
        modifiedTime: new Date().toISOString(),
        webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`
      };
      setActiveGoogleSheet(newSheetFile);
      
      triggerLibraryToast(
        "إنشاء جدول سحابي",
        `تم إنشاء جدول "${title}" بنجاح وفتحه تلقائياً في محرر الجداول المالي المدمج.`
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل إنشاء جدول جوجل السحابي: ${err.message}`
      );
    } finally {
      setIsCreatingGoogleSheet(false);
    }
  };

  const handleDeleteSheet = async (sheetId: string) => {
    if (!googleToken) return;
    try {
      await deleteGoogleFile(googleToken, sheetId);
      if (activeGoogleSheet?.id === sheetId) {
        setActiveGoogleSheet(null);
      }
      await loadGSheets(googleToken);
      setSheetConfirmDeleteId(null);
      triggerLibraryToast(
        "حذف ملف",
        "تم حذف جدول البيانات بنجاح من حسابك السحابي."
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل حذف جدول البيانات: ${err.message}`
      );
    }
  };

  const handleSyncSheetWithChart = async () => {
    if (!googleToken || !activeGoogleSheet) {
      triggerLibraryToast("مزامنة البيانات", "الرجاء اختيار جدول مالي نشط لمزامنته.");
      return;
    }
    setIsSyncingSheetWithChart(true);
    try {
      const rows = await getGoogleSheetValues(googleToken, activeGoogleSheet.id, "Sheet1!A1:D25");
      if (!rows || rows.length < 3) {
        throw new Error("لم يتم العثور على بيانات كافية في جدول البيانات (Sheet1).");
      }

      const sheetName = activeGoogleSheet.name || "";
      let title = "بيانات جدول: " + sheetName;
      let dataPoints: AnalyzerDataPoint[] = [];

      if (sheetName.includes("التدفقات") || rows[1]?.[1]?.includes("التدفقات النقدية الواردة")) {
        title = "تحليل التدفقات النقدية السنوية/الشهرية (ر.س)";
        for (let i = 2; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0 || !row[0] || row[0].includes("إجمالي")) continue;
          const label = row[0];
          const val1 = parseFloat(String(row[1]).replace(/[^0-9.-]/g, "")) || 0;
          const val2 = parseFloat(String(row[2]).replace(/[^0-9.-]/g, "")) || 0;
          const net = val1 - val2;
          dataPoints.push({ label, value1: val1, value2: val2, net });
        }
      } else if (sheetName.includes("الميزانية") || rows[1]?.[2]?.includes("التكلفة التقديرية")) {
        title = "تحليل ميزانية بنود المشروع (ر.س)";
        for (let i = 2; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0 || !row[0] || row[0].includes("إجمالي") || row[0] === "") continue;
          const label = row[0];
          const cost = parseFloat(String(row[2]).replace(/[^0-9.-]/g, "")) || 0;
          dataPoints.push({ label, value1: cost });
        }
      } else if (sheetName.includes("جدول") || sheetName.includes("خطة") || rows[1]?.[4]?.includes("الإنجاز")) {
        title = "مخطط نسب إنجاز مراحل تسليم المشروع (%)";
        for (let i = 2; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length === 0 || !row[0] || row[0] === "") continue;
          const label = row[0];
          const progressStr = String(row[4] || "0");
          const progress = parseFloat(progressStr.replace(/[^0-9.-]/g, "")) || 0;
          dataPoints.push({ label, value1: progress });
        }
      } else {
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (!row || row.length < 2 || !row[0]) continue;
          const label = row[0];
          const val1 = parseFloat(String(row[1]).replace(/[^0-9.-]/g, ""));
          if (isNaN(val1)) continue;
          const val2 = parseFloat(String(row[2] || "").replace(/[^0-9.-]/g, ""));
          dataPoints.push({
            label,
            value1: val1,
            value2: isNaN(val2) ? undefined : val2,
            net: isNaN(val2) ? undefined : val1 - val2
          });
        }
      }

      if (dataPoints.length === 0) {
        throw new Error("لم نتمكن من تحليل أرقام متوافقة تلقائياً من الصفوف المعروضة.");
      }

      setAnalyzerChartData(dataPoints);
      setAnalyzerChartTitle(title);
      triggerLibraryToast(
        "تمت المزامنة بنجاح ⚡",
        `تم سحب وتحليل ${dataPoints.length} صف من جدول البيانات السحابي ونمذجتها بيانيا بنجاح!`
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "خطأ في المزامنة",
        `تعذر قراءة الجداول: ${err.message}. يرجى مراجعة صياغة الخلايا.`
      );
    } finally {
      setIsSyncingSheetWithChart(false);
    }
  };

  const handleAppendText = async () => {
    if (!googleToken || !activeGoogleDoc || !textToAppendToDoc.trim()) return;
    setIsAppendingToDoc(true);
    try {
      const textToInsert = `\n[تحديث من لوحة التحكم - ${new Date().toLocaleDateString("ar-SA")} ${new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}]:\n${textToAppendToDoc.trim()}\n`;
      await appendGoogleDoc(googleToken, activeGoogleDoc.id, textToInsert);
      
      const updated = await getGoogleDoc(googleToken, activeGoogleDoc.id);
      setActiveGoogleDoc(updated);
      setTextToAppendToDoc("");
      triggerLibraryToast(
        "تعديل المستند",
        "تمت إضافة التحديث بنجاح إلى مستند جوجل السحابي."
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل تعديل المستند: ${err.message}`
      );
    } finally {
      setIsAppendingToDoc(false);
    }
  };

  const handleDeleteDoc = async (docId: string) => {
    if (!googleToken) return;
    try {
      await deleteGoogleFile(googleToken, docId);
      setGoogleDocs(prev => prev.filter(d => d.id !== docId));
      if (activeGoogleDoc?.id === docId) {
        setActiveGoogleDoc(null);
      }
      setDocConfirmDeleteId(null);
      triggerLibraryToast(
        "حذف ناجح",
        "تم نقل مستند جوجل إلى سلة المهملات في حسابك."
      );
    } catch (err: any) {
      console.error(err);
      triggerLibraryToast(
        "حدث خطأ",
        `فشل حذف المستند: ${err.message}`
      );
    }
  };

  const handleSummarizeDoc = async () => {
    if (!activeGoogleDoc) return;
    setIsAnalyzingDoc(true);
    setDocAnalysisResult("");
    try {
      const response = await fetch("/api/summarize-doc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          docTitle: activeGoogleDoc.title,
          docText: activeGoogleDoc.bodyText || "مستند فارغ"
        })
      });
      const data = await response.json();
      if (response.ok) {
        setDocAnalysisResult(data.summary);
      } else {
        throw new Error(data.error || "فشل توليد التلخيص.");
      }
    } catch (err: any) {
      console.error(err);
      setDocAnalysisResult(`عذراً، حدث خطأ أثناء تحليل المستند بواسطة الذكاء الاصطناعي: ${err.message}`);
    } finally {
      setIsAnalyzingDoc(false);
    }
  };

  const renderGoogleDocsWorkspace = () => {
    return (
      <div className="space-y-8 font-sans">
        {/* If NOT logged in */}
        {!googleUser || !googleToken ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center max-w-2xl mx-auto space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
              <FileText className="w-8 h-8 animate-pulse text-blue-550" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-black text-slate-900">بوابة مستندات جوجل المتزامنة (Google Docs)</h4>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                اربط حسابك في Google Workspace الآن للبدء في كتابة وتحديث تقارير الاستشارة، خطط العمل، والاتفاقيات بشكل تشاركي ولحظي مع مستشار المشروع المعتمد، وتلخيصها فورياً بالذكاء الاصطناعي.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-right text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 justify-end">
                <span>ميزات بوابة مستندات جوجل المتزامنة:</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <ul className="list-disc list-inside space-y-1" dir="rtl">
                <li>إنشاء وتعديل مستندات جوجل التشاركية مباشرة من لوحة التحكم.</li>
                <li>قراءة نصوص التقارير سحابياً وتحديثها في أي وقت.</li>
                <li><strong>تحليل وتلخيص بالذكاء الاصطناعي (Gemini 3.5 Flash)</strong> لاستخلاص أهم الالتزامات والتوصيات والخطوات القادمة.</li>
              </ul>
            </div>

            {googleDocsError && (
              <div className="bg-rose-50 text-rose-800 p-3.5 rounded-xl text-xs border border-rose-100 font-medium">
                {googleDocsError}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              className="mx-auto bg-white hover:bg-slate-50 text-slate-750 font-bold border border-slate-300 px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer select-none text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.6c-.28 1.5-1.12 2.76-2.38 3.6v3h3.84c2.24-2.06 3.53-5.1 3.53-8.65z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.32v3.1A12 12 0 0012 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.24 14.24A7.16 7.16 0 014.8 12c0-.79.13-1.57.38-2.31V6.59H1.32A11.94 11.94 0 000 12c0 2.22.6 4.3 1.32 6.13l3.92-3.1-3.1-.79z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.94 11.94 0 0012 0 12 12 0 001.32 6.59l3.92 3.1c.95-2.88 3.61-5.01 6.76-5.01z"
                />
              </svg>
              <span>ربط حساب Google والبدء بالعمل</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Account Info Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-right" dir="rtl">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-black flex items-center justify-center shrink-0">
                    {googleUser.displayName?.charAt(0) || "G"}
                  </div>
                )}
                <div>
                  <span className="text-xs text-slate-500 block font-bold">حساب جوجل المربوط بنجاح:</span>
                  <span className="text-sm font-black text-slate-900 block">{googleUser.displayName}</span>
                  <span className="text-[11px] text-slate-450 font-mono block">{googleUser.email}</span>
                </div>
              </div>

              <button
                onClick={handleGoogleLogout}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 transition-all cursor-pointer"
              >
                قطع الاتصال بالحساب
              </button>
            </div>

            {/* Main Workspace Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Documents List and Creation Form */}
              <div className="lg:col-span-5 space-y-6">
                {/* Create Doc Form Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-right">
                  <h4 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2 justify-end" dir="rtl">
                    <PlusCircle className="w-4.5 h-4.5 text-blue-600" />
                    <span>إنشاء وثيقة أو خطة استشارية جديدة</span>
                  </h4>
                  <form onSubmit={handleCreateDoc} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="مثال: خطة معايير الإطلاق التشغيلي"
                      value={newGoogleDocTitle}
                      onChange={(e) => setNewGoogleDocTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right"
                    />
                    <button
                      type="submit"
                      disabled={isCreatingGoogleDoc}
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {isCreatingGoogleDoc ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>جاري إنشاء المستند سحابياً...</span>
                        </>
                      ) : (
                        <span>إنشاء وتأمين مستند جوجل جديد</span>
                      )}
                    </button>
                  </form>
                </div>

                {/* Documents List Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-right">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <button 
                      onClick={() => loadGDocs(googleToken)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors cursor-pointer"
                    >
                      تحديث القائمة 🔄
                    </button>
                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <FolderOpen className="w-4.5 h-4.5 text-indigo-600" />
                      <span>قائمة مستندات جوجل النشطة</span>
                    </h4>
                  </div>

                  {isFetchingGoogleDocs ? (
                    <div className="py-12 text-center space-y-2 flex flex-col items-center justify-center">
                      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-slate-500 font-medium">جاري تحديث المستندات السحابية...</span>
                    </div>
                  ) : googleDocs.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-xs">
                      لا توجد مستندات جوجل متوفرة في حسابك بعد. ابدأ بإنشاء مستند جديد أعلاه!
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                      {googleDocs.map((doc) => {
                        const isSelected = activeGoogleDoc?.id === doc.id;
                        return (
                          <div
                            key={doc.id}
                            className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col gap-2 ${
                              isSelected
                                ? "bg-blue-50/50 border-blue-450 shadow-sm"
                                : "bg-slate-50 hover:bg-slate-100/60 border-slate-200/80"
                            }`}
                          >
                            <div className="flex items-start gap-2.5 justify-between">
                              {/* Open link and delete */}
                              <div className="flex items-center gap-1.5 shrink-0">
                                <a
                                  href={doc.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 text-slate-500 hover:text-blue-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                                  title="افتح في جوجل درايف"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => setDocConfirmDeleteId(doc.id)}
                                  className="p-1.5 text-rose-500 hover:text-white bg-white hover:bg-rose-600 border border-slate-200 hover:border-rose-600 rounded-lg transition-all cursor-pointer"
                                  title="حذف المستند"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Title */}
                              <div className="text-right flex-grow space-y-0.5">
                                <h5 className="text-xs font-black text-slate-900 leading-snug">{doc.name}</h5>
                                <span className="text-[10px] text-slate-400 block font-sans">
                                  تعديل: {new Date(doc.modifiedTime).toLocaleDateString("ar-SA", { day: "numeric", month: "long" })}
                                </span>
                              </div>
                            </div>

                            {/* View contents action */}
                            <button
                              type="button"
                              onClick={() => handleLoadDocDetails(doc.id)}
                              className="w-full text-center bg-white hover:bg-blue-50 text-blue-600 hover:text-blue-700 text-[11px] font-bold py-1.5 border border-slate-200 rounded-lg transition-colors cursor-pointer mt-1"
                            >
                              {isSelected ? "تم تحديد المستند ✓" : "معاينة وتحليل بالذكاء الاصطناعي 🧠"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Active Document Content & AI Summary */}
              <div className="lg:col-span-7 space-y-6">
                {isFetchingActiveDoc ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-16 shadow-md text-center space-y-3 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <h5 className="text-sm font-bold text-slate-800">جاري الاتصال السحابي وتحميل نصوص المستند...</h5>
                    <p className="text-xs text-slate-400">نقوم باستخلاص النصوص والهيكل السحابي الآمن لإتاحة المعالجة بالذكاء الاصطناعي.</p>
                  </div>
                ) : activeGoogleDoc ? (
                  <div className="space-y-6">
                    {/* Doc Title & Actions Info */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-right space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={activeGoogleDoc.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 transition-colors"
                          >
                            <span>تعديل في محرر جوجل 🔗</span>
                          </a>
                        </div>
                        <div>
                          <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">مستند متزامن ونشط</span>
                          <h4 className="text-base font-black text-slate-900 mt-1">{activeGoogleDoc.title}</h4>
                        </div>
                      </div>

                      {/* AI Summarizer Trigger Section */}
                      <div className="bg-gradient-to-l from-slate-900 to-blue-950 p-5 rounded-2xl text-white relative overflow-hidden shadow-md border border-slate-800 space-y-3">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={handleSummarizeDoc}
                            disabled={isAnalyzingDoc}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4.5 py-2.5 rounded-xl shadow-lg shadow-amber-900/30 flex items-center gap-1.5 transition-all cursor-pointer select-none"
                          >
                            {isAnalyzingDoc ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                <span>جاري استخلاص المعرفة...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                <span>تلخيص استراتيجي وتحليل بـ Gemini ✨</span>
                              </>
                            )}
                          </button>
                          <div className="text-right">
                            <span className="text-xs font-black text-amber-400 flex items-center gap-1 justify-end">
                              <span>مساعد تلخيص الوثائق الذكي</span>
                              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            </span>
                            <p className="text-[10px] text-slate-300 font-sans">دع الذكاء الاصطناعي يحلل المستند ويستخلص التوصيات في ثوانٍ معدودة.</p>
                          </div>
                        </div>

                        {/* AI Summary result */}
                        {isAnalyzingDoc && (
                          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-850 text-center text-xs text-slate-400">
                            جاري تحليل نصوص وثيقة الاستشارة وكتابة البيان التنفيذي...
                          </div>
                        )}

                        {docAnalysisResult && (
                          <div className="bg-slate-950/85 p-4 rounded-xl border border-slate-800 text-right text-xs leading-relaxed space-y-3 text-slate-200 select-text">
                            <div className="border-b border-slate-800 pb-2 mb-2 flex items-center justify-between text-amber-400 font-bold">
                              <span className="text-[10px] text-slate-400 font-mono">طراز التحليل: Gemini 3.5 Flash</span>
                              <span>التقرير الاستشاري والتحليل التلقائي للوثيقة</span>
                            </div>
                            <div className="overflow-x-auto whitespace-pre-wrap font-sans text-xs">
                              {docAnalysisResult}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Extracted Document Text Preview */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500">نص محتوى المستند السحابي الحالي:</label>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-h-[220px] overflow-y-auto text-right text-xs font-sans leading-relaxed text-slate-700 whitespace-pre-wrap select-text">
                          {activeGoogleDoc.bodyText || <span className="text-slate-400 italic">هذا المستند فارغ تماماً. يمكنك إضافة نصوص إليه أدناه.</span>}
                        </div>
                      </div>

                      {/* Writing Appending Form Section */}
                      <div className="border-t border-slate-100 pt-4 space-y-2.5">
                        <label className="text-xs font-bold text-slate-700 block">إضافة ملحوظة، تحديث أو تقدم عمل مباشر للوثيقة:</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleAppendText}
                            disabled={isAppendingToDoc || !textToAppendToDoc.trim()}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white font-bold text-xs px-4 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            {isAppendingToDoc ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <span>إرسال وتحديث الوثيقة ✍️</span>
                            )}
                          </button>
                          <textarea
                            rows={1}
                            placeholder="اكتب فكرة، توجيه أو بند جديد لتتم إضافته فورياً إلى نهاية المستند..."
                            value={textToAppendToDoc}
                            onChange={(e) => setTextToAppendToDoc(e.target.value)}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-16 shadow-md text-center space-y-3 flex flex-col items-center justify-center">
                    <FileText className="w-10 h-10 text-slate-350" />
                    <h5 className="text-sm font-bold text-slate-800">لم يتم اختيار أي مستند للمعاينة</h5>
                    <p className="text-xs text-slate-400">اختر أحد المستندات السحابية من القائمة الجانبية لمعاينتها وتلخيصها فورياً بالذكاء الاصطناعي.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Safe Deletion Confirmation Custom Modal Overlay */}
        {docConfirmDeleteId && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 text-right border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-rose-600 border-b border-slate-100 pb-3" dir="rtl">
                <AlertCircle className="w-5.5 h-5.5 animate-bounce" />
                <h4 className="text-base font-black">تأكيد حذف المستند السحابي</h4>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                هل أنت متأكد تماماً من رغبتك في حذف هذا المستند؟ سيؤدي هذا الإجراء إلى نقل الملف إلى سلة مهملات Google Drive الخاصة بحسابك لحمايتها.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDeleteDoc(docConfirmDeleteId)}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  نعم، حذف المستند بالتأكيد
                </button>
                <button
                  onClick={() => setDocConfirmDeleteId(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSmartDataAnalyzer = () => {
    // Local calculation for KPIs
    const netProfit = analyzerActualRevenue - (analyzerMarketingSpend + analyzerOperationalCost);
    const profitMargin = analyzerActualRevenue > 0 ? ((netProfit / analyzerActualRevenue) * 100).toFixed(1) : "0.0";
    const marketingROI = analyzerMarketingSpend > 0 ? ((analyzerActualRevenue / analyzerMarketingSpend) * 100).toFixed(0) : "0";
    const opexRatio = analyzerActualRevenue > 0 ? (((analyzerOperationalCost) / analyzerActualRevenue) * 100).toFixed(1) : "0.0";

    // Mapped local pie data
    const pieData = [
      { name: "المصروفات التشغيلية", value: analyzerOperationalCost, color: "#6366f1" },
      { name: "المصروفات التسويقية", value: analyzerMarketingSpend, color: "#3b82f6" },
      { name: "صافي الأرباح", value: Math.max(0, netProfit), color: "#10b981" }
    ];

    // Handle local cell updates in the fallback sheet grid
    const handleLocalCellChange = (index: number, field: "value1" | "value2" | "label", value: string) => {
      const updated = [...analyzerChartData];
      if (field === "label") {
        updated[index].label = value;
      } else {
        const numVal = parseFloat(value) || 0;
        updated[index][field] = numVal;
        if (updated[index].value1 !== undefined && updated[index].value2 !== undefined) {
          updated[index].net = updated[index].value1 - updated[index].value2;
        }
      }
      setAnalyzerChartData(updated);
    };

    return (
      <div className="space-y-8 font-sans text-right" dir="rtl">
        {/* Header Block */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl">
                <TrendingUp className="w-6 h-6 animate-pulse" />
              </span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                مطور بمؤشرات Recharts سحابياً
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">محلل البيانات الذكي واستعراض مؤشرات الأداء (KPIs) 📊</h3>
            <p className="text-xs sm:text-sm text-slate-350 leading-relaxed max-w-3xl">
              تتيح لك هذه المنصة التفاعلية التحكم الكامل في قياس الجدوى وتتبع التدفقات المالية لمشروعك. قم بالربط المباشر بـ Google Sheets لإحضار بياناتك سحابياً، أو اختبر النموذج الفوري بيانيا عبر لوحة المراقبة التفاعلية.
            </p>
          </div>
        </div>

        {/* Dashboard Top KPIs Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-bold block">إجمالي الإيرادات الفعلية</span>
            <h5 className="text-lg font-black text-slate-900 mt-1">{analyzerActualRevenue.toLocaleString()} ر.س</h5>
            <div className="mt-2 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <span>نسبة من المستهدف: </span>
              <span className="font-mono">{((analyzerActualRevenue / analyzerTargetRevenue) * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-bold block">صافي الأرباح المحتسب</span>
            <h5 className={`text-lg font-black mt-1 ${netProfit >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
              {netProfit.toLocaleString()} ر.س
            </h5>
            <div className="mt-2 text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <span>هامش الربح: </span>
              <span className="font-mono text-slate-700">{profitMargin}%</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-bold block">عائد الاستثمار التسويقي (ROMI)</span>
            <h5 className="text-lg font-black text-blue-600 mt-1">{marketingROI}%</h5>
            <div className="mt-2 text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <span>حجم الصرف: </span>
              <span className="font-mono text-slate-700">{analyzerMarketingSpend.toLocaleString()} ر.س</span>
            </div>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-bold block">معدل التحويل وقنوات النمو</span>
            <h5 className="text-lg font-black text-indigo-600 mt-1">{analyzerConversionRate}%</h5>
            <div className="mt-2 text-[10px] text-slate-500 font-bold flex items-center gap-1">
              <span>تكلفة كسب العميل (CAC): </span>
              <span className="font-mono text-slate-700">{analyzerAcquisitionCost} ر.س</span>
            </div>
          </div>
        </div>

        {/* Main Interface Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Right Sidebar: controls and GSheets connector (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Google Sheets Connection Panel */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md space-y-4">
              <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
                <FileSpreadsheet className="w-4.5 h-4.5 text-emerald-600" />
                <span>ربط جداول وموازنات Google Sheets</span>
              </h4>

              {!googleUser ? (
                <div className="space-y-3.5 text-center py-2">
                  <p className="text-[11px] text-slate-500 leading-relaxed text-right">
                    يرجى تسجيل الدخول الآمن بحساب جوجل لعرض وتحديث جداول البيانات المالية لمشروعك عبر الإطار ومزامنتها تلقائياً مع الرسوم البيانية.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-slate-50 hover:bg-slate-100/80 text-slate-750 font-bold text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.6c-.28 1.5-1.12 2.76-2.38 3.6v3h3.84c2.24-2.06 3.53-5.1 3.53-8.65z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.32v3.1A12 12 0 0012 24z" />
                      <path fill="#FBBC05" d="M5.24 14.24A7.16 7.16 0 014.8 12c0-.79.13-1.57.38-2.31V6.59H1.32A11.94 11.94 0 000 12c0 2.22.6 4.3 1.32 6.13l3.92-3.1-3.1-.79z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.94 11.94 0 0012 0 12 12 0 001.32 6.59l3.92 3.1c.95-2.88 3.61-5.01 6.76-5.01z" />
                    </svg>
                    <span>ربط وتفعيل حساب Google</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <button
                      type="button"
                      onClick={() => loadGSheets(googleToken)}
                      className="text-xs font-extrabold text-blue-600 hover:text-blue-500 transition-all cursor-pointer"
                    >
                      تحديث القائمة 🔄
                    </button>
                    <span className="font-bold">جداول البيانات السحابية المتوفرة:</span>
                  </div>

                  {isFetchingGoogleSheets ? (
                    <div className="py-6 text-center space-y-1.5 flex flex-col items-center justify-center">
                      <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] text-slate-400">قراءة ملفات جداول البيانات...</span>
                    </div>
                  ) : googleSheets.length === 0 ? (
                    <div className="p-3 text-center text-[11px] text-slate-450 border border-slate-100 rounded-xl bg-slate-50">
                      لم يتم العثور على جداول بيانات سحابية. أنشئ ميزانية عبر قوالبنا أدناه للبدء فوراً!
                    </div>
                  ) : (
                    <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                      {googleSheets.map((sheet) => {
                        const isSelected = activeGoogleSheet?.id === sheet.id;
                        return (
                          <button
                            key={sheet.id}
                            type="button"
                            onClick={() => setActiveGoogleSheet(sheet)}
                            className={`w-full p-2 rounded-xl border text-right transition-all flex items-center justify-between gap-1.5 text-xs ${
                              isSelected
                                ? "bg-emerald-50/50 border-emerald-400 font-bold"
                                : "bg-slate-50 hover:bg-slate-100/60 border-slate-200/80"
                            }`}
                          >
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">
                              {isSelected ? "نشط ✓" : ""}
                            </span>
                            <span className="truncate text-slate-800 font-medium block flex-grow text-right text-right">
                              📊 {sheet.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {activeGoogleSheet && (
                    <button
                      type="button"
                      onClick={handleSyncSheetWithChart}
                      disabled={isSyncingSheetWithChart}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 text-white font-extrabold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/10"
                    >
                      {isSyncingSheetWithChart ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>جاري قراءة وتحليل البيانات...</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4" />
                          <span>تحليل وتحديث المخطط من Google Sheets ⚡</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Quick Template Generators */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md space-y-3.5">
              <h4 className="text-xs font-black text-slate-800 border-b border-slate-100 pb-2.5">
                توليد وإنشاء ميزانية سريعة لربطها بـ Sheets
              </h4>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                هل تريد توليد مصنف مالي مجهز بالمعادلات الحسابية تلقائياً؟ اختر قالباً لإنشائه في حسابك فوراً:
              </p>
              
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  onClick={() => handleCreateTemplatedSheet("budget")}
                  disabled={!googleToken || isCreatingGoogleSheet}
                  className="w-full text-right p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all flex items-center justify-between cursor-pointer disabled:opacity-50"
                >
                  <span className="text-[10px] text-emerald-600 font-bold">توليد سحابي ⚡</span>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">📊 ميزانية البنود والمشاريع</h5>
                    <span className="text-[9px] text-slate-400 block font-light">جدولة تكاليف ومخرجات مراحل العمل.</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleCreateTemplatedSheet("cashflow")}
                  disabled={!googleToken || isCreatingGoogleSheet}
                  className="w-full text-right p-3 bg-slate-50 hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 rounded-xl transition-all flex items-center justify-between cursor-pointer disabled:opacity-50"
                >
                  <span className="text-[10px] text-emerald-600 font-bold">توليد سحابي ⚡</span>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">💸 التدفقات النقدية والسيولة</h5>
                    <span className="text-[9px] text-slate-400 block font-light">مقارنة الواردات والمنصرفات بالتفصيل.</span>
                  </div>
                </button>
              </div>

              {isCreatingGoogleSheet && (
                <div className="p-2.5 bg-blue-50 border border-blue-150 rounded-xl text-blue-800 text-[10px] text-center font-bold animate-pulse flex items-center justify-center gap-1.5">
                  <div className="w-3.5 h-3.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>جاري تشكيل وحقن مصفوفة البيانات في Google Sheets...</span>
                </div>
              )}
            </div>

            {/* Smart KPI Simulator Form Controls */}
            <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md space-y-5">
              <div className="border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-black text-slate-850 flex items-center gap-1 justify-start">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>لوحة تعديل ومحاكاة مؤشرات الأداء (KPIs)</span>
                </h4>
                <p className="text-[9px] text-slate-400 font-light mt-0.5 leading-relaxed">
                  قم بتعديل هذه القيم لرؤية التغييرات المباشرة في التقييم والرسوم البيانية المتقدمة بالأسفل.
                </p>
              </div>

              <div className="space-y-4 text-right">
                {/* KPI Input 1 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="font-mono text-slate-600">{analyzerActualRevenue.toLocaleString()} ر.س</span>
                    <label className="text-slate-800">الإيرادات الفعلية:</label>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="5000"
                    value={analyzerActualRevenue}
                    onChange={(e) => setAnalyzerActualRevenue(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                {/* KPI Input 2 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="font-mono text-slate-600">{analyzerTargetRevenue.toLocaleString()} ر.س</span>
                    <label className="text-slate-800">الإيرادات المستهدفة:</label>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="500000"
                    step="5000"
                    value={analyzerTargetRevenue}
                    onChange={(e) => setAnalyzerTargetRevenue(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* KPI Input 3 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="font-mono text-slate-600">{analyzerMarketingSpend.toLocaleString()} ر.س</span>
                    <label className="text-slate-800">الميزانية التسويقية:</label>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="2000"
                    value={analyzerMarketingSpend}
                    onChange={(e) => setAnalyzerMarketingSpend(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>

                {/* KPI Input 4 */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="font-mono text-slate-600">{analyzerOperationalCost.toLocaleString()} ر.س</span>
                    <label className="text-slate-800">التكاليف التشغيلية (OpEx):</label>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="150000"
                    step="2000"
                    value={analyzerOperationalCost}
                    onChange={(e) => setAnalyzerOperationalCost(Number(e.target.value))}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                </div>

                {/* Row Grid for Conversion Rate and CAC */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block">معدل التحويل (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="30"
                      value={analyzerConversionRate}
                      onChange={(e) => setAnalyzerConversionRate(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-500 font-bold block">تكلفة الاستحواذ (CAC)</label>
                    <input
                      type="number"
                      step="5"
                      min="10"
                      max="1000"
                      value={analyzerAcquisitionCost}
                      onChange={(e) => setAnalyzerAcquisitionCost(Number(e.target.value))}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-left font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Left Column: Sandbox and Charts View Panel (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* View Sub-Tabs Switcher */}
            <div className="bg-white border border-slate-200/80 p-1.5 rounded-2xl shadow-sm flex items-center justify-between flex-wrap gap-2">
              <div className="flex bg-slate-100 p-0.5 rounded-xl gap-1">
                <button
                  type="button"
                  onClick={() => setAnalyzerSubTab("sheet")}
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    analyzerSubTab === "sheet"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/40"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>جدول موازنة البيانات التفاعلي 📝</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAnalyzerSubTab("charts")}
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    analyzerSubTab === "charts"
                      ? "bg-white text-slate-900 shadow-sm border border-slate-200/40"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>المخططات المتقدمة والتحليل (Recharts) 📈</span>
                </button>
              </div>

              <div className="text-right pl-2">
                <span className="text-[10px] text-slate-400 block font-light">الملف المفتوح للمطابقة:</span>
                <span className="text-xs font-extrabold text-slate-800 truncate block max-w-[200px]">
                  {activeGoogleSheet ? `📊 ${activeGoogleSheet.name}` : "✏️ مصنف محلي تفاعلي مستقل"}
                </span>
              </div>
            </div>

            {/* Sub-Tab content */}
            {analyzerSubTab === "sheet" ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-5">
                {googleUser && activeGoogleSheet ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-mono text-[9px]">Google Sheets Sandbox IFrame</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="font-bold text-slate-700">محرر جداول بيانات جوجل السحابي التفاعلي المضمن:</span>
                      </div>
                    </div>

                    <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-inner">
                      <iframe
                        src={`https://docs.google.com/spreadsheets/d/${activeGoogleSheet.id}/edit?embedded=true&chrome=false`}
                        className="w-full h-[450px] border-none"
                        title="Google Sheets Live IFrame Sandbox"
                        allow="autoplay"
                      />
                      <div className="bg-slate-50 border-t border-slate-200 p-3 text-right text-[11px] text-slate-500 flex items-center justify-between">
                        <span className="text-slate-400">أي تعديلات بالخلايا أعلاه تحفظ تلقائياً في خوادم جوجل السحابية الآمنة.</span>
                        <span className="font-extrabold text-emerald-600 flex items-center gap-1 text-[10px]">
                          <span>متصل وبحماية حسابك على Google ✓</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-900 text-xs leading-relaxed font-light">
                      <strong>💡 تلميح استيراد البيانات:</strong> بعد الانتهاء من تحديث الجدول المالي سحابياً، اضغط على زر <strong>"تحليل وتحديث المخطط من Google Sheets ⚡"</strong> باللوحة الجانبية لقراءة مصفوفة الخلايا الجديدة وتحديث الرسومات البيانية فورياً بمؤشرات Recharts!
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 text-right">
                    <div className="bg-amber-50 border border-amber-150 p-4 rounded-2xl flex items-start gap-3">
                      <span className="text-xl shrink-0">💡</span>
                      <div className="text-xs text-amber-950 leading-relaxed font-light">
                        <strong className="block font-bold text-amber-900 mb-1">تعديل البيانات تفاعلياً بصفحة مستقلة:</strong>
                        أنت تستخدم المصنف التفاعلي المدمج المستقل. بإمكانك تعديل خلايا الجدول أدناه وتغيير التدفقات النقدية والبنود فورياً لتنعكس بشكل لحظي بالرسومات البيانية وعلامات مؤشرات الأداء المجاورة!
                      </div>
                    </div>

                    {/* Local Editable Spreadsheet Mock */}
                    <div className="overflow-hidden border border-slate-250/70 rounded-2xl shadow-inner bg-slate-50">
                      <table className="w-full text-right border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold">
                            <th className="p-3">صافي التدفقات (تلقائي)</th>
                            <th className="p-3">التدفقات الخارجة (ر.س)</th>
                            <th className="p-3">التدفقات الواردة (ر.س)</th>
                            <th className="p-3 text-right">الفترة المالية / البند</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 bg-white">
                          {analyzerChartData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50">
                              <td className="p-2.5 font-mono font-bold text-slate-700 bg-slate-50/70">
                                {((row.value1 || 0) - (row.value2 || 0)).toLocaleString()} ر.س
                              </td>
                              <td className="p-1 font-mono">
                                <input
                                  type="number"
                                  value={row.value2 !== undefined ? row.value2 : ""}
                                  onChange={(e) => handleLocalCellChange(idx, "value2", e.target.value)}
                                  className="w-full p-2 bg-transparent border border-transparent hover:border-slate-200 focus:bg-white focus:border-blue-400 rounded-lg text-left font-mono text-xs focus:outline-none"
                                />
                              </td>
                              <td className="p-1 font-mono">
                                <input
                                  type="number"
                                  value={row.value1}
                                  onChange={(e) => handleLocalCellChange(idx, "value1", e.target.value)}
                                  className="w-full p-2 bg-transparent border border-transparent hover:border-slate-200 focus:bg-white focus:border-blue-400 rounded-lg text-left font-mono text-xs focus:outline-none"
                                />
                              </td>
                              <td className="p-2 text-right font-bold text-slate-800">
                                <input
                                  type="text"
                                  value={row.label}
                                  onChange={(e) => handleLocalCellChange(idx, "label", e.target.value)}
                                  className="w-full p-2 bg-transparent border border-transparent hover:border-slate-200 focus:bg-white focus:border-blue-400 rounded-lg text-right font-sans text-xs font-bold text-slate-800 focus:outline-none"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
                      <span className="text-[10px] text-slate-400">التغييرات على هذه الجداول تنعكس فورياً في التلخيص البياني.</span>
                      <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="text-xs font-extrabold text-blue-600 hover:text-blue-500 flex items-center gap-1 cursor-pointer"
                      >
                        <span>هل ترغب بربط حساب Google لتجربة سحابية أعمق؟ اضغط هنا 🔗</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md space-y-8">
                
                {/* Chart 1 Context and Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-3">
                    {/* Visual Preset Toggles */}
                    <div className="flex bg-slate-100 p-0.5 rounded-lg gap-1">
                      <button
                        type="button"
                        onClick={() => setAnalyzerChartType("area")}
                        className={`py-1 px-3 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          analyzerChartType === "area" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                        }`}
                      >
                        مساحة ملونة
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnalyzerChartType("bar")}
                        className={`py-1 px-3 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          analyzerChartType === "bar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                        }`}
                      >
                        أعمدة عمودية
                      </button>
                      <button
                        type="button"
                        onClick={() => setAnalyzerChartType("line")}
                        className={`py-1 px-3 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                          analyzerChartType === "line" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
                        }`}
                      >
                        خطوط بيانية
                      </button>
                    </div>

                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <span>📈 {analyzerChartTitle}</span>
                    </h4>
                  </div>

                  {/* Chart Render */}
                  <div className="w-full h-72 font-sans text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                      {analyzerChartType === "area" ? (
                        <AreaChart
                          data={analyzerChartData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorVal1" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01}/>
                            </linearGradient>
                            <linearGradient id="colorVal2" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#ef4444" stopOpacity={0.01}/>
                            </linearGradient>
                            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#64748b" />
                          <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
                          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                          <Legend verticalAlign="top" height={36} />
                          <Area name="الواردات / القيمة الأساسية (ر.س)" type="monotone" dataKey="value1" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorVal1)" />
                          {analyzerChartData[0]?.value2 !== undefined && (
                            <Area name="المنصرفات / التكلفة (ر.س)" type="monotone" dataKey="value2" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorVal2)" />
                          )}
                          {analyzerChartData[0]?.net !== undefined && (
                            <Area name="صافي السيولة النقدية (ر.س)" type="monotone" dataKey="net" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorNet)" />
                          )}
                        </AreaChart>
                      ) : analyzerChartType === "bar" ? (
                        <BarChart
                          data={analyzerChartData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#64748b" />
                          <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
                          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                          <Legend verticalAlign="top" height={36} />
                          <Bar name="الواردات / القيمة الأساسية (ر.س)" dataKey="value1" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          {analyzerChartData[0]?.value2 !== undefined && (
                            <Bar name="المنصرفات / التكلفة (ر.س)" dataKey="value2" fill="#ef4444" radius={[4, 4, 0, 0]} />
                          )}
                          {analyzerChartData[0]?.net !== undefined && (
                            <Bar name="صافي السيولة النقدية (ر.س)" dataKey="net" fill="#10b981" radius={[4, 4, 0, 0]} />
                          )}
                        </BarChart>
                      ) : (
                        <LineChart
                          data={analyzerChartData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#64748b" />
                          <YAxis tickLine={false} axisLine={false} stroke="#64748b" />
                          <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                          <Legend verticalAlign="top" height={36} />
                          <Line name="الواردات / القيمة الأساسية (ر.س)" type="monotone" dataKey="value1" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4 }} />
                          {analyzerChartData[0]?.value2 !== undefined && (
                            <Line name="المنصرفات / التكلفة (ر.س)" type="monotone" dataKey="value2" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                          )}
                          {analyzerChartData[0]?.net !== undefined && (
                            <Line name="صافي السيولة النقدية (ر.س)" type="monotone" dataKey="net" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                          )}
                        </LineChart>
                      )}
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Second Section: Pie Chart for OpEx Structure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-4 border-t border-slate-100">
                  
                  {/* Left Side: Pie Chart rendering */}
                  <div className="w-full h-52 font-sans text-xs relative flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={80}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${Number(value).toLocaleString()} ر.س`} />
                      </PieChart>
                    </ResponsiveContainer>

                    {/* Centered Net Margin Metric */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                      <span className="text-[10px] text-slate-400 font-bold">هامش الربح صافي</span>
                      <span className="text-sm font-black text-slate-800">{profitMargin}%</span>
                    </div>
                  </div>

                  {/* Right Side: Expense Structure Legends */}
                  <div className="space-y-3.5 text-right">
                    <h5 className="text-xs font-black text-slate-800">توزيع هيكل الإيرادات ومحركات الأداء الأساسية:</h5>
                    <div className="space-y-2">
                      {pieData.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-xl border border-slate-100 bg-slate-50/50">
                          <span className="font-mono font-bold text-slate-800">{item.value.toLocaleString()} ر.س</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-slate-650">{item.name}</span>
                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    );
  };

  const renderSmartGanttChart = () => {
    if (!selectedProject) {
      return (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xl">
          <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-800">برجاء اختيار مشروع أولاً لعرض جدوله الزمني التفاعلي</h3>
        </div>
      );
    }

    const pid = selectedProject.id;
    const allTasks = projectGanttTasks[pid] || [];
    
    // Stats
    const totalCount = allTasks.length;
    const completedCount = allTasks.filter(t => t.status === "completed").length;
    const activeCount = allTasks.filter(t => t.status === "active").length;
    const pendingCount = allTasks.filter(t => t.status === "pending").length;
    
    // Calculation of progress percentage
    const avgProgress = totalCount > 0 
      ? Math.round(allTasks.reduce((acc, t) => acc + t.progress, 0) / totalCount)
      : 0;

    // Filtered tasks for the list display
    const filteredTasks = allTasks.filter(t => {
      if (ganttFilter === "all") return true;
      return t.status === ganttFilter;
    });

    const handleAddTaskSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newGanttName.trim()) return;

      const newTask: GanttTask = {
        id: `gantt-task-${pid}-${Date.now()}`,
        name: newGanttName,
        startDate: newGanttStart || "2026-06-28",
        endDate: newGanttEnd || "2026-07-15",
        status: newGanttStatus,
        progress: newGanttStatus === "completed" ? 100 : newGanttStatus === "active" ? 50 : 0,
        notes: newGanttNotes || "معلم مضاف يدوياً من قبل العميل"
      };

      setProjectGanttTasks(prev => ({
        ...prev,
        [pid]: [...(prev[pid] || []), newTask]
      }));

      // Reset
      setNewGanttName("");
      setNewGanttStart("");
      setNewGanttEnd("");
      setNewGanttStatus("pending");
      setNewGanttNotes("");
      setIsAddingGanttTask(false);
    };

    const handleSaveEdit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!editingGanttTask) return;

      let updatedProgress = editingGanttTask.progress;
      if (editingGanttTask.status === "completed") {
        updatedProgress = 100;
      } else if (editingGanttTask.status === "pending" && updatedProgress === 100) {
        updatedProgress = 0;
      }

      const updatedTask = {
        ...editingGanttTask,
        progress: updatedProgress
      };

      setProjectGanttTasks(prev => ({
        ...prev,
        [pid]: (prev[pid] || []).map(t => t.id === editingGanttTask.id ? updatedTask : t)
      }));

      setEditingGanttTask(null);
    };

    const handleDeleteTask = (id: string) => {
      setProjectGanttTasks(prev => ({
        ...prev,
        [pid]: (prev[pid] || []).filter(t => t.id !== id)
      }));
      setEditingGanttTask(null);
    };

    return (
      <div className="space-y-8 font-sans text-right" dir="rtl">
        {/* Top Header & Overview Cards */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-850 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-500/10 to-teal-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 text-transparent bg-clip-text font-black text-xs sm:text-sm tracking-wide block uppercase">
                التحكم بالمسار الزمني للمشروع 🚀
              </span>
              <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-none text-white">
                مخطط غانت التفاعلي الذكي (Gantt Chart)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
                راقب وعالج خطتك الاستراتيجية للمشروع باستخدام قوة محرك الرسم D3 المتقدم. يمكنك تتبع المعالم الرئيسية المنجزة والقادمة، إضافة محطات جديدة، وتعديل الجدول في الوقت الفعلي.
              </p>
            </div>
            
            <button
              onClick={() => {
                // Pre-fill default dates
                setNewGanttStart("2026-06-28");
                setNewGanttEnd("2026-07-15");
                setIsAddingGanttTask(true);
              }}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm py-3 px-5 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap md:self-center"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة معلم زمني جديد</span>
            </button>
          </div>

          {/* Stats Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8 pt-6 border-t border-slate-800">
            <div className="bg-slate-850/55 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">المعالم الزمنية الإجمالية</span>
              <strong className="text-2xl font-black text-white">{totalCount}</strong>
            </div>
            <div className="bg-slate-850/55 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-emerald-400 block mb-1">المعالم المنجزة ✨</span>
              <strong className="text-2xl font-black text-emerald-400">{completedCount}</strong>
            </div>
            <div className="bg-slate-850/55 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-blue-400 block mb-1">قيد التنفيذ والمتابعة</span>
              <strong className="text-2xl font-black text-blue-400">{activeCount}</strong>
            </div>
            <div className="bg-slate-850/55 border border-slate-800 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 block mb-1">المحطات المستقبلية</span>
              <strong className="text-2xl font-black text-slate-300">{pendingCount}</strong>
            </div>
            <div className="bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-900/60 p-4 rounded-2xl col-span-2 lg:col-span-1">
              <span className="text-xs text-indigo-300 block mb-1">متوسط إنجاز المشروع</span>
              <div className="flex items-center gap-2">
                <strong className="text-2xl font-black text-indigo-200">{avgProgress}%</strong>
                <div className="flex-1 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-400 h-full" style={{ width: `${avgProgress}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-2 items-center justify-between bg-slate-50 border border-slate-200/80 p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-slate-600 px-2">تصنيف العرض:</span>
            <button
              onClick={() => setGanttFilter("all")}
              className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                ganttFilter === "all" ? "bg-white text-slate-900 shadow-sm border border-slate-200" : "text-slate-550 hover:text-slate-800"
              }`}
            >
              الكل ({totalCount})
            </button>
            <button
              onClick={() => setGanttFilter("completed")}
              className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                ganttFilter === "completed" ? "bg-white text-emerald-700 shadow-sm border border-slate-200" : "text-slate-550 hover:text-emerald-600"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>مكتمل ({completedCount})</span>
            </button>
            <button
              onClick={() => setGanttFilter("active")}
              className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                ganttFilter === "active" ? "bg-white text-blue-700 shadow-sm border border-slate-200" : "text-slate-550 hover:text-blue-600"
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>قيد التنفيذ ({activeCount})</span>
            </button>
            <button
              onClick={() => setGanttFilter("pending")}
              className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                ganttFilter === "pending" ? "bg-white text-slate-700 shadow-sm border border-slate-200" : "text-slate-550 hover:text-slate-700"
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>المجدولة ({pendingCount})</span>
            </button>
          </div>
          <div className="text-[11px] text-slate-500 font-medium px-2">
            📍 ملاحظة: اضغط على أي شريط في مخطط غانت لتعديل تفاصيله أو حذفه فوراً.
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gantt Interactive SVG Chart (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5.5 h-5.5 text-indigo-600" />
                <h4 className="text-base sm:text-lg font-extrabold text-slate-900">مخطط غانت الزمني التفاعلي</h4>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold bg-slate-50 border border-slate-150 px-2 py-1 rounded-md">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block" />
                  <span>مكتمل</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold bg-slate-50 border border-slate-150 px-2 py-1 rounded-md">
                  <span className="w-2.5 h-2.5 bg-blue-500 rounded-full inline-block" />
                  <span>نشط حالياً</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-semibold bg-slate-50 border border-slate-150 px-2 py-1 rounded-md">
                  <span className="w-2.5 h-2.5 bg-slate-400 rounded-full inline-block" />
                  <span>مجدول</span>
                </div>
              </div>
            </div>

            {/* D3 Render Target Container */}
            <div ref={ganttContainerRef} className="w-full overflow-x-auto select-none rounded-2xl bg-slate-50/50 p-2 border border-slate-100">
              <svg ref={ganttSvgRef} className="w-full transition-all duration-300" />
            </div>
          </div>

          {/* Interactive Sidebar: Milestones List with Quick Actions (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-3xl p-6 shadow-xl space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h4 className="text-sm sm:text-base font-black text-slate-900">سجل المعالم والمحطات</h4>
              <span className="text-[10px] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md text-indigo-700 font-bold font-mono">
                {filteredTasks.length} محطة
              </span>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1 text-right">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setEditingGanttTask(task)}
                  className={`border rounded-2xl p-4 transition-all cursor-pointer hover:shadow-md hover:border-slate-300 text-right space-y-2 relative group ${
                    task.status === "completed" 
                      ? "border-emerald-100 bg-emerald-50/20 hover:bg-emerald-50/40" 
                      : task.status === "active"
                      ? "border-blue-100 bg-blue-50/20 hover:bg-blue-50/40"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${
                      task.status === "completed"
                        ? "bg-emerald-100 border-emerald-200 text-emerald-800"
                        : task.status === "active"
                        ? "bg-blue-100 border-blue-200 text-blue-800 animate-pulse"
                        : "bg-slate-100 border-slate-200 text-slate-600"
                    }`}>
                      {task.status === "completed" ? "مكتمل" : task.status === "active" ? "نشط" : "مجدول"}
                    </span>
                    <strong className="text-xs font-bold text-slate-900 line-clamp-2 leading-relaxed flex-1">
                      {task.name}
                    </strong>
                  </div>

                  <div className="text-[10px] text-slate-500 font-semibold flex items-center gap-1" dir="ltr">
                    <span>{task.endDate}</span>
                    <span className="text-slate-300 font-bold">←</span>
                    <span>{task.startDate}</span>
                  </div>

                  {task.notes && (
                    <p className="text-[10px] text-slate-600 font-light line-clamp-1 italic">
                      {task.notes}
                    </p>
                  )}

                  {/* Progress Line */}
                  <div className="space-y-1 pt-1 border-t border-slate-100/50">
                    <div className="flex justify-between text-[9px] font-bold text-slate-500">
                      <span>{task.progress}%</span>
                      <span>مستوى الإنجاز</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${
                          task.status === "completed" ? "bg-emerald-500" : task.status === "active" ? "bg-blue-500" : "bg-slate-400"
                        }`} 
                        style={{ width: `${task.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
              {filteredTasks.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-xs">
                  لا توجد مهام حالياً لتصنيف الفلتر النشط.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal: Add New Task/Milestone Form */}
        {isAddingGanttTask && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleAddTaskSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 text-right border border-slate-200 shadow-2xl space-y-4" dir="rtl">
              <div className="flex items-center gap-2 text-indigo-650 border-b border-slate-100 pb-3">
                <Calendar className="w-5.5 h-5.5 text-indigo-600 animate-pulse" />
                <h4 className="text-base font-black">إضافة معلم أو مهمة جديدة للمخطط الزمني</h4>
              </div>

              <div className="space-y-3 text-right">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">اسم المعلم / المهمة الرئيسية *</label>
                  <input
                    type="text"
                    required
                    value={newGanttName}
                    onChange={(e) => setNewGanttName(e.target.value)}
                    placeholder="مثال: تطوير لوحة التحكم والمدفوعات"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">تاريخ البدء *</label>
                    <input
                      type="date"
                      required
                      value={newGanttStart}
                      onChange={(e) => setNewGanttStart(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">تاريخ الانتهاء المتوقع *</label>
                    <input
                      type="date"
                      required
                      value={newGanttEnd}
                      onChange={(e) => setNewGanttEnd(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">حالة المعلم الأوليّة</label>
                  <select
                    value={newGanttStatus}
                    onChange={(e: any) => setNewGanttStatus(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-bold text-right"
                  >
                    <option value="pending">قيد الانتظار (جديد / معلق)</option>
                    <option value="active">قيد التنفيذ والعمل الفوري</option>
                    <option value="completed">مكتمل ومصادق عليه بنسبة 100%</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ملاحظات أو تفاصيل المعلم</label>
                  <textarea
                    value={newGanttNotes}
                    onChange={(e) => setNewGanttNotes(e.target.value)}
                    placeholder="شرح موجز لمتطلبات أو مخرجات هذا المعلم..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-right"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  إضافة للمخطط 💾
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingGanttTask(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Modal: Edit existing Task/Milestone Form */}
        {editingGanttTask && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <form onSubmit={handleSaveEdit} className="bg-white rounded-3xl max-w-lg w-full p-6 text-right border border-slate-200 shadow-2xl space-y-4" dir="rtl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-blue-600">
                  <PlusCircle className="w-5.5 h-5.5 text-blue-600" />
                  <h4 className="text-base font-black">تحرير أو تعديل المعلم الزمني</h4>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteTask(editingGanttTask.id)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-xl cursor-pointer transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>حذف المعلم</span>
                </button>
              </div>

              <div className="space-y-3 text-right">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">اسم المعلم / المهمة</label>
                  <input
                    type="text"
                    required
                    value={editingGanttTask.name}
                    onChange={(e) => setEditingGanttTask({ ...editingGanttTask, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold text-right"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">تاريخ البدء</label>
                    <input
                      type="date"
                      required
                      value={editingGanttTask.startDate}
                      onChange={(e) => setEditingGanttTask({ ...editingGanttTask, startDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">تاريخ الانتهاء</label>
                    <input
                      type="date"
                      required
                      value={editingGanttTask.endDate}
                      onChange={(e) => setEditingGanttTask({ ...editingGanttTask, endDate: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">حالة المعلم</label>
                  <select
                    value={editingGanttTask.status}
                    onChange={(e: any) => {
                      const newStatus = e.target.value;
                      let newProg = editingGanttTask.progress;
                      if (newStatus === "completed") newProg = 100;
                      else if (newStatus === "pending") newProg = 0;
                      setEditingGanttTask({ ...editingGanttTask, status: newStatus, progress: newProg });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-bold text-right"
                  >
                    <option value="pending">قيد الانتظار (جديد / معلق)</option>
                    <option value="active">قيد التنفيذ والمتابعة النشطة</option>
                    <option value="completed">مكتمل ومصادق عليه بنسبة 100%</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>نسبة إنجاز المعلم الزمني</span>
                    <span className="text-blue-600 font-mono">{editingGanttTask.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={editingGanttTask.progress}
                    onChange={(e) => {
                      const newProg = parseInt(e.target.value);
                      let newStatus = editingGanttTask.status;
                      if (newProg === 100) newStatus = "completed";
                      else if (newProg > 0 && newStatus === "pending") newStatus = "active";
                      else if (newProg === 0 && newStatus === "completed") newStatus = "pending";
                      setEditingGanttTask({ ...editingGanttTask, progress: newProg, status: newStatus });
                    }}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ملاحظات وتفاصيل التعديل</label>
                  <textarea
                    value={editingGanttTask.notes || ""}
                    onChange={(e) => setEditingGanttTask({ ...editingGanttTask, notes: e.target.value })}
                    placeholder="أضف أي تفاصيل أو مخرجات إضافية لهذا المعلم..."
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-right"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  حفظ التغييرات 💾
                </button>
                <button
                  type="button"
                  onClick={() => setEditingGanttTask(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer"
                >
                  تراجع
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  };

  const renderCloudProjectEditor = () => {
    return (
      <div className="space-y-8 font-sans">
        {/* If NOT logged in */}
        {!googleUser || !googleToken ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center max-w-2xl mx-auto space-y-6">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 shadow-sm">
              <PenTool className="w-8 h-8 animate-pulse text-blue-550" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-black text-slate-900">محرر المشاريع السحابي التفاعلي (Google Docs & Sheets)</h4>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                اربط حسابك في Google Workspace الآن للبدء في كتابة وتحديث ومزامنة وثائق وجداول المشروع مباشرة وبشكل حي عبر الإطار المدمج.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-right text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5 justify-end">
                <span>الميزات والأدوات المتاحة:</span>
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <ul className="list-disc list-inside space-y-1" dir="rtl">
                <li>إنشاء وتخصيص وثائق ومواصفات المشاريع فنيًا ومستندات وجداول جوجل فورياً من قوالب جاهزة.</li>
                <li>تعديل مباشر وتلقائي للجداول المالية والزمنية من داخل لوحة التحكم عبر iframe مدمج.</li>
                <li><strong>مساعد الذكاء الاصطناعي ومحرر الصيغ</strong> لتصميم وحساب ميزانية مشروعك والتنبؤ بالمخاطر.</li>
              </ul>
            </div>

            {googleDocsError && (
              <div className="bg-rose-50 text-rose-800 p-3.5 rounded-xl text-xs border border-rose-100 font-medium">
                {googleDocsError}
              </div>
            )}

            <button
              onClick={handleGoogleSignIn}
              className="mx-auto bg-white hover:bg-slate-50 text-slate-750 font-bold border border-slate-300 px-6 py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer select-none text-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.6c-.28 1.5-1.12 2.76-2.38 3.6v3h3.84c2.24-2.06 3.53-5.1 3.53-8.65z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.84-3c-1.07.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.32v3.1A12 12 0 0012 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.24 14.24A7.16 7.16 0 014.8 12c0-.79.13-1.57.38-2.31V6.59H1.32A11.94 11.94 0 000 12c0 2.22.6 4.3 1.32 6.13l3.92-3.1-3.1-.79z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.94 11.94 0 0012 0 12 12 0 001.32 6.59l3.92 3.1c.95-2.88 3.61-5.01 6.76-5.01z"
                />
              </svg>
              <span>ربط حساب Google Workspace التفاعلي</span>
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Account Info Header */}



            {/* Account Info Header */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-right" dir="rtl">
                {googleUser.photoURL ? (
                  <img
                    src={googleUser.photoURL}
                    alt={googleUser.displayName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full border-2 border-blue-500 shadow-sm shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-black flex items-center justify-center shrink-0">
                    {googleUser.displayName?.charAt(0) || "G"}
                  </div>
                )}
                <div>
                  <span className="text-xs text-slate-500 block font-bold">حساب جوجل المربوط بنجاح:</span>
                  <span className="text-sm font-black text-slate-900 block">{googleUser.displayName}</span>
                  <span className="text-[11px] text-slate-400 font-mono block">{googleUser.email}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogout}
                className="bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-rose-200 transition-all cursor-pointer"
              >
                قطع الاتصال بالحساب
              </button>
            </div>

            {/* Main Interactive Editor Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sidebar Documents List */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md text-right space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <button 
                      onClick={() => loadGDocs(googleToken)}
                      className="text-xs font-extrabold text-blue-600 hover:text-blue-500 transition-all"
                    >
                      تحديث 🔄
                    </button>
                    <h4 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <FolderOpen className="w-4 h-4 text-indigo-500" />
                      <span>اختر وثيقة لتحريرها</span>
                    </h4>
                  </div>

                  {isFetchingGoogleDocs ? (
                    <div className="py-12 text-center space-y-2 flex flex-col items-center justify-center">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs text-slate-400">جاري قراءة السحابة...</span>
                    </div>
                  ) : googleDocs.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      لا توجد مستندات بعد. أنشئ قالباً من الخيارات أعلاه للبدء فوراً!
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                      {googleDocs.map((doc) => {
                        const isSelected = activeGoogleDoc?.id === doc.id;
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => handleLoadDocDetails(doc.id)}
                            className={`w-full p-3 rounded-2xl border text-right transition-all flex flex-col gap-1.5 ${
                              isSelected
                                ? "bg-indigo-50/50 border-indigo-400 shadow-sm"
                                : "bg-slate-50 hover:bg-slate-100/60 border-slate-200/80"
                            }`}
                          >
                            <div className="flex items-start gap-2 justify-between w-full">
                              <span className="text-[10px] text-slate-400 font-sans shrink-0">
                                {new Date(doc.modifiedTime).toLocaleDateString("ar-SA", { day: "numeric", month: "numeric" })}
                              </span>
                              <h5 className="text-xs font-black text-slate-900 leading-snug text-right line-clamp-1 flex-grow">
                                {doc.name}
                              </h5>
                            </div>
                            <span className="text-[9px] text-indigo-600 font-extrabold block">
                              {isSelected ? "مفتوح الآن للتعديل ✓" : "اضغط لفتح المحرر تفاعلياً"}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Interactive IFrame Editor Pane */}
              <div className="lg:col-span-8 space-y-6">
                {isFetchingActiveDoc ? (
                  <div className="bg-white border border-slate-200 rounded-3xl p-16 shadow-md text-center space-y-4 flex flex-col items-center justify-center">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <h5 className="text-sm font-bold text-slate-800">جاري تجميع روابط محرر جوجل ومزامنة الوثيقة...</h5>
                    <p className="text-xs text-slate-400">نحن نقوم ببناء الربط السحابي الآمن مع Google Docs وعرضه تفاعلياً.</p>
                  </div>
                ) : activeGoogleDoc ? (
                  <div className="space-y-6">
                    {/* Active Editor Layout */}
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-md text-right space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="flex items-center gap-2">
                          <a
                            href={activeGoogleDoc.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-indigo-600/10"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>تعديل بملء الشاشة في جوجل 🔗</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => setDocConfirmDeleteId(activeGoogleDoc.id)}
                            className="p-2.5 text-rose-600 hover:text-white hover:bg-rose-600 border border-slate-200 hover:border-rose-600 rounded-xl transition-all cursor-pointer"
                            title="حذف المستند نهائياً"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 justify-end">
                            {syncStatus === "synced" ? (
                              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-150 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                                <Cloud className="w-3 h-3 text-emerald-600 shrink-0" />
                                <span>تمت مزامنة التغييرات بنجاح</span>
                              </span>
                            ) : (
                              <span className="text-[10px] text-blue-700 bg-blue-50 border border-blue-150 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                                <RotateCcw className="w-3 h-3 text-blue-500 animate-spin shrink-0" />
                                <span>جاري حفظ ومزامنة التعديلات...</span>
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full font-semibold">بوابة المزامنة النشطة</span>
                          </div>
                          <h4 className="text-base font-black text-slate-900 mt-1">{activeGoogleDoc.title}</h4>
                        </div>
                      </div>

                      {/* Interactive Google Docs iframe Editor Frame */}
                      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
                        {/* Editor IFrame Column */}
                        <div className="xl:col-span-8 space-y-3 flex flex-col justify-between">
                          <div className="space-y-2 flex-grow">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span className="font-mono text-[10px]">iframe sandbox editor</span>
                              <span className="font-bold text-slate-700">محرر مستندات جوجل المضمن للمشروع:</span>
                            </div>

                            <div className="relative border-2 border-slate-200 rounded-2xl overflow-hidden bg-slate-50 shadow-inner flex-grow">
                              <iframe
                                src={`https://docs.google.com/document/d/${activeGoogleDoc.id}/edit?embedded=true&chrome=false`}
                                className="w-full h-[500px] border-none"
                                title="Google Docs Editor"
                                allow="autoplay"
                              />
                              <div className="bg-slate-100 border-t border-slate-200 p-3 text-right text-[11px] text-slate-600 flex items-center justify-between">
                                <span className="text-slate-400">تحديثات المستند تحفظ تلقائياً على خوادم جوجل السحابية.</span>
                                {syncStatus === "synced" ? (
                                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                                    <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>✓ متزامن ومحفوظ تلقائياً في السحابة</span>
                                  </span>
                                ) : (
                                  <span className="font-bold text-blue-600 flex items-center gap-1">
                                    <RotateCcw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                                    <span>جاري الحفظ والتحقق من المزامنة...</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-150/70 p-3.5 rounded-xl text-right text-xs text-blue-800 space-y-1 shrink-0">
                            <div className="font-black flex items-center gap-1 justify-end">
                              <span>💡 تلميح الأمان والتعديل:</span>
                              <Info className="w-3.5 h-3.5" />
                            </div>
                            <p className="leading-relaxed text-[10px] font-sans">
                              إذا لم يظهر محرر جوجل بداخل الإطار بسبب قيود حماية المتصفح، يمكنك استخدام زر <strong>"تعديل بملء الشاشة في جوجل"</strong> أعلاه، أو إضافة نصوص مباشرة أدناه.
                            </p>
                          </div>
                        </div>

                        {/* Notes & Comments Sidebar Panel */}
                        <div className="xl:col-span-4 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl text-right flex flex-col justify-between" dir="rtl">
                          <div className="space-y-3 flex-grow flex flex-col">
                            <div className="flex items-center justify-between border-b border-slate-200 pb-2 shrink-0">
                              <div className="flex items-center gap-1.5 text-slate-800">
                                <MessageSquare className="w-4 h-4 text-indigo-600" />
                                <span className="text-xs font-black">تعليقات وملاحظات المستند</span>
                              </div>
                              <span className="text-[10px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded-full">
                                {docComments.length} تعليق
                              </span>
                            </div>
                            
                            <p className="text-[10px] text-slate-500 leading-relaxed shrink-0">
                              تواصل مع مدير المشروع ومستشارينا حول تفاصيل هذه الوثيقة مباشرة هنا لمزامنة الملاحظات.
                            </p>

                            {/* Comments List */}
                            <div className="flex-grow overflow-y-auto space-y-2.5 max-h-[360px] my-2 pr-1 scrollbar-thin">
                              {docComments.length === 0 ? (
                                <div className="py-12 text-center text-[11px] text-slate-400">
                                  لا توجد تعليقات بعد. اكتب أول سؤال أو تعليق بالأسفل!
                                </div>
                              ) : (
                                docComments.map((comment) => {
                                  const isClient = comment.author === "client";
                                  return (
                                    <div 
                                      key={comment.id}
                                      className={`p-2.5 rounded-xl text-xs space-y-1 ${
                                        isClient 
                                          ? "bg-indigo-50/70 border border-indigo-100 text-slate-800" 
                                          : "bg-amber-50/70 border border-amber-100 text-slate-800"
                                      }`}
                                    >
                                      <div className="flex items-center justify-between gap-1">
                                        <span className="text-[10px] font-black text-slate-700 flex items-center gap-1 truncate">
                                          <span className={`w-1.5 h-1.5 rounded-full ${isClient ? "bg-indigo-500" : "bg-amber-500"}`} />
                                          {comment.authorName}
                                        </span>
                                        <span className="text-[9px] text-slate-400 font-sans shrink-0">{comment.timestamp}</span>
                                      </div>
                                      <p className="leading-relaxed text-slate-600 text-[11px] break-words">{comment.text}</p>
                                      {isClient && (
                                        <div className="flex justify-start pt-0.5">
                                          <button 
                                            type="button"
                                            onClick={() => handleDeleteComment(comment.id)}
                                            className="text-[9px] text-rose-500 hover:text-rose-700 font-semibold cursor-pointer"
                                          >
                                            حذف
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>

                          {/* New Comment Input Form */}
                          <div className="border-t border-slate-200 pt-3 space-y-2 shrink-0">
                            <textarea
                              rows={2}
                              value={newCommentText}
                              onChange={(e) => setNewCommentText(e.target.value)}
                              placeholder="اكتب ملاحظة، استفسار أو اقتراح تعديل..."
                              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none text-right"
                            />
                            <button
                              type="button"
                              onClick={handleAddComment}
                              disabled={!newCommentText.trim()}
                              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white font-bold text-[11px] py-2 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                            >
                              <span>إرسال التعليق لمدير المشروع 🚀</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Fast Append Input Form */}
                      <div className="border-t border-slate-100 pt-4 space-y-2.5 text-right">
                        <label className="text-xs font-bold text-slate-700 block">إضافة بند فني، تعديل، أو مهمة جديدة فورياً للوثيقة:</label>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={handleAppendText}
                            disabled={isAppendingToDoc || !textToAppendToDoc.trim()}
                            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 text-white font-bold text-xs px-5 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer"
                          >
                            {isAppendingToDoc ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <span>إضافة البند ومزامنة ✍️</span>
                            )}
                          </button>
                          <textarea
                            rows={1}
                            placeholder="اكتب التحديث أو المواصفة هنا ليتم إدراجها فورياً بآخر مستند جوجل..."
                            value={textToAppendToDoc}
                            onChange={(e) => setTextToAppendToDoc(e.target.value)}
                            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right resize-none"
                          />
                        </div>
                      </div>

                      {/* AI Copilot Review Engine */}
                      <div className="bg-gradient-to-l from-slate-900 to-indigo-950 p-5 rounded-2xl text-white relative overflow-hidden shadow-md border border-indigo-900 space-y-3 text-right">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                        
                        <div className="flex items-center justify-between flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={handleSummarizeDoc}
                            disabled={isAnalyzingDoc}
                            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-900/30 flex items-center gap-1.5 transition-all cursor-pointer select-none"
                          >
                            {isAnalyzingDoc ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                <span>جاري التدقيق التقني...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 text-amber-600" />
                                <span>تدقيق ومراجعة بذكاء Gemini ✨</span>
                              </>
                            )}
                          </button>
                          <div>
                            <span className="text-xs font-black text-amber-400 flex items-center gap-1 justify-end">
                              <span>مساعد مراجعة الوثائق والمخططات الذكي</span>
                              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                            </span>
                            <p className="text-[10px] text-slate-300 font-sans mt-0.5">
                              سيقوم الذكاء الاصطناعي بتحليل الوصف الفني أو الجدول الزمني واستخراج الأخطاء والتوصيات.
                            </p>
                          </div>
                        </div>

                        {docAnalysisResult && (
                          <div className="bg-slate-950/85 p-4 rounded-xl border border-indigo-950 text-right text-xs leading-relaxed space-y-3 text-slate-200 select-text">
                            <div className="border-b border-indigo-900 pb-2 mb-2 flex items-center justify-between text-amber-400 font-bold">
                              <span className="text-[10px] text-slate-500 font-mono">طراز الذكاء الاصطناعي: Gemini 3.5 Flash</span>
                              <span>تقرير التحليل الفني والتقييم الاستراتيجي</span>
                            </div>
                            <div className="overflow-x-auto whitespace-pre-wrap font-sans text-xs">
                              {docAnalysisResult}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white border border-slate-200 rounded-3xl p-16 shadow-md text-center space-y-4 flex flex-col items-center justify-center">
                    <PenTool className="w-12 h-12 text-slate-300 animate-bounce" />
                    <h5 className="text-sm font-bold text-slate-800">لم يتم فتح أي مستند للمحرر حالياً</h5>
                    <p className="text-xs text-slate-400">يرجى اختيار أحد المستندات أو الجداول الزمنية من القائمة الجانبية لعرضها بداخل محرر الإطار التفاعلي ومزامنتها.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Safe Deletion Confirmation Custom Modal Overlay */}
        {docConfirmDeleteId && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 text-right border border-slate-200 shadow-2xl space-y-4">
              <div className="flex items-center gap-2 text-rose-600 border-b border-slate-100 pb-3" dir="rtl">
                <AlertCircle className="w-5.5 h-5.5 animate-bounce" />
                <h4 className="text-base font-black">تأكيد حذف المستند السحابي</h4>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed">
                هل أنت متأكد تماماً من رغبتك في حذف هذا المستند من محرر المشاريع؟ سيتم نقله إلى سلة المهملات بـ Google Drive لحمايته.
              </p>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleDeleteDoc(docConfirmDeleteId)}
                  className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  نعم، حذف المستند بالتأكيد
                </button>
                <button
                  onClick={() => setDocConfirmDeleteId(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-750 font-bold text-xs py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLibraryView = () => {
    if (!selectedProject) return null;

    const currentDocs = libraryDocs[selectedProject.id] || [];
    
    const filteredDocs = currentDocs.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(librarySearch.toLowerCase()) || 
                            doc.description.toLowerCase().includes(librarySearch.toLowerCase());
      const matchesFilter = libraryFilter === "all" || doc.category === libraryFilter;
      return matchesSearch && matchesFilter;
    });

    const totalCount = currentDocs.length;
    const contractsCount = currentDocs.filter(d => d.category === "contract").length;
    const reportsCount = currentDocs.filter(d => d.category === "report").length;
    const blueprintsCount = currentDocs.filter(d => d.category === "blueprint").length;

    return (
      <div className="space-y-8 font-sans">
        {/* Library Info Banner and Statistics */}
        <div className="bg-gradient-to-l from-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-xs font-semibold">
                <Cloud className="w-4 h-4 animate-pulse text-blue-400" />
                <span>المكتبة السحابية الآمنة</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">أرشيف ملفات ومخرجات المشروع</h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-light leading-relaxed">
                هنا تجد كافة المستندات والتقارير الاستشارية والعقود والمخططات الهندسية المعتمدة المرتبطة بمشروعك <span className="text-white font-extrabold">({selectedProject.projectName})</span>. جميع المستندات مؤرشفة ومحمية بالتشفير السحابي المتقدم AES-256.
              </p>
            </div>

            {/* Simulated Upload Trigger Button */}
            <button
              onClick={() => setIsUploadSectionOpen(!isUploadSectionOpen)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-900/40 border border-blue-500/30 flex items-center justify-center gap-2 transition-all cursor-pointer select-none shrink-0"
            >
              <Plus className="w-4.5 h-4.5" />
              <span>رفع مستند جديد (محاكاة)</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800 text-right" dir="rtl">
            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
                <FolderOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">إجمالي الملفات</span>
                <span className="text-base sm:text-lg font-black font-mono">{totalCount} مستندات</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl">
                <FileSignature className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">العقود القانونية</span>
                <span className="text-base sm:text-lg font-black font-mono">{contractsCount} عقود</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">التقارير النهائية</span>
                <span className="text-base sm:text-lg font-black font-mono">{reportsCount} تقارير</span>
              </div>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex items-center gap-3.5">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">المخططات والحلول</span>
                <span className="text-base sm:text-lg font-black font-mono">{blueprintsCount} مخططات</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Segment Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-2xl max-w-md shadow-inner border border-slate-200/65 gap-1.5 ml-auto mr-0 flex-wrap">
          <button
            type="button"
            onClick={() => setLibrarySubView("archived")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              librarySubView === "archived"
                ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <FolderOpen className="w-4 h-4" />
            <span>أرشيف المستندات المعتمدة</span>
          </button>
          <button
            type="button"
            onClick={() => setLibrarySubView("gdocs")}
            className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              librarySubView === "gdocs"
                ? "bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>مستندات جوجل المتزامنة</span>
            <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full animate-pulse">جديد</span>
          </button>
        </div>

        {librarySubView === "archived" ? (
          <>
            {/* Upload Form Simulator Collapse */}
            <AnimatePresence>
              {isUploadSectionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Cloud className="w-5 h-5 text-blue-600 animate-bounce" />
                        <h4 className="text-base font-bold text-slate-900">محاكاة رفع وأرشفة مستند سحابي جديد</h4>
                      </div>
                      <button
                        onClick={() => setIsUploadSectionOpen(false)}
                        className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSimulatedUpload} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-right">
                          <label className="text-xs font-bold text-slate-700 block">اسم الملف / المستند:</label>
                          <input
                            type="text"
                            required
                            placeholder="مثال: تقرير تسليم المرحلة الرابعة وفحص جودة البيانات"
                            value={uploadDocTitle}
                            onChange={(e) => setUploadDocTitle(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right"
                          />
                        </div>

                        <div className="space-y-1.5 text-right">
                          <label className="text-xs font-bold text-slate-700 block">تصنيف ونوع المستند:</label>
                          <select
                            value={uploadDocCategory}
                            onChange={(e) => setUploadDocCategory(e.target.value as any)}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right"
                          >
                            <option value="report">تقرير نهائي (PDF)</option>
                            <option value="contract">عقد واتفاقية رسمية (PDF)</option>
                            <option value="blueprint">مخطط هندسي أو تقني (ZIP)</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-right">
                        <label className="text-xs font-bold text-slate-700 block">نبذة ووصف موجز عن المستند:</label>
                        <textarea
                          rows={2}
                          placeholder="صف بالتفصيل ما يحتوي عليه هذا الملف، ومن يحق له الاطلاع عليه..."
                          value={uploadDocDescription}
                          onChange={(e) => setUploadDocDescription(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right resize-none"
                        />
                      </div>

                      {/* Dropzone Simulation Layout */}
                      <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-6 text-center space-y-2 flex flex-col items-center justify-center">
                        <Cloud className="w-8 h-8 text-slate-400" />
                        <span className="text-xs font-bold text-slate-600 block">اسحب ملفات التقارير أو العقود هنا لرفعها فوراً</span>
                        <span className="text-[10px] text-slate-400 block">الصيغ المدعومة: PDF, ZIP, DOCX حجم أقصى 50MB</span>
                      </div>

                      {/* Progress bar if uploading */}
                      {isUploading && (
                        <div className="space-y-1 bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                          <div className="flex justify-between text-xs font-bold text-blue-700">
                            <span>جاري الرفع والتشغيل السحابي...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={isUploading}
                          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isUploading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>جاري الأرشفة الآن...</span>
                            </>
                          ) : (
                            <span>حفظ وأرشفة المستند</span>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsUploadSectionOpen(false)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all"
                        >
                          إلغاء
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search, Filter & List Section */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-right">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
                <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-indigo-600" />
                  <span>قائمة المستندات والمخططات المتاحة</span>
                </h4>

                {/* Live Search and Type Filters */}
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full md:w-auto font-sans">
                  {/* Search input */}
                  <div className="relative flex-grow sm:w-64">
                    <input
                      type="text"
                      placeholder="ابحث باسم المستند أو الوصف..."
                      value={librarySearch}
                      onChange={(e) => setLibrarySearch(e.target.value)}
                      className="w-full pr-10 pl-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right placeholder-slate-400"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  </div>

                  {/* Filter tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-[11px] font-bold">
                    <button
                      onClick={() => setLibraryFilter("all")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        libraryFilter === "all"
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-950"
                      }`}
                    >
                      الكل
                    </button>
                    <button
                      onClick={() => setLibraryFilter("contract")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        libraryFilter === "contract"
                          ? "bg-white text-amber-750 shadow-sm"
                          : "text-slate-650 hover:text-slate-950"
                      }`}
                    >
                      عقود
                    </button>
                    <button
                      onClick={() => setLibraryFilter("report")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        libraryFilter === "report"
                          ? "bg-white text-emerald-750 shadow-sm"
                          : "text-slate-650 hover:text-slate-950"
                      }`}
                    >
                      تقارير
                    </button>
                    <button
                      onClick={() => setLibraryFilter("blueprint")}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        libraryFilter === "blueprint"
                          ? "bg-white text-blue-700 shadow-sm"
                          : "text-slate-650 hover:text-slate-950"
                      }`}
                    >
                      مخططات
                    </button>
                  </div>
                </div>
              </div>

              {/* Documents loop */}
              {filteredDocs.length === 0 ? (
                <div className="py-16 text-center space-y-3 flex flex-col items-center justify-center">
                  <FolderOpen className="w-12 h-12 text-slate-300" />
                  <p className="text-slate-500 text-sm font-medium">لا توجد مستندات تطابق معايير البحث أو التصفية الحالية.</p>
                  <button
                    onClick={() => { setLibrarySearch(""); setLibraryFilter("all"); }}
                    className="text-xs text-blue-600 hover:text-blue-500 font-bold cursor-pointer"
                  >
                    إعادة ضبط مرشحات البحث
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocs.map((doc) => {
                    const isDownloading = downloadingDocIds[doc.id] || false;
                    const isCustomUploaded = doc.id.startsWith("DOC-UPLOAD-");

                    return (
                      <div
                        key={doc.id}
                        className="p-5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/70 rounded-2xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md text-right"
                      >
                        {/* Document details */}
                        <div className="flex items-start gap-4 flex-grow text-right">
                          {/* Category Icon */}
                          <div className={`p-3 rounded-2xl shrink-0 mt-0.5 ${
                            doc.category === "contract" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                            doc.category === "blueprint" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                            "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          }`}>
                            {doc.category === "contract" ? <FileSignature className="w-5.5 h-5.5" /> :
                             doc.category === "blueprint" ? <Layers className="w-5.5 h-5.5" /> :
                             <FileText className="w-5.5 h-5.5" />}
                          </div>

                          <div className="space-y-1.5 flex-grow">
                            <div className="flex flex-wrap items-center gap-2">
                              <h5 className="text-sm sm:text-base font-black text-slate-900 leading-snug">{doc.title}</h5>
                              
                              {/* Extension format badge */}
                              <span className="bg-slate-200 text-slate-700 text-[10px] font-black px-2 py-0.5 rounded-md font-mono uppercase">
                                {doc.format}
                              </span>

                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                doc.category === "contract" ? "bg-amber-100 text-amber-800" :
                                doc.category === "blueprint" ? "bg-blue-100 text-blue-800" :
                                "bg-emerald-100 text-emerald-800"
                              }`}>
                                {doc.categoryArabic}
                              </span>

                              {isCustomUploaded && (
                                <span className="bg-blue-100 text-blue-700 text-[9px] font-extrabold px-2 py-0.5 rounded-md">
                                  مرفوع محلياً
                                </span>
                              )}
                            </div>

                            <p className="text-xs text-slate-500 leading-relaxed font-light font-sans max-w-4xl">{doc.description}</p>

                            <div className="flex items-center gap-4 text-[11px] text-slate-400 font-sans font-medium flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                <span>تاريخ الإصدار: {doc.date}</span>
                              </span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <span>حجم الملف: {doc.size}</span>
                              <span className="w-1 h-1 bg-slate-300 rounded-full" />
                              <span className="flex items-center gap-1 text-slate-550">
                                <Download className="w-3.5 h-3.5" />
                                <span>تم التحميل {doc.downloadCount} مرات</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Document actions */}
                        <div className="flex flex-row md:flex-col lg:flex-row gap-2 shrink-0 self-stretch md:self-auto items-stretch justify-end font-sans">
                          {/* Quick Preview Button */}
                          <button
                            onClick={() => setActiveDocForPreview(doc)}
                            className="flex-1 md:flex-none text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Info className="w-4 h-4 text-slate-500" />
                            <span>عرض سريع</span>
                          </button>

                          {/* Download Button */}
                          <button
                            onClick={() => handleSimulatedDownload(doc)}
                            disabled={isDownloading}
                            className={`flex-1 md:flex-none text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                              isDownloading 
                                ? "bg-slate-300 border border-slate-300 cursor-not-allowed" 
                                : "bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-550/10"
                            }`}
                          >
                            {isDownloading ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>جاري التحميل...</span>
                              </>
                            ) : (
                              <>
                                <Download className="w-4 h-4" />
                                <span>تحميل المستند</span>
                              </>
                            )}
                          </button>

                          {/* Delete option if it's a simulated custom upload */}
                          {isCustomUploaded && (
                            <button
                              onClick={() => handleSimulatedDelete(doc.id, doc.title)}
                              className="p-2.5 text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-rose-600 rounded-xl transition-all cursor-pointer"
                              title="حذف الملف"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        ) : (
          renderGoogleDocsWorkspace()
        )}
      </div>
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
              className="max-w-4xl mx-auto"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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

                  {/* Real-time Notification Bell & Dropdown */}
                  <div className="relative">
                    <button
                      id="btn-notifications-toggle"
                      onClick={() => setIsNotifOpen(!isNotifOpen)}
                      className="relative flex items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-600 transition-all cursor-pointer shadow-sm text-slate-600"
                      title="التحديثات والإشعارات المباشرة"
                    >
                      <Bell className={`w-4 h-4 ${unreadCount > 0 ? "animate-bounce text-blue-600" : ""}`} />
                      {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-600 text-[9px] font-black text-white ring-2 ring-white">
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    <AnimatePresence>
                      {isNotifOpen && (
                        <>
                          {/* Invisible overlay for tap-outside closing */}
                          <div className="fixed inset-0 z-40 cursor-default" onClick={() => setIsNotifOpen(false)} />
                          
                          <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.95 }}
                            className="absolute left-0 mt-3.5 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden font-sans text-right flex flex-col max-h-[480px]"
                          >
                            {/* Dropdown Header */}
                            <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
                              <h5 className="text-xs font-extrabold text-slate-800">مركز التنبيهات والإشعارات</h5>
                              {unreadCount > 0 && (
                                <button
                                  onClick={handleMarkAllNotificationsAsRead}
                                  className="text-[10px] text-blue-600 hover:text-blue-750 font-bold transition-colors cursor-pointer"
                                >
                                  تحديد الكل كمقروء ✓
                                </button>
                              )}
                            </div>

                            {/* Notifications Scroll Area */}
                            <div className="overflow-y-auto p-3 space-y-2 flex-grow max-h-[280px]">
                              {notifications.length === 0 ? (
                                <div className="text-center py-10 space-y-2 text-slate-400 font-light text-xs">
                                  <p>🔔 لا توجد تنبيهات حالياً.</p>
                                  <p className="text-[10px]">سيظهر هنا سجل التحديثات عند إنجاز المحطات أو رفع الملفات.</p>
                                </div>
                              ) : (
                                notifications.map((notif) => {
                                  return (
                                    <div
                                      key={notif.id}
                                      onClick={() => handleToggleReadNotification(notif.id)}
                                      className={`p-3 rounded-xl border transition-all text-right cursor-pointer relative group flex gap-3 ${
                                        notif.isRead
                                          ? "bg-white border-slate-100 text-slate-600 opacity-75 hover:bg-slate-50"
                                          : "bg-blue-50/30 border-blue-100 text-slate-900 hover:bg-blue-50/50"
                                      }`}
                                    >
                                      {/* Icon wrapper */}
                                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                        notif.type === "milestone" 
                                          ? "bg-emerald-100 text-emerald-600" 
                                          : "bg-blue-100 text-blue-600"
                                      }`}>
                                        {notif.type === "milestone" ? <CheckCircle2 className="w-4.5 h-4.5" /> : <FileText className="w-4.5 h-4.5" />}
                                      </div>

                                      <div className="space-y-1 flex-1 min-w-0">
                                        <div className="flex items-center justify-between flex-row-reverse">
                                          <span className="text-[9px] text-slate-400 shrink-0">{notif.timestamp}</span>
                                          <h6 className="text-xs font-extrabold truncate pl-2">{notif.title}</h6>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-light leading-relaxed line-clamp-2">
                                          {notif.description}
                                        </p>
                                      </div>

                                      {/* Dot indicator for unread */}
                                      {!notif.isRead && (
                                        <span className="absolute top-3.5 right-2 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                                      )}
                                    </div>
                                  );
                                })
                              )}
                            </div>

                            {/* Dropdown Simulator Actions Footer */}
                            <div className="p-3 bg-slate-50 border-t border-slate-100 space-y-2 shrink-0">
                              <span className="block text-[9px] font-bold text-slate-400 text-center uppercase tracking-wider">
                                🛠️ لوحة محاكاة الفريق المباشر (اختبر في بيئة المعاينة)
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={handleSimulateMilestoneAchievement}
                                  className="py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>محاكاة إنجاز محطة</span>
                                </button>
                                <button
                                  onClick={handleSimulateFileUpload}
                                  className="py-2 px-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>محاكاة رفع ملف</span>
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
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

              {/* View Switcher: Technical Progress vs. Financial Portfolio vs. Cloud Library vs. Cloud Project Editor */}
              <div className="flex bg-slate-100 p-1 rounded-2xl max-w-4xl shadow-inner border border-slate-200/60 gap-1.5 mr-auto flex-wrap">
                <button
                  type="button"
                  onClick={() => setDashboardView("overview")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[140px] ${
                    dashboardView === "overview"
                      ? "bg-white text-blue-600 shadow-md border border-slate-100"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <LayoutDashboard className="w-4.5 h-4.5" />
                  <span>متابعة تقدم المشروع فنيّاً</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardView("wallet")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[140px] ${
                    dashboardView === "wallet"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-650 text-white shadow-md"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Wallet className="w-4.5 h-4.5" />
                  <span>محفظة المشروع والمالية</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardView("library")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[140px] ${
                    dashboardView === "library"
                      ? "bg-gradient-to-r from-slate-800 to-indigo-900 text-white shadow-md"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Cloud className="w-4.5 h-4.5" />
                  <span>المكتبة السحابية للمشروع</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardView("editor")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[140px] ${
                    dashboardView === "editor"
                      ? "bg-gradient-to-r from-indigo-600 to-violet-700 text-white shadow-md"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <PenTool className="w-4.5 h-4.5" />
                  <span>محرر المشاريع السحابي</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardView("analyzer")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[140px] ${
                    dashboardView === "analyzer"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-md"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <TrendingUp className="w-4.5 h-4.5" />
                  <span>محلل البيانات الذكي 📊</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDashboardView("timeline")}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 min-w-[140px] ${
                    dashboardView === "timeline"
                      ? "bg-gradient-to-r from-indigo-700 to-purple-800 text-white shadow-md"
                      : "text-slate-650 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>الجدول الزمني (Gantt) ⏳</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                {dashboardView === "overview" && (
                  <motion.div
                    key="overview-view"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  >
                
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
                            {/* Cleaned up AreaChart end */}
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
                                  onClick={handleInitiateSigning}
                                  disabled={!hasSignature || !signeeName.trim() || !agreeToTerms}
                                  className={`w-full py-3.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                                    hasSignature && signeeName.trim() && agreeToTerms
                                      ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white shadow-blue-500/15"
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

              </motion.div>
            )}
            {dashboardView === "wallet" && (
              <motion.div
                key="wallet-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {renderWalletView()}
              </motion.div>
            )}
            {dashboardView === "library" && (
              <motion.div
                key="library-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {renderLibraryView()}
              </motion.div>
            )}
            {dashboardView === "editor" && (
              <motion.div
                key="editor-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {renderCloudProjectEditor()}
              </motion.div>
            )}
            {dashboardView === "analyzer" && (
              <motion.div
                key="analyzer-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {renderSmartDataAnalyzer()}
              </motion.div>
            )}
            {dashboardView === "timeline" && (
              <motion.div
                key="timeline-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {renderSmartGanttChart()}
              </motion.div>
            )}
        </AnimatePresence>

        {/* OTP Identity Verification Modal */}
        {showOtpModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 text-right">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className="p-5 bg-gradient-to-br from-blue-900 to-indigo-950 text-white border-b border-blue-950 flex flex-col relative">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="absolute top-4 left-4 p-1.5 hover:bg-white/10 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold font-sans">التحقق الثنائي وتأكيد الهوية</h4>
                    <p className="text-[11px] text-blue-200 font-light">بوابة التوقيع الإلكتروني الآمن - بيزنس ديفلوبرز</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  لزيادة موثوقية التوقيعات الرقمية واعتمادها قانونياً، نتبع أعلى معايير أمان الهيئة السعودية للمواصفات والمقاييس. يرجى اختيار وسيلة استلام الرمز المؤقت:
                </p>

                {/* Method Tabs */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpMethod("email");
                      const dest = googleUser?.email || "businesdevelopers@gmail.com";
                      setOtpDestination(dest);
                      sendOtpCode("email", dest);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      otpMethod === "email"
                        ? "bg-white text-blue-950 shadow-sm border border-slate-200/50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span>البريد الإلكتروني</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpMethod("phone");
                      const dest = "+966 50 123 4567";
                      setOtpDestination(dest);
                      sendOtpCode("phone", dest);
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      otpMethod === "phone"
                        ? "bg-white text-blue-950 shadow-sm border border-slate-200/50"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span>الهاتف الجوال (SMS)</span>
                  </button>
                </div>

                {/* Input for modifying destination details */}
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-150">
                  <label className="block text-xs font-bold text-slate-700">
                    {otpMethod === "email" ? "البريد الإلكتروني المستهدف:" : "رقم الجوال المستهدف (SMS):"}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otpDestination}
                      onChange={(e) => setOtpDestination(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs focus:border-blue-500 focus:outline-none transition-all text-right"
                      placeholder={otpMethod === "email" ? "مثال: name@example.com" : "مثال: +966 50 123 4567"}
                    />
                    <button
                      type="button"
                      onClick={() => sendOtpCode(otpMethod, otpDestination)}
                      disabled={isSendingOtp || !otpDestination.trim()}
                      className="bg-blue-600 hover:bg-blue-500 text-white disabled:bg-slate-300 px-3 rounded-xl text-[11px] font-bold transition-all cursor-pointer shrink-0"
                    >
                      {isSendingOtp ? "جاري الإرسال..." : "إعادة إرسال"}
                    </button>
                  </div>
                </div>

                {/* OTP Input Fields */}
                <div className="space-y-3 relative">
                  <label className="block text-center text-xs font-extrabold text-slate-800">
                    أدخل رمز التحقق المكون من 4 أرقام
                  </label>

                  <div className="relative flex justify-center items-center h-16">
                    {/* Styled 4-digit boxes */}
                    <div className="flex justify-center gap-3 dir-ltr" dir="ltr">
                      {[0, 1, 2, 3].map((index) => {
                        const char = enteredOtp[index] || "";
                        const isFocused = enteredOtp.length === index;
                        return (
                          <div
                            key={index}
                            className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-black transition-all ${
                              char
                                ? "border-blue-600 bg-blue-50 text-blue-900"
                                : isFocused
                                ? "border-blue-500 bg-white ring-4 ring-blue-100 animate-pulse"
                                : "border-slate-200 bg-slate-50 text-slate-400"
                            }`}
                          >
                            {char}
                          </div>
                        );
                      })}
                    </div>
                    {/* Hidden input overlayed */}
                    <input
                      type="text"
                      maxLength={4}
                      value={enteredOtp}
                      onChange={(e) => {
                        const val = e.target.value.replace(/[^0-9]/g, "");
                        setEnteredOtp(val);
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer text-center"
                      autoFocus
                    />
                  </div>
                </div>

                {/* Countdown & Resend feedback */}
                <div className="text-center">
                  {otpCountdown > 0 ? (
                    <p className="text-[11px] text-slate-400">
                      يمكنك طلب رمز جديد خلال <span className="font-bold text-slate-600 font-sans">{otpCountdown}</span> ثانية
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="text-xs text-blue-600 hover:text-blue-500 font-bold transition-all cursor-pointer underline decoration-dotted"
                    >
                      طلب رمز جديد الآن
                    </button>
                  )}
                </div>

                {otpError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}

                {/* Sandbox Mock help box */}
                <div className="bg-amber-50/50 border border-amber-200/60 p-3 rounded-2xl space-y-1 text-right">
                  <div className="flex items-center gap-1.5 text-amber-800 text-[11px] font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>بيئة التجربة والمحاكاة السريعة:</span>
                  </div>
                  <p className="text-[10px] text-amber-700/90 leading-relaxed font-light">
                    تمت محاكاة إرسال الرمز بنجاح. لأغراض التجربة السريعة، الرمز النشط هو: <strong className="font-sans font-black text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded text-xs select-all">{generatedOtp || "جاري التوليد..."}</strong> أو استخدم الرمز العام <strong className="font-sans font-black text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded text-xs">1234</strong> للتجاوز السريع.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(false)}
                  className="flex-1 py-2.5 border border-slate-250 text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  إلغاء التوقيع
                </button>
                <button
                  type="button"
                  onClick={handleVerifyAndSubmitSignature}
                  disabled={enteredOtp.length < 4 || isVerifyingOtp}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    enteredOtp.length === 4 && !isVerifyingOtp
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white shadow-emerald-500/10"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none border border-slate-250"
                  }`}
                >
                  {isVerifyingOtp ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>جاري التحقق...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>تأكيد الهوية واعتماد العقد</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Simplified Saudi Tax Invoice Modal (ZATCA compliant style) */}
        {activeInvoiceForModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 text-right">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-sans">الفاتورة الضريبية المبسطة #{activeInvoiceForModal.id}</h4>
                </div>
                <button
                  onClick={() => setActiveInvoiceForModal(null)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Invoice Printable Sheet */}
              <div className="p-6 sm:p-8 flex-grow overflow-y-auto max-h-[75vh] space-y-6 select-text" id="tax-invoice-print-area">
                {/* Header & Logo */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-dashed border-slate-200 pb-6 gap-6">
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-950 font-sans">بيزنس ديفلوبرز للاستشارات والحلول التقنية</h3>
                    <p className="text-xs text-slate-500 font-sans">طريق الملك فهد، برج الفيصلية، الرياض، المملكة العربية السعودية</p>
                    <p className="text-xs text-slate-500 font-mono" dir="ltr">الرقم الضريبي / VAT: 311245678900003</p>
                  </div>
                  <div className="text-left sm:text-left self-stretch sm:self-auto flex sm:flex-col justify-between items-end">
                    <div className="bg-blue-50 border border-blue-100 text-blue-600 text-xs font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider font-sans">
                      Simplified Tax Invoice
                    </div>
                    <span className="text-xs text-slate-400 block mt-2 font-sans">فاتورة ضريبية مبسطة</span>
                  </div>
                </div>

                {/* Invoice Information Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-sans">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-550">رقم الفاتورة:</span>
                      <span className="font-extrabold text-slate-900 font-mono">{activeInvoiceForModal.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">تاريخ الإصدار:</span>
                      <span className="font-bold text-slate-800">{activeInvoiceForModal.issuedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">تاريخ الاستحقاق:</span>
                      <span className="font-bold text-rose-600">{activeInvoiceForModal.dueDate}</span>
                    </div>
                  </div>

                  <div className="space-y-2 border-r border-slate-200 pr-0 sm:pr-4">
                    <div className="flex justify-between">
                      <span className="text-slate-550">اسم العميل:</span>
                      <span className="font-extrabold text-slate-900">{selectedProject?.clientName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-555">المشروع:</span>
                      <span className="font-bold text-slate-800">{selectedProject?.projectName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">حالة الفاتورة:</span>
                      <span className={`font-black px-2 py-0.5 rounded ${
                        activeInvoiceForModal.status === "paid" 
                          ? "bg-emerald-50 text-emerald-600" 
                          : "bg-rose-50 text-rose-600 animate-pulse"
                      }`}>
                        {activeInvoiceForModal.status === "paid" ? "مدفوعة ومصدقة" : "غير مدفوعة"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Line items Table */}
                <div className="border border-slate-200 rounded-2xl overflow-hidden font-sans">
                  <table className="w-full text-right border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="p-3">وصف الخدمة / البند</th>
                        <th className="p-3 text-left">المبلغ الأساسي</th>
                        <th className="p-3 text-center">الضريبة</th>
                        <th className="p-3 text-left">قيمة الضريبة</th>
                        <th className="p-3 text-left bg-blue-50/50 text-blue-900">الإجمالي شامل الضريبة</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-100 text-slate-800">
                        <td className="p-3 font-medium">{activeInvoiceForModal.title}</td>
                        <td className="p-3 text-left font-mono">{activeInvoiceForModal.amount.toLocaleString()} ر.س</td>
                        <td className="p-3 text-center font-mono">15%</td>
                        <td className="p-3 text-left font-mono">{activeInvoiceForModal.vat.toLocaleString()} ر.س</td>
                        <td className="p-3 text-left font-mono font-extrabold bg-blue-50/20 text-blue-900">{activeInvoiceForModal.total.toLocaleString()} ر.س</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Financial Totals Summary block */}
                <div className="w-full max-w-xs mr-auto space-y-2.5 text-xs text-slate-750 bg-slate-50/60 p-4 rounded-2xl border border-slate-150 font-sans">
                  <div className="flex justify-between">
                    <span>الإجمالي الخاضع للضريبة (Base):</span>
                    <span className="font-bold font-mono">{activeInvoiceForModal.amount.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span>ضريبة القيمة المضافة (15%):</span>
                    <span className="font-bold font-mono">{activeInvoiceForModal.vat.toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-blue-900">
                    <span>الإجمالي النهائي شامل الضريبة:</span>
                    <span className="font-mono">{activeInvoiceForModal.total.toLocaleString()} ر.س</span>
                  </div>
                </div>

                {/* ZATCA QR Code & Assurance Section */}
                <div className="border-t border-slate-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                  <div className="flex items-center gap-4 text-right">
                    {/* ZATCA simulated QR Code box */}
                    <div className="w-24 h-24 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center p-2 shrink-0 shadow-inner relative group select-none">
                      <svg className="w-full h-full text-slate-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2,2 H8 V8 H2 Z M4,4 V6 H6 V4 Z M16,2 H22 V8 H16 Z M18,4 V6 H20 V4 Z M2,16 H8 V22 H2 Z M4,18 V20 H6 V18 Z M10,10 H14 V14 H10 Z M12,2 V6 H10 V8 H12 V10 H10 V14 H12 V12 H14 V16 H10 V18 H12 V22 H14 V20 H18 V22 H20 V18 H22 V14 H20 V10 H22 V4 H20 V8 H18 V4 H16 V8 H14 V2 Z" />
                      </svg>
                      <div className="absolute inset-0 bg-white/95 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[7px] text-slate-600 font-bold p-1 text-center leading-tight shadow-md">
                        <span>المالك: بيزنس ديفلوبرز</span>
                        <span className="font-mono">311245678900003</span>
                        <span>فاتورة صالحة ومطابقة</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">ZATCA Compliant simplified invoice</span>
                      <p className="text-[11px] text-slate-500 font-light leading-relaxed">
                        تعتبر هذه الفاتورة مبسطة وموثقة بالكامل بموجب أنظمة الفوترة الإلكترونية الخاصة بهيئة الزكاة والضريبة والجمارك بالمملكة العربية السعودية.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                >
                  <Printer className="w-4.5 h-4.5" />
                  <span>طباعة وتصدير الفاتورة</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInvoiceForModal(null)}
                  className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold py-3 px-6 rounded-xl transition-all cursor-pointer text-center"
                >
                  إغلاق نافذة العرض
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Credit Card / Mada Simulator Modal */}
        {invoiceToPay && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 text-right">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between font-sans">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">بوابة السداد الآمنة (Secure Payment)</h4>
                </div>
                <button
                  onClick={() => setInvoiceToPay(null)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handlePayInvoice} className="p-6 space-y-6">
                
                {/* Summary */}
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 space-y-2 font-sans">
                  <span className="text-[10px] text-blue-600 font-bold block">مستحقات الفاتورة رقم: {invoiceToPay.id}</span>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-xs text-slate-605 font-light text-right">{invoiceToPay.title}</span>
                    <strong className="text-sm font-black text-blue-900 font-mono shrink-0">{(invoiceToPay.total).toLocaleString()} ر.س</strong>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 font-sans">
                  <label className="block text-xs font-bold text-slate-700">اختر وسيلة الدفع المفضلة:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "Mada", label: "مدى (Mada)" },
                      { id: "Visa", label: "فيزا كارد" },
                      { id: "Apple Pay", label: "أبل باي" }
                    ].map((method) => {
                      const isSelected = paymentMethod === method.id;
                      return (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setPaymentMethod(method.id as any);
                            if (method.id === "Apple Pay") {
                              setCardNumber("•••• •••• •••• 9012");
                              setCardName("APPLE PAY CUSTOMER");
                              setCardExpiry("12/29");
                              setCardCVV("099");
                            } else {
                              setCardNumber("");
                              setCardName("");
                              setCardExpiry("");
                              setCardCVV("");
                            }
                          }}
                          className={`p-3 rounded-xl border text-xs font-bold text-center transition-all cursor-pointer flex flex-col justify-center items-center gap-1.5 ${
                            isSelected
                              ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          <span>{method.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Card fields */}
                <div className="space-y-4">
                  <div className="space-y-1.5 font-sans">
                    <label htmlFor="card-number" className="block text-xs font-bold text-slate-700">رقم بطاقة الدفع (16 خانة) <span className="text-rose-500">*</span></label>
                    <input
                      id="card-number"
                      type="text"
                      required
                      maxLength={19}
                      placeholder="4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
                        let formatted = "";
                        for (let i = 0; i < val.length; i++) {
                          if (i > 0 && i % 4 === 0) formatted += " ";
                          formatted += val[i];
                        }
                        setCardNumber(formatted);
                      }}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-left focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                      dir="ltr"
                    />
                  </div>

                  <div className="space-y-1.5 font-sans">
                    <label htmlFor="card-holder" className="block text-xs font-bold text-slate-700">اسم حامل البطاقة <span className="text-rose-500">*</span></label>
                    <input
                      id="card-holder"
                      type="text"
                      required
                      placeholder="AHMED AL ROWAILI"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 uppercase text-right"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5 font-sans">
                      <label htmlFor="card-expiry" className="block text-xs font-bold text-slate-700">تاريخ الانتهاء <span className="text-rose-500">*</span></label>
                      <input
                        id="card-expiry"
                        type="text"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\//g, "").replace(/[^0-9]/gi, "");
                          if (val.length > 2) {
                            val = val.substring(0, 2) + "/" + val.substring(2, 4);
                          }
                          setCardExpiry(val);
                        }}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-1.5 font-sans">
                      <label htmlFor="card-cvv" className="block text-xs font-bold text-slate-700">الرمز السري (CVV) <span className="text-rose-500">*</span></label>
                      <input
                        id="card-cvv"
                        type="password"
                        required
                        maxLength={3}
                        placeholder="•••"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/[^0-9]/gi, ""))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-center focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex gap-3 font-sans">
                  <button
                    type="submit"
                    disabled={isPaying}
                    className={`flex-1 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      isPaying
                        ? "bg-slate-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-650 hover:from-blue-500 hover:to-indigo-500"
                    }`}
                  >
                    {isPaying ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>يرجى الانتظار، جاري السداد...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4.5 h-4.5" />
                        <span>تأكيد سداد {invoiceToPay.total.toLocaleString()} ر.س</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setInvoiceToPay(null)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Issue Tax Invoice Modal */}
        {isIssueInvoiceOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[999] p-4 text-right">
            <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
              
              {/* Modal Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between font-sans">
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">إصدار فاتورة ضريبية مبسطة جديدة</h4>
                </div>
                <button
                  onClick={() => setIsIssueInvoiceOpen(false)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleIssueInvoice} className="p-6 space-y-5">
                <p className="text-xs text-slate-500 leading-relaxed font-light font-sans">
                  بإمكانك إصدار فاتورة خدمات ضريبية للمشروع الحالي. سيتم إضافة الفاتورة تلقائياً للائحة كفاتورة غير مدفوعة (مستحقة)، وحساب الضريبة بنسبة 15% وتوليد كود الـ QR الخاص بها.
                </p>

                <div className="space-y-1.5 font-sans">
                  <label htmlFor="invoice-title-select" className="block text-xs font-bold text-slate-700">تصنيف ونوع الخدمة المستحقة:</label>
                  <select
                    id="invoice-title-select"
                    value={newInvoiceTitle}
                    onChange={(e) => setNewInvoiceTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right"
                  >
                    <option value="ساعات استشارية إضافية - تطوير نموذج العمل والحلول">ساعات استشارية إضافية - تطوير نموذج العمل والحلول</option>
                    <option value="الدفعة الاستثنائية - ترقية الهيكل وتكامل الأنظمة الرقمية">الدفعة الاستثنائية - ترقية الهيكل وتكامل الأنظمة الرقمية</option>
                    <option value="رسوم صيانة سنوية وإدارة الاستضافة والـ Cloud">رسوم صيانة سنوية وإدارة الاستضافة والـ Cloud</option>
                    <option value="ورش عمل تخصصية وحصص تدريب الموظفين والتمكين">ورش عمل تخصصية وحصص تدريب الموظفين والتمكين</option>
                    <option value="custom">-- كتابة عنوان مخصص آخر --</option>
                  </select>
                </div>

                {newInvoiceTitle === "custom" && (
                  <div className="space-y-1.5 animate-in slide-in-from-top duration-200 font-sans">
                    <label htmlFor="custom-invoice-title" className="block text-xs font-bold text-slate-700">أدخل الوصف المخصص للخدمة:</label>
                    <input
                      id="custom-invoice-title"
                      type="text"
                      required
                      placeholder="مثال: دفعة الاختبار النهائي واعتماد النشر في المتاجر"
                      value={newInvoiceCustomTitle}
                      onChange={(e) => setNewInvoiceCustomTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 text-right"
                    />
                  </div>
                )}

                <div className="space-y-1.5 font-sans">
                  <label htmlFor="invoice-base-amount" className="block text-xs font-bold text-slate-700">المبلغ الأساسي بالريال السعودي (ر.س):</label>
                  <div className="relative">
                    <input
                      id="invoice-base-amount"
                      type="number"
                      min={1}
                      required
                      placeholder="5000"
                      value={newInvoiceAmount}
                      onChange={(e) => setNewInvoiceAmount(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-mono text-left focus:outline-none focus:bg-white focus:ring-1 focus:ring-blue-500 pl-12"
                    />
                    <span className="absolute left-4 top-3 text-xs text-slate-400 font-bold">ر.س</span>
                  </div>
                </div>

                {/* Dynamic real-time calculation card */}
                <div className="bg-slate-50 border border-slate-150 rounded-2xl p-4 text-xs space-y-2 font-sans">
                  <span className="block font-bold text-slate-700 mb-1 border-b border-slate-200 pb-1.5">الحسبة الضريبية للفاتورة تلقائياً:</span>
                  <div className="flex justify-between">
                    <span className="text-slate-550">المبلغ الخاضع للضريبة:</span>
                    <span className="font-semibold font-mono">{Number(newInvoiceAmount).toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-550">ضريبة القيمة المضافة (15%):</span>
                    <span className="font-semibold font-mono">{(Number(newInvoiceAmount) * 0.15).toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-blue-900 border-t border-slate-200 pt-2 font-sans">
                    <span>الإجمالي شامل ضريبة القيمة المضافة:</span>
                    <span className="font-mono">{(Number(newInvoiceAmount) * 1.15).toLocaleString()} ر.س</span>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex gap-3 font-sans">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl transition-all shadow-md cursor-pointer text-center"
                  >
                    إصدار الفاتورة الضريبية واعتمادها
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsIssueInvoiceOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Cloud Library Document Preview Modal */}
        {activeDocForPreview && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 text-right">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-200 animate-in fade-in zoom-in duration-200">
              {/* Modal Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between font-sans">
                <div className="flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-600" />
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">معاينة سحابية سريعة لقراءة المستند</h4>
                </div>
                <button
                  onClick={() => setActiveDocForPreview(null)}
                  className="p-1.5 hover:bg-slate-200 rounded-lg text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Document Sheet Area */}
              <div className="p-6 sm:p-8 flex-grow overflow-y-auto max-h-[70vh] space-y-6 select-text text-right font-sans" dir="rtl">
                {/* Document Title Header */}
                <div className="border-b-2 border-dashed border-slate-200 pb-5 space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="bg-indigo-100 text-indigo-800 font-extrabold px-2.5 py-1 rounded-md">
                      {activeDocForPreview.categoryArabic}
                    </span>
                    <span className="text-slate-400 font-mono">ID: {activeDocForPreview.id}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-950">{activeDocForPreview.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{activeDocForPreview.description}</p>
                </div>

                {/* Simulated Stamp / Certified Status */}
                <div className="flex items-center justify-between p-4 bg-blue-50/50 border border-blue-100/70 rounded-2xl">
                  <div className="space-y-1">
                    <span className="text-xs text-slate-400 block font-medium">حالة المستند وأمانه:</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{activeDocForPreview.status} - معتمد ومصدق</span>
                    </span>
                  </div>
                  {/* Digital Signature Emblem */}
                  <div className="border-2 border-emerald-500/30 text-emerald-600 rounded-xl px-3 py-1.5 text-center rotate-3 border-dashed shrink-0 select-none">
                    <span className="text-[10px] block font-extrabold tracking-widest leading-none">مكتبة سحابية</span>
                    <span className="text-xs font-black uppercase leading-none font-mono">APPROVED</span>
                  </div>
                </div>

                {/* Content rendering depending on type */}
                <div className="space-y-4">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider border-r-2 border-blue-600 pr-2">الخلاصة والبيان التنفيذي لقراءة المستند</h4>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs text-slate-600 leading-relaxed font-light">
                    {activeDocForPreview.content.summary}
                  </div>

                  {/* If contract: show clauses */}
                  {activeDocForPreview.category === "contract" && activeDocForPreview.content.clauses && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-extrabold text-slate-800 border-r-2 border-blue-600 pr-2">البنود القانونية والالتزامات الأساسية:</h4>
                      <div className="space-y-2.5">
                        {activeDocForPreview.content.clauses.map((clause, idx) => (
                          <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-xs text-slate-700 leading-relaxed relative">
                            <span className="absolute left-3 top-3.5 text-[10px] text-slate-400 font-mono font-bold">بند {idx + 1}</span>
                            <p className="pl-8">{clause}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* If blueprint: show description and specs */}
                  {activeDocForPreview.category === "blueprint" && (
                    <div className="space-y-3 pt-2">
                      {activeDocForPreview.content.diagramDescription && (
                        <>
                          <h4 className="text-xs font-extrabold text-slate-800 border-r-2 border-blue-600 pr-2">التخطيط التقني والمعماري للنظام:</h4>
                          <p className="text-xs text-slate-600 leading-relaxed font-light bg-slate-50 p-4 rounded-xl border border-slate-150">
                            {activeDocForPreview.content.diagramDescription}
                          </p>
                        </>
                      )}

                      {activeDocForPreview.content.technicalSpecs && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-extrabold text-slate-800 border-r-2 border-blue-600 pr-2">المواصفات الفنية المعتمدة:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans pt-1">
                            {Object.entries(activeDocForPreview.content.technicalSpecs).map(([key, val]) => (
                              <div key={key} className="flex justify-between bg-slate-50 p-3 rounded-xl border border-slate-150">
                                <span className="text-slate-550 font-medium">{key}:</span>
                                <span className="font-extrabold text-slate-800">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* If report: show recommendations */}
                  {activeDocForPreview.category === "report" && activeDocForPreview.content.recommendations && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-extrabold text-slate-800 border-r-2 border-blue-600 pr-2">التوصيات والخطوات التشغيلية المقترحة:</h4>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {activeDocForPreview.content.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/50">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] mt-0.5">{idx + 1}</span>
                            <span className="leading-relaxed">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer notes */}
                <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-100 flex justify-between items-center flex-wrap gap-2">
                  <span>تم التوثيق والاعتماد رقمياً بسلسلة الكتل Blockchain</span>
                  <span>تاريخ الفحص والمطابقة: {activeDocForPreview.date}</span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3 font-sans justify-end">
                <button
                  onClick={() => {
                    handleSimulatedDownload(activeDocForPreview);
                    setActiveDocForPreview(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm py-2.5 px-5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>تحميل الملف كملف رسمي</span>
                </button>
                <button
                  onClick={() => setActiveDocForPreview(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          </div>
        )}

            </motion.div>
          )}
        </AnimatePresence>

        {/* Real-time Toast Notifications Container */}
        <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3 max-w-sm w-full font-sans pointer-events-none">
          <AnimatePresence>
            {toasts.map((toast) => (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: -100, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.9, transition: { duration: 0.25 } }}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xl flex items-start gap-3 text-right cursor-pointer pointer-events-auto relative overflow-hidden"
                style={{
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                }}
                onClick={() => {
                  // Mark as read when clicked
                  handleToggleReadNotification(toast.id);
                  // Dismiss
                  setToasts(prev => prev.filter(t => t.id !== toast.id));
                }}
              >
                {/* Visual Accent bar depending on type */}
                <div className={`absolute top-0 bottom-0 right-0 w-1 ${
                  toast.type === "milestone" ? "bg-emerald-500" : "bg-blue-600"
                }`} />

                {/* Icon wrapper */}
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  toast.type === "milestone" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                }`}>
                  {toast.type === "milestone" ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0 space-y-1 pr-1">
                  <div className="flex items-center justify-between flex-row-reverse">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setToasts(prev => prev.filter(t => t.id !== toast.id));
                      }}
                      className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-extrabold text-blue-600 tracking-wide">
                      {toast.type === "milestone" ? "إنجاز فوري بالمشروع 🚀" : "تحديث ملف من الفريق 📄"}
                    </span>
                  </div>
                  <h6 className="text-xs font-extrabold text-slate-900 leading-snug">
                    {toast.title}
                  </h6>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                    {toast.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
