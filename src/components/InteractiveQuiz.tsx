import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight, 
  HelpCircle, 
  RotateCcw, 
  Sparkles, 
  Check, 
  TrendingUp, 
  Brain, 
  Lightbulb, 
  Building 
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgClass: string;
  borderClass: string;
  questions: Question[];
  recommendations: {
    low: string; // 0-50%
    medium: string; // 51-80%
    high: string; // 81-100%
  };
}

const QUIZZES: Quiz[] = [
  {
    id: "entrepreneurship",
    title: "مقياس جاهزية ريادة الأعمال والـ MVP",
    description: "اختبر معلوماتك في منهجيات التأسيس المرن وبناء المنتجات التقنية الأدنى القابلة للتوسع (MVP) في السوق السعودي.",
    icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
    bgClass: "bg-amber-50/50 hover:bg-amber-50/80 transition-colors",
    borderClass: "border-amber-100 hover:border-amber-300",
    questions: [
      {
        id: 1,
        question: "ما هو الهدف الجوهري والأساسي من بناء النسخة المصغرة (MVP) لمنتجك التقني؟",
        options: [
          "استعراض كافة الأفكار والميزات الجمالية لجذب الممولين فوراً.",
          "اختبار الفرضية الجوهرية وسلوك العميل الفعلي بأقل تكلفة ووقت ممكن.",
          "توظيف أكبر عدد من المطورين وضمان استمرارية الدعم الفني.",
          "الحصول على براءة اختراع دولية قبل إطلاق الخدمة بالسوق."
        ],
        correctIndex: 1,
        explanation: "الهدف الجوهري للـ MVP هو التحقق من حاجة السوق الفعلية (Market Fit) بأقل مجهود وتفادي هدر الميزانيات على ميزات لم يطلبها العميل."
      },
      {
        id: 2,
        question: "عند توقيع اتفاقية عدم الإفصاح (NDA) مع جهة تطوير برمجيات، ما الذي يجب التركيز عليه لحماية فكرتك؟",
        options: [
          "تحديد السعر النهائي لتطوير التطبيق مسبقاً في نفس الوثيقة.",
          "تجنب إدراج أي شروط جزائية لتسهيل توقيع الطرف الآخر.",
          "تعريف دقيق وشامل لنطاق 'المعلومات السرية' وتحديد التعويضات والمدد الزمنية للالتزام.",
          "إدراج شعارات الشركات فقط دون الحاجة لأسماء الممثلين القانونيين."
        ],
        correctIndex: 2,
        explanation: "الاتفاقية الناجحة يجب أن تصف وتعرف بدقة متناهية ما هي المعلومات السرية (شفرة مصدرية، تصاميم، بيانات مالية) مع وضع شرط جزائي رادع وقابل للتنفيذ قانونياً."
      },
      {
        id: 3,
        question: "من هو العميل المثالي لنسخة الـ MVP الأولى التي تطلقها شركتك الناشئة؟",
        options: [
          "كافة مستخدمي الإنترنت في المملكة العربية السعودية بلا استثناء.",
          "شريحة المتبنين الأوائل (Early Adopters) الذين يواجهون المشكلة بشدة ومستعدون للتغاضي عن نقص الميزات.",
          "المنافسون المباشرون لك لمعرفة مدى قوتك الفنية.",
          "الشركات الحكومية الكبرى التي تتطلب عقوداً سنوية معقدة منذ اليوم الأول."
        ],
        correctIndex: 1,
        explanation: "المتبنون الأوائل (Early Adopters) هم الكنز الحقيقي للمشروع الناشئ؛ لأنهم يعانون فعلياً من الفجوة ويبحثون بشغف عن حل، وسيقدمون لك أفضل التغذية الراجعة لبناء التطوير المستقبلي."
      },
      {
        id: 4,
        question: "ما هي الخطوة الأولى الموصى بها قبل كتابة السطر البرمجي الأول لأي فكرة تطبيق جديدة؟",
        options: [
          "تأسيس شركة مساهمة مقفلة في وزارة التجارة.",
          "استئجار مكتب فاخر وبدء حملة تسويقية مشاهير ضخمة.",
          "دراسة السوق وفهم المشكلة وصياغة رحلة العميل وبناء النماذج السلكية (Wireframes) واختبارها بصرياً.",
          "البحث عن قروض بنكية بملايين الريالات لتغطية تكاليف السيرفرات."
        ],
        correctIndex: 2,
        explanation: "البدء بدراسة السوق، وصياغة رحلة العميل (User Journey)، وبناء النموذج البصري (Interactive Prototype) يضمن تلافي 90% من أخطاء الفهم الفني مع المطورين ويوفر آلاف الريالات."
      }
    ],
    recommendations: {
      low: "مستوى الوعي التأسيسي يحتاج لتعزيز. نوصيك بقراءة دليل الـ MVP في مكتبتنا، والبدء بفهم منهجيات التأسيس المرن قبل الاستثمار المالي.",
      medium: "لديك معرفة جيدة بأساسيات ريادة الأعمال! ننصحك بطلب استشارة متخصصة لمراجعة رحلة العميل وبناء النموذج التجريبي لمنتجك التقني بكفاءة تامة.",
      high: "رائع! وعيك الريادي استثنائي ومواكب لأفضل الممارسات العالمية. أنت جاهز تماماً للانطلاق؛ احجز جلسة مراجعة الكود والمستندات الفنية لتأمين انطلاقتك البرمجية."
    }
  },
  {
    id: "strategic",
    title: "اختبار مهارات التخطيط وحوكمة المنشآت",
    description: "قس قدرتك على قيادة الشركات وبناء الهياكل التنظيمية وصياغة الإجراءات المعيارية (SOPs) لضمان الاستدامة التشغيلية.",
    icon: <Building className="w-6 h-6 text-indigo-500" />,
    bgClass: "bg-indigo-50/50 hover:bg-indigo-50/80 transition-colors",
    borderClass: "border-indigo-100 hover:border-indigo-300",
    questions: [
      {
        id: 1,
        question: "ماذا يحدث للمنشأة التجارية عندما تعتمد كلياً على مهارات الموظفين الفردية دون توثيق إجراءات العمل (SOPs)؟",
        options: [
          "ترتفع جودة العمل تلقائياً مع زيادة حرية الموظفين.",
          "تصبح المنشأة رهينة للموظفين الحصريين، وتتدهور الجودة وتنهار العمليات فور مغادرتهم.",
          "يسهل بيع حق الامتياز التجاري (الفرنشايز) للمنشأة دون قيود.",
          "تتحول كافة المهام التشغيلية إلى تسويق رقمي فوري."
        ],
        correctIndex: 1,
        explanation: "غياب الإجراءات المعيارية المكتوبة يخلق بيئة عمل عشوائية وعالية المخاطر، حيث تضيع المعرفة التراكمية للمنشأة بخروج الكوادر، وتصبح السيطرة على جودة مخرجات الخدمة مستحيلة."
      },
      {
        id: 2,
        question: "ما هو المكون الثالث الجوهري في هيكلة بطاقة الأداء المتوازن (Balanced Scorecard) بجانب المنظور المالي ومنظور العملاء؟",
        options: [
          "منظور العمليات الداخلية ومنظور التعلم والنمو للموظفين.",
          "منظور رصد منافسي السوق فقط.",
          "منظور إعلانات السوشيال ميديا.",
          "منظور العقود والنزاعات القضائية المستمرة."
        ],
        correctIndex: 0,
        explanation: "تكتمل شمولية بطاقة الأداء المتوازن برصد العمليات الداخلية (الكفاءة والجودة) ومؤشرات التعلم والنمو (تدريب وتأهيل الموظفين)، مما يضمن استقرار المنشأة على المدى الطويل."
      },
      {
        id: 3,
        question: "ما الفائدة الأساسية من حوكمة أدوار مجلس الإدارة وتحديد الصلاحيات المالية والإدارية (DOA)؟",
        options: [
          "تقليل راتب المدير التنفيذي وتوفير النفقات التشغيلية.",
          "منع تعارض المصالح، تسريع اتخاذ القرار بمسؤوليات محددة، وحماية الأصول من التصرفات الفردية العشوائية.",
          "الحصول على إعفاءات ضريبية شاملة من هيئة الزكاة والضريبة والجمارك.",
          "إيقاف كافة قرارات التوسع الخارجي بشكل دائم ومستمر."
        ],
        correctIndex: 1,
        explanation: "جدول الصلاحيات (Delegation of Authority) يحمي المنشأة من القرارات الارتجالية، ويوزع المسؤوليات بناءً على مستويات المخاطر المالية والإدارية بشكل متزن ونظامي."
      },
      {
        id: 4,
        question: "كيف يساهم التخطيط الاستراتيجي الفعال في تحسين الأداء التشغيلي اليومي للموظفين؟",
        options: [
          "عبر توفير مراقبة كاميرات اللحظية على مكاتبهم.",
          "بربط الأهداف الكبرى للمنشأة بمهام يومية ومؤشرات أداء (KPIs) قابلة للقياس المباشر.",
          "بإلغاء كافة الاجتماعات الأسبوعية التشغيلية للشركة.",
          "عبر زيادة ساعات الدوام اليومية للموظفين لضمان تسليم مخرجات أكثر."
        ],
        correctIndex: 1,
        explanation: "التخطيط الاستراتيجي لا يعيش في الكتب الفاخرة؛ بل تكمن قوته الحقيقية في تحويل الرؤية العليا إلى أهداف تشغيلية ملموسة وربطها ببطاقات أداء الموظفين اليومية ومتابعتها بانتظام."
      }
    ],
    recommendations: {
      low: "الشركة تعتمد على العشوائية التشغيلية المرتفعة. تحتاج فوراً إلى صياغة الإجراءات المعيارية (SOPs) وبناء الهيكل الإداري لحماية عملك من الانهيار المفاجئ.",
      medium: "رائع، مؤسستك تمتلك أساسيات تخطيط مقبولة. تحتاج إلى رفع الحوكمة، صياغة مصفوفات الصلاحيات (DOA)، وتدشين بطاقات أداء متوازن للموظفين لتفادي التداخل التشغيلي.",
      high: "مذهل! معرفتك بحوكمة الشركات والتخطيط تضاهي كبار المستشارين. ننصحك بالانتقال للمرحلة التالية وبناء أدلة تمكين الفروع للتوسع السريع والفرنشايز المعتمد."
    }
  }
];

