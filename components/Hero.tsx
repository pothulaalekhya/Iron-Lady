
import React, { useState, useEffect, useCallback, useRef } from 'react';

interface HeroProps {
  onLearnMore: () => void;
}

const SLIDES = [
  {
    id: 'masterclass',
    type: 'comparison',
    title: "2- Days Leadership Masterclass",
    bgColor: "bg-[#5B21B6]",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200",
    subtext: "Break the society's STEREOTYPES. Rewrite Your Story—Start Today."
  },
  {
    id: '1cr-club',
    type: 'achievement',
    title: "We Made It!",
    subtitle: "Celebrating 100+ Members Achieving 1 CR+ Yearly Income",
    desc: "We're on a Mission to Reach 1000+",
    bgColor: "bg-[#065F46]",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200",
    tag: "1CR+ CLUB"
  },
  {
    id: 'mission',
    type: 'mission',
    title: "ELEVATING A MILLION WOMEN TO THE TOP",
    desc: "Iron Lady is the leading leadership platform enabling women to fast-track their career growth and reach the top using Business War Tactics!",
    bgColor: "bg-[#B91C1C]",
    image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'board-members',
    type: 'board',
    title: "100 Board Members Program!",
    bgColor: "bg-[#4C1D95]",
    image: "./services/rajesh-ceo.png",
    founderName: "RAJESH BHAT",
    founderTitle: "Founder and CEO (Iron Lady)"
  }
];

