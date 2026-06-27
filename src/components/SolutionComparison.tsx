import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  TrendingUp, 
  Scale, 
  Lightbulb, 
  Code, 
  Check, 
  X, 
  ArrowLeft, 
  Sparkles, 
  Users, 
  AlertTriangle, 
  Clock, 
  Coins, 
  ChevronRight,
  HelpCircle,
  FileCheck2,
  BookmarkCheck
} from "lucide-react";

interface ServiceCompareItem {
  id: string;
  title: string;
  subtitle: string;
  categoryName: string;
  icon: ReactNode;
  colorClass: string;
  bgGradient: string;
  targetAudience: string;
  challengesMet: string;
  keyBenefits: string[];
  deliverables: string[];
  estimatedTime: string;
  estimatedCost: string;
}

interface SolutionComparisonProps {
  onPreFillInquiry: (serviceId: string, customNotes: string) => void;
}

export default function SolutionComparison({ onPreFillInquiry }: SolutionComparisonProps) {
  // Define our services database for comparison
  const compareServices: ServiceCompareItem[] = [
    {
      id: "mgmt",
      title: "إدارة الأعمال والهيكلة",
      subtitle: "إعادة تنظيم وبناء العمليات التشغيلية وتوثيق الإجراءات للحد من الهدر المالي.",
      categoryName: "إداري وتشغيلي",
      icon: <Briefcase className="w-5 h-5" />,
      colorClass: "text-emerald-650 bg-emerald-50 border-emerald-100",
      bgGradient: "from-emerald-50 to-emerald-100/30",
      targetAudience: "المنشآت القائمة التي تعاني من عشوائية الإجراءات وتداخل الصلاحيات، والشركات العائلية الساعية للتحول للمأسسة.",
      challengesMet: "العشوائية الإدارية، تداخل الصلاحيات للموظفين، تسريب الأرباح التشغيلية، وصعوبة فتح فروع إضافية.",
      keyBenefits: [
        "رفع الكفاءة التشغيلية بنسبة تزيد عن 30% بأتمتة المهام.",
        "وضوح الصلاحيات الإدارية وغياب الازدواجية تماماً.",
        "بناء واستدامة المنشأة لتكون جاهزة للتوسع المستقبلي.",
        "حفظ حقوق المنشأة وصياغة لوائح الامتثال الداخلي."
      ],
      deliverables: [
        "أدلة السياسات والإجراءات التشغيلية القياسية (SOPs)",
        "بطاقات الوصف الوظيفي لجميع المسميات وهيكل محدث",
        "لوحة مراقبة تدفق العمليات وتقارير كفاءة الموظفين",
        "تأهيل إداري متكامل لقيادة التغيير بنجاح"
      ],
      estimatedTime: "4 - 6 أسابيع من العمل",
      estimatedCost: "25,000 - 45,000 ر.س"
    },
    {
      id: "plan",
      title: "التخطيط الاستراتيجي",
      subtitle: "صياغة خطط التوسع والنمو الخمسية وبناء بطاقات الأداء المتوازن لتتبع النتائج.",
      categoryName: "نمو واستراتيجية",
      icon: <TrendingUp className="w-5 h-5" />,
      colorClass: "text-teal-650 bg-teal-50 border-teal-100",
      bgGradient: "from-teal-50 to-teal-100/30",
      targetAudience: "المدراء التنفيذيون، المؤسسون، والشركات المتوسطة الراغبة في التوسع المدروس ودخول أسواق ومناطق جديدة.",
      challengesMet: "تخبط القرارات الاستثمارية، تشتت جهود الفرق، غياب الأهداف الواضحة، والتأثر المباشر بالتقلبات المفاجئة.",
      keyBenefits: [
        "رؤية واضحة لخمس سنوات مبنية على لغة الأرقام الواقعية.",
        "بناء وتصميم بطاقات الأداء المتوازن (BSC) للنمو الشهري.",
        "امتلاك خطط طوارئ مسبقة وجاهزة للتكيف الفوري.",
        "تحليل تنافسي شامل يمنحك التميز والحصة السوقية الكبرى."
      ],
      deliverables: [
        "وثيقة الخطة الاستراتيجية الخمسية المعتمدة للشركة",
        "مصفوفة الأهداف وبطاقة الأداء المتوازن (Balanced Scorecard)",
        "لوحة مؤشرات الأداء الرئيسية (KPIs) لجميع الأقسام",
        "تحليل تفصيلي للبيئة الداخلية والخارجية والفرص (SWOT)"
      ],
      estimatedTime: "3 - 5 أسابيع من العمل",
      estimatedCost: "18,000 - 32,000 ر.س"
    },
    {
      id: "arbit",
      title: "التحكيم والنزاعات التقنية",
      subtitle: "حل الخلافات البرمجية والتعاقدية كخبير فني مستقل وحكم معتمد لضمان الحقوق.",
      categoryName: "قانوني وتقني",
      icon: <Scale className="w-5 h-5" />,
      colorClass: "text-amber-650 bg-amber-50 border-amber-100",
      bgGradient: "from-amber-50 to-amber-100/30",
      targetAudience: "الشركات المتعاقدة مع مطورين متعثرين، المستثمرون الراغبون في تقييم التقنيات، والمحاكم والجهات القضائية.",
      challengesMet: "تعثر المشاريع البرمجية، استلام كود برمجي معيب أو ضعيف الأداء، الخلاف حول نسب الإنجاز، ومطابقة المواصفات.",
      keyBenefits: [
        "تقرير فني وقانوني هندسي معتمد يفند كافة ثغرات الكود.",
        "التوصل لحلول ودية سريعة توفر سنوات القضاء وجحيم المحاكم.",
        "فحص دقيق وشامل لبناء قواعد البيانات وجداول الأمان الفني.",
        "مستندات فنية معيارية وقوية تدعم موقفك القانوني تماماً."
      ],
      deliverables: [
        "تقرير الخبرة الهندسية الفنية المعتمد للتحكيم والقضاء",
        "تقرير شامل لجودة الأكواد وشفرة المصدر (Code Quality)",
        "تحديد هندسي لنسب الإنجاز الفعلي مقابل المبالغ المدفوعة",
        "مسودة اتفاقية تسوية وفض نزاع تقني ودية وملزمة قانوناً"
      ],
      estimatedTime: "2 - 3 أسابيع من العمل",
      estimatedCost: "15,000 - 28,000 ر.س"
    },
    {
      id: "entre",
      title: "تأسيس واحتضان المشاريع",
      subtitle: "دراسة وتصميم الفكرة من الصفر وبناء نموذج عمل مرن وتأهيلها للجولات الاستثمارية.",
      categoryName: "ابتكار وريادة",
      icon: <Lightbulb className="w-5 h-5" />,
      colorClass: "text-purple-650 bg-purple-50 border-purple-100",
      bgGradient: "from-purple-50 to-purple-100/30",
      targetAudience: "رواد الأعمال والمبتكرون الذين يمتلكون أفكاراً ريادية صاعدة ويريدون صياغتها بطريقة صحيحة لحمايتها.",
      challengesMet: "ارتفاع مخاطر فشل الأفكار الجديدة، غياب التمويل والمستثمرين، وضياع الميزانيات في ميزات برمجية غير مطلوبة.",
      keyBenefits: [
        "خفض مخاطر الفشل للمشاريع بنسبة تفوق 70% بدراسات دقيقة.",
        "تأسيس نموذج عمل تجاري (BMC) مبتكر يحقق تدفقات نقدية ممتازة.",
        "امتلاك ملف عرض استثماري (Pitch Deck) معد بلغة المستثمرين.",
        "إطلاق سريع وذكي للمنتج الأولي MVP يختبر سلوك المستخدم."
      ],
      deliverables: [
        "دراسة الجدوى الاقتصادية المتكاملة (المالية والتسويقية)",
        "مخطط نموذج العمل التجاري المبتكر (Business Model Canvas)",
        "ملف العرض الاستثماري الاحترافي (Pitch Deck) للمستثمرين",
        "تحديد وثيقة نطاق العمل الفعّال وإطار المنتج الأولي MVP"
      ],
      estimatedTime: "8 - 12 أسبوعاً من العمل",
      estimatedCost: "30,000 - 60,000 ر.س"
    },
    {
      id: "apps",
      title: "تطوير التطبيقات والأنظمة",
      subtitle: "برمجة وبناء منصات الويب وتطبيقات الهواتف المخصصة ببنية سحابية آمنة كلياً.",
      categoryName: "برمجة وتطوير",
      icon: <Code className="w-5 h-5" />,
      colorClass: "text-indigo-650 bg-indigo-50 border-indigo-100",
      bgGradient: "from-indigo-50 to-indigo-100/30",
      targetAudience: "المنشآت التجارية، أصحاب الأفكار التقنية الحاصلة على دراسات جدوى، والجهات الراغبة بأتمتة أعمالها رقمياً.",
      challengesMet: "بطء الأنظمة الحالية وتعطلها، ضعف واجهات المستخدم البرمجية، صعوبة التوسع الفني للمنصة، وغياب الدعم التقني الصادق.",
      keyBenefits: [
        "واجهات (UI/UX) غاية في الروعة تضمن سهولة الاستخدام وتنمي الولاء.",
        "تطبيقات سريعة جداً ومواقع متجاوبة تطلق مبيعاتك الفورية بكفاءة.",
        "بنية سحابية آمنة ومقاومة للاختراق وقابلة للتوسع اللانهائي.",
        "صيانة مستمرة ودعم فني متكامل مع لوحات تحكم ديناميكية ذكية."
      ],
      deliverables: [
        "تطبيق هاتف ذكي أصيل (iOS & Android) منشور بالكامل على المتاجر",
        "منصة ويب وتطبيق سحابي ذكي متكامل مع لوحة إدارة المحتوى",
        "الكود المصدري البرمجي كاملاً مع وثائق البنية المعمارية للأنظمة",
        "شهادة فحص سلامة واختبار أمان البنية السحابية والخوادم"
      ],
      estimatedTime: "6 - 10 أسابيع من العمل",
      estimatedCost: "45,000 - 95,000 ر.س"
    }
  ];

  // Default select the first and the fifth services (Business management and app development) to showcase comparisons immediately
  const [selectedIds, setSelectedIds] = useState<string[]>(["mgmt", "apps"]);
  const [highlightDifferences, setHighlightDifferences] = useState<boolean>(false);

  const toggleServiceSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      // Keep at least one selected so the comparison is always useful
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      // Max 3 services in desktop comparison for visual readability
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace the oldest selection (queue style) to prevent layout distortion on normal screens
        setSelectedIds([...selectedIds.slice(1), id]);
      }
    }
  };

  const handleRequestService = (serviceId: string, serviceTitle: string) => {
    const notes = `أود الاستفسار وحجز الباقة الاستشارية لـ (${serviceTitle}) بعد إجراء المقارنة التفاعلية في منصتكم.`;
    onPreFillInquiry(serviceId, notes);
    
    // Smooth scroll to the contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeCompareItems = compareServices.filter(service => selectedIds.includes(service.id));

  return (
    <section id="comparison" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      {/* Visual background details */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/30 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-indigo-100/20 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span>مستشاركم الرقمي الذكي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            مقارنة <span className="text-blue-600">الحلول والخدمات الاستشارية</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            اختر خدمتين أو ثلاثاً للمقارنة المباشرة بينها. تفحص الفوائد، المخرجات، الفترات الزمنية وقيمة الاستثمار لتحديد المسار الأنسب لطموحات شركتك.
          </p>
        </div>

        {/* Selection panel */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm mb-10 text-right">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>اختر خدماتك للمقارنة المباشرة:</span>
                <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-full font-sans">
                  {selectedIds.length} / 3 محددة
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-light mt-1">
                (يمكنك اختيار حتى 3 خدمات كحد أقصى للمقارنة المباشرة بطريقة سهلة ومريحة)
              </p>
            </div>

            {/* Feature to highlight differences */}
            <button
              onClick={() => setHighlightDifferences(!highlightDifferences)}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                highlightDifferences 
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm shadow-blue-500/10" 
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>{highlightDifferences ? "إلغاء تمييز الجوانب المالية" : "تمييز الجوانب الاستثمارية والزمنية"}</span>
            </button>
          </div>

          {/* Quick selection badges/cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {compareServices.map((service) => {
              const isSelected = selectedIds.includes(service.id);
              return (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  key={service.id}
                  onClick={() => toggleServiceSelection(service.id)}
                  className={`p-4 rounded-2xl border text-right transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-blue-500 bg-blue-50/70 text-blue-950 shadow-sm ring-2 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${service.colorClass}`}>
                        {service.icon}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? "bg-blue-600 border-blue-600 text-white" 
                          : "border-slate-300 bg-white"
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold block truncate">{service.title}</h4>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-medium">{service.categoryName}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-md overflow-hidden text-right">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  {/* Left row labels column */}
                  <th className="p-6 text-sm font-black text-slate-900 w-64 min-w-[200px] border-l border-slate-200">
                    الركائز والميزات الأساسية
                  </th>
                  {/* Selected services header columns */}
                  {activeCompareItems.map((service) => (
                    <th key={service.id} className="p-6 text-right min-w-[280px] border-l border-slate-200 last:border-l-0 relative">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${service.colorClass}`}>
                            {service.categoryName}
                          </span>
                          <button 
                            onClick={() => toggleServiceSelection(service.id)}
                            className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="إزالة من المقارنة"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                          <span className="shrink-0">{service.icon}</span>
                          <span>{service.title}</span>
                        </h3>
                        <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-2 h-8">
                          {service.subtitle}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Row 1: Target Audience */}
                <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                  <td className="p-5 font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/40 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>الجمهور المستهدف</span>
                    </div>
                  </td>
                  {activeCompareItems.map((service) => (
                    <td key={service.id} className="p-5 text-xs sm:text-sm text-slate-600 font-light leading-relaxed border-l border-slate-200 last:border-l-0">
                      {service.targetAudience}
                    </td>
                  ))}
                </tr>

                {/* Row 2: Challenges Met */}
                <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                  <td className="p-5 font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/40 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>المشاكل والتحديات التي تعالجها</span>
                    </div>
                  </td>
                  {activeCompareItems.map((service) => (
                    <td key={service.id} className="p-5 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed border-l border-slate-200 last:border-l-0">
                      <span className="text-rose-600 block mb-1">تنهي وتتغلب على:</span>
                      <p className="font-light">{service.challengesMet}</p>
                    </td>
                  ))}
                </tr>

                {/* Row 3: Key Benefits */}
                <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                  <td className="p-5 font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/40 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      <span>أهم المزايا والفوائد للشركة</span>
                    </div>
                  </td>
                  {activeCompareItems.map((service) => (
                    <td key={service.id} className="p-5 text-xs sm:text-sm text-slate-700 border-l border-slate-200 last:border-l-0">
                      <ul className="space-y-2.5">
                        {service.keyBenefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                            <span className="font-light leading-relaxed">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Row 4: Deliverables */}
                <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                  <td className="p-5 font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/40 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <BookmarkCheck className="w-4 h-4 text-purple-500" />
                      <span>المخرجات الملموسة والوثائق</span>
                    </div>
                  </td>
                  {activeCompareItems.map((service) => (
                    <td key={service.id} className="p-5 text-xs sm:text-sm text-slate-700 border-l border-slate-200 last:border-l-0">
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span className="font-light">{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* Row 5: Estimated Duration */}
                <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                  <td className="p-5 font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/40 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      <span>الجدول الزمني والمدة التقديرية</span>
                    </div>
                  </td>
                  {activeCompareItems.map((service) => {
                    const isHighlighted = highlightDifferences;
                    return (
                      <td 
                        key={service.id} 
                        className={`p-5 text-xs sm:text-sm font-bold border-l border-slate-200 last:border-l-0 transition-all ${
                          isHighlighted ? "bg-amber-50/30 text-amber-950" : "text-slate-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{service.estimatedTime}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 6: Estimated Cost */}
                <tr className="border-b border-slate-200 hover:bg-slate-50/30 transition-colors">
                  <td className="p-5 font-bold text-slate-800 text-xs sm:text-sm bg-slate-50/40 border-l border-slate-200">
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-emerald-500" />
                      <span>القيمة الاستثمارية التقديرية</span>
                    </div>
                  </td>
                  {activeCompareItems.map((service) => {
                    const isHighlighted = highlightDifferences;
                    return (
                      <td 
                        key={service.id} 
                        className={`p-5 text-xs sm:text-sm font-black border-l border-slate-200 last:border-l-0 transition-all ${
                          isHighlighted ? "bg-blue-50/50 text-blue-950" : "text-blue-600 font-sans"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Coins className="w-4 h-4 text-slate-400 shrink-0" />
                          <span>{service.estimatedCost}</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* Row 7: Action CTA Buttons */}
                <tr className="bg-slate-50/30">
                  <td className="p-5 font-bold text-slate-400 text-xs sm:text-sm border-l border-slate-200">
                    اتخاذ قرار استثماري واعد
                  </td>
                  {activeCompareItems.map((service) => (
                    <td key={service.id} className="p-5 border-l border-slate-200 last:border-l-0 text-center">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleRequestService(service.id, service.title)}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-5 rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>حجز باقة {service.title}</span>
                        <ArrowLeft className="w-4 h-4" />
                      </motion.button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Informative Note Footer */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 sm:p-5 flex items-start gap-3 text-right">
          <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 border border-blue-200 flex items-center justify-center shrink-0">
            <HelpCircle className="w-5 h-5" />
          </span>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-bold text-blue-950">هل أنت محتار في تحديد الخدمة المناسبة لوضع شركتك الحالي؟</h4>
            <p className="text-xs text-blue-900/80 font-light leading-relaxed">
              ننصحك بإجراء <strong>أداة تقييم الجاهزية والنضج الرقمي</strong> الموجودة بالقسم أدناه للحصول على تشخيص دقيق ومجاني، أو احجز استشارتك المجانية الأولى لنتحدث مباشرة مع مستشارينا في بيزنس ديفلوبرز ونرسم لك الطريق الأمثل للتنفيذ الفعلي.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
