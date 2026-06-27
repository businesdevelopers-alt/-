import { Users, Code, Lightbulb, Gavel } from "lucide-react";
 
export default function Stats() {
  const stats = [
    {
      id: "stat-1",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: "+150",
      label: "شركة وعميل سعيد",
      description: "قدمنا لهم خدمات الهيكلة والتخطيط",
    },
    {
      id: "stat-2",
      icon: <Code className="w-6 h-6 text-sky-600" />,
      value: "+45",
      label: "تطبيق ومنصة ذكية",
      description: "تم تصميمها وتطويرها بأحدث التقنيات",
    },
    {
      id: "stat-3",
      icon: <Lightbulb className="w-6 h-6 text-indigo-600" />,
      value: "+30",
      label: "فكرة مشروع محتضنة",
      description: "من مجرد فكرة إلى نموذج أولي MVP متكامل",
    },
    {
      id: "stat-4",
      icon: <Gavel className="w-6 h-6 text-blue-600" />,
      value: "100%",
      label: "نزاعات تقنية تم حلها",
      description: "بالتحكيم الفني والتقارير البرمجية الموثقة",
    },
  ];
 
  return (
    <section className="relative bg-white border-y border-slate-100 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-start space-x-4 space-x-reverse p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-500 hover:bg-white hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200 group-hover:bg-blue-50 group-hover:border-blue-200 transition-all duration-300 shrink-0">
                {stat.icon}
              </div>
              <div className="space-y-1 text-right">
                <span className="block text-3xl font-black text-blue-600 tracking-tight font-sans">
                  {stat.value}
                </span>
                <h3 className="text-sm font-bold text-slate-800">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
