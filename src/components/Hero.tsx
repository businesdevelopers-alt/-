import { ArrowLeft, Sparkles, ShieldCheck, Rocket, Landmark } from "lucide-react";

interface HeroProps {
  onExploreServices: () => void;
  onBookConsultation: () => void;
}

export default function Hero({ onExploreServices, onBookConsultation }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center bg-slate-50 overflow-hidden"
    >
      {/* Grid Pattern overlay with ultra-fine lines for corporate elegance */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_80%,transparent_100%)] opacity-70" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-8 text-right">
            {/* Elegant luxury tag */}
            <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-blue-700 font-bold">
                نصنع فارقاً حقيقياً في تنمية وتأمين أعمالك ومشاريعك
              </span>
            </div>
 
            {/* Main Title - Luxurious Typography */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.25] tracking-tight">
              بيزنس <span className="text-blue-600">ديفلوبرز</span> <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-700 mt-2 block">
                نطوّر الفكرة الاستراتيجية.. لنصنع الريادة المستدامة
              </span>
            </h1>
 
            {/* Subdescription */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl font-light">
              نحن بيت الخبرة المتكامل لتمكين الشركات ورواد الأعمال. ندمج بين التخطيط الاستراتيجي، الإدارة المنهجية، احتضان المشاريع، تصميم وتطوير البرمجيات الرائدة، وصولاً إلى التحكيم والخبرة التقنية لفض النزاعات وحماية الأصول الرقمية.
            </p>
 
            {/* Focus Badges with redesigned borders and blue accents */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-center space-x-2.5 space-x-reverse bg-white border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Rocket className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">احتضان وتطوير ريادي</span>
              </div>
              <div className="flex items-center space-x-2.5 space-x-reverse bg-white border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-300">
                <div className="w-8 h-8 rounded-xl bg-sky-50 flex items-center justify-center shrink-0">
                  <Landmark className="w-4 h-4 text-sky-600" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">التحكيم التقني المستقل</span>
              </div>
              <div className="flex items-center space-x-2.5 space-x-reverse bg-white border border-slate-200/80 p-3.5 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all duration-300 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800">هيكلة وإدارة العمليات</span>
              </div>
            </div>
 
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start">
              <button
                onClick={onBookConsultation}
                className="flex items-center justify-center space-x-3 space-x-reverse bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-blue-500/10 hover:-translate-y-0.5 transition-all cursor-pointer border border-blue-500"
              >
                <span>احجز جلستك الاستشارية مجاناً</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={onExploreServices}
                className="flex items-center justify-center space-x-2 space-x-reverse bg-white hover:bg-slate-100/80 text-slate-700 hover:text-slate-900 border border-slate-200/80 px-8 py-4 rounded-2xl text-base font-bold transition-all cursor-pointer shadow-sm"
              >
                <span>استكشف خدماتنا الكاملة</span>
              </button>
            </div>
          </div>
 
          {/* Graphical Representation Card - Redesigned Dashboard */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 animate-float-slow">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              
              {/* Main dashboard mockup container */}
              <div className="relative bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                
                {/* Header bar of visual */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex space-x-2 space-x-reverse">
                    <div className="w-3 h-3 rounded-full bg-rose-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-[10px] text-blue-600 font-mono tracking-widest font-bold">B-DEVELOPERS INTEGRATED PLATFORM</span>
                </div>
 
                {/* Simulated growth graph */}
                <div className="py-6 space-y-6">
                  <div className="flex justify-between items-end h-32 pt-4">
                    <div className="w-[12%] bg-slate-100 border border-slate-200 rounded-lg h-[25%] relative group cursor-pointer">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-[10px] text-slate-200 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">فكرة فنية</div>
                    </div>
                    <div className="w-[12%] bg-blue-50 border border-blue-200 rounded-lg h-[45%] relative group cursor-pointer">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-[10px] text-blue-400 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">احتضان وهيكلة</div>
                    </div>
                    <div className="w-[12%] bg-slate-100 border border-slate-200 rounded-lg h-[35%] relative" />
                    <div className="w-[12%] bg-indigo-50 border border-indigo-200 rounded-lg h-[60%] relative" />
                    <div className="w-[12%] bg-sky-50 border border-sky-200 rounded-lg h-[50%] relative" />
                    <div className="w-[12%] bg-blue-100 border border-blue-300 rounded-lg h-[80%] relative" />
                    <div className="w-[12%] bg-blue-600 h-[100%] rounded-lg shadow-md shadow-blue-500/10 relative group cursor-pointer">
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded whitespace-nowrap shadow-md">ريادة مستدامة</div>
                    </div>
                  </div>
 
                  {/* Feature metrics with premium cards */}
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-blue-500 transition-colors">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          📈
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">نسبة نجاح المشاريع المحتضنة</p>
                          <p className="text-sm font-bold text-slate-800">92% في الـ 3 سنوات الأولى</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">+12%</span>
                    </div>
 
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-blue-500 transition-colors">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                          ⚖️
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">التحكيم وفض النزاعات التقنية</p>
                          <p className="text-sm font-bold text-slate-800">خبرة قضائية وفنية معتمدة</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">آمن تماماً</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}
