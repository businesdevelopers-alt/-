import { useState } from "react";
import { Folder, Filter, Calendar, Award, CheckCircle, ArrowRight, X, Sparkles } from "lucide-react";
import { Project } from "../types";
import LiveCounter from "./LiveCounter";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "الكل" },
    { id: "management", label: "إدارة وتخطيط" },
    { id: "apps", label: "تطبيقات وحلول رقمية" },
    { id: "startups", label: "احتضان مشاريع" },
    { id: "arbitration", label: "تحكيم تقني" },
  ];

  const projects: Project[] = [
    {
      id: "proj-1",
      title: "منصة وتطبيق 'ريادة كارت' لتقنية المعلومات",
      category: "apps",
      client: "شركة ريادة كارت المحدودة",
      year: "2025",
      description: "قمنا باحتضان فكرة المشروع منذ البداية، فصغنا نموذج العمل التجاري ودراسة الجدوى المالية الشاملة، ثم تولينا الجانب البرمجي بالكامل عبر تصميم واجهة مستخدم مبتكرة وتطوير تطبيقات الجوال والويب والربط الآمن ببوابات الدفع وشبكات الشحن والخدمات اللوجستية.",
      tags: ["تطبيق هاتف", "فلاتر", "نموذج العمل BMC", "لوحة تحكم ذكية", "دراسة جدوى"],
      image: "linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)",
      results: [
        "إطلاق المنصة والتطبيقات بنجاح في غضون 4 أشهر فقط.",
        "تمكين العميل من جذب جولة استثمارية رصينة بقيمة 350,000$.",
        "تسجيل أكثر من 25,000 مستخدم نشط في أول ثلاثة أشهر من الإطلاق.",
        "تصميم بنية برمجية سحابية تتحمل 50,000 طلب متزامن بدون انقطاع."
      ]
    },
    {
      id: "proj-2",
      title: "إعادة هيكلة وتطوير 'مجموعة الراجحي الفنية'",
      category: "management",
      client: "مجموعة الراجحي للصناعات والتشييد",
      year: "2025",
      description: "واجهت الشركة تداخلاً في الصلاحيات وضعفاً في قياس أداء الموظفين مع توسع فروعها. قمنا بالتدخل التنظيمي الشامل عبر مراجعة الهياكل الإدارية الحالية وتصميم وتوثيق اللوائح والسياسات الداخلية وأدلة العمل التشغيلية القياسية (SOPs) مع بناء منظومة ذكية لقياس الأداء وربطها بأهداف الشركة الاستراتيجية.",
      tags: ["هيكلة إدارية", "سياسات العمل SOPs", "بطاقات الأداء BSC", "مؤشرات الأداء KPIs"],
      image: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
      results: [
        "رفع كفاءة العمليات التشغيلية والإنتاجية بنسبة 32% خلال 6 أشهر.",
        "صياغة لوائح تفصيلية وأوصاف وظيفية محددة لـ 110 موظفاً إدارياً وفنياً.",
        "تقليل الهدر المالي الإداري بنسبة 18% نتيجة أتمتة تدفق الموافقات الصلاحية.",
        "خلق مسار وظيفي واضح ساهم في زيادة رضا الموظفين بنسبة 25%."
      ]
    },
    {
      id: "proj-3",
      title: "التحكيم والخبرة الفنية في نزاع منصة 'عقاري بلس'",
      category: "arbitration",
      client: "مؤسسة عقاري بلس الاستثمارية",
      year: "2026",
      description: "نشأ خلاف مالي وتقني معقد بين عميل استثماري وشركة تطوير برمجيات بخصوص تسليم منصة عقارية كبرى. قمنا بالتدخل بصفة خبير تقني ومحكم معتمد، ففحصنا الكود المصدري وقاعدة البيانات وقارناها بالملحق الفني للعقد، وأصدرنا تقريراً برمجياً هندسياً فند الثغرات ونواحي التقصير والالتزام بكلا الجانبين.",
      tags: ["فحص الكود", "تقرير هندسي معتمد", "تحكيم تقني", "فض النزاعات ودياً"],
      image: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
      results: [
        "حل النزاع القائم ودياً وتجنيب الطرفين اللجوء للمحاكم التي قد تستغرق سنوات.",
        "تمكين العميل من استرداد 65% من الدفعات المالية نتيجة إثبات عيوب برمجية جسيمة.",
        "تقديم خطة تصحيحية برمجية متكاملة لإنهاء وتعديل الأخطاء في الكود لإعادة الإطلاق.",
        "صياغة ملحق عقدي فني وقانوني جديد يضمن حقوق الطرفين مستقبلاً."
      ]
    },
    {
      id: "proj-4",
      title: "احتضان وتأسيس منصة 'شاحن' اللوجستية للناشئين",
      category: "startups",
      client: "مؤسسة شاحن للتجارة والنقل",
      year: "2024",
      description: "من مجرد فكرة بسيطة لربط سائقي الشاحنات بالشركات الصناعية، قمنا باحتضان المشروع بالكامل. شمل العمل تصفية الأفكار، تصميم دراسة الجدوى المالية المفصلة، بناء الهوية البصرية والاسم التجاري للمنصة، ثم تصميم وتطوير تطبيق أندرويد وآيفون متكامل يسهل عملية النقل والدفع السريع وتتبع الشحنات المباشر.",
      tags: ["احتضان وتطوير", "دراسة جدوى تسويقية", "تصميم UI/UX", "تطبيق Flutter", "بناء MVP"],
      image: "linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)",
      results: [
        "تأسيس المنصة وإطلاق نموذج MVP ناجح في السوق خلال 90 يوماً.",
        "تسجيل وتأهيل أكثر من 450 سائق شاحنة مرخص عبر المنصة.",
        "تسهيل وتوثيق ما يزيد عن 8,000 رحلة نقل بضائع في السنة الأولى.",
        "الفوز بجائزة أفضل فكرة ريادية لوجستية صاعدة في حاضنة الأعمال المحلية."
      ]
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-slate-55 text-slate-800 relative border-t border-slate-200">
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">قصص نجاح ومشاريع ملهمة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            سابقة أعمالنا: <span className="text-blue-600 font-extrabold">مشاريع تحولت إلى واقع</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            شاهد كيف ساهمنا في بناء هيكليات إدارية مرنة وتطوير حلول برمجية متقدمة وحل نزاعات تقنية معقدة لعملائنا في مختلف القطاعات.
          </p>
        </div>

        {/* Live Counters Dashboard */}
        <LiveCounter />

        {/* Categories Filtering tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-slate-200 shadow-sm"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-500/50 hover:shadow-2xl transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Visual Header Grid with Gradient */}
                <div
                  className="h-44 sm:h-48 p-6 flex flex-col justify-between relative overflow-hidden text-right animate-fade-in"
                  style={{ backgroundImage: project.image }}
                >
                  <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]" />
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/95 px-2.5 py-1 rounded-full text-blue-600 border border-slate-200 shadow-sm">
                      {project.year}
                    </span>
                    <Folder className="w-5 h-5 text-white/95" />
                  </div>
                  <div className="relative z-10">
                    <span className="text-[11px] font-medium bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-slate-800 border border-slate-200 shadow-sm">
                      عميل: {project.client}
                    </span>
                  </div>
                </div>

                {/* Project Brief */}
                <div className="p-6 sm:p-8 space-y-4 text-right">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-650 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags & Action Link */}
              <div className="px-6 sm:px-8 pb-6 pt-2 text-right">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] sm:text-xs font-medium text-slate-600 bg-slate-50 border border-slate-150 px-2.5 py-1 rounded-lg">
                      #{t}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[10px] sm:text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-1 rounded-lg">
                      +{project.tags.length - 3} المزيد
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-xs font-bold text-blue-600 group-hover:text-blue-500 space-x-2 space-x-reverse transition-colors">
                  <span>اقرأ قصة النجاح والنتائج التفصيلية</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-slate-500 font-light">
            لا توجد مشاريع مضافة في هذا التصنيف حالياً.
          </div>
        )}

      </div>

      {/* Case Study Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl border border-slate-250/80 shadow-2xl max-w-2xl w-full text-right overflow-hidden animate-fade-in my-8 max-h-[90vh] flex flex-col">
            
            {/* Header with Close */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center space-x-2 space-x-reverse">
                <Award className="w-5 h-5 text-blue-600" />
                <span>سابقة الأعمال وقصة النجاح</span>
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-500 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              
              {/* Project title */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs bg-blue-650 text-white px-2.5 py-1 rounded-md font-bold shadow-sm">
                    {selectedProject.year}م
                  </span>
                  <span className="text-xs text-slate-600 font-medium">
                    العميل: {selectedProject.client}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {selectedProject.title}
                </h4>
              </div>

              {/* Complete Description */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-800">تفاصيل المشكلة والحل المطبق:</p>
                <p className="text-slate-650 text-sm leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              {/* Results & Key achievements */}
              <div className="space-y-4 bg-blue-50/30 p-5 rounded-2xl border border-blue-100">
                <h5 className="text-sm font-bold text-blue-600 flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="w-4.5 h-4.5 text-blue-600" />
                  <span>النتائج الملموسة والمخرجات المحققة:</span>
                </h5>
                <ul className="space-y-3">
                  {selectedProject.results.map((res, i) => (
                    <li key={i} className="flex items-start space-x-2.5 space-x-reverse">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-650 font-light leading-relaxed">
                        {res}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="space-y-2.5">
                <p className="text-xs font-bold text-slate-500">تصنيفات وتقنيات تم توظيفها:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs text-slate-600 bg-slate-50 border border-slate-150 px-3 py-1.5 rounded-xl font-light">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-sm"
              >
                حسناً، إغلاق
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
