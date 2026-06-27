import { useState } from "react";
import { 
  Check, 
  ShieldAlert, 
  Rocket, 
  Settings, 
  ArrowLeft, 
  Sparkles, 
  Cpu, 
  Layers, 
  Workflow, 
  Compass, 
  Lightbulb,
  CheckCircle2,
  AlertTriangle
} from "lucide-react";
import { Solution } from "../types";

interface SolutionsProps {
  onSelectSolution: (serviceId: string) => void;
}

export default function Solutions({ onSelectSolution }: SolutionsProps) {
  const [activeTab, setActiveTab] = useState<"mgmt" | "tech" | "projects">("mgmt");

  // Detailed Challenge vs Solution data requested
  const challengeSolutions = {
    mgmt: {
      title: "حلول التحديات الإدارية وتطوير الهياكل",
      subtitle: "كيف نتغلب على البيروقراطية التنظيمية، تداخل الصلاحيات، وهدر الموارد التشغيلية؟",
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      challenges: [
        {
          problem: "تداخل الصلاحيات وغياب الوصف الوظيفي الواضح للموظفين.",
          solution: "صياغة هيكل تنظيمي مرن ومحدد، مع بطاقات وصف وظيفي تفصيلية تمنع الازدواجية."
        },
        {
          problem: "صعوبة قياس الأداء الحقيقي للشركات والعجز عن تتبع نمو الأرباح.",
          solution: "بناء وتكامل مؤشرات أداء رئيسية (KPIs) دقيقة ومحوسبة متصلة بلوحة تحكم موحدة."
        },
        {
          problem: "هدر الوقت والجهد في الإجراءات الورقية واليدوية اليومية.",
          solution: "بناء وتوثيق سياسات تشغيلية قياسية (SOPs) رقمية مع أتمتة دورات الموافقات."
        }
      ],
      approach: "نهجنا الإداري يعتمد على 'الهندسة الإدارية الرشيقة' التي تهدف إلى تبسيط خطوط الاتصال وضمان انسيابية العمل دون تعقيد، مع استغلال أمثل للموارد المتاحة."
    },
    tech: {
      title: "حلول التحديات التقنية والنزاعات البرمجية",
      subtitle: "كيف نحل مشاكل تعثر المشاريع البرمجية، وفشل التسليم، وغياب الجودة الفنية؟",
      icon: <Cpu className="w-6 h-6 text-sky-400" />,
      challenges: [
        {
          problem: "تلقي برمجيات معيبة من شركات التطوير وعدم مطابقتها للمواصفات المتفق عليها.",
          solution: "إجراء فحص فني شامل للأكواد وقواعد البيانات (Code Auditing) وكتابة تقرير هندسي محايد وفصل الخلاف."
        },
        {
          problem: "صعوبة اختيار التقنيات والبيئات السحابية المناسبة لحجم وتوسع المشروع.",
          solution: "تقديم هندسة معمارية تقنية (System Architecture) مخصصة تضمن الكفاءة والأمان وبأقل التكاليف التشغيلية."
        },
        {
          problem: "ضعف الحماية والخصوصية وثغرات الأمان في تطبيقات ومواقع العملاء.",
          solution: "تنفيذ اختبارات اختراق وتحليل حماية دوري مع تفعيل معايير التشفير والامتثال العالمية."
        }
      ],
      approach: "نعتمد نهج 'التحكيم والخبرة الهندسية المحايدة' لفض النزاعات الفنية برؤية تجمع بين فهم الأكواد والأنظمة المعقدة وصياغة التقارير المعتمدة قضائياً لحفظ الحقوق."
    },
    projects: {
      title: "حلول تطوير المشاريع والابتكار الريادي",
      subtitle: "كيف نأخذ بيدك لتأسيس فكرة واعدة من الصفر واكتساح الأسواق المستهدفة؟",
      icon: <Rocket className="w-6 h-6 text-indigo-400" />,
      challenges: [
        {
          problem: "صعوبة صياغة نموذج عمل تجاري قابل للاستدامة ومربح على المدى الطويل.",
          solution: "العمل التشاركي في ورش عمل لبناء نموذج عمل تجاري (BMC) مرن يحدد بدقة قنوات الإيرادات والقيمة المضافة."
        },
        {
          problem: "صعوبة الحصول على تمويل خارجي أو استقطاب مستثمرين للمشروع الناشئ.",
          solution: "تصميم ملف عرض استثماري (Pitch Deck) احترافي، مدعوم بدراسات جدوى حقيقية وعرضها على شركائنا الممولين."
        },
        {
          problem: "تأخر إطلاق المنتج الأولي MVP بسبب التوسع المفرط وغير المدروس للميزات.",
          solution: "تحديد النطاق الأساسي الفعّال (MVP Scope) وبناؤه سريعاً بأحدث التقنيات لضمان التواجد الفوري بالسوق واختبار سلوك المستخدمين."
        }
      ],
      approach: "من الاحتضان إلى التطوير، نهجنا يبدأ من الفهم العميق لرحلة رائد الأعمال، حيث نتحمل الشق الإداري والتقني بالكامل ليتفرغ المؤسس للتسويق والنمو."
    }
  };

  return (
    <section id="solutions" className="py-24 bg-white text-slate-800 relative overflow-hidden border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-20">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Sparkles className="w-4 h-4" />
            <span>الحلول المبتكرة للتحديات الحقيقية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            حلولنا المخصصة: <span className="text-blue-600">نهج استراتيجي وابتكاري</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            نحن لا نقدم مجرد استشارات سطحية، بل نحلل جذور التحديات ونصيغ لك باقة متكاملة تجمع بين الجودة الإدارية، التحكيم التقني، والابتكار البرمجي.
          </p>
        </div>

        {/* BENTO GRID 1: OUR STRATEGIC APPROACH */}
        <div className="mb-20">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-8 text-right flex items-center space-x-2 space-x-reverse">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>منهجيتنا الاستراتيجية والابتكارية في تقديم الحلول:</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bento Block 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-all duration-300 group hover:bg-white hover:border-slate-350 hover:shadow-lg text-right flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-all">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  1. رصد وتحديد الثغرات
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  نبدأ بعملية تقييم وتدقيق شاملة لكشف الثغرات التشغيلية أو العيوب البرمجية وفهم خلفيات التحديات بدقة.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 mt-6 block font-bold">STAGE_01 // DIAGNOSE</span>
            </div>

            {/* Bento Block 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-all duration-300 group hover:bg-white hover:border-slate-350 hover:shadow-lg text-right flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-all">
                  <Lightbulb className="w-6 h-6 text-sky-600" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  2. هندسة وتخصيص الحلول
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  لا نؤمن بالحلول الجاهزة؛ بل نصمم باقة مخصصة بالكامل تدمج أفضل الممارسات التنظيمية والبرمجية مع أهدافك.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 mt-6 block font-bold">STAGE_02 // CUSTOMIZE</span>
            </div>

            {/* Bento Block 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-all duration-300 group hover:bg-white hover:border-slate-350 hover:shadow-lg text-right flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-all">
                  <Workflow className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  3. التنفيذ والأتمتة الرقمية
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  نحول الخطط الورقية لعمليات مؤتمتة وتطبيقات ملموسة، مع تدريب الفريق لضمان تجربة انتقال تقني وإداري مثالية.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 mt-6 block font-bold">STAGE_03 // INTEGRATE</span>
            </div>

            {/* Bento Block 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 transition-all duration-300 group hover:bg-white hover:border-slate-350 hover:shadow-lg text-right flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-blue-100 transition-all">
                  <CheckCircle2 className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  4. الاستدامة والتطوير الدائم
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  نتابع المؤشرات ونبني نظام التقييم الذاتي في منشأتك لتبقى قوية، متوسعة ومستدامة بمواجهة تقلبات السوق.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400 mt-6 block font-bold">STAGE_04 // SUSTAIN</span>
            </div>

          </div>
        </div>

        {/* BENTO GRID 2: CHALLENGE VS SOLUTION INTERACTIVE BOARD */}
        <div className="bg-slate-50/50 border border-slate-200/80 rounded-3xl p-6 sm:p-10 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 mb-8">
            <div className="text-right space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                تصفح حلولنا للتحديات الكبرى في 3 ركائز رئيسية:
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                انقر على إحدى الركائز أدناه لرؤية كيف نحول المشاكل اليومية لنقاط قوة واستدامة.
              </p>
            </div>

            {/* Responsive Tabs Switcher */}
            <div className="flex flex-wrap gap-2.5 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm shrink-0 self-start lg:self-center">
              <button
                onClick={() => setActiveTab("mgmt")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "mgmt"
                    ? "bg-blue-600 text-white"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                إدارة الأعمال والهيكلة
              </button>
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "tech"
                    ? "bg-sky-600 text-white"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                التكنولوجيا والتحكيم
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === "projects"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-650 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                تطوير المشاريع والابتكار
              </button>
            </div>
          </div>

          {/* Active Content Animation Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-right items-stretch">
            
            {/* Information & Strategic approach (Left Side) */}
            <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="space-y-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  {challengeSolutions[activeTab].icon}
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                  {challengeSolutions[activeTab].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {challengeSolutions[activeTab].subtitle}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 relative z-10">
                <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">منهجيتنا في هذا المجال:</h5>
                <p className="text-xs sm:text-sm text-blue-600 leading-relaxed font-light">
                  {challengeSolutions[activeTab].approach}
                </p>
              </div>
            </div>

            {/* List of Challenges & Solutions (Right Side) */}
            <div className="lg:col-span-8 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                {challengeSolutions[activeTab].challenges.map((item, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-slate-300 hover:shadow-md transition-all flex flex-col sm:flex-row items-start gap-4"
                  >
                    {/* Visual Problem Tag */}
                    <div className="shrink-0 flex items-center space-x-1.5 space-x-reverse bg-rose-50 text-rose-600 px-3 py-1 rounded-lg border border-rose-100 text-xs font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>التحدي</span>
                    </div>

                    <div className="flex-1 space-y-2">
                      <p className="text-xs sm:text-sm font-medium text-slate-850">
                        {item.problem}
                      </p>
                      
                      {/* Solution */}
                      <div className="flex items-start space-x-2 space-x-reverse pt-2 border-t border-slate-100 mt-2">
                        <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                          <span className="text-blue-600 font-bold">حل بيزنس ديفلوبرز: </span>
                          {item.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Trigger */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 mt-4">
                <p className="text-xs text-slate-500 text-center sm:text-right font-light">
                  هل تواجه إحدى هذه العقبات في شركتك أو مشروعك الناشئ اليوم؟
                </p>
                <button
                  onClick={() => onSelectSolution(activeTab)}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-500 text-white py-3 px-6 rounded-xl text-sm font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <span>صمّم حلّك المخصص الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
