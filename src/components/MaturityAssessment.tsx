import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Zap, 
  HelpCircle,
  FileText,
  Mail
} from "lucide-react";

interface Answer {
  text: string;
  points: number;
}

interface Question {
  id: number;
  title: string;
  description: string;
  options: Answer[];
}

interface AssessmentHistoryItem {
  id: string;
  date: string;
  score: number;
  level: string;
}

interface MaturityAssessmentProps {
  onPreFillInquiry: (serviceId: string, customNotes: string) => void;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "أولاً: توثيق الهياكل التشغيلية والسياسات الإدارية",
    description: "تحديد مدى وضوح إجراءات التشغيل وصلاحيات وهياكل فريق العمل لحماية أعمالك من العشوائية.",
    options: [
      {
        text: "نعم، موثقة بالكامل في أدلة إجراءات معيارية (SOPs)، معتمدة، ويتم تحديثها دورياً لمواكبة النمو.",
        points: 3,
      },
      {
        text: "لدينا بعض الهياكل والمستندات البسيطة ولكنها غير متكاملة وتعتمد بشكل رئيسي على اجتهادات الأفراد الشفهية.",
        points: 2,
      },
      {
        text: "لا توجد أي سياسات تشغيلية أو أدلة مكتوبة، والعمليات والمهام تدار شفهياً وبشكل يومي ارتجالي.",
        points: 1,
      },
    ],
  },
  {
    id: 2,
    title: "ثانياً: أتمتة العمليات اليومية وتكامل الأنظمة الرقمية",
    description: "مدى اعتماد المنشأة على التكنولوجيا الحديثة لربط المبيعات والمخزون وإدارة علاقات العملاء.",
    options: [
      {
        text: "نعتمد على منصات سحابية مخصصة أو أنظمة مترابطة بالكامل (ERP / CRM) تدير التدفقات بسلاسة.",
        points: 3,
      },
      {
        text: "نستخدم بعض التطبيقات الرقمية المنفصلة غير المترابطة أو نتابع العمليات يدوياً عبر جداول إكسل.",
        points: 2,
      },
      {
        text: "نعتمد كلياً على الدفاتر الورقية أو المتابعة المباشرة، ولا نوظف أي أدوات تقنية حديثة في الإدارة.",
        points: 1,
      },
    ],
  },
  {
    id: 3,
    title: "ثالثاً: ملكية الأكواد البرمجية وضمان جودتها الفنية",
    description: "التحقق من حماية حقوقك البرمجية والملكية الفكرية لأصول شركتك الرقمية وخلوها من الثغرات العميقة.",
    options: [
      {
        text: "نملك الكود البرمجي بالكامل، ونقوم بفحصه وتدقيقه هندسياً وتقنياً بانتظام عبر خبراء ومحكمين فنيين معتمدين.",
        points: 3,
      },
      {
        text: "نملك الكود المصدري ولكننا لم نقم بمراجعته أو تدقيقه برمجياً مطلقاً، ولا نعلم مدى أمانه وخلوه من العيوب.",
        points: 2,
      },
      {
        text: "لا نملك الكود المصدري الخاص بأنظمتنا، أو أن الأنظمة مغلقة وتملكها حصرياً جهة التطوير الخارجية المتعاقد معها.",
        points: 1,
      },
    ],
  },
  {
    id: 4,
    title: "رابعاً: التخطيط الاستراتيجي ومؤشرات قياس الأداء (KPIs)",
    description: "كيفية قياس نجاح أهداف المنشأة ومستهدفاتها السنوية، ومراقبة إنتاجية طواقم العمل.",
    options: [
      {
        text: "نمتلك خطة استراتيجية واضحة وبطاقات أداء متوازنة (Balanced Scorecards) ومؤشرات أداء قياسية لكل قسم.",
        points: 3,
      },
      {
        text: "نضع خطة إستراتيجية مبدئية غير مقاسة بدقة، ونكتفي بمراقبة الأرباح والمبيعات الإجمالية فقط كمعيار للنجاح.",
        points: 2,
      },
      {
        text: "لا نمتلك خطة استراتيجية أو مؤشرات قياس محددة، والأهداف تتبع الفرص والظروف المتغيرة بشكل ارتجالي.",
        points: 1,
      },
    ],
  },
  {
    id: 5,
    title: "خامساً: جاهزية نموذج العمل للتوسع والاستثمار",
    description: "مدى مرونة نموذج العمل الحالي للمشروع وقابلية فكرته التشغيلية والمالية للتكرار والتوسع الرقمي السريع.",
    options: [
      {
        text: "نموذج عملنا مرن للغاية ومصمم للتوسع الرقمي الشامل (Scalable)، ولدينا دراسات جدوى مالية معتمدة ورصينة.",
        points: 3,
      },
      {
        text: "نموذج أعمالنا تقليدي يحتاج لبعض التحديث، ودراسة الجدوى تحتاج لمراجعة وصياغة احترافية لتناسب تطلعات المستثمرين.",
        points: 2,
      },
      {
        text: "لا نمتلك دراسة جدوى أو نموذج عمل مرن، ونعتمد على تدفقات مالية محدودة ومحلية غير قابلة للتوسع السريع.",
        points: 1,
      },
    ],
  },
];