const Hero: React.FC<HeroProps> = ({ onLearnMore }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    setProgress(0);
    
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / 70);
      });
    }, 100);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [startTimer, currentSlide]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    startTimer();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    startTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    startTimer();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.warn("Hero image fail. Switching to fallback.");
    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800";
  };

  const titleClass = "text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.95] drop-shadow-2xl";

  return (
    <section className="relative h-[750px] lg:h-[850px] overflow-hidden bg-black group/hero">
      
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-white/20 active:scale-90"
        aria-label="Previous Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-white/20 active:scale-90"
        aria-label="Next Slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <div className="absolute top-0 left-0 right-0 z-50 h-1 bg-white/10">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/40 backdrop-blur-2xl border-t border-white/5 py-6">
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-24 px-12">
              <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.6em]">Alumnae Leading At:</span>
              <MarqueeBrand name="GOOGLE" />
              <MarqueeBrand name="AMAZON" />
              <MarqueeBrand name="BOSCH" />
              <MarqueeBrand name="INFOSYS" />
              <MarqueeBrand name="MICROSOFT" />
              <MarqueeBrand name="RELIANCE" />
              <MarqueeBrand name="ACCENTURE" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full h-full">
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
              idx === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
            } ${slide.bgColor} flex items-center overflow-hidden`}
          >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12 w-full h-full flex flex-col lg:flex-row items-center justify-between pt-32 pb-24 relative z-10">
              
              <div className="w-full lg:w-7/12 text-white space-y-10">
                
                {slide.type === 'comparison' && (
                  <div className="space-y-10 animate-in slide-in-from-left duration-700">
                    <h1 className={`${titleClass} italic`}>{slide.title}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/20 backdrop-blur-xl p-8 rounded-[48px] border border-white/10 space-y-6">
                        <div className="bg-white/10 inline-block px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Before</div>
                        <ul className="space-y-4">
                          <ComparisonPoint icon="cross" text="Overworked & Exhausted" />
                          <ComparisonPoint icon="cross" text="Grossly Underpaid" />
                          <ComparisonPoint icon="cross" text="Under Confident" />
                        </ul>
                      </div>
                      <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-[48px] border-2 border-white/20 space-y-6 shadow-3xl">
                        <div className="bg-white text-purple-900 inline-block px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">After</div>
                        <ul className="space-y-4">
                          <ComparisonPoint icon="check" text="Recognized Leader" />
                          <ComparisonPoint icon="check" text="Earning Your Worth" />
                          <ComparisonPoint icon="check" text="Unstoppable Confidence" />
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-8">
                      <p className="text-lg font-bold tracking-tight opacity-90 leading-relaxed italic border-l-4 border-white/30 pl-8">{slide.subtext}</p>
                      <button onClick={onLearnMore} className="bg-white text-purple-900 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-all shadow-2xl">
                        Apply for Masterclass
                      </button>
                    </div>
                  </div>
                )}

                {slide.type === 'achievement' && (
                  <div className="space-y-12 animate-in slide-in-from-left duration-700">
                    <div className="relative inline-block">
                       <h1 className={titleClass}>{slide.title}</h1>
                       <div className="absolute -top-4 -right-12 bg-black text-white px-5 py-2 rounded-xl font-black text-[10px] tracking-widest border border-white/10 shadow-2xl">1CR+ CLUB</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-3xl p-10 rounded-[64px] border border-white/20 max-w-2xl">
                       <h3 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-tight">
                         Celebrating <span className="text-emerald-400">100+ Members</span> Achieving 1 CR+ Yearly Income
                       </h3>
                       <p className="text-2xl font-bold mt-6 opacity-80 leading-relaxed italic">{slide.desc}</p>
                    </div>
                    <button onClick={onLearnMore} className="bg-white text-emerald-900 px-20 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:scale-105 transition-all">
                      BE THE NEXT ONE
                    </button>
                  </div>
                )}

                {slide.type === 'mission' && (
                  <div className="space-y-12 animate-in slide-in-from-left duration-700">
                    <h1 className={`${titleClass} text-balance`}>{slide.title}</h1>
                    <div className="max-w-2xl border-l-8 border-white pl-10 py-6">
                      <p className="text-2xl lg:text-3xl font-bold leading-snug italic opacity-90">{slide.desc}</p>
                    </div>
                    <button onClick={onLearnMore} className="bg-black text-white px-16 py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all shadow-2xl border border-white/10">
                      JOIN THE MISSION
                    </button>
                  </div>
                )}

                {slide.type === 'board' && (
                  <div className="space-y-12 animate-in slide-in-from-left duration-700">
                    <div className="space-y-10">
                       <h1 className={`${titleClass} max-w-4xl`}>
                         Fast-track Your Journey with Our <span className="bg-white text-purple-900 px-8 py-2 rounded-2xl inline-block mt-2 shadow-2xl">100 Board Members Program!</span>
                       </h1>
                       <p className="text-xl font-bold text-white/80 max-w-2xl leading-relaxed italic border-l-4 border-white/20 pl-8">
                         Master boardroom dynamics and strategic influence to claim your seat at the top.
                       </p>
                    </div>

                    <button onClick={onLearnMore} className="bg-white text-purple-900 px-16 py-6 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl hover:bg-iron-red hover:text-white transition-all">
                      LEARN MORE
                    </button>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-5/12 flex justify-center relative mt-12 lg:mt-0">
                <div className="relative group">
                  <div className={`relative aspect-square w-[340px] lg:w-[500px] overflow-hidden ${slide.type === 'board' ? 'rounded-[80px]' : 'rounded-full'} border-[12px] border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-float transition-all duration-1000`}>
                    <img 
                      src={slide.image} 
                      onError={handleImageError}
                      className={`w-full h-full object-cover transition-transform duration-1000 ${idx === currentSlide ? 'scale-100' : 'scale-110'}`} 
                      alt="Iron Lady" 
                    />
                    
                    {slide.type === 'board' && (
                       <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-2xl p-10 border-t border-white/10">
                          <p className="text-3xl font-black text-white uppercase tracking-tighter leading-none mb-2">{slide.founderName}</p>
                          <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">{slide.founderTitle}</p>
                       </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-6 z-40">
        {SLIDES.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => goToSlide(idx)}
            className={`group relative py-4 transition-all duration-700 flex items-center`}
          >
             <span className={`h-2 rounded-full transition-all duration-700 ${idx === currentSlide ? 'w-24 bg-white' : 'w-4 bg-white/30 group-hover:bg-white/50'}`} />
             {idx === currentSlide && (
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap animate-in fade-in slide-in-from-bottom-1">
                 0{idx + 1}
               </span>
             )}
          </button>
        ))}
      </div>
    </section>
  );
};

const MarqueeBrand = ({ name }: { name: string }) => (
  <span className="text-white/40 font-black text-lg tracking-[0.4em] hover:text-white transition-colors cursor-default">{name}</span>
);

const ComparisonPoint = ({ icon, text }: { icon: 'check' | 'cross'; text: string }) => (
  <li className="flex items-center gap-4">
    <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${icon === 'check' ? 'bg-emerald-500' : 'bg-red-500'}`}>
      {icon === 'check' ? (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      ) : (
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
    </div>
    <span className="text-[14px] font-black uppercase tracking-tight text-white/90">{text}</span>
  </li>
);

export default Hero;
