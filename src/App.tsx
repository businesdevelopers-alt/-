import { useState, useEffect } from "react";
import { MessageSquare, Phone, ArrowUp, Briefcase, Award, Milestone, CheckCircle } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import Solutions from "./components/Solutions";
import Portfolio from "./components/Portfolio";
import MaturityAssessment from "./components/MaturityAssessment";
import ProjectCalculator from "./components/ProjectCalculator";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import WelcomeModal from "./components/WelcomeModal";
import ClientDashboard from "./components/ClientDashboard";
import FAQ from "./components/FAQ";
import Resources from "./components/Resources";
import SolutionComparison from "./components/SolutionComparison";
import Careers from "./components/Careers";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [preFilledService, setPreFilledService] = useState("");
  const [preFilledNotes, setPreFilledNotes] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "services", "solutions", "portfolio", "calculator", "dashboard", "faq", "resources", "careers", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80; // height of the fixed header
      const elementPosition = el.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(sectionId);
    }
  };

  // Pre-fill from Services details click
  const handleSelectService = (serviceId: string) => {
    setPreFilledService(serviceId);
    setPreFilledNotes(`أرغب في الحصول على استشارة تفصيلية بخصوص خدمة: ${
      serviceId === "mgmt" ? "خدمات إدارة الأعمال وهيكلة الشركات" :
      serviceId === "plan" ? "التخطيط الاستراتيجي وبناء بطاقات الأداء" :
      serviceId === "arbit" ? "التحكيم والخبرة التقنية وفض النزاعات" :
      serviceId === "entre" ? "خدمات رواد الأعمال واحتضان الأفكار" :
      "تصميم وتطوير تطبيقات الهواتف والويب"
    }. يرجى التواصل لتحديد الموعد.`);
    
    handleNavigate("contact");
  };

  // Pre-fill from custom solutions selection
  const handleSelectSolution = (solutionId: string) => {
    setPreFilledService(solutionId);
    setPreFilledNotes(`أرغب في الاستفسار عن باقة الحل المتكامل المخصصة لـ: ${
      solutionId === "entre" ? "رواد الأعمال (من الفكرة إلى منتج MVP)" :
      solutionId === "mgmt" ? "النمو وهيكلة الشركات القائمة" :
      "الحماية والتحكيم التقني وفض النزاعات البرمجية"
    }. يرجى تزويدي بالخطوات التالية وكيفية البدء.`);
    
    handleNavigate("contact");
  };

  // Pre-fill from calculator
  const handlePreFillInquiry = (serviceId: string, customNotes: string) => {
    setPreFilledService(serviceId);
    setPreFilledNotes(customNotes);
    handleNavigate("contact");
  };

  // Clear pre-fills
  const handleClearPreFill = () => {
    setPreFilledService("");
    setPreFilledNotes("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-between selection:bg-blue-600 selection:text-white" dir="rtl">
      
      {/* Header */}
      <Header onNavigate={handleNavigate} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Landing Section */}
        <Hero
          onExploreServices={() => handleNavigate("services")}
          onBookConsultation={() => handleNavigate("contact")}
        />

        {/* 2. Key Statistics Bar */}
        <Stats />

        {/* 3. About Us / Vision Highlights (من نحن) */}
        <section className="py-24 bg-white relative overflow-hidden text-right border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Vision Graphic / Badges */}
              <div className="space-y-6">
                <span className="text-xs sm:text-sm font-bold text-blue-600 tracking-wider uppercase block">
                  عن شركة بيزنس ديفلوبرز
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  منظومة متكاملة لتمكين <span className="text-blue-600 font-sans font-black">الأعمال والريادة</span> الرقمية
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                  تأسست شركة بيزنس ديفلوبرز لتكون الجسر الاحترافي الواصل بين الفكر الإداري المنهجي والتحول البرمجي الحديث. نحن لا نكتفي بتقديم الاستشارات، بل نصمم الأدوات التشغيلية ونبني التطبيقات والحلول التي تقود شركتك نحو التوسع والريادة الرقمية التامة.
                </p>

                {/* Core Pillars */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                      <Milestone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-800">منهجية علمية واضحة</h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-light">نعتمد في مخرجاتنا على النماذج القياسية العالمية وبطاقات الأداء لضمان جودة الأداء.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 space-x-reverse">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-800">حماية الأصول الرقمية والتحكيم</h4>
                      <p className="text-xs sm:text-sm text-slate-500 font-light">نوفر خبرة قضائية وتقنية فريدة لحل الخلافات وضمان تملكك الكامل لبرمجياتك دون نزاع.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bento Grid Visual Presentation */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-sm hover:border-blue-500 hover:bg-white transition-all">
                  <span className="text-4xl">💡</span>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">الابتكار والاحتضان</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">نصيغ الهيكل الفني والاقتصادي للأفكار الجديدة لنحميها من الفشل.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-3xl space-y-3 shadow-sm transform translate-y-6 hover:border-blue-500 hover:bg-white transition-all">
                  <span className="text-4xl">⚙️</span>
                  <h3 className="font-extrabold text-blue-900 text-sm sm:text-base">تطبيقات متكاملة</h3>
                  <p className="text-xs text-blue-950/80 font-light leading-relaxed">نبني حلول الويب وتطبيقات الهواتف الذكية بتقنيات سريعة وسحابية آمنة.</p>
                </div>
                <div className="bg-sky-50 border border-sky-200 p-6 rounded-3xl space-y-3 shadow-sm hover:border-blue-500 hover:bg-white transition-all">
                  <span className="text-4xl">📊</span>
                  <h3 className="font-extrabold text-sky-900 text-sm sm:text-base">التخطيط التنظيمي</h3>
                  <p className="text-xs text-sky-950/80 font-light leading-relaxed">ندعم المنشآت بدراسات الجدوى المالية والسياسات المكتوبة SOPs.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 p-6 rounded-3xl space-y-3 shadow-sm transform translate-y-6 hover:border-blue-500 hover:bg-white transition-all">
                  <span className="text-4xl">⚖️</span>
                  <h3 className="font-extrabold text-slate-800 text-sm sm:text-base">العدالة والتحكيم</h3>
                  <p className="text-xs text-slate-500 font-light leading-relaxed">نقّيم العقود والبرمجيات كشريك فني وقانوني موثوق.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Interactive Services Explorer */}
        <Services onSelectService={handleSelectService} />

        {/* 5. Solutions Section */}
        <Solutions onSelectSolution={handleSelectSolution} />

        {/* 5.5. Solution Comparison Section */}
        <SolutionComparison onPreFillInquiry={handlePreFillInquiry} />

        {/* Dynamic Business Maturity Assessment Tool */}
        <MaturityAssessment onPreFillInquiry={handlePreFillInquiry} />

        {/* 6. Case Studies / Previous Work (سابقة أعمالنا) */}
        <Portfolio />

        {/* 7. Interactive Project Calculator */}
        <ProjectCalculator onPreFillInquiry={handlePreFillInquiry} />

        {/* 8. Interactive Client Dashboard */}
        <ClientDashboard />

        {/* 9. Interactive FAQ Accordion */}
        <FAQ />

        {/* 10. Educational Blog & Digital Resources */}
        <Resources />

        {/* 10.5. Careers & Team Hiring Section */}
        <Careers />

        {/* 11. Contact & Lead Capture Form */}
        <ContactForm
          preFilledService={preFilledService}
          preFilledNotes={preFilledNotes}
          onClearPreFill={handleClearPreFill}
        />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Persistent Floating Quick-Contact Widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/966500000000"
          target="_blank"
          rel="noreferrer"
          className="w-12 h-12 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer border border-blue-400/20"
          title="تواصل معنا عبر واتساب"
        >
          <MessageSquare className="w-5 h-5" />
        </a>

        {/* Call Button */}
        <a
          href="tel:+966500000000"
          className="w-12 h-12 bg-white hover:bg-slate-50 text-blue-600 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer border border-slate-200"
          title="اتصل بنا هاتفياً"
        >
          <Phone className="w-5 h-5 text-blue-600" />
        </a>

        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-12 h-12 bg-white hover:bg-slate-50 text-blue-600 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer border border-slate-200 animate-fade-in"
            title="العودة لأعلى الصفحة"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Interactive Welcome and Tour Modal */}
      <WelcomeModal onNavigateToSection={handleNavigate} />

    </div>
  );
}