export default function MaturityAssessment({ onPreFillInquiry }: MaturityAssessmentProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selections, setSelections] = useState<number[]>(Array(QUESTIONS.length).fill(0));
  const [showResult, setShowResult] = useState<boolean>(false);
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bd_maturity_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load local assessment history", e);
    }
  }, []);

  const handleOptionSelect = (points: number) => {
    const updated = [...selections];
    updated[currentStep] = points;
    setSelections(updated);
  };

  const handleNext = () => {
    if (selections[currentStep] === 0) return; // Must select an answer
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateAndShowResult();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const calculateAndShowResult = () => {
    const totalScore = selections.reduce((a, b) => a + b, 0);
    const diagnosis = getDiagnosis(totalScore);

    const newItem: AssessmentHistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString("ar-SA", { year: 'numeric', month: 'long', day: 'numeric' }),
      score: totalScore,
      level: diagnosis.level,
    };

    const updatedHistory = [newItem, ...history.slice(0, 4)];
    setHistory(updatedHistory);
    try {
      localStorage.setItem("bd_maturity_history", JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save history", e);
    }

    setShowResult(true);
  };

  const getDiagnosis = (score: number) => {
    if (score >= 13) {
      return {
        level: "نضج رقمي وتشغيلي متقدم ومستقر",
        scoreClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
        bgLight: "bg-emerald-50/40",
        badgeColor: "bg-emerald-500",
        description: "تهانينا! منشأتك تتمتع ببنية تنظيمية واضحة وموثقة وتعتمد على التقنية والخطط القياسية بشكل ممتاز، مما يجعلها مهيأة للاستثمار والنمو المطرد مع الحفاظ على الكفاءة الإدارية.",
        points: [
          "تحديث ومراجعة دورية للأدلة التنظيمية والسياسات لضمان عدم تأثر العمل بالنمو السريع للموظفين.",
          "تضمين أدوات الذكاء الاصطناعي التوليدي وخدمات Gemini السحابية لتحليل بيانات المبيعات وأتمتة خدمة العملاء بشكل ذكي.",
          "التركيز على حماية الملكية الفكرية وفحص وتدقيق الأكواد البرمجية (Code Auditing) لمنع الثغرات الأمنية أو المشاكل العميقة في البناء البرمجي.",
          "مراجعة الأداء الاستراتيجي بشكل نصف سنوي عبر بطاقات الأداء المتوازنة والتحقق من ارتباط الأهداف بالأقسام التشغيلية."
        ],
        services: [
          { id: "arbit", label: "التحكيم والخبرة الفنية وتدقيق الأكواد" },
          { id: "plan", label: "مراجعة بطاقات الأداء الاستراتيجي والـ KPIs" }
        ]
      };
    } else if (score >= 9) {
      return {
        level: "نضج متوسط - يتطلب التحسين والتمكين",
        scoreClass: "text-blue-700 bg-blue-50 border-blue-200",
        bgLight: "bg-blue-50/40",
        badgeColor: "bg-blue-600",
        description: "منشأتك تمتلك أساساً إدارياً وتقنياً جيداً، ولكن هناك بعض الفجوات التشغيلية أو عدم التكامل بين الأنظمة والسياسات، مما قد يعرض الأداء للتشتت أو يقلل الكفاءة عند التوسع.",
        points: [
          "البدء الفوري في تحويل الإجراءات الشفهية والاجتهادات الشخصية إلى أدلة مكتوبة ومعتمدة (SOPs) لضمان حوكمة سليمة للأعمال.",
          "أتمتة العمليات اليومية وتكامل تطبيقات الويب والهواتف لتلافي إدخال البيانات يدوياً في ملفات إكسل مبعثرة.",
          "صياغة دراسة جدوى تسويقية ومالية متكاملة وإعداد نموذج عمل تجاري (BMC) محدث ليكون جاهزاً للاستثمار.",
          "التأكد من ملكية الكود المصدري للمنصة وحمايته بعقود قانونية وضمان استلامه بالصيغ المفتوحة القابلة للتحديث."
        ],
        services: [
          { id: "mgmt", label: "أدلة الإجراءات وهيكلة الشركات SOPs" },
          { id: "apps", label: "تصميم وتطوير تطبيقات الهواتف والويب المخصصة" },
          { id: "entre", label: "صياغة دراسات الجدوى المالية ونماذج الأعمال" }
        ]
      };
    } else {
      return {
        level: "نضج تأسيسي - بحاجة ماسة للتطوير وإعادة الهيكلة",
        scoreClass: "text-amber-700 bg-amber-50 border-amber-200",
        bgLight: "bg-amber-50/40",
        badgeColor: "bg-amber-500",
        description: "منشأتك تعتمد بشكل كبير على العمليات اليدوية أو العشوائية غير الموثقة، وهناك فجوة رقمية ملحوظة تهدد استدامة الأعمال أو تزيد من احتمالية حدوث أخطاء فادحة في تملك الأصول وحماية الفكرة قانونياً وفنياً.",
        points: [
          "تأسيس هيكل إداري وتنظيمي واضح وتحديد الصلاحيات والمسؤوليات فوراً لمنع التداخل والنزاعات التشغيلية.",
          "بناء الهوية الرقمية والاسم التجاري والبدء بتطوير نسخة تجريبية أولية (MVP) لأبسط المنتجات وأتمتة خدماتك الأساسية.",
          "إعداد دراسة جدوى تشغيلية ومالية شاملة للوقوف على دقة التسعير وهوامش الربح والسيولة النقدية المتوقعة.",
          "وضع أهداف سنوية واضحة ومتابعة التكاليف والأرباح بشكل تقني منتظم والابتعاد عن الإدارة الورقية العشوائية."
        ],
        services: [
          { id: "entre", label: "احتضان فكرة المشروع وبناء منتج MVP وتطوير الهوية" },
          { id: "mgmt", label: "هيكلة الشركات وإدارة الأعمال وبناء السياسات" }
        ]
      };
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelections(Array(QUESTIONS.length).fill(0));
    setShowResult(false);
  };

  const handleSendToAdvisors = (diagnosis: any, totalScore: number) => {
    const recommendedServices = diagnosis.services.map((s: any) => s.label).join("، ");
    const customNotes = `أجريت تقييم نضج الأعمال التفاعلي وحصلت على درجة (${totalScore} من 15) بمستوى [${diagnosis.level}]. 
أرغب في مناقشة هذا التقييم وتطبيق التوصيات المذكورة، خاصة الخدمات الموصى بها لشركتي: (${recommendedServices}). يرجى تحديد موعد استشاري مجاني للاطلاع على التفاصيل.`;
    
    // Auto-prefill and navigate
    onPreFillInquiry(diagnosis.services[0]?.id || "mgmt", customNotes);
  };

  const progressPercentage = ((currentStep + (selections[currentStep] > 0 ? 1 : 0)) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[currentStep];
  const selectedPoints = selections[currentStep];

  const totalScore = selections.reduce((a, b) => a + b, 0);
  const diagnosis = getDiagnosis(totalScore);

  return (
    <section id="maturity-assessment" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-right">
        
        {/* Header Title Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
            <span className="text-blue-600 font-bold">مقياس جاهزية الأعمال والتمكين الرقمي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            قيّم نضج شركتك <span className="text-blue-600 font-extrabold">واكتشف فجوات النمو</span> في دقيقتين
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            أجب عن 5 أسئلة استراتيجية سريعة صاغها مستشارونا التقنيون والإداريون، واحصل فوراً على تشخيص أولي دقيق وتوصيات مخصصة لنشاطك.
          </p>
        </div>

        {/* Dynamic Card Container with Animations */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  {/* Top Header Step Indicator */}
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1.5 rounded-full">
                      السؤال {currentStep + 1} من {QUESTIONS.length}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      التصنيف: {currentStep === 0 ? "الهيكلة والإدارة" : currentStep === 1 ? "التقنية والأتمتة" : currentStep === 2 ? "الملكية الفكرية وجودة الكود" : currentStep === 3 ? "التخطيط والـ KPIs" : "نموذج العمل والاستثمار"}
                    </span>
                  </div>

                  {/* Question Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {currentQuestion.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-light">
                      {currentQuestion.description}
                    </p>
                  </div>

                  {/* Answer Options */}
                  <div className="space-y-3 mt-6">
                    {currentQuestion.options.map((opt, index) => {
                      const isSelected = selectedPoints === opt.points;
                      return (
                        <button
                          id={`q-${currentQuestion.id}-opt-${index}`}
                          key={index}
                          onClick={() => handleOptionSelect(opt.points)}
                          className={`w-full p-4 sm:p-5 rounded-2xl border text-right text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "border-blue-500 bg-blue-50/50 text-blue-950 shadow-md font-semibold"
                              : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <span className="leading-relaxed pl-4">{opt.text}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-blue-600 border-blue-500 text-white" : "border-slate-300 bg-slate-100"
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Controls & Progress Bar */}
                <div className="pt-6 border-t border-slate-200 mt-8 space-y-4">
                  {/* Progress Line */}
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-sky-500 h-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      id="btn-prev"
                      onClick={handlePrev}
                      disabled={currentStep === 0}
                      className="flex items-center space-x-1.5 space-x-reverse px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold transition-colors disabled:opacity-40 disabled:hover:bg-white cursor-pointer text-slate-600"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      id="btn-next"
                      onClick={handleNext}
                      disabled={selectedPoints === 0}
                      className="flex items-center space-x-1.5 space-x-reverse px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
                    >
                      <span>{currentStep === QUESTIONS.length - 1 ? "عرض نتيجة التشخيص" : "التالي"}</span>
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Score Header */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-6">
                  <div className="space-y-1 text-center sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full">
                      نتيجة تقييم المنشأة الفوري
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                      {diagnosis.level}
                    </h3>
                  </div>

                  {/* Circle Score Visualization */}
                  <div className={`flex items-center justify-center border rounded-2xl px-6 py-3 font-sans shrink-0 ${diagnosis.scoreClass}`}>
                    <div className="text-center">
                      <span className="block text-3xl font-black">{totalScore}</span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block border-t border-slate-200 mt-1 pt-1">
                        من 15 نقطة
                      </span>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Description */}
                <div className={`p-5 rounded-2xl border border-slate-250/60 leading-relaxed font-light text-xs sm:text-sm text-slate-700 ${diagnosis.bgLight}`}>
                  <p>{diagnosis.description}</p>
                </div>

                {/* Key tailored Recommendations */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-950 flex items-center space-x-2 space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span>خطة التوصيات والمخرجات المقترحة لشركتك:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {diagnosis.points.map((rec, i) => (
                      <li key={i} className="flex items-start space-x-2.5 space-x-reverse text-xs sm:text-sm text-slate-650 font-light leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call-to-actions */}
                <div className="pt-6 border-t border-slate-200 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-500">الخدمة الموصى بها لشركتكم:</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {diagnosis.services.map((srv: any, idx: number) => (
                        <span key={idx} className="text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
                          #{srv.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse shrink-0">
                    <button
                      id="btn-reset"
                      onClick={handleReset}
                      className="flex items-center space-x-1.5 space-x-reverse px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs sm:text-sm font-bold transition-colors cursor-pointer text-slate-600"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>أعد التقييم</span>
                    </button>

                    <button
                      id="btn-send-results"
                      onClick={() => handleSendToAdvisors(diagnosis, totalScore)}
                      className="flex items-center space-x-2 space-x-reverse px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-lg border border-blue-400/10"
                    >
                      <Mail className="w-4 h-4 animate-bounce" />
                      <span>تطبيق التوصيات مجاناً</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Local Assessment History Footer (If any exists) */}
        {history.length > 1 && (
          <div className="mt-8 bg-slate-55 border border-slate-200 rounded-2xl p-4 text-right">
            <span className="text-[10px] font-bold text-slate-500 block mb-2">سجل تقييماتك الأخيرة على هذا المتصفح:</span>
            <div className="flex flex-wrap gap-2">
              {history.map((hist) => (
                <div key={hist.id} className="text-[11px] bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center space-x-2 space-x-reverse shadow-sm">
                  <span className="font-semibold text-slate-800">{hist.score} / 15</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-600">{hist.level.substring(0, 15)}...</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-mono text-[9px]">{hist.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
