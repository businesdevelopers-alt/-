import { useState, ReactNode, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Send, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  GraduationCap, 
  Building, 
  Plus, 
  X, 
  Check, 
  ArrowLeft, 
  ClipboardCheck, 
  Info,
  Layers,
  Search,
  BookOpen
} from "lucide-react";

interface JobPosition {
  id: string;
  title: string;
  department: "consulting" | "engineering" | "legal" | "growth" | "general";
  departmentName: string;
  location: string;
  type: string;
  experience: string;
  salaryRange: string;
  icon: ReactNode;
  colorClass: string;
  bgGradient: string;
  description: string;
  requirements: string[];
  skills: string[];
}

export default function Careers() {
  const jobPositions: JobPosition[] = [
    {
      id: "sr-consultant",
      title: "مستشار أول هيكلة وإدارة أعمال",
      department: "consulting",
      departmentName: "الاستشارات الإدارية والتشغيلية",
      location: "الرياض، المملكة العربية السعودية (هجين)",
      type: "دوام كامل",
      experience: "+5 سنوات خبرة",
      salaryRange: "تنافسي حسب الخبرة",
      icon: <Briefcase className="w-5 h-5" />,
      colorClass: "text-emerald-650 bg-emerald-50 border-emerald-100",
      bgGradient: "from-emerald-500/10 to-transparent",
      description: "نبحث عن مستشار إداري ذو خبرة عالية في صياغة أدلة السياسات والإجراءات القياسية (SOPs)، وإعادة هيكلة الشركات العائلية والمتوسطة للتوسع والمأسسة.",
      requirements: [
        "درجة البكالوريوس أو الماجستير في إدارة الأعمال أو الهندسة الصناعية.",
        "خبرة سابقة في بيئات استشارية خليجية وتطوير النماذج التشغيلية.",
        "مهارة استثنائية في صياغة مؤشرات الأداء الرئيسية (KPIs) والهياكل التنظيمية.",
        "القدرة على توجيه وقيادة فرق العمل وورش عمل التغيير الهيكلي."
      ],
      skills: ["SOPs Development", "KPIs Design", "Business Model Canvas", "Organizational Structuring", "Change Management"]
    },
    {
      id: "sr-engineer",
      title: "مهندس برمجيات أول (Full-Stack Cloud Engineer)",
      department: "engineering",
      departmentName: "البرمجة والتطوير التقني",
      location: "الرياض أو عن بعد كلياً",
      type: "دوام كامل / مرن",
      experience: "+4 سنوات خبرة",
      salaryRange: "حسب المهارات والإنجاز",
      icon: <Cpu className="w-5 h-5" />,
      colorClass: "text-indigo-650 bg-indigo-50 border-indigo-100",
      bgGradient: "from-indigo-500/10 to-transparent",
      description: "مطلوب مهندس برمجيات أول مبدع ومتقن لبناء تطبيقات الويب الحديثة والمنصات السحابية المتكاملة باستخدام أفضل معايير الأمان وقابلية التوسع اللانهائية.",
      requirements: [
        "إتقان تام للغات البرمجة الحديثة وبالأخص TypeScript و JavaScript.",
        "خبرة عملية عميقة بإطار العمل React و Node.js/Express.",
        "بناء قواعد بيانات قوية وموثوقة (PostgreSQL, Firestore, MongoDB).",
        "خلفية قوية في تأمين البيانات، وحماية الكود السحابي والتعامل مع APIs."
      ],
      skills: ["React & Vite", "Node.js/Express", "TypeScript & ES6", "Cloud Systems (GCP/AWS)", "Database Security"]
    },
    {
      id: "tech-arbitrator",
      title: "خبير فحص جودة ومحكم تقني مستقل",
      department: "legal",
      departmentName: "التحكيم وفض النزاعات الفنية",
      location: "عن بعد / دوام جزئي ومرن",
      type: "عقود / مشاريع",
      experience: "+6 سنوات خبرة",
      salaryRange: "مكافأة ممتازة لكل ملف نزاع",
      icon: <Layers className="w-5 h-5" />,
      colorClass: "text-amber-650 bg-amber-50 border-amber-100",
      bgGradient: "from-amber-500/10 to-transparent",
      description: "نبحث عن خبراء تقنيين مستقلين يمتلكون خلفية هندسية وقانونية لتقييم المشاريع البرمجية المتعثرة، وإعداد تقارير خبرة فنية موجهة للقضاء وفض النزاعات.",
      requirements: [
        "شهادة جامعية في هندسة الحاسب أو علوم الحاسب مع شهادات تحكيم معتمدة.",
        "خبرة واسعة في تحليل شفرة المصدر (Source Code Auditing) وهندسة البرمجيات.",
        "القدرة على صياغة تقارير فنية دقيقة وموضوعية تفند نسب الإنجاز الفعلي.",
        "مهارة حل النزاعات التقنية والتعاقدية والتوصل لحلول تسوية ودية صالحة."
      ],
      skills: ["Code Auditing", "Software Architecture Review", "Technical Dispute Resolution", "Expert Witnessing"]
    },
    {
      id: "biz-dev",
      title: "أخصائي تطوير أعمال ومبيعات استشارية",
      department: "growth",
      departmentName: "النمو والتسويق الاستراتيجي",
      location: "الرياض، المملكة العربية السعودية (ميداني)",
      type: "دوام كامل + عمولات مجزية",
      experience: "+3 سنوات خبرة",
      salaryRange: "راتب أساسي + عمولات شهرية تصاعدية",
      icon: <Search className="w-5 h-5" />,
      colorClass: "text-teal-650 bg-teal-50 border-teal-100",
      bgGradient: "from-teal-500/10 to-transparent",
      description: "هل تمتلك موهبة الإقناع وصياغة العروض الاستثمارية الذكية؟ انضم إلينا لقيادة مبيعات خدماتنا الاستشارية والبرمجية وبناء علاقات قوية مستدامة مع العملاء.",
      requirements: [
        "خبرة سابقة في بيع الخدمات الاستشارية والبرمجيات للشركات (B2B).",
        "مهارة فائقة في تقديم العروض التقديمية والبيع الاستشاري المبني على تلمس الاحتياجات.",
        "القدرة على إعداد وتصميم الـ Pitch Decks وخطابات العروض المخصصة.",
        "فهم عام بقطاع ريادة الأعمال والاستشارات والمصطلحات الإدارية."
      ],
      skills: ["Consultative Selling", "B2B Account Management", "Pitch Deck Design", "Market Intelligence", "Negotiation"]
    }
  ];

  // Selected Department Filter
  const [selectedDept, setSelectedDept] = useState<string>("all");
  // Selected Job for Quick Apply (Pre-fill job title)
  const [selectedJob, setSelectedJob] = useState<JobPosition | null>(null);
  
  // Application Form States
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    jobTitle: "",
    experienceLevel: "mid",
    yearsOfExperience: "",
    briefBio: "",
    portfolioLink: "",
    skillsInput: "",
  });

  // Selected Predefined Skills list for interactive badge clicking
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkills, setCustomSkills] = useState<string[]>([]);

  // Selected predefined job listing skills when user clicks "Apply Now"
  const handleSelectJobForApply = (job: JobPosition) => {
    setSelectedJob(job);
    setFormData({
      ...formData,
      jobTitle: job.title,
    });
    setSelectedSkills(job.skills);
    
    // Smooth scroll down to application form
    const formSection = document.getElementById("apply-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleGeneralApply = () => {
    setSelectedJob(null);
    setFormData({
      ...formData,
      jobTitle: "طلب عام (انضمام لبنك المواهب والخبرات)",
    });
    setSelectedSkills(["استشارات إدارية", "تطوير ويب", "تحكيم تقني"]);
    
    // Smooth scroll down to application form
    const formSection = document.getElementById("apply-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Skill removal / addition
  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    if (formData.skillsInput.trim() !== "") {
      const newSkill = formData.skillsInput.trim();
      if (!customSkills.includes(newSkill) && !selectedSkills.includes(newSkill)) {
        setCustomSkills([...customSkills, newSkill]);
        setSelectedSkills([...selectedSkills, newSkill]);
      }
      setFormData({ ...formData, skillsInput: "" });
    }
  };

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.jobTitle) {
      alert("الرجاء ملء جميع الحقول الإلزامية المطلوبة لإرسال طلب الانضمام.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationId("BD-TALENT-" + Math.floor(100000 + Math.random() * 900000));
    }, 1500);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSelectedJob(null);
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      jobTitle: "",
      experienceLevel: "mid",
      yearsOfExperience: "",
      briefBio: "",
      portfolioLink: "",
      skillsInput: "",
    });
    setSelectedSkills([]);
    setCustomSkills([]);
  };

  // Filter positions
  const filteredPositions = selectedDept === "all" 
    ? jobPositions 
    : jobPositions.filter(job => job.department === selectedDept);

  // Suggested skills to click depending on the department
  const preDefinedSuggestedSkills = [
    "React", "Node.js", "TypeScript", "Tailwind CSS", "SOPs Development", 
    "KPIs Design", "إدارة التغيير", "دراسة جدوى", "Pitch Deck Design", 
    "Arbitration", "Code Review", "Database Design", "B2B Sales", "إدارة المشاريع"
  ];

  return (
    <section id="careers" className="py-24 bg-white relative overflow-hidden border-t border-slate-250 text-right">
      {/* Visual background elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-50/60 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-50/40 rounded-full filter blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Users className="w-4 h-4 text-blue-500" />
            <span>انضم لرحلتنا الإبداعية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            شكل معنا <span className="text-blue-600">مستقبل الاستشارات والتقنية</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            في بيزنس ديفلوبرز، نؤمن بأن قوتنا تنبع من مواهبنا وشغفنا. نبحث دوماً عن عقول مبدعة وقدرات استشارية وتقنية متميزة لمشاركتنا في ابتكار وتطوير الحلول الذكية لعملائنا في الخليج.
          </p>
        </div>

        {/* Grid for vacancy listings and visual intro */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          
          {/* Vacancy Filter and Listings (Left 2 Columns on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200/80 p-4 rounded-2xl">
              <span className="text-sm font-bold text-slate-850 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>فرص الانضمام والوظائف الشاغرة الحالية:</span>
              </span>
              
              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedDept("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedDept === "all"
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setSelectedDept("consulting")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedDept === "consulting"
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  استشارات
                </button>
                <button
                  onClick={() => setSelectedDept("engineering")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedDept === "engineering"
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  برمجة وتقنية
                </button>
                <button
                  onClick={() => setSelectedDept("legal")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedDept === "legal"
                      ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  تحكيم قانوني
                </button>
              </div>
            </div>

            {/* Vacant positions list with interactive card drawer / expansion */}
            <div className="space-y-4">
              {filteredPositions.map((job) => (
                <div 
                  key={job.id}
                  className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 mt-0.5 ${job.colorClass}`}>
                        {job.icon}
                      </span>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">{job.title}</h3>
                        <span className="text-xs text-slate-500 font-medium">{job.departmentName}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleSelectJobForApply(job)}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer text-center sm:w-auto w-full border border-blue-100 flex items-center justify-center gap-1.5 self-start sm:self-center"
                    >
                      <span>تقديم فوري</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {job.description}
                  </p>

                  {/* Core Requirements */}
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 block mb-2">الشروط والمتطلبات الفنية الأساسية:</span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <span className="font-light leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills tags in job listing */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md font-sans">
                        {skill}
                      </span>
                    ))}
                    <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{job.experience}</span>
                    </span>
                    <span className="text-[10px] bg-sky-50 text-sky-600 border border-sky-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{job.location}</span>
                    </span>
                  </div>
                </div>
              ))}

              {filteredPositions.length === 0 && (
                <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl text-center space-y-3">
                  <p className="text-sm text-slate-500 font-light">لا توجد وظائف معروضة حالياً في هذا القسم.</p>
                  <button 
                    onClick={handleGeneralApply}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-xl text-xs hover:bg-blue-500 transition-all cursor-pointer"
                  >
                    انضم عبر طلب عام لبنك المواهب
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Visual Recruitment Steps & general join (Right Column on desktop) */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-950/20 shadow-xl space-y-6 text-right">
              <div className="space-y-2">
                <span className="text-xs text-blue-300 font-bold tracking-widest uppercase">بيئة العمل الفعالة</span>
                <h3 className="text-xl font-black">لماذا تنضم لشركة بيزنس ديفلوبرز؟</h3>
              </div>
              
              <p className="text-xs sm:text-sm text-blue-100 font-light leading-relaxed">
                نحن لسنا مجرد شركة خدمات، نحن معمل للابتكار وحل العقبات الإدارية والبرمجية. نوفر لك المساحة التامة للإبداع وتحقيق أثر ملموس لشركات المنطقة.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-800/80 text-blue-300 border border-blue-700/30 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">مرونة تامة ونمط عمل هجين</h4>
                    <p className="text-[11px] text-blue-200/80 font-light mt-0.5">نوازن بين مصلحة العمل والراحة الشخصية من خلال دوام مرن وخيارات هجينة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-800/80 text-blue-300 border border-blue-700/30 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">تطوير وشهادات علمية مستمرة</h4>
                    <p className="text-[11px] text-blue-200/80 font-light mt-0.5">نمول برامج التدريب والشهادات المعتمدة في الإدارة والتحكيم والبرمجة.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-800/80 text-blue-300 border border-blue-700/30 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">مشاريع كبرى وعملاء مميزون</h4>
                    <p className="text-[11px] text-blue-200/80 font-light mt-0.5">ستعمل على تمكين كبرى الشركات المتوسطة والناشئة في دول مجلس التعاون الخليجي.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-800">
                <button
                  onClick={handleGeneralApply}
                  className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold py-3 px-4 rounded-2xl text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>تقديم طلب عام (بنك المواهب)</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Timeline of our recruitment process */}
            <div className="bg-slate-50 border border-slate-200 p-6 sm:p-7 rounded-3xl text-right space-y-4">
              <h4 className="text-xs sm:text-sm font-bold text-slate-850 flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-blue-600" />
                <span>مراحل فحص الطلبات والتأهيل:</span>
              </h4>

              <div className="space-y-4 relative pr-4 border-r border-slate-200 mt-2">
                <div className="relative">
                  <span className="absolute -right-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100" />
                  <h5 className="text-xs font-bold text-slate-900">1. الفحص والفرز الأولي للطلب</h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">نقوم بفحص ومطابقة المهارات والخبرات المدخلة خلال 48 ساعة.</p>
                </div>
                
                <div className="relative">
                  <span className="absolute -right-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <h5 className="text-xs font-bold text-slate-900">2. مقابلة التعارف والملائمة الثقافية</h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">مكالمة سريعة هاتفية أو مرئية للتعرف على أهدافك المهنية.</p>
                </div>

                <div className="relative">
                  <span className="absolute -right-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <h5 className="text-xs font-bold text-slate-900">3. الاختبار التقني العملي / الحالة الاستشارية</h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">تحدي صغير يثبت جودة الكود أو طريقة صياغة دليل إجرائي لحالة واقعية.</p>
                </div>

                <div className="relative">
                  <span className="absolute -right-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400" />
                  <h5 className="text-xs font-bold text-slate-900">4. تقديم العرض المالي وحجز المقعد</h5>
                  <p className="text-[10px] text-slate-500 font-light mt-0.5">نقدم عرضاً مالياً ومميزات تشغيلية تنافسية تليق بمهاراتك الاستثنائية.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* INTERACTIVE CUSTOM APPLICATION FORM SECTION */}
        <div id="apply-form" className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden p-6 sm:p-10 text-right">
          
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span>نموذج التقديم الذكي للانضمام</span>
                      </h3>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        يرجى تزويدنا بتفاصيل مهاراتك الفنية ومستويات خبرتك لربط ملفك الوظيفي بأقرب شاغر.
                      </p>
                    </div>

                    {selectedJob && (
                      <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold">
                        <span>الوظيفة المحددة:</span>
                        <span>{selectedJob.title}</span>
                        <button 
                          onClick={() => {
                            setSelectedJob(null);
                            setFormData({ ...formData, jobTitle: "" });
                          }}
                          className="text-slate-400 hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        الاسم الكامل باللغة العربية أو الإنجليزية <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: أحمد عبد الله الرويلي"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-right"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        البريد الإلكتروني المهني للتواصل <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="example@yourdomain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-left font-sans"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        رقم الجوال النشط (مع رمز الدولة) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="05xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-left font-sans"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  {/* Row 2: Job Title & Experience */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">
                        المسمى الوظيفي المستهدف بالتحديد <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="مثال: مهندس ويب، مستشار إداري، مدقق جودة"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-right"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">سنوات الخبرة الإجمالية في مجالك</label>
                      <input
                        type="number"
                        min="0"
                        placeholder="مثال: 5"
                        value={formData.yearsOfExperience}
                        onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-right font-sans"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">مستوى الأقدمية والخبرة الحالية</label>
                      <select
                        value={formData.experienceLevel}
                        onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-right font-semibold"
                      >
                        <option value="junior">مبتدئ / حديث تخرج (Junior)</option>
                        <option value="mid">خبرة متوسطة (Mid-Level)</option>
                        <option value="senior">خبير / أخصائي أول (Senior)</option>
                        <option value="lead">قيادي / مدير مشاريع واستشارات (Lead / Director)</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: INTERACTIVE TECHNICAL SKILLS SELECTOR & TAG BUILDER */}
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-750 flex items-center gap-1">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span>المهارات التقنية وأدوات التخصص (انقر للاختيار أو أضف مهارات مخصصة):</span>
                    </label>

                    {/* Predefined suggestion chips */}
                    <div className="flex flex-wrap gap-2 p-3 bg-white border border-slate-200 rounded-2xl">
                      {preDefinedSuggestedSkills.map((skill) => {
                        const isSelected = selectedSkills.includes(skill);
                        return (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => handleToggleSkill(skill)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-sans border transition-all cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            <span>{skill}</span>
                            {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Custom skills input block */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="أضف مهارة أخرى مخصصة غير مدرجة بالضغط على زر الإضافة..."
                        value={formData.skillsInput}
                        onChange={(e) => setFormData({ ...formData, skillsInput: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomSkill();
                          }
                        }}
                        className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-right"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomSkill}
                        className="bg-slate-800 hover:bg-slate-750 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة</span>
                      </button>
                    </div>

                    {/* Custom and selected skills badges summary panel */}
                    {selectedSkills.length > 0 && (
                      <div className="pt-2">
                        <span className="text-[10px] text-slate-400 font-bold block mb-1.5">المهارات المرفقة بطلبك حالياً:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedSkills.map((skill) => (
                            <span 
                              key={skill}
                              className="text-xs bg-blue-50 text-blue-850 border border-blue-100 px-2.5 py-1 rounded-lg flex items-center gap-1 font-sans font-bold"
                            >
                              <span>{skill}</span>
                              <button 
                                type="button" 
                                onClick={() => handleToggleSkill(skill)}
                                className="text-blue-400 hover:text-rose-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Portfolio Link & Bio */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700">رابط السيرة الذاتية أو معرض الأعمال (GitHub / LinkedIn / Drive)</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={formData.portfolioLink}
                        onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-left font-sans"
                        dir="ltr"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-700 font-semibold">نبذة سريعة عنك وعن أبرز مهاراتك الإدارية أو التقنية</label>
                      <input
                        type="text"
                        placeholder="أبرز الأعمال أو المنهجيات والبرمجيات التي تتقن العمل عليها..."
                        value={formData.briefBio}
                        onChange={(e) => setFormData({ ...formData, briefBio: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:border-blue-500 focus:outline-none transition-all text-right"
                      />
                    </div>
                  </div>

                  {/* Compliance note */}
                  <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-start gap-2 text-right text-xs text-blue-900/90 font-light leading-relaxed">
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <p>
                      <strong>ملاحظة هامة:</strong> بتقديم هذا الطلب، فإنك توافق على قيام شركة بيزنس ديفلوبرز بحفظ ومعالجة بياناتك لأغراض التوظيف والمطابقة المهنية الحالية والمستقبلية. نلتزم التزاماً كاملاً بالسرية التامة وحماية خصوصيتك وعدم مشاركتها مع أي جهة خارجية تحت أي ظرف.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 text-left">
                    <motion.button
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-2xl text-sm transition-all shadow-md shadow-blue-500/10 cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>جاري فحص وإرسال الطلب...</span>
                        </>
                      ) : (
                        <>
                          <span>أرسل طلب انضمامي كشريك نجاح</span>
                          <Send className="w-4 h-4 transform rotate-180" />
                        </>
                      )}
                    </motion.button>
                  </div>

                </form>
              </motion.div>
            ) : (
              // SUBMITTED GORGEOUS SUCCESS PANEL WITH RECRUITMENT STEP TRACKER
              <motion.div
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10 max-w-2xl mx-auto space-y-8"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border-4 border-emerald-100 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">أهلاً بك معنا في بيزنس ديفلوبرز!</h3>
                  <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
                    نشكرك على رغبتك في مشاركتنا قصة تمكين الأعمال والتقنية. تم استلام طلبك للمسمى الوظيفي <strong>({formData.jobTitle})</strong> وجاري مراجعته حالياً من قبل لجنة الفرز والتوظيف.
                  </p>
                </div>

                {/* Simulated Interactive Tracker */}
                <div className="bg-white border border-slate-200 p-6 rounded-3xl text-right space-y-5 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-400">رقم تتبع الطلب المهني:</span>
                    <span className="text-sm font-mono font-black text-blue-600">{applicationId}</span>
                  </div>

                  <div className="space-y-4">
                    <span className="text-xs font-bold text-slate-800 block mb-1">حالة الطلب الحالية ومسار المراجعة:</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
                      <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl space-y-1">
                        <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto text-[10px] font-bold">✓</div>
                        <h4 className="text-xs font-bold text-emerald-950">تم الاستلام</h4>
                        <span className="text-[9px] text-emerald-600 font-medium">قبل لحظات</span>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 p-3 rounded-2xl space-y-1 animate-pulse">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto text-[10px] font-bold">2</div>
                        <h4 className="text-xs font-bold text-blue-950">فحص السيرة الذاتية</h4>
                        <span className="text-[9px] text-blue-600 font-medium">جاري حالياً</span>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1">
                        <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center mx-auto text-[10px] font-bold">3</div>
                        <h4 className="text-xs font-bold text-slate-500">تقييم المهام والخبرة</h4>
                        <span className="text-[9px] text-slate-400">قريباً</span>
                      </div>

                      <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl space-y-1">
                        <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center mx-auto text-[10px] font-bold">4</div>
                        <h4 className="text-xs font-bold text-slate-500">مرحلة المقابلة</h4>
                        <span className="text-[9px] text-slate-400">قريباً</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      const element = document.getElementById("careers");
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                      handleResetForm();
                    }}
                    className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    إرسال طلب آخر بمؤهلات مختلفة
                  </button>
                  <a
                    href="#hero"
                    onClick={(e) => {
                      e.preventDefault();
                      const hero = document.getElementById("hero");
                      if (hero) hero.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto bg-blue-50 text-blue-600 border border-blue-100 font-bold py-3 px-6 rounded-xl text-xs hover:bg-blue-100 transition-all cursor-pointer"
                  >
                    العودة لتصفح الموقع والخدمات
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
