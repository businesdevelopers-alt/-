import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Check, ArrowLeft, Info, HelpCircle, Flame, Star, ShieldCheck, Sparkles } from "lucide-react";

interface ProjectCalculatorProps {
  onPreFillInquiry: (serviceId: string, customNotes: string) => void;
}

export default function ProjectCalculator({ onPreFillInquiry }: ProjectCalculatorProps) {
  const [serviceType, setServiceType] = useState<string>("entre");
  const [businessScale, setBusinessScale] = useState<string>("startup");
  const [addOns, setAddOns] = useState<string[]>([]);
  const [fastTrack, setFastTrack] = useState<boolean>(false);
  const [estimatedBudget, setEstimatedBudget] = useState<{ min: number; max: number }>({ min: 0, max: 0 });
  const [estimatedWeeks, setEstimatedWeeks] = useState<number>(0);

  const servicesMap: Record<string, { label: string; baseMin: number; baseMax: number; weeks: number }> = {
    mgmt: { label: "إدارة أعمال وهيكلة SOPs", baseMin: 8000, baseMax: 15000, weeks: 5 },
    plan: { label: "تخطيط استراتيجي وبطاقات أداء", baseMin: 7000, baseMax: 12000, weeks: 4 },
    arbit: { label: "تحكيم تقني وفحص الأكواد مصدرياً", baseMin: 10000, baseMax: 20000, weeks: 3 },
    entre: { label: "احتضان مشاريع رواد الأعمال وهندستها", baseMin: 12000, baseMax: 22000, weeks: 10 },
    apps: { label: "تصميم وتطوير تطبيقات مخصصة وأنظمة سحابية", baseMin: 15000, baseMax: 35000, weeks: 8 },
  };

  const scaleMultipliers: Record<string, { label: string; multiplier: number }> = {
    startup: { label: "مشروع ناشئ / رائد أعمال فردي", multiplier: 1.0 },
    medium: { label: "شركة صغيرة أو متوسطة قائمة", multiplier: 1.4 },
    enterprise: { label: "مجموعة تجارية / شركة مساهمة كبرى", multiplier: 2.2 },
  };

  const addOnsList = [
    { id: "brand", label: "تصميم الهوية البصرية والعلامة التجارية", price: 3000, icon: <Star className="w-4 h-4 text-blue-600" /> },
    { id: "legal", label: "مراجعة قانونية وصياغة عقود تأسيسية وتحكيمية", price: 2500, icon: <ShieldCheck className="w-4 h-4 text-sky-600" /> },
    { id: "support", label: "دعم فني وصيانة ممتدة للأنظمة لمدة عام كامل", price: 4000, icon: <HelpCircle className="w-4 h-4 text-indigo-600" /> },
  ];

  const handleAddOnToggle = (id: string) => {
    if (addOns.includes(id)) {
      setAddOns(addOns.filter(item => item !== id));
    } else {
      setAddOns([...addOns, id]);
    }
  };

  useEffect(() => {
    // Calculate estimates
    const activeService = servicesMap[serviceType];
    const activeMultiplier = scaleMultipliers[businessScale].multiplier;

    let min = activeService.baseMin * activeMultiplier;
    let max = activeService.baseMax * activeMultiplier;
    let weeks = activeService.weeks;

    // Add-on costs
    addOns.forEach(addonId => {
      const addon = addOnsList.find(a => a.id === addonId);
      if (addon) {
        min += addon.price;
        max += addon.price;
      }
    });

    // Fast track adjustment
    if (fastTrack) {
      min = min * 1.25; // 25% price increase
      max = max * 1.25;
      weeks = Math.max(2, Math.round(weeks * 0.7)); // 30% faster timeline
    }

    setEstimatedBudget({
      min: Math.round(min / 100) * 100,
      max: Math.round(max / 100) * 100
    });
    setEstimatedWeeks(weeks);
  }, [serviceType, businessScale, addOns, fastTrack]);

  const handleSubmitCalc = () => {
    const serviceLabel = servicesMap[serviceType].label;
    const scaleLabel = scaleMultipliers[businessScale].label;
    const activeAddons = addOns.map(id => addOnsList.find(a => a.id === id)?.label).join("، ");
    
    let notes = `بناءً على حساب التقدير التفاعلي:
- نوع الخدمة: ${serviceLabel}
- نطاق العمل: ${scaleLabel}
- الإضافات المطلوبة: ${activeAddons || "لا يوجد"}
- خطة مسار سريعة: ${fastTrack ? "نعم (تقليل الوقت بنسبة 30%)" : "لا"}
- الميزانية المقدرة: ${estimatedBudget.min.toLocaleString()} - ${estimatedBudget.max.toLocaleString()} ر.س
- المدة المقدرة: ${estimatedWeeks} أسابيع`;

    onPreFillInquiry(serviceType, notes);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/80">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">حاسبة نطاق العمل الاستباقية والتقديرية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            احسب قيمة استثمارك <span className="text-blue-600 font-extrabold">والإطار الزمني المتوقع</span> بدقائق
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            استخدم حاسبتنا التقديرية المتقدمة لتركيب وتخصيص باقة الخدمات والمخرجات المناسبة لاحتياجات وميزانية شركتك.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inputs Section (Right Column) */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 p-6 sm:p-8 rounded-3xl space-y-8 text-right flex flex-col justify-between shadow-2xl">
            
            <div className="space-y-6">
              {/* Service Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>1. حدد نوع الخدمة الرئيسية المطلوبة:</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(servicesMap).map(([key, value]) => (
                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      key={key}
                      onClick={() => setServiceType(key)}
                      className={`p-4 rounded-2xl border text-right text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        serviceType === key
                          ? "border-blue-500 bg-blue-50 text-blue-950 shadow-md ring-2 ring-blue-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {value.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Business Scale */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-800">2. حدد حجم أعمال شركتك أو نطاق المشروع:</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.entries(scaleMultipliers).map(([key, value]) => (
                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      key={key}
                      onClick={() => setBusinessScale(key)}
                      className={`p-4 rounded-2xl border text-right text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        businessScale === key
                          ? "border-blue-500 bg-blue-50 text-blue-950 shadow-md ring-2 ring-blue-500/20"
                          : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {value.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-slate-800">3. خدمات إضافية مميزة (اختياري):</label>
                <div className="space-y-2.5">
                  {addOnsList.map((addon) => {
                    const isSelected = addOns.includes(addon.id);
                    return (
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        key={addon.id}
                        onClick={() => handleAddOnToggle(addon.id)}
                        className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-950 shadow-sm ring-1 ring-blue-500/20"
                            : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isSelected ? "bg-blue-600 border-blue-500 text-white" : "border-slate-300 bg-slate-50"
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className={`text-xs sm:text-sm font-medium ${isSelected ? "text-slate-900 font-semibold" : "text-slate-600"}`}>{addon.label}</span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          {addon.icon}
                          <span className="text-xs font-bold text-blue-600 font-sans">+{addon.price.toLocaleString()} ر.س</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Fast Track Option */}
              <div className="pt-2">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setFastTrack(!fastTrack)}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                    fastTrack
                      ? "border-blue-500 bg-blue-50 text-blue-950 shadow-sm ring-1 ring-blue-500/20"
                      : "border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                      fastTrack ? "bg-blue-600 border-blue-500 text-white" : "border-slate-300 bg-slate-50"
                    }`}>
                      {fastTrack && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-right">
                      <span className={`block text-xs sm:text-sm font-bold ${fastTrack ? "text-blue-600" : "text-slate-800"}`}>باقة الإطلاق السريع (Fast-Track)</span>
                      <span className="block text-[10px] text-slate-500 font-light leading-relaxed">تسريع مدة التنفيذ بنسبة 30% للضرورة القصوى.</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 space-x-reverse text-blue-600 font-sans font-bold text-xs">
                    <Flame className="w-4 h-4 animate-bounce" />
                    <span>+25% تكلفة</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Note text */}
            <div className="flex items-start space-x-2.5 space-x-reverse bg-blue-50/40 p-4 rounded-2xl border border-blue-100 text-slate-650 text-[11px] font-light leading-relaxed mt-4">
              <Info className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
              <span>هذه الحاسبة توفر ميزانيات تقديرية استرشادية بناءً على خوارزميات التسعير المعيارية لشركتنا. يرجى إرسال التقدير ليقوم خبراؤنا بالتدقيق وصياغة عرض أسعار رسمي ونهائي يتوافق مع ميزانية مشروعك وعملك.</span>
            </div>

          </div>

          {/* Estimates Display Section (Left Column) */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden text-right">
            {/* Background glowing sphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900">ملخص باقة مشروعك</h3>
                <p className="text-xs text-slate-500 font-light">التقدير الفوري لشركتك</p>
              </div>

              {/* Budget Display */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs text-slate-500 font-light">القيمة التقديرية للاستثمار (SAR):</span>
                <div className="flex items-baseline space-x-2 space-x-reverse">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={`${estimatedBudget.min}-${estimatedBudget.max}`}
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-2xl sm:text-3xl font-black text-blue-600 font-sans flex items-baseline gap-2"
                    >
                      <span>{estimatedBudget.min.toLocaleString()}</span>
                      <span className="text-slate-500 font-light text-xs">إلى</span>
                      <span>{estimatedBudget.max.toLocaleString()}</span>
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-xs text-blue-600 font-bold font-sans mr-1">ر.س</span>
                </div>
              </div>

              {/* Timeline Display */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                <span className="text-xs text-slate-500 font-light">المدة الزمنية المتوقعة للعمل والتسليم:</span>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={estimatedWeeks}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-3xl font-black text-slate-900 font-sans"
                    >
                      {estimatedWeeks}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-slate-700 font-bold">أسابيع عمل متواصلة</span>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="space-y-3.5">
                <p className="text-xs font-bold text-slate-700">مشمولات العمل الافتراضية:</p>
                <div className="grid grid-cols-1 gap-2.5">
                  <div className="flex items-center space-x-2.5 space-x-reverse">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm flex items-center justify-center shrink-0">
                      <Check className="w-3" />
                    </div>
                    <span className="text-xs text-slate-600">جلسات استشارية تفاعلية أسبوعية</span>
                  </div>
                  <div className="flex items-center space-x-2.5 space-x-reverse">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm flex items-center justify-center shrink-0">
                      <Check className="w-3" />
                    </div>
                    <span className="text-xs text-slate-600">تقديم الملفات والمخرجات بصيغ مفتوحة قابلة للتحرير</span>
                  </div>
                  <div className="flex items-center space-x-2.5 space-x-reverse">
                    <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shadow-sm flex items-center justify-center shrink-0">
                      <Check className="w-3" />
                    </div>
                    <span className="text-xs text-slate-600">ضمان جودة الأكواد وحماية الفكرة قانونياً</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-slate-200 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmitCalc}
                className="w-full flex items-center justify-center space-x-2.5 space-x-reverse bg-gradient-to-l from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white py-4 px-6 rounded-2xl text-base font-bold shadow-lg cursor-pointer border border-blue-400/10"
              >
                <span>أرسل هذا التقدير لتأكيد وحجز الباقة</span>
                <ArrowLeft className="w-5 h-5 animate-pulse" />
              </motion.button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
