import { useState } from "react";
import { Briefcase, TrendingUp, Scale, Lightbulb, Code, ChevronLeft, Check, Clock, Sparkles, Award, ShieldCheck } from "lucide-react";
import { Service } from "../types";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
  selectedServiceId?: string;
  onSelectServiceId?: (id: string) => void;
}

export default function Services({ onSelectService, selectedServiceId, onSelectServiceId }: ServicesProps) {
  const [localSelectedId, setLocalSelectedId] = useState<string>("mgmt");

  const selectedId = selectedServiceId !== undefined ? selectedServiceId : localSelectedId;
  const setSelectedId = onSelectServiceId !== undefined ? onSelectServiceId : setLocalSelectedId;

  // Rich metadata for benefits and needs met as requested by user
  const servicesExtendedData: Record<string, { benefits: string[]; needsMet: string; targetAudience: string }> = {
    mgmt: {
      benefits: [
        "رفع الكفاءة التشغيلية بنسبة تزيد عن 30% من خلال أتمتة الإجراءات.",
        "وضوح الصلاحيات والمهام وربطها بأوصاف وظيفية خالية من التداخل واللبس.",
        "الاستدامة والجاهزية الكاملة للتوسع وفتح الفروع الإضافية.",
        "الامتثال للأنظمة واللوائح والسياسات الداخلية وحفظ حقوق المنشأة."
      ],
      needsMet: "تنهي العشوائية الإدارية وتداخل الصلاحيات التي تتسبب في تسريب الأرباح وتأخر الأعمال، لتوثق لك مسارات تشغيلية مرنة ومؤتمتة تضمن لك تسيير العمل بثقة وأقل تكلفة.",
      targetAudience: "المنشآت القائمة التي تواجه بيروقراطية وتداخل صلاحيات، والشركات العائلية الساعية للمأسسة والتحول الرقمي."
    },
    plan: {
      benefits: [
        "رؤية بعيدة المدى واضحة لخمس سنوات ومبنية على أرقام واقعية ومدروسة.",
        "بناء بطاقات الأداء المتوازن (BSC) التي تجعل تتبع النمو سهلاً وشهرياً.",
        "استباق التقلبات الاقتصادية بخطط طوارئ مسبقة وجاهزة للتنفيذ.",
        "تحليل تنافسي شامل يمنحك حصة سوقية أكبر ويعزز تموضع شركتك."
      ],
      needsMet: "تمنع تخبط شركتك وتشتت جهود فريقك، حيث توفر لك بوصلة تخطيطية واضحة وخارطة طريق تنفيذية تحدد بدقة المسؤوليات والمقاييس لضمان تحقيق رؤيتك الاستثمارية بنجاح.",
      targetAudience: "المدراء التنفيذيون، المؤسسون، والشركات المتوسطة الراغبة في التوسع المدروس واكتساح أسواق جديدة."
    },
    arbit: {
      benefits: [
        "تقرير فني وقانوني هندسي معتمد يفند كافة الثغرات والعيوب البرمجية.",
        "حل ودي وسريع يحفظ ماء الوجه ويجنبك جحيم المحاكم لسنوات.",
        "كشف التقصير في الأكواد وبناء قواعد البيانات بشكل علمي دقيق لا يقبل الشك.",
        "مستندات فنية ورسمية قوية في حال اللجوء لهيئات التحكيم المعتمدة والقضاء."
      ],
      needsMet: "تحميك من ضياع مئات الآلاف والشهور في مشاريع برمجية متعثرة أو غير مطابقة، فنعمل كخبير فني مستقل يفحص الكود المصدر والأنظمة ويطابقها بالعقود لفض النزاعات وحفظ الحقوق.",
      targetAudience: "الشركات المتعاقدة مع مطورين، والمستثمرون الراغبون بتقييم البرمجيات قبل الشراء، والمحاكم والجهات القضائية."
    },
    entre: {
      benefits: [
        "خفض مخاطر الفشل للمشاريع الناشئة بنسبة تفوق الـ 70% عبر التدقيق الفني المالي.",
        "تأسيس نموذج عمل تجاري (BMC) مبتكر ومستدام ومدر للتدفقات النقدية الجيدة.",
        "الحصول على Pitch Deck (ملف عرض استثماري) احترافي ومعد بلغة المستثمرين.",
        "إطلاق سريع وذكي للمنتج الأولي MVP بميزات مدروسة لا ترهق الميزانية."
      ],
      needsMet: "تأخذ بفكرتك الريادية والابتكارية من مجرد خاطرة، وتصنع لها دراسة جدوى واضحة وتصميماً فنياً وبنية برمجية MVP، لكي تطلق فكرتك بثقة تامة وتجذب أولى جولاتك الاستثمارية.",
      targetAudience: "رواد الأعمال والمؤسسون والمبتكرون ممن يمتلكون أفكاراً ريادية صاعدة ويرغبون في بنائها بطريقة صحيحة."
    },
    apps: {
      benefits: [
        "واجهات مستخدم مذهلة (UI/UX) تضمن تجربة استخدام فائقة وسلسة وتحقق ولاء العملاء.",
        "تطبيقات هواتف ومواقع بالغة السرعة تعمل على مختلف أنظمة التشغيل بكفاءة ممتازة.",
        "بنية تحتية سحابية آمنة ومقاومة للاختراقات تضمن تشغيل 24/7 دون انقطاع.",
        "دعم فني وصيانة برمجية مستمرة مع لوحة تحكم ذكية وشاملة لإدارة المحتوى."
      ],
      needsMet: "تمنحك الأداة التقنية والتطبيق الرقمي القوي لمنافسة كبرى المنصات، فنوظف أفضل المهندسين لبناء منصتك البرمجية بجودة تضمن أتمتة المبيعات وتحسين تواصلك الفوري مع عملائك.",
      targetAudience: "الشركات التجارية، أصحاب الأفكار الريادية، ومنصات الخدمات الراغبة في التواجد الرقمي الواسع."
    }
  };

  const services: Service[] = [
    {
      id: "mgmt",
      title: "خدمات إدارة الأعمال",
      subtitle: "إعادة هيكلة وتطوير الأنظمة التشغيلية للشركات لتحقيق أقصى درجات الكفاءة.",
      description: "نساعد المنشآت القائمة والناشئة على تنظيم هياكلها الداخلية، وبناء العمليات التشغيلية (SOPs) التي تضمن استدامة الأعمال وتقليل الهدر المالي والبشري.",
      icon: "Briefcase",
      color: "emerald",
      bgGradient: "from-blue-500/5 to-indigo-500/5",
      estimatedTime: "4 - 6 أسابيع",
      details: [
        "إعادة الهيكلة الإدارية والتنظيمية وإعداد الأوصاف الوظيفية.",
        "صياغة أدلة الإجراءات والسياسات التشغيلية (SOPs).",
        "تقييم الأداء المؤسسي ووضع أنظمة الحوافز والمؤشرات.",
        "دراسات جدوى تشغيلية وتطوير استراتيجيات خفض التكاليف."
      ]
    },
    {
      id: "plan",
      title: "التخطيط الاستراتيجي",
      subtitle: "صياغة خطط نمو بعيدة المدى وبناء مؤشرات قياس أداء ذكية لشركتك.",
      description: "نعمل معك يداً بيد لتحديد رؤية شركتك، تحليل وضعك التنافسي في السوق، وصياغة خطة عمل تفصيلية قابلة للتنفيذ تدعم توسع أعمالك وحصتك السوقية.",
      icon: "TrendingUp",
      color: "teal",
      bgGradient: "from-sky-500/5 to-blue-500/5",
      estimatedTime: "3 - 5 أسابيع",
      details: [
        "تحليل البيئة الداخلية والخارجية للمنشأة (SWOT / PESTEL).",
        "تحديد التوجه الاستراتيجي وصياغة الرؤية والرسالة والقيم المؤسسية.",
        "تصميم بطاقات الأداء المتوازن (BSC) وتحديد مؤشرات قياس الأداء (KPIs).",
        "بناء خرائط التدفق المالي التقديرية وخطط التوسع الجغرافي."
      ]
    },
    {
      id: "arbit",
      title: "التحكيم وفض النزاعات التقنية",
      subtitle: "حل الخلافات البرمجية والتعاقدية كخبير فني مستقل وحكم معتمد.",
      description: "نحل الخلافات بين الشركات المطورة والعملاء بفحص الأكواد البرمجية وصياغة التقارير الهندسية القانونية لضمان حقوق كافة الأطراف والملكيات الفكرية.",
      icon: "Scale",
      color: "amber",
      bgGradient: "from-indigo-500/5 to-purple-500/5",
      estimatedTime: "2 - 3 أسابيع",
      details: [
        "مراجعة وتدقيق الكود المصدري وقاعدة البيانات ومقارنتها ببنود العقد.",
        "صياغة التقارير الفنية الهندسية المعتمدة لتقديمها للمحاكم أو فضها ودياً.",
        "تحديد نسب الانجاز والمطابقة للمواصفات البرمجية وحقوق الملكية الفكرية.",
        "فض النزاعات وتصحيح العقود والاتفاقيات البرمجية بين المطورين والشركات."
      ]
    },
    {
      id: "entre",
      title: "احتضان وتأسيس المشاريع",
      subtitle: "هندسة الأفكار الجديدة من الصفر لبناء نموذج عمل مستدام ومثبت.",
      description: "نأخذ بيدك كشريك نجاح استراتيجي لنحول فكرتك إلى حقيقة عبر صياغة دراسة الجدوى وتطوير نموذج العمل التجاري وتصميم وبناء منتج أولي MVP جاهز للاستثمار.",
      icon: "Lightbulb",
      color: "purple",
      bgGradient: "from-pink-500/5 to-purple-500/5",
      estimatedTime: "8 - 12 أسبوعاً",
      details: [
        "صياغة دراسات الجدوى المالية والتسويقية والتشغيلية الشاملة.",
        "تطوير نماذج العمل التجاري (BMC) وبناء ملفات العرض الاستثماري (Pitch Deck).",
        "تصميم تجربة وواجهة المستخدم (UI/UX) وبناء الهويات البصرية المميزة.",
        "تحديد نطاق العمل لمنتجك الأولي (MVP) واحتضان إطلاقه في السوق بنجاح."
      ]
    },
    {
      id: "apps",
      title: "تطوير التطبيقات وأنظمة الويب",
      subtitle: "بناء تطبيقات ومواقع ذكية فائقة الأداء وبنية تحتية سحابية متكاملة.",
      description: "نقوم بتصميم وتطوير المنصات الرقمية المتطورة باستخدام تقنيات حديثة وسريعة مثل Flutter و React و Node.js، مع دعم فني وصيانة ممتدة.",
      icon: "Code",
      color: "indigo",
      bgGradient: "from-blue-500/5 to-sky-500/5",
      estimatedTime: "6 - 10 أسابيع",
      details: [
        "تطوير تطبيقات الهواتف الذكية (iOS & Android) باستخدام Flutter.",
        "بناء مواقع الويب والمنصات والتطبيقات السحابية المخصصة بسلاسة.",
        "تصميم بنى تحتية سحابية آمنة ومقاومة للاختراق وقواعد بيانات مترابطة.",
        "توفير الصيانة الدورية والدعم الفني والتدريب الكامل لإدارة نظامك."
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return {
          text: "text-blue-600",
          border: "border-blue-100",
          bg: "bg-blue-50",
          darkBg: "bg-blue-50/50",
          bullet: "bg-blue-50 text-blue-600",
        };
      case "teal":
        return {
          text: "text-sky-600",
          border: "border-sky-100",
          bg: "bg-sky-50",
          darkBg: "bg-sky-50/50",
          bullet: "bg-sky-50 text-sky-600",
        };
      case "amber":
        return {
          text: "text-indigo-600",
          border: "border-indigo-100",
          bg: "bg-indigo-50",
          darkBg: "bg-indigo-50/50",
          bullet: "bg-indigo-50 text-indigo-600",
        };
      case "indigo":
        return {
          text: "text-blue-600",
          border: "border-blue-100",
          bg: "bg-blue-50",
          darkBg: "bg-blue-50/50",
          bullet: "bg-blue-50 text-blue-600",
        };
      case "purple":
        return {
          text: "text-sky-600",
          border: "border-sky-100",
          bg: "bg-sky-50",
          darkBg: "bg-sky-50/50",
          bullet: "bg-sky-50 text-sky-600",
        };
      default:
        return {
          text: "text-slate-700",
          border: "border-slate-200",
          bg: "bg-slate-50",
          darkBg: "bg-slate-50/50",
          bullet: "bg-slate-50 text-slate-700",
        };
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Briefcase": return <Briefcase className="w-5 h-5" />;
      case "TrendingUp": return <TrendingUp className="w-5 h-5" />;
      case "Scale": return <Scale className="w-5 h-5" />;
      case "Lightbulb": return <Lightbulb className="w-5 h-5" />;
      case "Code": return <Code className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  const activeService = services.find(s => s.id === selectedId) || services[0];
  const activeExtended = servicesExtendedData[activeService.id];
  const activeColor = getColorClasses(activeService.color);

  return (
    <section id="services" className="py-24 bg-slate-50 relative border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">خدمات استشارية وتقنية متكاملة تفصيلية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            تفصيل خدماتنا في <span className="text-blue-600 font-extrabold">بيزنس ديفلوبرز</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            نطوّر خدماتنا بأعلى معايير الدقة والابتكار لتغطي الشق الإداري، التخطيطي، التقني، والريادي. تعرف على التفاصيل والفوائد وكيف نلبي احتياجك بالكامل.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Service Cards (Right Column - RTL direction) */}
          <div className="lg:col-span-5 space-y-4">
            {services.map((service) => {
              const colors = getColorClasses(service.color);
              const isSelected = selectedId === service.id;
              
              return (
                <div
                  key={service.id}
                  onClick={() => setSelectedId(service.id)}
                  className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-right ${
                    isSelected
                      ? `border-blue-500 bg-blue-50 text-blue-950 shadow-md translate-x-2`
                      : "border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : `${colors.bg} ${colors.text} border border-slate-200`
                    }`}>
                      {getIcon(service.icon)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="text-base sm:text-lg font-bold">
                        {service.title}
                      </h3>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${isSelected ? "text-slate-600 font-normal" : "text-slate-400 font-light"}`}>
                        {service.subtitle}
                      </p>
                    </div>
                    <ChevronLeft className={`w-5 h-5 transition-transform shrink-0 ${
                      isSelected ? "text-blue-600 -translate-x-1" : "text-slate-400"
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Details Panel (Left Column) */}
          <div className="lg:col-span-7 bg-white text-slate-800 rounded-3xl border border-slate-200/80 shadow-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10 space-y-6 text-right">
              {/* Header Details */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
                      {getIcon(activeService.icon)}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                        {activeService.title}
                      </h3>
                      <span className="text-xs text-blue-600 font-medium">مخرجات وفوائد تفصيلية</span>
                    </div>
                  </div>
                  
                  {/* Estimated time */}
                  <div className="flex items-center space-x-1.5 space-x-reverse bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 shrink-0">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-[11px] font-mono font-medium text-slate-600">{activeService.estimatedTime}</span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  {activeService.description}
                </p>

                {/* Target Audience Badge */}
                <div className="inline-flex items-center space-x-2 space-x-reverse bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">الفئة المستهدفة:</span>
                  <span className="text-blue-600 font-semibold">{activeExtended.targetAudience}</span>
                </div>
              </div>

              {/* Bento Inner Grid: Benefits vs Need Met */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                
                {/* 1. Benefits (الفوائد الرئيسية) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="text-sm font-bold text-blue-600 flex items-center space-x-2 space-x-reverse">
                    <Award className="w-4 h-4 shrink-0 text-blue-600" />
                    <span>الفوائد الرئيسية للخدمة:</span>
                  </h4>
                  <ul className="space-y-2.5">
                    {activeExtended.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2 space-x-reverse">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span className="text-xs text-slate-600 leading-relaxed font-light">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2. How it solves client needs (كيف تلبي احتياجاتك) */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-sm font-bold text-sky-600 flex items-center space-x-2 space-x-reverse">
                      <ShieldCheck className="w-4 h-4 shrink-0 text-sky-600" />
                      <span>كيف تلبي هذه الخدمة احتياجاتك؟</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {activeExtended.needsMet}
                    </p>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 pt-4 border-t border-slate-200">
                    BUSINESS_DEVELOPERS // SOLUTION_INTEGRITY
                  </div>
                </div>

              </div>

              {/* Detailed deliverables list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>المخرجات التفصيلية والبنود التي تشتمل عليها الخدمة:</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.details.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-2.5 space-x-reverse p-3 rounded-xl bg-blue-50/40 border border-blue-100 hover:bg-blue-50/70 transition-all"
                    >
                      <div className="w-5 h-5 rounded-full bg-white text-blue-600 border border-blue-100 shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs text-slate-600 leading-relaxed font-light">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Form CTA */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-right">
                  <p className="text-xs text-slate-500">هل ترغب في البدء فوراً بطلب هذه الخدمة؟</p>
                  <p className="text-sm font-bold text-slate-800">تواصل معنا الآن للحصول على استشارة تمهيدية مجانية.</p>
                </div>
                <button
                  onClick={() => onSelectService(activeService.id)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 transition-colors transform hover:-translate-y-0.5 cursor-pointer shrink-0"
                >
                  اطلب هذه الخدمة الآن
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
