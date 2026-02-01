
import React from 'react';

interface CTASectionProps {
  onNavigate: (view: string, section?: string) => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-[#F2F0E4]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="bg-black slanted-divider py-16 px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-10">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight uppercase">
              Not sure which <br />
              <span className="text-iron-red">program to choose?</span>
            </h2>
          </div>
          <div>
            <button 
              onClick={() => onNavigate('contact', 'help')}
              className="bg-iron-red text-white px-10 py-5 rounded-md font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all"
            >
              Speak to our Counsellor
            </button>
          </div>
        </div>

        <div className="mt-24 text-center space-y-8">
           <h3 className="text-3xl lg:text-5xl font-black text-slate-900 uppercase tracking-tighter">
             Let's onboard you on the Fastrack Growth journey with Iron Lady
           </h3>
           <button 
             onClick={() => onNavigate('programs')}
             className="bg-black text-white px-12 py-5 rounded-md font-black uppercase tracking-widest text-sm hover:bg-iron-red transition-all shadow-xl"
           >
             Get Started
           </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
