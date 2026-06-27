import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Target, 
  Compass,
  CheckCircle2,
  ChevronLeft
} from "lucide-react";

interface WelcomeModalProps {
  onNavigateToSection: (sectionId: string) => void;
}

interface TourStep {
  id: number;
  title: string;
  subtitle: string;
  icon: ReactNode;
  content: ReactNode;
}

export default function WelcomeModal({ onNavigateToSection }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dontShowAgain, setDontShowAgain] = useState<boolean>(false);

  useEffect(() => {
    // Check localStorage to see if user has already seen and disabled the welcome popup
    const hasSeenWelcome = localStorage.getItem("bd_seen_welcome_v1");
    if (!hasSeenWelcome) {
      // Trigger modal open with a small delay for premium feels
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem("bd_seen_welcome_v1", "true");
    }
    setIsOpen(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAction = (sectionId: string) => {
    handleClose();
    // Smooth scroll navigation with slight delay so modal exit animation finishes
    setTimeout(() => {
      onNavigateToSection(sectionId);
    }, 300);
  };

  const steps: TourStep[] = [
    {
      id: 1,
      title: "أهلاً بك في بيزنس ديفلوبرز",
      subtitle: "شريكك الاستراتيجي المتكامل من الفكرة والتشغيل وحتى البناء والتحكيم التقني",
      icon: <Sparkles className="w-8 h-8 text-blue-600 animate-pulse" />,
      content: (
        <div className="space-y-4 text-right">
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            يسعدنا جداً انضمامك لصفحتنا. في <strong className="text-blue-600 font-bold">بيزنس ديفلوبرز</strong>، نؤمن بأن نجاح المنشآت لا يأتي بمجرد الحظ، بل عبر الربط المنهجي المحكم بين <strong className="text-slate-800">جودة الهيكلة الإدارية</strong> و <strong className="text-slate-800">قوة الحلول التقنية</strong>.
          </p>
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 space-y-2.5">
            <span className="text-xs font-bold text-blue-700 block">💡 القيمة المضافة لشركتنا في سطور:</span>
            <ul className="space-y-2 text-xs text-slate-600 font-light">
              <li className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>تحويل الإجراءات الشفهية والاجتهادات الشخصية لأدلة عمل معيارية (SOPs).</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>تصميم وتطوير تطبيقات الهواتف والأنظمة السحابية بجودة كود استثنائية وملكية تامة.</span>
              </li>
              <li className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>حماية حقوقك الفنية وفحص البرمجيات وحل النزاعات كخبراء محكمين معتمدين.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "الحلول الثلاثة لتمكين أعمالك",
      subtitle: "قمنا بتقسيم خدماتنا لتلائم تطلعات منشأتك الحالية والوقوف على الفجوات",
      icon: <Layers className="w-8 h-8 text-blue-600" />,
      content: (
        <div className="space-y-4 text-right">
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            اختر الركيزة التي تناسب احتياجك للتعرف عليها بشكل أعمق داخل الموقع:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              id="welcome-pillar-1"
              onClick={() => handleAction("services")}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/20 text-right transition-all group cursor-pointer"
            >
              <span className="text-2xl block mb-2">📊</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">الهيكلة والتخطيط</h4>
              <p className="text-[10px] text-slate-500 font-light mt-1 leading-normal">
                بطاقات الأداء المتوازن ومؤشرات الـ KPIs وأدلة الإجراءات SOPs.
              </p>
            </button>

            <button
              id="welcome-pillar-2"
              onClick={() => handleAction("solutions")}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/20 text-right transition-all group cursor-pointer"
            >
              <span className="text-2xl block mb-2">💻</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">البناء والبرمجة</h4>
              <p className="text-[10px] text-slate-500 font-light mt-1 leading-normal">
                بناء تطبيقات الجوال المخصصة والمنصات السحابية الراقية.
              </p>
            </button>

            <button
              id="welcome-pillar-3"
              onClick={() => handleAction("portfolio")}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:bg-blue-50/20 text-right transition-all group cursor-pointer"
            >
              <span className="text-2xl block mb-2">⚖️</span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600">التحكيم وحماية الكود</h4>
              <p className="text-[10px] text-slate-500 font-light mt-1 leading-normal">
                مراجعة الأكواد البرمجية وفض النزاعات التقنية ودياً وقانونياً.
              </p>
            </button>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "أدوات تفاعلية بين يديك!",
      subtitle: "وفرنا لك أدوات برمجية مجانية متكاملة لتقييم النضج وحساب التكلفة فوراً",
      icon: <Activity className="w-8 h-8 text-blue-600 animate-pulse" />,
      content: (
        <div className="space-y-4 text-right">
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            ننصحك بشدة باستخدام الأدوات الحصرية التي طورناها لمساعدتك في اتخاذ القرار الاستثماري السليم:
          </p>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 space-x-reverse bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="text-xl shrink-0">🎯</span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">مقياس النضج والجاهزية الرقمية</h4>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed mt-0.5">
                  أجب عن 5 أسئلة استراتيجية واحصل على تقرير توصيات فوري لشركتك.
                </p>
                <button
                  id="welcome-go-assessment"
                  onClick={() => handleAction("maturity-assessment")}
                  className="text-[10px] text-blue-600 font-bold hover:underline mt-1.5 flex items-center space-x-1 space-x-reverse cursor-pointer"
                >
                  <span>ابدأ التقييم الآن</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-3 space-x-reverse bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="text-xl shrink-0">🧮</span>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">حاسبة نطاق العمل التقديرية</h4>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed mt-0.5">
                  احسب قيمة استثمارك التقني والتشغيلي المأمول واحجز باقتك المناسبة في دقائق.
                </p>
                <button
                  id="welcome-go-calculator"
                  onClick={() => handleAction("calculator")}
                  className="text-[10px] text-blue-600 font-bold hover:underline mt-1.5 flex items-center space-x-1 space-x-reverse cursor-pointer"
                >
                  <span>احسب باقة مشروعك</span>
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "جاهز لتصميم مستقبل منشأتك؟",
      subtitle: "تواصل مع خبرائنا واحصل على استشارة تفصيلية مجانية لمدة 30 دقيقة",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      content: (
        <div className="space-y-4 text-right">
          <p className="text-slate-600 text-sm leading-relaxed font-light">
            بإمكانك حجز موعد جلسة تشخيصية أولية مع مستشار خبير مباشرة. سيساعدك فريقنا في تحليل المشاكل الحالية ورسم مسار التمكين الإداري والتقني المتكامل.
          </p>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex items-center space-x-3 space-x-reverse text-xs text-blue-950 font-light leading-relaxed">
            <span className="text-2xl">📞</span>
            <span>جلساتنا سرية بالكامل ونضمن فيها عدم مشاركة بياناتك الفنية أو فكرتك مع أي طرف ثالث بفضل اتفاقيات حماية الحقوق وسرية المعلومات (NDA).</span>
          </div>
          <div className="pt-2">
            <button
              id="welcome-btn-book-consult"
              onClick={() => handleAction("contact")}
              className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-gradient-to-l from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white py-3.5 px-6 rounded-2xl text-sm font-bold shadow-lg cursor-pointer"
            >
              <span>احجز جلستك المجانية المباشرة الآن</span>
              <ChevronLeft className="w-4 h-4 animate-pulse" />
            </button>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  return (
    <>
      {/* Floating Trigger button in page to re-trigger the tour anytime */}
      <button
        id="retrigger-welcome-tour-btn"
        onClick={() => {
          setCurrentStep(0);
          setIsOpen(true);
        }}
        className="fixed bottom-6 left-6 z-40 bg-white hover:bg-slate-50 text-blue-600 rounded-full px-4 py-2.5 shadow-lg border border-slate-200 flex items-center space-x-2 space-x-reverse text-xs font-bold hover:scale-105 transition-all cursor-pointer"
        title="شاهد الجولة الترحيبية التفاعلية للموقع"
      >
        <Compass className="w-4 h-4 text-blue-600 animate-spin-slow" />
        <span className="text-blue-600 font-bold hidden sm:inline">جولة تفاعلية</span>
      </button>

      {/* Modal Dialog portal via AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop with elegant blur */}
            <motion.div
              id="welcome-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              id="welcome-modal-box"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-xl w-full text-right overflow-hidden z-10 flex flex-col justify-between max-h-[90vh] md:max-h-none"
            >
              
              {/* Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100 shadow-inner shrink-0">
                    {currentStepData.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight">
                      {currentStepData.title}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-slate-500 font-light mt-0.5 max-w-[280px] sm:max-w-none truncate sm:whitespace-normal">
                      {currentStepData.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  id="welcome-close-btn"
                  onClick={handleClose}
                  className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-all cursor-pointer"
                  title="إغلاق"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step content */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow max-h-[50vh] sm:max-h-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    {currentStepData.content}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                {/* Checkbox for don't show again */}
                <div className="flex items-center space-x-2 space-x-reverse self-start sm:self-center">
                  <input
                    id="welcome-dont-show-checkbox"
                    type="checkbox"
                    checked={dontShowAgain}
                    onChange={(e) => setDontShowAgain(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="welcome-dont-show-checkbox" className="text-xs text-slate-500 font-light cursor-pointer select-none">
                    عدم الإظهار مرة أخرى عند فتح الموقع
                  </label>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center space-x-2.5 space-x-reverse self-end sm:self-center">
                  {currentStep > 0 && (
                    <button
                      id="welcome-nav-prev"
                      onClick={handlePrev}
                      className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer flex items-center space-x-1 space-x-reverse"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>السابق</span>
                    </button>
                  )}

                  <button
                    id="welcome-nav-next"
                    onClick={handleNext}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5 space-x-reverse cursor-pointer"
                  >
                    <span>{currentStep === steps.length - 1 ? "فهمت، استكشف الموقع" : "التالي"}</span>
                    {currentStep < steps.length - 1 && <ArrowLeft className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Progress dots */}
              <div className="bg-slate-100/50 px-5 py-2 flex justify-center space-x-1.5 space-x-reverse border-t border-slate-100 shrink-0">
                {steps.map((_, idx) => (
                  <button
                    id={`welcome-dot-${idx}`}
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentStep ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                    title={`انتقل للخطوة ${idx + 1}`}
                  />
                ))}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
