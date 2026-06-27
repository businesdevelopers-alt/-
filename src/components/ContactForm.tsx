import { useState, useEffect, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Trash2, Calendar, Clock, Sparkles, Video, ChevronRight, ChevronLeft } from "lucide-react";
import { Inquiry } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ContactFormProps {
  preFilledService: string;
  preFilledNotes: string;
  onClearPreFill: () => void;
}

export default function ContactForm({ preFilledService, preFilledNotes, onClearPreFill }: ContactFormProps) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("entre");
  const [message, setMessage] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Video call & Calendar States
  const [requiresVideoCall, setRequiresVideoCall] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2026, 5, 1)); // June 2026

  const ARABIC_MONTHS = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];

  const TIME_SLOTS = [
    "09:00 - 10:00 صباحاً",
    "10:30 - 11:30 صباحاً",
    "01:00 - 02:00 مساءً",
    "02:30 - 03:30 مساءً",
    "04:00 - 05:00 مساءً"
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() - 1, 1);
      const limit = new Date(2026, 5, 1); // June 2026
      if (newMonth < limit) return prev;
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev.getFullYear(), prev.getMonth() + 1, 1);
      const limit = new Date(2026, 7, 1); // August 2026 (Max 2 months ahead)
      if (newMonth > limit) return prev;
      return newMonth;
    });
  };

  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const totalDays = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);
    
    const today = new Date(2026, 5, 26); // current local date as of metadata
    
    const dayCells = [];
    
    // Add empty cells for offset
    for (let i = 0; i < firstDayIndex; i++) {
      dayCells.push(
        <div key={`empty-${i}`} className="h-9 sm:h-10" />
      );
    }
    
    // Add day cells
    for (let day = 1; day <= totalDays; day++) {
      const cellDate = new Date(year, month, day);
      const isWeekend = cellDate.getDay() === 5 || cellDate.getDay() === 6; // Friday or Saturday
      const isPast = new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === month && 
        selectedDate.getFullYear() === year;
        
      let buttonStyle = "w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center cursor-pointer ";
      let isDisabled = false;
      let label = "";

      if (isPast) {
        buttonStyle += "text-slate-300 bg-transparent cursor-not-allowed";
        isDisabled = true;
      } else if (isWeekend) {
        buttonStyle += "text-amber-500 bg-amber-50/30 border border-amber-100/30 cursor-not-allowed";
        isDisabled = true;
        label = "إجازة";
      } else if (isSelected) {
        buttonStyle += "bg-blue-600 text-white shadow-md shadow-blue-500/20";
      } else {
        buttonStyle += "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200/50";
      }
      
      dayCells.push(
        <button
          key={`day-${day}`}
          type="button"
          disabled={isDisabled}
          onClick={() => {
            setSelectedDate(cellDate);
            setSelectedTimeSlot("");
            if (errors.calendar) {
              setErrors(prev => ({ ...prev, calendar: "" }));
            }
          }}
          className={buttonStyle}
          title={label || `${day} ${ARABIC_MONTHS[month]} ${year}`}
        >
          <span>{day}</span>
          {isWeekend && (
            <span className="text-[7px] text-amber-500 font-normal scale-90 -mt-0.5">
              إجازة
            </span>
          )}
        </button>
      );
    }
    
    return dayCells;
  };

  // Fetch saved inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("bd_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync pre-fills from external components
  useEffect(() => {
    if (preFilledService) {
      setService(preFilledService);
    }
    if (preFilledNotes) {
      setMessage(preFilledNotes);
    }
  }, [preFilledService, preFilledNotes]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "الاسم الكامل مطلوب";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "يرجى إدخال بريد إلكتروني صحيح";
    if (!phone.trim() || phone.length < 8) newErrors.phone = "يرجى إدخال رقم جوال صحيح (8 أرقام على الأقل)";
    if (!message.trim()) newErrors.message = "تفاصيل الرسالة أو نطاق المشروع مطلوبة";
    
    if (requiresVideoCall) {
      if (!selectedDate) {
        newErrors.calendar = "يرجى اختيار تاريخ الجلسة المرئية من التقويم";
      }
      if (!selectedTimeSlot) {
        newErrors.timeSlot = "يرجى اختيار الوقت المفضل للجلسة";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulate server request delay
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: "inq-" + Date.now(),
        name,
        company: company || "شخصي / فردي",
        email,
        phone,
        serviceId: service,
        message,
        date: new Date().toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "pending",
        requiresVideoCall,
        preferredDate: requiresVideoCall && selectedDate ? selectedDate.toLocaleDateString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric"
        }) : undefined,
        preferredTimeSlot: requiresVideoCall ? selectedTimeSlot : undefined,
      };

      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem("bd_inquiries", JSON.stringify(updated));

      setLoading(false);
      setSuccess(true);
      
      // Reset form
      setName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setMessage("");
      setRequiresVideoCall(false);
      setSelectedDate(null);
      setSelectedTimeSlot("");
      onClearPreFill();
    }, 1500);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    localStorage.setItem("bd_inquiries", JSON.stringify(updated));
  };

  const getServiceName = (id: string) => {
    const names: Record<string, string> = {
      mgmt: "خدمات إدارة الأعمال وهيكلة الشركات",
      plan: "التخطيط الاستراتيجي وبناء بطاقات الأداء",
      arbit: "التحكيم والخبرة التقنية وفض النزاعات",
      entre: "خدمات رواد الأعمال واحتضان الأفكار",
      apps: "تصميم وتطوير تطبيقات الهواتف والويب",
    };
    return names[id] || "طلب استشارة عامة";
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 space-x-reverse bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-600 text-xs sm:text-sm font-semibold shadow-inner">
            <Mail className="w-4 h-4 text-blue-600" />
            <span className="text-blue-600 font-bold">ابدأ الآن تواصلك الاستراتيجي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            هل أنت مستعد <span className="text-blue-600 font-extrabold">لتطوير أعمالك وحمايتها</span>؟
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            اترك لنا بياناتك وتفاصيل مشروعك، وسيقوم أحد مستشارينا بالتواصل معك خلال 24 ساعة لبدء التخطيط والتمكين.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Details (Right Column on mobile) */}
          <div className="lg:col-span-5 space-y-8 text-right lg:order-1 order-2">
            <div className="bg-slate-50 text-slate-800 rounded-3xl p-6 sm:p-8 space-y-8 border border-slate-200/80 shadow-2xl relative overflow-hidden">
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">معلومات الاتصال المباشر</h3>
                <p className="text-xs sm:text-sm text-slate-655 font-light leading-relaxed">
                  يمكنك الوصول إلينا مباشرة أو زيارة مكاتبنا لتبادل الأفكار وبدء التعاون.
                </p>
              </div>

              {/* Contact list items */}
              <div className="space-y-6 pt-4">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center border border-slate-200 shrink-0 text-blue-600 shadow-sm">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">اتصل بنا أو واتساب:</span>
                    <a href="tel:+966500000000" className="block text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 font-sans tracking-wide transition-colors">
                      +966 50 000 0000
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center border border-slate-200 shrink-0 text-blue-600 shadow-sm">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">البريد الإلكتروني الرسمي:</span>
                    <a href="mailto:info@business-developers.com" className="block text-sm sm:text-base font-bold text-slate-900 hover:text-blue-600 font-sans transition-colors">
                      info@business-developers.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center border border-slate-200 shrink-0 text-blue-600 shadow-sm">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 font-medium">مقر الشركة:</span>
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                      برج بيزنس، حي الملقا، الرياض، المملكة العربية السعودية
                    </p>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="pt-6 border-t border-slate-200 space-y-2">
                <span className="block text-xs text-slate-500 font-medium">ساعات العمل الرسمية:</span>
                <p className="text-xs sm:text-sm text-slate-755 font-medium">
                  من الأحد إلى الخميس | 9:00 صباحاً - 6:00 مساءً
                </p>
              </div>
            </div>
          </div>

          {/* Form Container (Left Column) */}
          <div className="lg:col-span-7 lg:order-2 order-1">
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-right">
              
              {success ? (
                <div className="py-8 text-center space-y-6 animate-fade-in">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-100 shadow-sm">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">تم إرسال طلب الاستشارة بنجاح!</h3>
                    <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-light">
                      شكراً لتواصلك مع بيزنس ديفلوبرز. تم تسجيل طلبك وتخزينه بنجاح، وسيقوم مستشار العلاقات لدينا بالتواصل معك قريباً جداً.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      onClick={() => setSuccess(false)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-lg"
                    >
                      إرسال طلب استشارة آخر
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name and Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs sm:text-sm font-bold text-slate-800">
                        الاسم الكامل <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="أدخل اسمك الكريم"
                        value={name}
                        onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: "" }); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.name ? "border-rose-500" : "border-slate-200"
                        }`}
                      />
                      {errors.name && <span className="text-xs text-rose-500">{errors.name}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-xs sm:text-sm font-bold text-slate-800">
                        اسم الشركة / المشروع
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="أدخل اسم جهة العمل (إن وجد)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email and Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs sm:text-sm font-bold text-slate-800">
                        البريد الإلكتروني <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="example@domain.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans ${
                          errors.email ? "border-rose-500" : "border-slate-200"
                        }`}
                        dir="ltr"
                      />
                      {errors.email && <span className="text-xs text-rose-500">{errors.email}</span>}
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs sm:text-sm font-bold text-slate-800">
                        رقم الجوال / واتساب <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="+966 50 000 0000"
                        value={phone}
                        onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: "" }); }}
                        className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-sans ${
                          errors.phone ? "border-rose-500" : "border-slate-200"
                        }`}
                        dir="ltr"
                      />
                      {errors.phone && <span className="text-xs text-rose-500">{errors.phone}</span>}
                    </div>
                  </div>

                  {/* Service Selector */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-xs sm:text-sm font-bold text-slate-800">
                      الخدمة أو الحل المطلوب الاستشارة فيه:
                    </label>
                    <select
                      id="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                    >
                      <option value="mgmt" className="bg-white text-slate-800">خدمات إدارة الأعمال وهيكلة الشركات</option>
                      <option value="plan" className="bg-white text-slate-800">التخطيط الاستراتيجي وبناء بطاقات الأداء</option>
                      <option value="arbit" className="bg-white text-slate-800">التحكيم والخبرة التقنية وفض النزاعات</option>
                      <option value="entre" className="bg-white text-slate-800">خدمات رواد الأعمال واحتضان الأفكار</option>
                      <option value="apps" className="bg-white text-slate-800">تصميم وتطوير تطبيقات الهواتف والويب</option>
                    </select>
                  </div>

                  {/* Video Call Request & Simple Calendar */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm text-right">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Video className="w-5 h-5 text-blue-600 animate-pulse shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-850">طلب جلسة استشارة مرئية مباشرة (Video Call)</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={requiresVideoCall}
                          onChange={(e) => {
                            setRequiresVideoCall(e.target.checked);
                            if (!e.target.checked) {
                              setSelectedDate(null);
                              setSelectedTimeSlot("");
                            }
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>

                    <p className="text-xs text-slate-500 font-light leading-relaxed">
                      إذا كنت تفضل مناقشة فكرتك الاستراتيجية مع أحد مستشارينا وجهاً لوجه عبر اتصال مرئي، يرجى تفعيل الخيار أعلاه وتحديد اليوم والوقت المفضلين من التقويم التفاعلي.
                    </p>

                    {requiresVideoCall && (
                      <div className="space-y-4 pt-3 border-t border-slate-200/60 overflow-hidden">
                        {/* Calendar & Time Slots Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                          
                          {/* Calendar Picker Panel */}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-700">اختر تاريخ الجلسة المناسب:</span>
                              
                              {/* Month Navigation */}
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <button
                                  type="button"
                                  onClick={handlePrevMonth}
                                  className="p-1 hover:bg-slate-200 rounded-md text-slate-600 transition-colors cursor-pointer"
                                  title="الشهر السابق"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                                <span className="text-xs font-black text-slate-800 min-w-[70px] text-center">
                                  {ARABIC_MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                                </span>
                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  className="p-1 hover:bg-slate-200 rounded-md text-slate-600 transition-colors cursor-pointer"
                                  title="الشهر التالي"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Calendar Table */}
                            <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-inner">
                              {/* Weekdays header */}
                              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {["ح", "ن", "ث", "ر", "خ", "ج", "س"].map((w, index) => (
                                  <span key={index} className={`text-[10px] font-black ${index === 5 || index === 6 ? "text-amber-500" : "text-slate-400"}`}>
                                    {w}
                                  </span>
                                ))}
                              </div>
                              {/* Days grid */}
                              <div className="grid grid-cols-7 gap-1 text-center">
                                {renderCalendarDays()}
                              </div>
                            </div>
                            
                            {errors.calendar && (
                              <p className="text-xs text-rose-500">{errors.calendar}</p>
                            )}
                          </div>

                          {/* Time Slot Picker Panel */}
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-700 block">
                              {selectedDate ? (
                                <>
                                  الأوقات المتاحة ليوم:{" "}
                                  <span className="text-blue-600 font-extrabold">
                                    {selectedDate.toLocaleDateString("ar-SA", { weekday: 'long', day: 'numeric', month: 'long' })}
                                  </span>
                                </>
                              ) : (
                                "اختر تاريخاً من التقويم لعرض الأوقات المتاحة"
                              )}
                            </span>

                            {selectedDate ? (
                              <div className="grid grid-cols-1 gap-2">
                                {TIME_SLOTS.map((slot) => {
                                  const isSelected = selectedTimeSlot === slot;
                                  return (
                                    <button
                                      key={slot}
                                      type="button"
                                      onClick={() => {
                                        setSelectedTimeSlot(slot);
                                        if (errors.timeSlot) setErrors({ ...errors, timeSlot: "" });
                                      }}
                                      className={`px-4 py-2.5 rounded-xl text-xs font-bold text-right border transition-all cursor-pointer flex items-center justify-between ${
                                        isSelected
                                          ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                                          : "bg-white hover:bg-slate-50 border-slate-200 text-slate-700"
                                      }`}
                                    >
                                      <span>{slot}</span>
                                      <Clock className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                                    </button>
                                  );
                                })}
                              </div>
                            ) : (
                              <div className="h-44 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                                <Calendar className="w-6 h-6 mb-1 text-slate-300 animate-pulse" />
                                <span className="text-[10px] font-light">يرجى تحديد التاريخ أولاً لعرض مواعيد الحجز المتاحة</span>
                              </div>
                            )}

                            {errors.timeSlot && (
                              <p className="text-xs text-rose-500">{errors.timeSlot}</p>
                            )}
                          </div>

                        </div>
                      </div>
                    )}
                  </div>

                  {/* Message / Scope */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs sm:text-sm font-bold text-slate-800">
                      تفاصيل طلبك ونطاق مشروعك <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="صف فكرتك أو التحدي الإداري/التقني الذي تواجهه شركتك حالياً لمساعدتنا في تقديم أفضل رد..."
                      value={message}
                      onChange={(e) => { setMessage(e.target.value); if (errors.message) setErrors({ ...errors, message: "" }); }}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.message ? "border-rose-500" : "border-slate-200"
                      }`}
                    />
                    {errors.message && <span className="text-xs text-rose-500">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white py-4 px-6 rounded-2xl text-base font-bold shadow-lg transition-all cursor-pointer border border-blue-400/10"
                  >
                    {loading ? (
                      <span className="flex items-center space-x-2 space-x-reverse">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري تسجيل طلبك الاستشاري...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>احجز استشارتك المجانية الآن</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

        {/* Persisted Inquiries History */}
        {inquiries.length > 0 && (
          <div className="mt-20 border-t border-slate-200 pt-12 text-right">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900">سجل طلباتك الاستشارية المحفوظة محلياً</h3>
              </div>
              <span className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 font-mono shadow-sm">STORES_CLIENT_LOCAL</span>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-right"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-full font-bold">
                        {getServiceName(inq.serviceId)}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center space-x-1 space-x-reverse font-sans">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>{inq.date}</span>
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-bold text-slate-900">
                      طلب مقدم باسم: {inq.name} <span className="text-slate-500 font-light font-sans">({inq.company})</span>
                    </h4>
                    
                    <p className="text-xs text-slate-600 font-light leading-relaxed">
                      تفاصيل الطلب: {inq.message}
                    </p>
                    
                    {inq.requiresVideoCall && (
                      <div className="mt-3 flex flex-wrap items-center gap-2 bg-blue-50/80 border border-blue-100/50 px-3 py-1.5 rounded-xl text-xs text-blue-700 font-medium w-fit">
                        <Video className="w-3.5 h-3.5 text-blue-600 shrink-0 animate-pulse" />
                        <span>طلب جلسة مرئية:</span>
                        <span className="font-bold text-slate-900">{inq.preferredDate}</span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-sans text-[11px] font-extrabold">
                          {inq.preferredTimeSlot}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 space-x-reverse shrink-0 self-end sm:self-center">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md shadow-sm">
                      بانتظار تواصل المستشار
                    </span>
                    <button
                      onClick={() => handleDeleteInquiry(inq.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      title="حذف الطلب من السجل"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
