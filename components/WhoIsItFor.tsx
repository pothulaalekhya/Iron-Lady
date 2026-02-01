
import React from 'react';

const WhoIsItFor: React.FC = () => {
  const categories = [
    {
      title: "Professionals aspiring for growth",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Entrepreneurs / Business Women / self-employed",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 3h3v3M15 8h3v3M11 13h3v3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      title: "Women seeking Career Change / restart",
      icon: (
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-[#F2F0E4]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black text-slate-900 mb-16 uppercase">Who is it <span className="text-iron-red">for?</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex flex-col space-y-8 group">
              <div className="w-20 h-20 text-slate-300 group-hover:text-iron-red transition-all duration-500 transform group-hover:-translate-y-2">
                {cat.icon}
              </div>
              <h3 className="text-3xl font-black text-iron-red leading-tight max-w-[250px] group-hover:scale-105 transition-transform origin-left">
                {cat.title}
              </h3>
              <div className="w-12 h-1.5 bg-iron-red/10 group-hover:w-24 group-hover:bg-iron-red transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoIsItFor;
