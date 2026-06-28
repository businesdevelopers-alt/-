import { Briefcase, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onNavigateToService?: (serviceId: string) => void;
}

export default function Footer({ onNavigate, onNavigateToService }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 text-slate-600 pt-16 pb-8 border-t border-slate-200 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200">
          
          {/* Logo & Description Column */}
          <div className="md:col-span-5 space-y-4">
            <div
              onClick={() => onNavigate("hero")}
              className="flex items-center space-x-2 space-x-reverse cursor-pointer group"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  بيزنس <span className="text-blue-600 font-bold">ديفلوبرز</span>
                </span>
                <span className="text-[9px] text-slate-500 font-mono tracking-wider">
                  BUSINESS DEVELOPERS
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-sm">
              شريكك التمكيني الموثوق لربط جودة الإدارة بالتخطيط الاستراتيجي، واحتضان المشاريع الناشئة، وبناء البرمجيات المتينة، وتوثيق حقوقك القانونية والبرمجية بالخبرة والتحكيم التقني المعتمد.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider">الوصول السريع</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate("hero")} className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">
                  الرئيسية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">
                  خدماتنا الاستشارية
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("solutions")} className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">
                  حلول قطاع الأعمال
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("portfolio")} className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600">
                  سابقة أعمالنا
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider">خدماتنا التخصصية</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-650">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToService?.("mgmt")}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600 text-right w-full block"
                >
                  إدارة وهيكلة الشركات
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToService?.("plan")}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600 text-right w-full block"
                >
                  التخطيط الاستراتيجي
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToService?.("arbit")}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600 text-right w-full block"
                >
                  التحكيم التقني وفض النزاع
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToService?.("entre")}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600 text-right w-full block"
                >
                  احتضان مشاريع رواد الأعمال
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToService?.("apps")}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-slate-600 text-right w-full block"
                >
                  تصميم وبرمجة التطبيقات
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Address Column */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 tracking-wider font-sans">تواصل مباشر</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2 space-x-reverse">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span className="font-light text-slate-600">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="mailto:info@business-developers.com" className="hover:text-blue-600 transition-colors text-slate-600">
                  info@business-developers.com
                </a>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <a href="tel:+966500000000" className="hover:text-blue-600 font-sans text-slate-600">
                  +966 50 000 0000
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-500 text-center sm:text-right font-light">
            &copy; {currentYear} شركة بيزنس ديفلوبرز المحدودة. جميع الحقوق محفوظة لشركتنا.
          </p>
          <div className="flex items-center space-x-4 space-x-reverse text-slate-500">
            <span className="hover:text-slate-800 transition-colors cursor-pointer">سياسة الخصوصية</span>
            <span>•</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">شروط الاستخدام</span>
            <span>•</span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer flex items-center space-x-1 space-x-reverse">
              <span>التحكيم والخبرة المعتمدة</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
