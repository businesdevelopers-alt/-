import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Building2, Gavel, Sparkles, Activity } from "lucide-react";

interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

// Custom Counter Hook component for fluid numbers counting
function AnimatedDigit({ target, duration = 2000, suffix = "" }: CounterProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [target, duration]);

  return (
    <span className="font-sans font-black tracking-tight text-3xl sm:text-4xl md:text-5xl text-blue-600">
      {count.toLocaleString("ar-SA")}{suffix}
    </span>
  );
}

export default function LiveCounter() {
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLastUpdate(now.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      id: "live-projects",
      label: "المشاريع المكتملة والحلول الرقمية",
      target: 184,
      suffix: "+",
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
      bgIcon: "bg-emerald-50 border-emerald-100",
      description: "تطبيقات هواتف، منصات سحابية راقية، ونماذج MVP تم تسليمها وتدشينها بالكامل.",
      trend: "معدل الإنجاز الحالي: 96.4%"
    },
    {
      id: "live-companies",
      label: "المنشآت التي تمت هيكلتها وحوكمتها",
      target: 125,
      suffix: "+",
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      bgIcon: "bg-blue-50 border-blue-100",
      description: "شركات قمنا بصياغة أدلة SOPs وبطاقات الأداء المتوازن وخططها الاستراتيجية.",
      trend: "تطور الأداء التشغيلي: +32%"
    },
    {
      id: "live-hours",
      label: "ساعات التحكيم وفحص الكود البرمجي",
      target: 920,
      suffix: " ساعة+",
      icon: <Gavel className="w-6 h-6 text-indigo-600" />,
      bgIcon: "bg-indigo-50 border-indigo-100",
      description: "من فحص الكود المصدري، صياغة تقارير الخبرة الفنية، وفض النزاعات التقنية ودياً وقانونياً.",
      trend: "نزاعات تم إغلاقها ودياً: 100%"
    }
  ];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl max-w-5xl mx-auto mb-16 text-right relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header of Live counters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-8 gap-4">
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center space-x-2 space-x-reverse">
            <Activity className="w-5 h-5 text-blue-600 animate-pulse" />
            <span>لوحة المؤشرات المباشرة للإنجاز والتمكين</span>
          </h4>
          <p className="text-xs text-slate-500 font-light">
            رصد حي ومحدث لأثر الحلول الاستشارية والبرمجية التي تقدمها بيزنس ديفلوبرز في السوق السعودي.
          </p>
        </div>

        {/* Live heartbeat ticking */}
        <div className="flex items-center space-x-2 space-x-reverse bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full w-fit self-start sm:self-center shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-slate-600">
            بث حي ومحدث: <span className="font-mono font-bold text-blue-600">{lastUpdate}</span>
          </span>
        </div>
      </div>

      {/* Stats counters grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="p-5 sm:p-6 rounded-2xl bg-slate-50/50 border border-slate-150 hover:border-blue-500 hover:bg-white transition-all duration-300 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.bgIcon} shrink-0 shadow-inner`}>
                  {stat.icon}
                </div>
                <Sparkles className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>

              <div className="space-y-1">
                {/* Custom animated counter trigger */}
                <div className="block">
                  <AnimatedDigit target={stat.target} suffix={stat.suffix} />
                </div>
                <h5 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mt-2">
                  {stat.label}
                </h5>
                <p className="text-xs text-slate-500 font-light leading-relaxed mt-1">
                  {stat.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-emerald-600 font-bold bg-emerald-50/30 px-2.5 py-1.5 rounded-lg border border-emerald-100">
              <span>● {stat.trend}</span>
              <span className="text-slate-400 font-normal">معتمد</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