export default function InteractiveQuiz() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isQuizFinished, setIsQuizFinished] = useState<boolean>(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIdx === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    
    if (selectedAnswerIdx === activeQuiz?.questions[currentQuestionIdx].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    
    if (currentQuestionIdx + 1 < activeQuiz.questions.length) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedAnswerIdx(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    if (!activeQuiz) return;
    handleStartQuiz(activeQuiz);
  };

  const handleExitQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsQuizFinished(false);
  };

  const getRecommendation = () => {
    if (!activeQuiz) return "";
    const totalQuestions = activeQuiz.questions.length;
    const percentage = (score / totalQuestions) * 100;
    
    if (percentage <= 50) {
      return activeQuiz.recommendations.low;
    } else if (percentage <= 80) {
      return activeQuiz.recommendations.medium;
    } else {
      return activeQuiz.recommendations.high;
    }
  };

  return (
    <div id="interactive-quiz" className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto my-12 text-right relative overflow-hidden shadow-lg">
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {!activeQuiz ? (
          /* Selection Screen */
          <motion.div
            key="quiz-select"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center border border-blue-200">
                <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>قيم جاهزية أعمالك فوراً</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">تفاعلي</span>
                </h3>
                <p className="text-xs text-slate-500 font-light mt-0.5">
                  اختبر معلوماتك الريادية أو الإدارية بدقائق معدودة واحصل على استشارة وتوجيه معتمد مجاناً.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {QUIZZES.map((quiz) => (
                <button
                  key={quiz.id}
                  id={`quiz-start-${quiz.id}`}
                  onClick={() => handleStartQuiz(quiz)}
                  className={`border text-right p-5 sm:p-6 rounded-2xl flex flex-col justify-between ${quiz.bgClass} ${quiz.borderClass} cursor-pointer transition-all duration-300 group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                        {quiz.icon}
                      </div>
                      <span className="text-[10px] text-blue-600 font-extrabold flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                        <Sparkles className="w-3 h-3" />
                        <span>ابدأ المقياس</span>
                      </span>
                    </div>

                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {quiz.title}
                    </h4>
                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      {quiz.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-between text-xs font-bold text-slate-600">
                    <span className="text-[10px] text-slate-400">تحتوي على: 4 أسئلة ذكية</span>
                    <span className="text-blue-600 group-hover:translate-x-[-4px] transition-transform flex items-center gap-1">
                      <span>دخول</span>
                      <ArrowLeft className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : isQuizFinished ? (
          /* Finished Screen */
          <motion.div
            key="quiz-finished"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6 text-center"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shadow-inner">
              <Award className="w-8 h-8 text-emerald-600 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">أحسنت! أكملت الاختبار بنجاح</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light">مقياس: {activeQuiz.title}</p>
            </div>

            {/* Score circle */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 max-w-sm mx-auto shadow-md space-y-4">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold">النتيجة النهائية</span>
                <span className="text-4xl sm:text-5xl font-black text-blue-600 font-sans">{score}</span>
                <span className="text-slate-400 font-sans"> / {activeQuiz.questions.length}</span>
              </div>

              <div className="bg-blue-50/50 border border-blue-100 p-3.5 rounded-xl text-xs text-slate-700 leading-relaxed font-light text-right">
                <span className="font-extrabold text-blue-700 block mb-1">💡 التوصية الاستشارية الفورية:</span>
                {getRecommendation()}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-4">
              <button
                id="quiz-btn-restart"
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>إعادة الاختبار</span>
              </button>

              <button
                id="quiz-btn-exit"
                onClick={handleExitQuiz}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>العودة لاختيار اختبار آخر</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* Question View Screen */
          <motion.div
            key="quiz-question"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Header / progress */}
            <div className="flex items-center justify-between border-b border-slate-200/60 pb-4">
              <button
                id="quiz-btn-back"
                onClick={handleExitQuiz}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold flex items-center gap-1 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
                <span>خروج</span>
              </button>

              <div className="text-right">
                <span className="text-[10px] text-blue-600 font-bold block">{activeQuiz.title}</span>
                <span className="text-xs font-semibold text-slate-500">
                  السؤال <span className="font-sans font-bold">{currentQuestionIdx + 1}</span> من <span className="font-sans font-bold">{activeQuiz.questions.length}</span>
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <div className="flex items-start gap-2.5">
                <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <h4 className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed">
                  {activeQuiz.questions[currentQuestionIdx].question}
                </h4>
              </div>
            </div>

            {/* Options list */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {activeQuiz.questions[currentQuestionIdx].options.map((option, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                const isCorrectAnswer = idx === activeQuiz.questions[currentQuestionIdx].correctIndex;
                
                let optionClass = "bg-white border-slate-200 text-slate-800 hover:bg-slate-50";
                
                if (isSelected && !isAnswerSubmitted) {
                  optionClass = "bg-blue-50 border-blue-400 text-blue-900";
                } else if (isAnswerSubmitted) {
                  if (isCorrectAnswer) {
                    optionClass = "bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold";
                  } else if (isSelected && !isCorrectAnswer) {
                    optionClass = "bg-rose-50 border-rose-400 text-rose-900";
                  } else {
                    optionClass = "bg-white border-slate-100 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-option-${idx}`}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-right p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionClass} ${!isAnswerSubmitted ? "cursor-pointer" : ""}`}
                  >
                    <span>{option}</span>
                    <div className="shrink-0 flex items-center space-x-2 space-x-reverse">
                      {isAnswerSubmitted && isCorrectAnswer && (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center font-sans text-[10px] ${
                        isSelected ? "bg-blue-600 text-white border-blue-600" : "border-slate-300 text-slate-400"
                      }`}>
                        {idx + 1}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Feedback block */}
            <AnimatePresence>
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className={`p-4 rounded-xl border text-xs leading-relaxed font-light ${
                    selectedAnswerIdx === activeQuiz.questions[currentQuestionIdx].correctIndex
                      ? "bg-emerald-50 border-emerald-100 text-emerald-900"
                      : "bg-rose-50 border-rose-100 text-rose-900"
                  }`}
                >
                  <span className="font-extrabold block mb-1">
                    {selectedAnswerIdx === activeQuiz.questions[currentQuestionIdx].correctIndex ? "✓ إجابة صحيحة وممتازة!" : "✗ إجابة غير دقيقة."}
                  </span>
                  {activeQuiz.questions[currentQuestionIdx].explanation}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit / Next Button */}
            <div className="flex justify-end pt-2">
              {!isAnswerSubmitted ? (
                <button
                  id="quiz-btn-submit"
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswerIdx === null}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
                    selectedAnswerIdx !== null
                      ? "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  تحقق من الإجابة
                </button>
              ) : (
                <button
                  id="quiz-btn-next"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>
                    {currentQuestionIdx + 1 === activeQuiz.questions.length ? "عرض النتيجة النهائية" : "السؤال التالي"}
                  </span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
