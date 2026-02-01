
import React from 'react';

const ContactSection: React.FC = () => {
  const countryCodes = [
    { code: '+91', country: 'IN' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'SG' },
    { code: '+61', country: 'AU' },
  ];

  return (
    <section id="contact-section" className="py-24 bg-[#F2F0E4] scroll-mt-24">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 bg-black text-white rounded-lg mb-8">
           <span className="text-[10px] font-black uppercase tracking-widest">Global Executive Support</span>
        </div>
        <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-12">Contact <span className="text-iron-red">Relations</span></h2>
        
        <div className="max-w-[900px] mx-auto mb-20">
          <p className="text-slate-700 font-bold text-xl leading-relaxed italic">
            “Iron Lady is dedicated to the strategic advancement of women in leadership. Our executive relations team is available to assist with program inquiries and corporate partnerships.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-left">
          <ContactCard icon="phone" label="Corporate Line" value="+91 - 7360823123" />
          <ContactCard icon="email" label="Official Correspondence" value="admin@iamironlady.com" />
          <ContactCard icon="address" label="Registered Office" value="KIADB plot#8, Post, Sadaramangala Rd, Bengaluru - 560048." />
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Credentials Info Block */}
          <div className="w-full lg:w-1/3 bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl text-left flex flex-col justify-between order-2 lg:order-1 border border-white/10">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="bg-white text-black w-12 h-12 flex flex-col items-center justify-center leading-none rounded-lg shadow-xl shrink-0">
                  <span className="text-[9px] font-black">IRON</span>
                  <span className="text-[9px] font-black">LADY</span>
                </div>
                <div>
                   <h4 className="text-sm font-black uppercase tracking-widest leading-none">Iron Lady Global</h4>
                   <p className="text-[8px] text-white/40 uppercase tracking-[0.2em] mt-1">Certified Leadership Partner</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Company Identification</p>
                  <p className="text-xs font-bold font-mono">CIN: U85300KA2017PTC105221</p>
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">Tax Registration</p>
                  <p className="text-xs font-bold font-mono">GSTIN: 29AAHCI8411D1Z5</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 mt-12">
               <p className="text-[10px] font-bold text-white/50 leading-relaxed italic">
                 Official training and certification entity for executive leadership development.
               </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 space-y-10 order-1 lg:order-2">
             <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight text-left">Professional Inquiry</h3>
             <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="ENTER NAME" className="w-full bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red transition-all" />
                </div>
                <div className="space-y-1 text-left">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" placeholder="ENTER EMAIL" className="w-full bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red transition-all" />
                </div>
                <div className="md:col-span-2 space-y-1 text-left">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Contact</label>
                  <div className="flex gap-2">
                    <select className="bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold text-sm outline-none focus:border-iron-red w-32 appearance-none cursor-pointer">
                       {countryCodes.map(c => <option key={c.code} value={c.code}>{c.country} {c.code}</option>)}
                    </select>
                    <input type="tel" placeholder="PHONE NUMBER" className="flex-1 bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1 text-left">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Details</label>
                  <textarea placeholder="PROVIDE CONTEXT FOR YOUR REQUEST" className="w-full bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red min-h-[150px] transition-all"></textarea>
                </div>
                <button className="md:col-span-2 bg-iron-red text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all shadow-xl active:scale-95">
                  Submit Formal Inquiry
                </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => {
  const iconPath = {
    phone: <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />,
    email: <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />,
    address: <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
  };

  return (
    <div className="bg-white p-10 rounded-[48px] shadow-sm hover:shadow-2xl transition-all border border-slate-50 flex flex-col items-center text-center space-y-6 group">
      <div className="w-16 h-16 bg-slate-50 rounded-[24px] flex items-center justify-center text-slate-800 transition-all group-hover:bg-iron-red group-hover:text-white group-hover:rotate-6 shadow-inner">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">{iconPath[icon as keyof typeof iconPath]}</svg>
      </div>
      <div className="space-y-2">
        <h4 className="text-xl font-black text-iron-red tracking-tight uppercase">{label}</h4>
        <p className="text-[11px] font-black text-slate-800 leading-relaxed uppercase">{value}</p>
      </div>
    </div>
  );
};

export default ContactSection;
