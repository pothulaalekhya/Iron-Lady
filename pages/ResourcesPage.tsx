
import React, { useEffect, useRef, useState } from 'react';

interface ResourcesPageProps {
  targetSection?: string;
}

const ResourcesPage: React.FC<ResourcesPageProps> = ({ targetSection }) => {
  const [faqTab, setFaqTab] = useState<'brand' | 'programs'>('brand');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const blogsRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const videosRef = useRef<HTMLElement>(null);
  const caseRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const publicationRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (targetSection) {
      const timer = setTimeout(() => {
        const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
          'blogs': blogsRef,
          'events': eventsRef,
          'videos': videosRef,
          'case': caseRef,
          'newsletter': newsletterRef,
          'faq': faqRef,
          'publication': publicationRef,
          'book': bookRef
        };
        const ref = refMap[targetSection];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [targetSection]);

  const blogs = [
    { title: "Strategic Management of Objectives for Aspiring Leaders", date: "11/3/2025", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600" },
    { title: "Elevate Your Career: Executive Development Strategies for Visionary Women", date: "8/3/2025", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" },
    { title: "Personal Visibility: The Game Changer for Women Leaders", date: "8/3/2025", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600" },
    { title: "Harnessing Corporate Entrepreneurship in Women's Leadership", date: "8/3/2025", img: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=600" },
    { title: "The Unspoken Side Effects of Real Transformation for Women in Their Personal Lives", date: "8/3/2025", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600" },
    { title: "Becoming Unstoppable: A Career Advancement Guide for Women Professionals", date: "3/2/2025", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=600" }
  ];

  const publications = [
    { title: "Indra Nooyi celebrates the milestone of 100+ Iron Ladies achieving Rs 1 crore+ annual income, and joins the board in launching the book The Shameless Lady", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" },
    { title: "Indra Nooyi to Speak to Iron Ladies, Celebrate 100+ Women Who Have Reached Rs1 Crore Annual Income", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
    { title: "Walk to the Board: unique event fast-tracking women towards TOP Leadership", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600" }
  ];

  const events = [
    { title: "Winning Ways for Women 2025", date: "Apr 26, 2025", status: "ENDED", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=600", desc: "Winning Ways for Women is more than just an event—it's a movement celebrating the power, resilience, and success of women leaders." },
    { title: "Iron Lady 1CR+ Club", date: "March 10, 2024", status: "ENDED", img: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600", desc: "Iron Lady celebrated Women's Day on March 10th, 2024, at Hyatt Bangalore, honoring over 50 women who achieved Crore+ yearly incomes." },
    { title: "Walk To The Board - Walkathon", date: "November 5, 2023", status: "ENDED", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600", desc: "Walk to the Board Walkathon is an empowering event dedicated to all inspiring women to fast-track their journey towards Senior Leadership Roles." }
  ];

  const faqs = [
    "What is Iron Lady?", "Who founded Iron Lady?", "Where is Iron Lady located?", "What values does Iron Lady uphold?", "How can I contact Iron Lady?", "What impact has Iron Lady created so far?", "Does Iron Lady have a community?", "Does Iron Lady offer partnership opportunities?", "How long has Iron Lady been operating?", "How can my organization become a partner?", "Who can I contact for more information?", "Are there career opportunities at Iron Lady?"
  ];

  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      
      {/* 1. Blogs Section */}
      <section ref={blogsRef} id="blogs" className="max-w-[1200px] mx-auto px-6 py-20 scroll-mt-24">
        <h2 className="text-5xl font-black text-center text-slate-900 uppercase tracking-tighter mb-12">Blogs</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input type="text" placeholder="Search blogs..." className="flex-1 bg-white border border-slate-200 px-6 py-3 rounded-lg text-sm font-medium" />
          <select className="bg-white border border-slate-200 px-4 py-3 rounded-lg text-sm font-medium"><option>All Categories</option></select>
          <select className="bg-white border border-slate-200 px-4 py-3 rounded-lg text-sm font-medium"><option>All Subcategories</option></select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:-translate-y-2 transition-transform">
              <div className="relative aspect-video">
                <div className="absolute top-4 right-4 z-20 bg-black/80 text-white px-2 py-1 rounded text-[8px] font-black tracking-widest">IRON LADY</div>
                <img src={b.img} className="w-full h-full object-cover transition-all duration-700" alt="" />
              </div>
              <div className="p-6 space-y-4 text-center">
                <h3 className="text-sm font-black text-iron-red leading-tight group-hover:underline cursor-pointer">{b.title}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Published : {b.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="bg-iron-red text-white px-10 py-3 rounded-xl font-black uppercase text-xs hover:bg-black transition-all">Load More</button>
        </div>
      </section>

      {/* 2. Video Resources */}
      <section ref={videosRef} id="videos" className="bg-[#FDFCF0] py-24 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-5xl font-black text-center text-slate-900 uppercase tracking-tighter mb-12">Video Resources</h2>
          <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
            {["Recommended", "Testimonials", "C Suite Speaks", "C Suite Conversations"].map((tab, i) => (
              <button key={i} className={`px-5 py-2 rounded-lg text-xs font-black uppercase whitespace-nowrap border ${i === 0 ? 'bg-iron-red text-white border-iron-red' : 'bg-white text-slate-600 border-slate-200 hover:border-iron-red'}`}>{tab}</button>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-iron-red rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <h3 className="text-3xl font-black text-white mt-8 tracking-tighter uppercase">"Rebuilt it again and I'll show myself as a role model"</h3>
                  <p className="text-white/80 font-bold text-sm mt-4">Shilpa K - Rebuilding Strength, Redefining Success</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm font-black text-slate-900">Rebuilding Strength, Redefining Success - Shilpa K</p>
                <button className="bg-iron-red text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase">Subscribe</button>
              </div>
            </div>
            <div className="w-full lg:w-[350px] space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Recommended Videos</h4>
              {[1, 2, 3].map(v => (
                <div key={v} className="flex gap-4 items-start group cursor-pointer">
                  <div className="w-28 aspect-video bg-black rounded-lg overflow-hidden flex-shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover opacity-50" alt="" />
                    <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p className="text-[10px] font-bold text-slate-800 leading-tight group-hover:text-iron-red">Lakshmi Nayak's 10x Transformation with Iron Lady...</p>
                </div>
              ))}
              <button className="w-full bg-iron-red text-white py-3 rounded-xl text-[10px] font-black uppercase">Load More</button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Publication */}
      <section ref={publicationRef} id="publication" className="max-w-[900px] mx-auto px-6 py-24 scroll-mt-24">
        <h2 className="text-5xl font-black text-center text-slate-900 uppercase tracking-tighter mb-16">Publication</h2>
        <div className="space-y-8">
          {publications.map((p, i) => (
            <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center group">
              <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden">
                <img src={p.img} className="w-full h-full object-cover transition-all duration-700" alt="" />
              </div>
              <div className="flex-1 space-y-6">
                <p className="text-slate-900 font-bold text-lg leading-tight">{p.title}</p>
                <button className="bg-iron-red text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Events */}
      <section ref={eventsRef} id="events" className="bg-[#FDFCF0] py-24 scroll-mt-24">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-5xl font-black text-center text-slate-900 uppercase tracking-tighter mb-16">Events</h2>
          <div className="space-y-8">
            {events.map((e, i) => (
              <div key={i} className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative">
                   <img src={e.img} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{e.title}</h3>
                  <p className="text-xs font-bold text-slate-400">{e.date}</p>
                  <p className="text-[10px] font-black text-iron-red uppercase tracking-widest">{e.status}</p>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">{e.desc}</p>
                  <button className="bg-iron-red text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Case Study / Success Stories Section */}
      <section ref={caseRef} id="case" className="py-24 max-w-[1200px] mx-auto px-6 scroll-mt-24">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
               <div className="aspect-video bg-black rounded-[40px] overflow-hidden shadow-2xl relative group border-4 border-white">
                 <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60" alt="" />
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-20 h-20 bg-iron-red rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                     <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                 </div>
               </div>
            </div>
            <div className="flex-1 space-y-8">
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                78,000+ women have gone through Iron Lady Programs so far.
              </h2>
              <p className="text-2xl font-bold text-slate-800 leading-tight">
                Thousands of have gone onto become top <span className="text-iron-red uppercase">CHRO</span> using Iron Lady Principles.
              </p>
              <div className="flex gap-4">
                <select className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold"><option>Programs</option></select>
                <select className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold"><option>Industry</option></select>
                <select className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-lg text-xs font-bold"><option>Functions</option></select>
              </div>
              <h3 className="text-4xl font-black text-slate-900 uppercase">All Stories</h3>
            </div>
         </div>
      </section>

      {/* 6. FAQ Section */}
      <section ref={faqRef} id="faq" className="bg-[#FDFCF0] py-24 scroll-mt-24">
        <div className="max-w-[900px] mx-auto px-6">
          <h2 className="text-6xl font-black text-center text-slate-900 uppercase tracking-tighter mb-12">Frequently Asked Questions</h2>
          <div className="flex justify-center gap-4 mb-12">
            <button onClick={() => setFaqTab('brand')} className={`px-10 py-3 rounded-lg font-black uppercase text-xs transition-all ${faqTab === 'brand' ? 'bg-iron-red text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Brand</button>
            <button onClick={() => setFaqTab('programs')} className={`px-10 py-3 rounded-lg font-black uppercase text-xs transition-all ${faqTab === 'programs' ? 'bg-iron-red text-white' : 'bg-white text-slate-600 border border-slate-200'}`}>Programs</button>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            {faqs.map((q, i) => (
              <div key={i} className="border-b border-slate-50 last:border-0">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left group">
                  <span className="text-sm font-bold text-slate-700">{i + 1}. {q}</span>
                  <span className="text-slate-400 group-hover:text-iron-red transition-colors">{activeFaq === i ? '−' : '+'}</span>
                </button>
                {activeFaq === i && (
                  <div className="px-6 pb-6 text-xs text-slate-500 font-medium leading-relaxed animate-in fade-in slide-in-from-top-2">
                    Our programs are designed for ambitious women across all corporate levels. We focus on business war tactics, personal visibility, and reaching top leadership positions. Contact us for detailed curricula.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Book Section */}
      <section ref={bookRef} id="book" className="py-24 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto px-6">
           <div className="bg-iron-red rounded-[60px] p-12 lg:p-20 flex flex-col items-center text-center text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all"></div>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter mb-8 z-10">The Shameless Lady</h2>
              <p className="text-xl font-medium max-w-2xl mx-auto italic opacity-90 mb-12">"Very well written. In a humorous way, everything you discussed in the book reflected experiences I've gone through at some point in my career—I could relate to all of it." — Indra Nooyi</p>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
                 <div className="flex -space-x-8">
                   <img src="https://images.squarespace-cdn.com/content/v1/59c3d4a4692670e1730075f8/1507742055615-51X7Z7L7Y7M7P7T7R7V7/Rajesh+Bhat.jpg" className="w-24 h-24 rounded-full border-4 border-iron-red object-cover" alt="" />
                   <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="w-24 h-24 rounded-full border-4 border-iron-red object-cover" alt="" />
                 </div>
                 <div className="text-left">
                   <p className="text-sm font-black uppercase tracking-widest">Authored by</p>
                   <p className="text-lg font-bold">Suvarna Hegde & Rajesh Bhat</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 8. Newsletter Archive */}
      <section ref={newsletterRef} id="newsletter" className="py-24 bg-[#F2F0E4] scroll-mt-24">
        <div className="max-w-[1000px] mx-auto px-6 text-center space-y-12">
          <div>
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-8">2024</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["December 2024", "November 2024", "October 2024", "September 2024", "August 2024", "July 2024", "June 2024", "May 2024", "April 2024", "March 2024"].map(m => (
                <button key={m} className="bg-black text-white py-3 rounded text-[10px] font-black uppercase hover:bg-iron-red transition-all">{m}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-400 uppercase tracking-widest mb-8">2025</h3>
            <div className="flex justify-center">
              <button className="bg-black text-white px-10 py-3 rounded text-[10px] font-black uppercase hover:bg-iron-red transition-all">January 2025</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
