
import React, { useEffect, useRef } from 'react';

interface AboutPageProps {
  targetSection?: string;
}

const AboutPage: React.FC<AboutPageProps> = ({ targetSection }) => {
  const rajeshRef = useRef<HTMLElement>(null);
  const suvarnaRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const foundersRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (targetSection) {
      const timer = setTimeout(() => {
        const refMap: Record<string, React.RefObject<HTMLElement | null>> = {
          'rajesh': rajeshRef,
          'suvarna': suvarnaRef,
          'vision': visionRef,
          'founders': foundersRef
        };
        const ref = refMap[targetSection];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [targetSection]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn("CEO image failed to load, path attempted:", e.currentTarget.src);
    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";
  };

  const founders = [
    {
      name: "SIMON NEWMAN",
      role: "CO-FOUNDER, CHAIRMAN",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      bio: "Simon is a highly accomplished global CEO / CXOs – being the CEO of companies like Aviva, Singapore. He's held CXO positions at Barclays, Prudential and Hong Leong Bank.",
      linkedin: "#"
    },
    {
      name: "SRIDHAR SAMBANDAM",
      role: "CO-FOUNDER, DIRECTOR",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
      bio: "Sridhar is considered one of the foremost turn-around specialists in India, having turned around many billion-dollar companies like Bajaj Auto and Escorts.",
      linkedin: "#"
    }
  ];

  return (
    <div className="bg-[#F2F0E4] min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 py-20 lg:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-left duration-700">
             <div className="aspect-[16/9] bg-slate-900 relative">
               <img 
                 src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200" 
                 className="w-full h-full object-cover transition-all duration-1000 opacity-60"
                 alt="Rajesh Bhat Statement" 
               />
               <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 bg-black/40">
                  <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-xl border border-white/20">
                    <p className="text-white text-3xl font-black uppercase tracking-widest mb-1">GLOBAL</p>
                    <p className="text-white text-xl font-bold">LEADERSHIP PLATFORM</p>
                  </div>
               </div>
             </div>
             <div className="bg-white p-6 border-t border-slate-100">
                <p className="text-slate-600 text-sm font-bold italic">
                  Iron Lady is built on the principle of unapologetic ambition. We represent the boldest network of women leaders in India.
                </p>
             </div>
          </div>
          <div className="space-y-8 animate-in slide-in-from-right duration-700">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
              <span className="text-iron-red">Iron Lady</span> is India's Premier Leadership Platform.
            </h2>
            <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed">
              <p>High Impact Leadership programs combined with a strength-obsessed community of top women leaders in India.</p>
              <p>Our mission is to empower the next generation of board members and corporate visionaries.</p>
            </div>
          </div>
        </div>
      </section>

      <section ref={rajeshRef} id="rajesh" className="py-24 max-w-[1200px] mx-auto px-6 scroll-mt-32 bg-white/40 rounded-[60px] my-12 shadow-sm border border-white/50">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
           <div className="w-full lg:w-1/3">
             <div className="relative group">
               <div className="absolute -inset-4 bg-iron-red/10 rounded-[40px] rotate-3 transition-transform group-hover:rotate-0"></div>
               <img 
                 src="./services/rajesh-ceo.png" 
                 onError={handleImageError}
                 className="relative z-10 w-full aspect-square rounded-[32px] shadow-2xl transition-all duration-700 object-cover border-4 border-white" 
                 alt="Rajesh Bhat"
               />
               <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-black rounded-full z-20 flex items-center justify-center text-white border-4 border-[#F2F0E4]">
                  <span className="text-[10px] font-black uppercase tracking-tighter leading-none text-center">IRON<br/>LADY<br/>FOUNDER</span>
               </div>
             </div>
           </div>
           <div className="w-full lg:w-2/3 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Rajesh Bhat</h3>
                </div>
                <div className="border-y border-iron-red/30 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 leading-relaxed">Founder & Director, Serial Social Entrepreneur, Visionary Behind the Million Women Goal.</p>
                </div>
              </div>
              <div className="space-y-6 text-slate-600 font-medium leading-relaxed text-lg">
                <p>Rajesh Bhat is a serial Social Entrepreneur and founder of initiatives like Head Held High, 1Bridge, and Iron Lady. He has dedicated his career to building transformative ecosystems for growth.</p>
                <p>In 2017, Rajesh, along with a few other global leaders, started Iron Lady. It has since become the No. 1 Leadership Platform for Women in India.</p>
              </div>
           </div>
        </div>
      </section>

      <section ref={suvarnaRef} id="suvarna" className="py-24 max-w-[1200px] mx-auto px-6 scroll-mt-32">
        <div className="flex flex-col lg:flex-row-reverse gap-16 items-center">
           <div className="w-full lg:w-1/3">
             <div className="relative group">
               <div className="absolute -inset-4 bg-iron-red/10 rounded-[40px] -rotate-3 transition-transform group-hover:rotate-0"></div>
               <img 
                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                 className="relative z-10 w-full aspect-square rounded-[32px] shadow-2xl transition-all duration-700 object-cover border-4 border-white" 
                 alt="Suvarna Hegde"
               />
             </div>
           </div>
           <div className="w-full lg:w-2/3 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-5xl font-black text-slate-900 uppercase tracking-tighter">Suvarna Hegde</h3>
                </div>
                <div className="border-y border-iron-red/30 py-4">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 leading-relaxed">Expert of Business War Tactics for Women. Former Innovation Specialist at Infosys & Bosch.</p>
                </div>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed text-lg">
                Suvarna is one of the foremost experts of Business War Tactics for Women. She has coached hundreds of Founders / CEOs and thousands of women leaders to reach the TOP.
              </p>
           </div>
        </div>
      </section>

      <section ref={visionRef} id="vision" className="py-24 bg-white/30 scroll-mt-32">
        <div className="max-w-[900px] mx-auto px-6 space-y-16">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-900">Our Purpose</h2>
            <div className="bg-white p-12 rounded-[32px] shadow-xl border border-slate-100">
              <p className="text-2xl font-black text-slate-800 tracking-tight leading-relaxed">
                Our Purpose is to enable a <span className="text-iron-red underline decoration-4 underline-offset-8">million women</span> to reach the TOP.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section ref={foundersRef} id="founders" className="py-24 max-w-[1200px] mx-auto px-6">
        <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-20 text-center">Global <span className="text-iron-red">Advisory Board</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {founders.map((f, i) => (
             <div key={i} className="bg-white p-10 rounded-[48px] shadow-sm border border-slate-100 flex flex-col items-center text-center space-y-6">
                <img src={f.image} className="w-32 h-32 rounded-full object-cover" alt={f.name} />
                <h4 className="text-2xl font-black uppercase tracking-tighter">{f.name}</h4>
                <p className="text-iron-red text-xs font-black uppercase tracking-widest">{f.role}</p>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">{f.bio}</p>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
