import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, ShieldCheck } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "all" | "management" | "apps" | "arbitration";
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<"all" | "management" | "apps" | "arbitration">("all");
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const categories = [
    { id: "all", label: "جميع الأسئلة" },
    { id: "management", label: "هيكلة الشركات والإدارة" },
    { id: "apps", label: "تطوير البرمجيات والـ MVP" },
    { id: "arbitration", label: "التحكيم التقني وفحص الكود" },
  ] as const;

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      category: "arbitration",
      question: "ما هو التحكيم التقني وكيف يساهم في فض النزاعات البرمجية؟",
      answer: "التحكيم التقني هو إجراء قانوني وفني متخصص نتدخل بموجبه كخبراء ومحكمين معتمدين لتقييم وفحص جودة العمل في المنصات والتطبيقات محل النزاع بين العميل والشركة البرمجية. نقوم بمطابقة الكود البرمجي المنجز مع بنود العقد والملحق الفني، ورصد الثغرات الأمنية أو الأخطاء الهيكلية، وإصدار تقرير هندسي معتمد يسهم في تسوية الخلاف ودياً أو تقديمه كبينة رصينة أمام الجهات القضائية والمحاكم التجارية."
    },
    {
      id: "faq-2",
      category: "management",
      question: "ما هي أدلة الإجراءات التشغيلية القياسية (SOPs) وكيف تفيد شركتي؟",
      answer: "أدلة الـ SOPs هي وثائق تفصيلية مكتوبة تشرح خطوة بخطوة كيفية تنفيذ كافة المهام والعمليات اليومية في شركتك (مثل عمليات المبيعات، خدمة العملاء، الاستقطاب، التشغيل). تكمن فائدتها في حماية منشأتك من العشوائية والاجتهادات الشخصية الشفهية للأفراد، مما يضمن سير العمل بنفس الكفاءة العالية حتى مع تغيير الموظفين أو توسيع الفروع."
    },
    {
      id: "faq-3",
      category: "apps",
      question: "هل تؤول ملكية الكود المصدري (Source Code) بالكامل لي بعد التطوير؟",
      answer: "نعم، بكل تأكيد. في بيزنس ديفلوبرز، نلتزم بنقل الملكية الفكرية والبرمجية الكاملة للكود المصدري وقواعد البيانات والتصميمات الحصرية للعميل فور انتهاء العمل، مع توثيق ذلك في اتفاقيات قانونية ملزمة. كما نضمن تسليم الأكواد بصيغ مفتوحة وقابلة للتطوير المستقبلي بواسطة أي فريق برمجيات آخر."
    },
    {
      id: "faq-4",
      category: "management",
      question: "كيف تقومون ببناء ومراقبة بطاقات الأداء المتوازن ومؤشرات الـ KPIs؟",
      answer: "نقوم بصياغة خطتك الاستراتيجية أولاً، ثم تفكيك أهدافها الكبرى إلى مستهدفات تشغيلية وإدارية مقاسة لكل إدارة وقسم وموظف. يتم ربط هذه المستهدفات ببطاقات الأداء المتوازن (Balanced Scorecards) التي تقيس الجوانب المالية، وجوانب العملاء، والعمليات الداخلية، والتعلم والنمو، لضمان مراقبة حية لإنتاجية العمل وتفادي الأزمات التشغيلية."
    },
    {
      id: "faq-5",
      category: "apps",
      question: "ما هو منتج الـ MVP وكيف يساعد رواد الأعمال في خفض ميزانية التأسيس؟",
      answer: "الـ MVP (Minimum Viable Product) أو المنتج الأدنى القابل للنمو هو نسخة أولية من تطبيقك أو منصتك تحتوي على الميزات الجوهرية الأساسية فقط التي تحل المشكلة الرئيسية للعميل. يهدف الـ MVP إلى إطلاق فكرتك في السوق بأقل تكلفة ممكنة وبأسرع وقت لجمع آراء المستخدمين الحقيقيين واختبار جدوى المشروع، مما يحميك من إنفاق ميزانيات ضخمة على برمجيات قد تحتاج لتغيير جذري لاحقاً."
    },
    {
      id: "faq-6",
      category: "arbitration",
      question: "ماذا يعني 'فحص وتدقيق الأكواد البرمجية' (Code Auditing)؟",
      answer: "هو عملية هندسية متقدمة يقوم فيها خبراؤنا بفحص البناء البرمجي للمنصة والتحقق من التزام المطورين بالمعايير العالمية لكتابة الكود النظيف (Clean Code) وخلوه من الثغرات الأمنية الجسيمة أو الأبواب الخلفية، والتأكد من أمان تدفق البيانات والتحجيم السحابي، لضمان جاهزية النظام للتوسع واستقبال حركة مرور ضخمة دون انهيار أو اختراق."
    },
    {
      id: "faq-7",
      category: "management",
      question: "هل تضمنون سرية بياناتنا ومشاريعنا قبل البدء بالاستشارات؟",
      answer: "نعم، الحفاظ على السرية التامة للأفكار والبيانات المالية والبرمجية لعملائنا هو ركيزة أساسية في قيمنا. قبل الاطلاع على أي مستندات أو تفاصيل للمشروع، نقوم بتوقيع اتفاقية صارمة لحماية سرية المعلومات وعدم الإفصاح (NDA) مبرمة قانونياً لحفظ وحماية أصولكم المعرفية وفكرتكم التجارية بالكامل."
    }
  ];

  const filteredFaqs = activeCategory === "all"
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-slate-55 relative overflow-hidden border-t border-slate-200">
      {/* Visual background lights */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-right">
        
        {/* Title Section */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">الأسئلة الشائعة والمعرفة الاستشارية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            لديك تساؤلات؟ <span className="text-blue-600 font-extrabold">نحن هنا للإجابة والتمكين</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            استكشف الأجوبة المباشرة والتفصيلية التي صاغها مستشارونا الإداريون والتقنيون حول آليات العمل، وحفظ الحقوق البرمجية، وفض النزاعات.
          </p>
        </div>

        {/* Categories Tabs Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              id={`faq-tab-${cat.id}`}
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                // Open first item of the selected category automatically for a responsive experience
                const items = faqs.filter(f => cat.id === "all" || f.category === cat.id);
                if (items.length > 0) {
                  setOpenId(items[0].id);
                } else {
                  setOpenId(null);
                }
              }}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List Container */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all duration-350 ${
                  isOpen 
                    ? "border-blue-500 shadow-lg shadow-slate-100" 
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Accordion Header */}
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-right cursor-pointer focus:outline-none select-none"
                >
                  <span className={`text-sm sm:text-base font-bold transition-colors ${
                    isOpen ? "text-blue-600" : "text-slate-900 hover:text-blue-650"
                  }`}>
                    {faq.question}
                  </span>
                  
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all ${
                    isOpen ? "bg-blue-50 border-blue-200 text-blue-600 rotate-180" : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}>
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  </div>
                </button>

                {/* Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-50">
                        <p className="text-xs sm:text-sm text-slate-655 font-light leading-relaxed pl-4">
                          {faq.answer}
                        </p>
                        
                        <div className="mt-4 flex items-center space-x-2 space-x-reverse text-[10px] text-blue-600 font-semibold bg-blue-50/50 w-fit px-3 py-1.5 rounded-md border border-blue-100">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                          <span>إجابة استشارية موثوقة من بيزنس ديفلوبرز</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 text-slate-500 font-light text-sm">
              لا توجد أسئلة تحت هذا التصنيف حالياً.
            </div>
          )}
        </div>

        {/* CTA Box */}
        <div className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md text-right">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-center space-x-1.5 space-x-reverse">
              <MessageCircle className="w-4.5 h-4.5 text-blue-600" />
              <span>هل لديك تساؤل آخر لم تتم تغطيته؟</span>
            </h4>
            <p className="text-xs text-slate-500 font-light">
              مستشارونا جاهزون للإجابة على كافة التحديات الفريدة التي تواجهها شركتك مجاناً.
            </p>
          </div>

          <button
            id="faq-btn-ask-custom"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            اسأل مستشاراً الآن
          </button>
        </div>

      </div>
    </section>
  );
}
