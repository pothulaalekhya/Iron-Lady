import React from 'react';

const Latest: React.FC = () => {
  return (
    <section className="py-20 bg-[#FDFCF0]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-10 text-center">
        <h2 className="text-5xl font-black mb-16 text-slate-900 uppercase tracking-tighter">Latest <span className="text-red-600">Happening</span></h2>
        
        <div className="max-w-xl mx-auto bg-white rounded-[40px] shadow-xl overflow-hidden border border-gray-100 group">
          <div className="relative h-[400px] bg-red-600 flex items-center justify-center p-10 overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-90"></div>
             {/* Replaced generic picsum with high-quality book/leadership relevant imagery */}
             <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600" className="relative z-10 w-[70%] h-auto shadow-2xl rounded-lg group-hover:scale-105 transition-transform" alt="The Shameless Lady Book" />
          </div>
          
          <div className="p-10 text-left space-y-4">
            <h3 className="text-3xl font-black text-red-600 leading-tight">Book: The Shameless Lady</h3>
            <div className="grid grid-cols-2 gap-4 text-sm font-bold text-slate-800">
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Start Date</p>
                <p>05 May 2025</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">End Date</p>
                <p>05 May 2026</p>
              </div>
              <div className="col-span-2">
                <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Venue</p>
                <p>Online</p>
              </div>
            </div>
            
            <div className="pt-6">
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-2xl uppercase tracking-widest text-sm shadow-xl shadow-red-900/20 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;
