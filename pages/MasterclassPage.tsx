
import React, { useEffect, useRef, useState } from 'react';

interface MasterclassPageProps {
  targetSection?: string;
}

const MasterclassPage: React.FC<MasterclassPageProps> = ({ targetSection }) => {
  const [timer, setTimer] = useState({ hrs: 3, min: 59, sec: 51 });
  
  const heroRef = useRef<HTMLElement>(null);
  const tacticsRef = useRef<HTMLElement>(null);
  const curriculumRef = useRef<HTMLElement>(null);
  const guaranteeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev.sec > 0) return { ...prev, sec: prev.sec - 1 };
        if (prev.min > 0) return { ...prev, min: prev.min - 1, sec: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, min: 59, sec: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn("Masterclass image failed to load, path attempted:", e.currentTarget.src);
    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";
  };

  const professionals = [
    { name: "Pushpalatha M S", role: "CEO", company: "Prameya Health", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400" },
    { name: "Neha Agarwal", role: "GSI Leader", company: "AWS", img: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=400" },
    { name: "Arifa Nauman", role: "AGM", company: "Windlas Biotech", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" },
    { name: "Sajita Thomas", role: "Director HR", company: "Diebold Nixdorf", img: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?auto=format&fit=crop&q=80&w=400" },
    { name: "Minal Bhagat", role: "Entrepreneur", company: "BCC", img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=400" },
    { name: "Dr Ruhi Satija", role: "Managing Director", company: "DMH", img: "https://images.unsplash.com/photo-1559839734-2b71f15360ee?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-['Outfit'] selection:bg-iron-red">
      <div className="bg-iron-red py-3 px-6 fixed top-16 left-0 right-0 z-40 flex justify-center items-center gap-12 border-b border-black/10">
        <span className="text-sm font-black uppercase tracking-widest">Admissions Closing Soon</span>
        <div className="flex gap-6">
          <TimeBlock val={timer.hrs} unit="HRS" />
          <TimeBlock val={timer.min} unit="MIN" />
          <TimeBlock val={timer.sec} unit="SEC" />
        </div>
      </div>

      <section ref={heroRef} className="pt-48 pb-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 80 L20 60 L100 0" stroke="white" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
             <div className="w-full lg:w-1/2 flex justify-center">
                <img src="./services/rajesh-ceo.png" onError={handleImageError} className="rounded-full border-8 border-iron-red shadow-2xl w-64 h-64 lg:w-96 lg:h-96 object-cover" alt="Leadership" />
             </div>
             <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
               <h1 className="text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                  ELEVATING A MILLION <br/>
                  <span className="text-iron-red">WOMEN TO THE TOP</span>
               </h1>
             </div>
          </div>

          <div className="bg-[#111] p-12 rounded-[60px] border border-white/5 shadow-3xl max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
             <div className="flex-1 text-left space-y-8">
                <div className="bg-iron-red w-20 h-20 flex items-center justify-center rounded-2xl shadow-xl">
                   <span className="text-[12px] font-black leading-none">IRON<br/>LADY</span>
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Fast-track <span className="text-iron-red">Your Career</span> or Business Growth</h2>
                <button className="bg-iron-red text-white w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-white hover:text-black transition-all">
                    REGISTER NOW @ JUST RS.129/-
                </button>
             </div>
             <div className="flex-1 space-y-8">
                <div className="aspect-video bg-black rounded-[40px] overflow-hidden relative shadow-2xl">
                   <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-70" alt="Masterclass" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-iron-red rounded-full flex items-center justify-center cursor-pointer">
                         <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <StatItem val="78000 +" label="Women trained" />
                   <StatItem val="1200 +" label="Workshops" />
                </div>
             </div>
          </div>
        </div>
      </section>

      <section ref={tacticsRef} className="py-24 px-6 max-w-[1100px] mx-auto">
         <div className="bg-[#111] p-12 rounded-[40px] border border-white/10 flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
               <div className="aspect-video bg-[#FDFCF0] rounded-3xl p-8 flex items-center justify-center border border-white/10">
                  <img src="https://img.freepik.com/free-vector/gender-gap-concept-illustration_114360-1430.jpg" className="w-[80%] mix-blend-multiply" alt="Gender Gap Illustration" />
               </div>
            </div>
            <div className="flex-1 space-y-6">
               <h2 className="text-4xl font-black uppercase">Business <span className="text-iron-red">War Tactics</span></h2>
               <p className="opacity-70 text-lg">Eliminate workplace barriers and move up your career ladder faster than ever.</p>
            </div>
         </div>
      </section>

      <section className="py-24 max-w-[1200px] mx-auto px-6 text-center">
         <h2 className="text-5xl font-black uppercase tracking-tighter mb-20">Alumnae <span className="text-iron-red">Success Stories</span></h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {professionals.map((p, i) => (
               <div key={i} className="bg-[#111] p-8 rounded-[40px] border border-white/5 group hover:border-iron-red transition-all">
                  <div className="aspect-square rounded-2xl overflow-hidden mb-6 transition-all duration-700 shadow-2xl">
                     <img src={p.img} className="w-full h-full object-cover" alt={p.name} />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tight">{p.name}</h4>
                  <p className="text-iron-red text-xs font-black uppercase tracking-widest mt-2">{p.role}</p>
                  <p className="opacity-40 text-[10px] font-bold uppercase mt-1">{p.company}</p>
               </div>
            ))}
         </div>
      </section>

      <section ref={guaranteeRef} className="py-24 max-w-[1100px] mx-auto px-6 scroll-mt-32">
         <div className="flex flex-col lg:flex-row gap-20 items-start">
            <div className="w-full lg:w-1/3 text-center space-y-12">
               <div className="relative inline-block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e0/Gold_Seal.png" className="w-64 h-64 drop-shadow-[0_20px_50px_rgba(234,179,8,0.4)]" alt="Guarantee" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                     <span className="text-black font-black text-4xl">100%</span>
                     <span className="text-black font-black text-xs uppercase tracking-widest">Money Back</span>
                  </div>
               </div>
            </div>
            <div className="flex-1 space-y-8">
               <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">The Iron Lady <span className="text-iron-red">Guarantee</span></h2>
               <p className="opacity-70 text-lg leading-relaxed italic">"I stand by the transformative power of our Masterclass. Take the class, apply the principles, and if you're not satisfied, I'll personally ensure your investment is refunded."</p>
               <div className="pt-8">
                  <div className="flex items-center gap-6">
                     <div className="w-20 h-20 rounded-full border-2 border-iron-red overflow-hidden">
                        <img src="./services/rajesh-ceo.png" onError={handleImageError} className="w-full h-full object-cover" alt="Rajesh Bhat" />
                     </div>
                     <div>
                        <p className="text-2xl font-black uppercase tracking-tighter">Rajesh Bhat</p>
                        <p className="text-iron-red text-[10px] font-black uppercase tracking-widest">Founder, Iron Lady</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

const TimeBlock = ({ val, unit }: { val: number, unit: string }) => (
  <div className="text-center w-12">
    <div className="text-2xl font-black leading-none">{val.toString().padStart(2, '0')}</div>
    <div className="text-[7px] font-black opacity-40 mt-1 uppercase">{unit}</div>
  </div>
);

const StatItem = ({ val, label }: { val: string, label: string }) => (
  <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-center">
    <p className="text-2xl font-black text-white">{val}</p>
    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1 leading-none">{label}</p>
  </div>
);

export default MasterclassPage;
