
import React, { useEffect, useRef } from 'react';

const ProgramsPage: React.FC<{ onNavigate: () => void, targetSection?: string }> = ({ onNavigate, targetSection }) => {
  const essentialsRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const warfareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (targetSection) {
      const timer = setTimeout(() => {
        const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
          'essentials': essentialsRef,
          'board': boardRef,
          'warfare': warfareRef
        };
        const ref = refMap[targetSection];
        if (ref && ref.current) {
          ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300); // Small delay to ensure render
      return () => clearTimeout(timer);
    }
  }, [targetSection]);

  const fullPrograms = [
    {
      id: "essentials",
      ref: essentialsRef,
      title: "Leadership Essentials",
      target: "Ambitious Women & Students",
      features: ["Shameless Pitching", "Maximized Networking", "Office Politics 101", "Breaking Guilt Cycles"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "board",
      ref: boardRef,
      title: "100 Board Members",
      target: "Senior Executives",
      features: ["Board-level Strategy", "Independent Directorship", "Corporate Governance", "Elite Networking"],
      image: "https://images.unsplash.com/photo-1491336477066-31156b5e4f35?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "warfare",
      ref: warfareRef,
      title: "Master of Business Warfare",
      target: "C-Suite Aspiring Leaders",
      features: ["War Tactics for Business", "High-Stakes Influence", "Strategic Leverage", "1Cr+ Mindset"],
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 lg:px-12">
      <div className="mb-20 text-center lg:text-left">
        <h1 className="text-6xl font-black text-slate-900 uppercase tracking-tighter mb-4">Elite <span className="text-iron-red">Pathways</span></h1>
        <p className="text-xl text-slate-500 max-w-2xl font-medium">Curated curriculum designed by global CEOs to accelerate your transformation from professional to powerhouse.</p>
      </div>

      <div className="space-y-32">
        {fullPrograms.map((p, i) => (
          <div 
            key={p.id} 
            id={p.id} 
            ref={p.ref}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center scroll-mt-32`}
          >
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute -inset-4 bg-iron-red/10 rounded-[40px] scale-95 group-hover:scale-100 transition-transform"></div>
              <img src={p.image} className="relative z-10 w-full aspect-video object-cover rounded-[32px] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]" alt={p.title} />
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="space-y-2">
                <span className="text-iron-red font-black uppercase tracking-widest text-xs">{p.target}</span>
                <h2 className="text-4xl font-black text-slate-900 uppercase">{p.title}</h2>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {p.features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-slate-600 font-bold">
                    <div className="w-1.5 h-1.5 rounded-full bg-iron-red"></div>
                    {f}
                  </li>
                ))}
              </ul>
              <button onClick={onNavigate} className="bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-iron-red transition-all">
                Check Eligibility
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsPage;
