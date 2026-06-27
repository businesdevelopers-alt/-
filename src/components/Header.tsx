import { useState, useEffect } from "react";
import { Menu, X, Briefcase, PhoneCall, Sparkles } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "الرئيسية" },
    { id: "services", label: "خدماتنا" },
    { id: "solutions", label: "الحلول الذكية" },
    { id: "portfolio", label: "سابقة أعمالنا" },
    { id: "calculator", label: "الحاسبة التفاعلية" },
    { id: "dashboard", label: "بوابة المشاريع" },
    { id: "faq", label: "الأسئلة الشائعة" },
    { id: "resources", label: "المدونة والموارد" },
    { id: "careers", label: "انضم لفريقنا" },
    { id: "contact", label: "تواصل معنا" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with solid blue accent */}
          <div
            onClick={() => handleItemClick("hero")}
            className="flex items-center space-x-2 space-x-reverse cursor-pointer group"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/10 group-hover:scale-105 transition-all">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                بيزنس <span className="text-blue-600 font-black">ديفلوبرز</span>
              </span>
              <span className="text-[9px] text-blue-600 font-mono tracking-widest font-bold">
                BUSINESS DEVELOPERS
              </span>
            </div>
          </div>
 
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-sm font-semibold transition-colors relative py-1 cursor-pointer ${
                  activeSection === item.id
                    ? "text-blue-600 font-bold"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 right-0 left-0 h-[2px] bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>
 
          {/* Desktop CTA with solid blue background */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleItemClick("contact")}
              className="flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer border border-blue-500"
            >
              <PhoneCall className="w-4 h-4" />
              <span>استشارة مجانية</span>
            </button>
          </div>
 
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 p-2 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
 
      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 shadow-xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={`block w-full text-right px-4 py-3 rounded-xl text-base font-semibold transition-colors cursor-pointer ${
                activeSection === item.id
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-slate-650 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => handleItemClick("contact")}
              className="flex items-center justify-center space-x-2 space-x-reverse w-full bg-blue-600 text-white px-5 py-3 rounded-xl text-base font-bold shadow-md cursor-pointer"
            >
              <PhoneCall className="w-5 h-5" />
              <span>استشارة مجانية</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
