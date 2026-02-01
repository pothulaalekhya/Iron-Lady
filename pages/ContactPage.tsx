
import React, { useEffect, useRef } from 'react';

interface ContactPageProps {
  targetSection?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({ targetSection }) => {
  const helpRef = useRef<HTMLElement>(null);
  const partnershipRef = useRef<HTMLElement>(null);
  const scholarshipRef = useRef<HTMLElement>(null);
  const referralRef = useRef<HTMLElement>(null);
  const corporateRef = useRef<HTMLElement>(null);
  const careersRef = useRef<HTMLElement>(null);

  const countryCodes = [
    { code: '+91', country: 'IN' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+971', country: 'UAE' },
    { code: '+65', country: 'SG' },
  ];

  useEffect(() => {
    if (targetSection) {
      const timer = setTimeout(() => {
        const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
          'help': helpRef,
          'partnership': partnershipRef,
          'scholarship': scholarshipRef,
          'referral': referralRef,
          'corporate': corporateRef,
          'careers': careersRef
        };
        const ref = refMap[targetSection];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [targetSection]);

  const partnershipBenefits = [
    { title: "Enhanced Leadership Development", desc: "Expand opportunities for your employees and stakeholders to build essential leadership skills.", icon: "🏆" },
    { title: "Brand Strengthening", desc: "Align with a trusted and recognized name in women's leadership, elevating your brand's social impact.", icon: "🤝" },
    { title: "Revenue-Generating Initiatives", desc: "Access potential revenue-sharing models through collaborative programs.", icon: "💡" },
    { title: "Exclusive Program Access", desc: "Engage with our renowned leadership workshops, programs, and exclusive masterclasses.", icon: "👥" },
    { title: "Ongoing Training and Support", desc: "Receive continuous guidance for your leaders to ensure impactful results.", icon: "🔄" },
    { title: "Leadership Insights & Trends", desc: "Leverage our research-driven insights into the latest leadership practices and trends.", icon: "📈" },
    { title: "Expert Network Access", desc: "Connect with Iron Lady's community of expert coaches, mentors, and industry leaders.", icon: "🌐" }
  ];

  return (
    <div className="bg-[#F2F0E4] min-h-screen font-['Outfit'] overflow-x-hidden">
      
      {/* 1. Main Help / Contact Section */}
      <section ref={helpRef} id="help" className="max-w-[1400px] mx-auto px-6 py-24 scroll-mt-24 text-center">
        <h2 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-16">Contact <span className="text-iron-red">Relations</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-left">
          <ContactCard icon="phone" label="Executive Line" value="+91 - 7360823123" />
          <ContactCard icon="email" label="Official Support" value="admin@iamironlady.com" />
          <ContactCard icon="address" label="Registered Address" value="Sadaramangala Rd, Bengaluru - 560048." />
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
                 Official corporate entity for high-impact women's leadership development.
               </p>
            </div>
          </div>

          <div className="flex-1 bg-white p-12 rounded-[40px] shadow-2xl border border-slate-100 space-y-10 order-1 lg:order-2 w-full text-left">
             <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Formal Inquiry Request</h3>
             <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input type="text" placeholder="ENTER NAME" className="w-full bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" placeholder="ENTER EMAIL" className="w-full bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red transition-all" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Contact</label>
                  <div className="flex gap-2">
                    <select className="bg-slate-50 border border-slate-100 p-5 rounded-2xl font-bold text-sm outline-none focus:border-iron-red w-32 appearance-none">
                       {countryCodes.map(c => <option key={c.code} value={c.code}>{c.country} {c.code}</option>)}
                    </select>
                    <input type="tel" placeholder="MOBILE NUMBER" className="flex-1 bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red transition-all" />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Detail</label>
                  <textarea placeholder="DESCRIBE THE SCOPE OF YOUR INQUIRY" className="w-full bg-slate-50 p-5 rounded-2xl font-bold text-sm border border-slate-100 outline-none focus:border-iron-red min-h-[150px] transition-all"></textarea>
                </div>
                <button className="md:col-span-2 bg-iron-red text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all shadow-xl active:scale-95">
                  Submit Consultation Request
                </button>
             </form>
          </div>
        </div>
      </section>

      {/* 2. Partnership Opportunities */}
      <section ref={partnershipRef} id="partnership" className="scroll-mt-24">
        <div className="relative h-[450px] flex items-center bg-white overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-iron-red flex flex-col justify-center px-6 lg:px-24 text-white z-10">
            <h2 className="text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-10">CREATE IMPACTFUL <br/>LEADERSHIP SOLUTIONS</h2>
            <p className="text-xl font-bold opacity-90 max-w-2xl italic leading-relaxed">Discover our tailored partnership models for mutual growth: access premier leadership programs, align with a leader in women’s empowerment.</p>
          </div>
          <div className="absolute inset-y-0 right-0 w-full lg:w-[45%] h-full">
            <img 
              src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover object-center scale-x-[-1]" 
              alt="Partnership Alignment" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-iron-red via-iron-red/40 to-transparent"></div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-6 py-24 text-center">
           <h3 className="text-7xl font-black text-iron-red uppercase tracking-tighter mb-4">PARTNERSHIP COLLABORATION</h3>
           <p className="text-sm font-bold uppercase text-slate-800 tracking-widest mb-16">Global Leadership Excellence</p>
           
           <div className="bg-[#F3EAD3] p-10 rounded-sm mb-20 max-w-7xl mx-auto shadow-sm">
              <p className="text-xs font-bold text-slate-700 leading-relaxed uppercase tracking-wider">
                 Join forces with Iron Lady to create impactful leadership solutions. <br/>
                 Explore our tailored partnership models that offer mutual benefits, including access to premier leadership programs, brand alignment with a leading name in women's empowerment, and opportunities for growth.
              </p>
           </div>

           <h4 className="text-lg font-black uppercase mb-12 tracking-tight">Executive Partnership Benefits</h4>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-32">
              {partnershipBenefits.map((b, i) => (
                <div key={i} className="bg-iron-red p-6 rounded-md text-white flex flex-col items-center text-center space-y-4 shadow-xl min-h-[220px]">
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl mb-2">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-inner">{b.icon}</div>
                   </div>
                   <h5 className="text-[10px] font-black uppercase tracking-tight leading-tight">{b.title}</h5>
                   <p className="text-[9px] font-medium opacity-90 leading-relaxed text-balance">{b.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. Pay It Forward (Scholarship) - REFINED TO MATCH SCREENSHOT */}
      <section ref={scholarshipRef} id="scholarship" className="py-24 bg-[#F2F0E4] scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 mb-20">
          <div className="bg-white rounded-sm shadow-sm overflow-hidden flex flex-col lg:flex-row items-center border border-slate-100">
             <div className="w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
                <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Strategic impact" />
             </div>
             <div className="w-full lg:w-1/2 p-12 lg:p-16 text-center lg:text-left space-y-6">
                <h2 className="text-4xl font-black text-iron-red uppercase tracking-tighter leading-tight">TOGETHER, WE CREATE CHANGE</h2>
                <p className="text-xs font-black uppercase tracking-widest text-slate-800 leading-relaxed">
                  Sponsor a future leader or apply for a scholarship today and be part of the Iron Lady legacy.
                </p>
             </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 text-center mb-32">
           <h2 className="text-7xl lg:text-9xl font-black text-iron-red uppercase tracking-tighter leading-none mb-6 relative inline-block">
             PAY IT FORWARD
             <span className="absolute bottom-0 left-0 w-full h-1 bg-iron-red"></span>
             <span className="absolute bottom-2 left-0 w-full h-1 bg-iron-red"></span>
           </h2>
           <div className="space-y-4 mt-8">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">Strategic Philanthropy</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Sponsor a leadership journey or apply for a merit grant to unlock potential.</p>
           </div>
        </div>

        {/* Mission Text Grid */}
        <div className="max-w-[1400px] mx-auto px-6 mb-32">
           <div className="border border-iron-red p-12 rounded-sm grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
              <div className="space-y-6">
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-wide">
                  Iron Lady is committed to supporting women who aspire to reach the top but face professional or systemic obstacles. Through our Pay It Forward program, we aim to bridge the gap and provide elite coaching access.
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase leading-relaxed tracking-wide">
                  Your contribution directly influences the leadership pipeline. By sponsoring a grant, you help rewrite the narrative of corporate excellence. Be the catalyst behind a transformative success story.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-8 text-center lg:text-right">
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-iron-red uppercase tracking-widest">Scholarship Methodology</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-800">Investing in Women Leaders</p>
                </div>
              </div>
           </div>
        </div>

        {/* Sponsorship Cards */}
        <div className="max-w-[1400px] mx-auto px-6 text-center">
           <h3 className="text-6xl lg:text-8xl font-black text-slate-900 uppercase tracking-tighter mb-4">Sponsor a Participant</h3>
           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-20 max-w-4xl mx-auto leading-relaxed">
             By sponsoring a scholarship, you become a partner in her leadership trajectory. Your contribution funds elite board-level training and executive coaching resources.
           </p>
           
           <p className="text-iron-red text-[8px] font-black uppercase tracking-widest mb-12">Grant Tiers:</p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
              <SponsorshipCard icon="👤" title="Partial Merit Grant" price="₹ 15,000" desc="Support a foundational breakthrough" />
              <SponsorshipCard icon="🏆" title="Full Merit Grant" price="₹ 35,000" desc="Sponsor a complete leadership transformation" />
              <SponsorshipCard icon="🎓" title="Enterprise Tier" price="₹ 1,75,000" desc="Empower a cohort of five future executives." />
           </div>

           <div className="space-y-6">
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Sponsor Future Leadership</p>
              <button className="bg-iron-red text-white px-12 py-4 rounded-sm font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-xl">Contribute Now</button>
           </div>
        </div>

        {/* Apply Section */}
        <div className="max-w-[1400px] mx-auto px-6 text-center py-32">
           <h3 className="text-6xl lg:text-8xl font-black text-slate-900 uppercase tracking-tighter mb-12">Apply for Support</h3>
           <p className="text-[10px] font-bold text-slate-500 uppercase max-w-5xl mx-auto leading-relaxed tracking-wider">
              We provide full and partial scholarships to women passionate about professional development. If you are at a career junction and require strategic support to advance, our scholarship committee is available to review your application.
           </p>
        </div>
      </section>

      {/* 4. Corporate Program */}
      <section ref={corporateRef} id="corporate" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
           <h2 className="text-6xl font-black uppercase tracking-tighter leading-tight mb-12">Corporate <span className="text-iron-red">Empowerment</span></h2>
           <p className="text-lg font-bold text-slate-500 max-w-3xl mx-auto mb-16">Optimize your workforce with high-performance leadership strategies. Our corporate solutions bridge the gender leadership gap through tactical excellence and board-level readiness.</p>
           <button className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-iron-red transition-all">Request Proposal</button>
        </div>
      </section>

      {/* 5. Referral Program */}
      <section ref={referralRef} id="referral" className="py-32 bg-[#F2F0E4] scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
           <h2 className="text-8xl font-black text-iron-red uppercase tracking-tighter mb-32">REFERRAL REWARDS</h2>
           <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-32">
              <StepItem num="Submit" desc="Submit referral details via the official form." />
              <StepItem num="Verify" desc="Our team will review the application for eligibility." />
              <StepItem num="Get Reward" desc="Upon approval, rewards are granted per corporate policy." />
           </div>
        </div>
      </section>

      {/* 6. Careers */}
      <section ref={careersRef} id="careers" className="py-32 bg-white scroll-mt-24">
        <div className="max-w-[1000px] mx-auto px-6 text-center space-y-16">
           <h2 className="text-8xl font-black uppercase tracking-tighter text-slate-900">JOIN THE <span className="text-iron-red underline decoration-black">ELITE TEAM</span></h2>
           <p className="text-xl font-bold text-slate-500 italic">We are seeking ambitious individuals to join our global mission.</p>
           <button className="bg-iron-red text-white px-20 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-black transition-all shadow-2xl">Explore Vacancies</button>
        </div>
      </section>
    </div>
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

const SponsorshipCard = ({ icon, title, price, desc }: { icon: string; title: string; price: string; desc: string }) => (
  <div className="bg-iron-red p-10 rounded-sm shadow-xl text-center space-y-6 text-white group hover:-translate-y-4 transition-all duration-500">
    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">{icon}</div>
    <div className="space-y-1">
       <h4 className="text-[9px] font-black uppercase tracking-widest opacity-80">{title}</h4>
       <p className="text-2xl font-black uppercase tracking-tighter">{price}</p>
    </div>
    <p className="text-[9px] font-black uppercase tracking-widest leading-relaxed">{desc}</p>
  </div>
);

const StepItem = ({ num, desc }: { num: string; desc: string }) => (
  <div className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-sm text-center space-y-4 max-w-[280px]">
    <h4 className="text-2xl font-black uppercase text-iron-red tracking-tighter">{num}</h4>
    <p className="text-[10px] font-medium text-slate-500 leading-relaxed uppercase">{desc}</p>
  </div>
);

export default ContactPage;
