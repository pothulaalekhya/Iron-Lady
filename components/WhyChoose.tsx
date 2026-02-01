
import React from 'react';

const WhyChoose: React.FC = () => {
  const reasons = [
    { 
      title: "Business War Tactics", 
      icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    { 
      title: "Breakthrough Fast-track", 
      icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    { 
      title: "78,000+ Leaders", 
      icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
    { 
      title: "Winning Mindset", 
      icon: <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.543 2.235c-.235.967-.47 1.934-.706 2.901H8.986c-.235-.967-.47-1.934-.706-2.901L7.737 16.243z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    },
  ];

  return (
    <section className="py-24 bg-[#F2F0E4]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black text-slate-900 mb-16 uppercase tracking-tight animate-slide-up">
          Why Choose <span className="text-iron-red">Iron Lady</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason, idx) => (
            <div 
              key={idx} 
              className="group bg-white p-8 rounded-[32px] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-6 hover:-translate-y-3 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="w-16 h-16 flex items-center justify-center p-4 bg-slate-50 rounded-2xl group-hover:bg-red-50 text-slate-300 group-hover:text-iron-red transition-all">
                {reason.icon}
              </div>
              <h3 className="text-sm font-black leading-tight uppercase tracking-widest">{reason.title}</h3>
            </div>
          ))}
          <div className="bg-iron-red p-8 rounded-[32px] shadow-2xl text-white flex flex-col justify-center animate-in zoom-in duration-700 delay-500">
            <p className="text-sm font-bold leading-relaxed italic">
              "Created by <span className="underline decoration-white/30 underline-offset-4">global CEOs</span> to turn ambition into achievement."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
