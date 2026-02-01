
import React from 'react';

interface TestimonialsProps {
  onNavigate: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-[#F2F0E4]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black text-slate-900 mb-16 uppercase">What Our <span className="text-iron-red">Participants Say</span></h2>
        
        <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-64 h-64 lg:w-80 lg:h-80 flex-shrink-0 bg-gray-100 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-iron-red slanted-divider z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1590650153855-d9e808231d41?auto=format&fit=crop&q=80&w=600" 
              alt="Minal Bhagat" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 space-y-6">
            <h3 className="text-4xl font-black text-iron-red">Minal Bhagat</h3>
            <p className="text-xl text-slate-600 font-medium leading-relaxed italic">
              "I was surprised that even the online medium could be so effective and impactful. I am already being shameless and achieving many breakthroughs."
            </p>
            <div className="pt-4">
              <button 
                onClick={onNavigate}
                className="inline-flex items-center text-iron-red font-black text-sm uppercase tracking-widest group border-b-2 border-iron-red pb-1 transition-all hover:gap-2"
              >
                Explore Programs 
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
            
            <div className="flex gap-2 pt-8">
               <div className="w-2 h-2 rounded-full bg-slate-900"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300"></div>
               <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
