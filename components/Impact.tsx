
import React, { useState, useMemo, useEffect } from 'react';

interface SuccessStory {
  id: string;
  name: string;
  role: string;
  program: string;
  industry: string;
  function: string;
  image: string;
}

const STORIES: SuccessStory[] = [
  {
    id: '1',
    name: 'Dr. Anita Roy',
    role: 'Medical Director',
    program: '100 Board Members',
    industry: 'Healthcare',
    function: 'Management',
    image: 'https://images.unsplash.com/photo-1596215143922-eedeaba0d91c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    name: 'Meera Sharma',
    role: 'VP Operations',
    program: 'Master of Business Warfare',
    industry: 'Automobile',
    function: 'Operations',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    name: 'Sarah Jenkins',
    role: 'Board Advisor',
    program: '100 Board Members',
    industry: 'Banking',
    function: 'Finance',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    name: 'Priyanka V.',
    role: 'Head of Marketing',
    program: 'Leadership Essentials Program',
    industry: 'IT',
    function: 'Marketing',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '5',
    name: 'Anjali Gupta',
    role: 'CEO & Founder',
    program: 'Master of Business Warfare',
    industry: 'Education',
    function: 'Management',
    image: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '6',
    name: 'Kavita Rao',
    role: 'Product Lead',
    program: 'Leadership Essentials Program',
    industry: 'Pharma',
    function: 'Product',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800'
  }
];

const INDUSTRIES = [
  "Accountant", "Accounting", "Ammunition Expert", "Architecture", "Army", 
  "Automation", "Automobile", "Banking", "Bio", "Business Coach", 
  "Digitalpreneur", "E-Commerce", "Education", "Entrepreneur", "Fitness", 
  "Healthcare", "IT", "Lawyer", "Pharma", "Product", "Psychologist", "Research"
];

const FUNCTIONS = [
  "Finance", "HR", "IT", "Management", "Marketing", "Operations", "Product", "QA", "Research"
];

const PROGRAMS = [
  "Leadership Essentials Program", "100 Board Members", "Master of Business Warfare"
];

const TITLES = ["COOs", "CFOs", "CTOs", "CHROs", "CEOs"];

const Impact: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<{program?: string, industry?: string, function?: string}>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const filteredStories = useMemo(() => {
    return STORIES.filter(s => {
      if (activeFilter.program && s.program !== activeFilter.program) return false;
      if (activeFilter.industry && s.industry !== activeFilter.industry) return false;
      if (activeFilter.function && s.function !== activeFilter.function) return false;
      return true;
    });
  }, [activeFilter]);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const selectOption = (type: 'program' | 'industry' | 'function', value: string) => {
    setActiveFilter(prev => ({ ...prev, [type]: value === 'All' ? undefined : value }));
    setOpenDropdown(null);
  };

  return (
    <div className="bg-[#F2F0E4] pb-24">
      {/* Hero Impact Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative group animate-in slide-in-from-left duration-1000">
          <div className="relative overflow-hidden rounded-[40px] shadow-3xl bg-black aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover opacity-80 transition-transform duration-[3000ms] group-hover:scale-110" 
              alt="Iron Lady Impact" 
            />
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 max-w-md">
                <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-tight">Elevating a Million <br/><span className="text-iron-red">Women to the Top!</span></h3>
              </div>
            </div>
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform text-iron-red">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <div className="absolute top-6 right-6 bg-white p-2.5 rounded shadow-lg flex flex-col items-center leading-none">
            <span className="text-[10px] font-black tracking-tighter text-black">IRON</span>
            <span className="text-[10px] font-black tracking-tighter text-black">LADY</span>
          </div>
        </div>

        <div className="space-y-10 animate-in slide-in-from-right duration-1000">
          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 leading-[1.05] tracking-tighter">
            78,000+ women have gone through Iron Lady Programs so far.
          </h1>
          <p className="text-3xl font-bold text-slate-800 leading-tight">
            Thousands have gone onto become top <span className="text-iron-red inline-block min-w-[140px] transition-all duration-500 transform">{TITLES[titleIndex]}</span> using Iron Lady Principles.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-10 relative z-40">
        <div className="flex flex-col lg:flex-row gap-8 bg-white p-8 rounded-[32px] shadow-sm border border-slate-50">
          <div className="flex-1 relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-black text-iron-red uppercase tracking-widest z-10">Programs</label>
            <button 
              onClick={() => toggleDropdown('program')}
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 flex items-center justify-between text-sm font-bold text-slate-700 hover:border-iron-red transition-all"
            >
              <span className="truncate">{activeFilter.program || 'Select Program'}</span>
              <svg className={`w-4 h-4 transition-transform ${openDropdown === 'program' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {openDropdown === 'program' && (
              <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-2xl py-3 z-[100] max-h-64 overflow-y-auto custom-scrollbar">
                <div onClick={() => selectOption('program', 'All')} className="px-6 py-3.5 hover:bg-slate-50 cursor-pointer text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">All Programs</div>
                {PROGRAMS.map(p => (
                  <div key={p} onClick={() => selectOption('program', p)} className="px-6 py-3.5 hover:bg-red-50 cursor-pointer text-xs font-bold text-slate-700">{p}</div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest z-10">Industry</label>
            <button 
              onClick={() => toggleDropdown('industry')}
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 flex items-center justify-between text-sm font-bold text-slate-700 hover:border-iron-red transition-all"
            >
              <span className="truncate">{activeFilter.industry || 'Select Industry'}</span>
              <svg className={`w-4 h-4 transition-transform ${openDropdown === 'industry' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {openDropdown === 'industry' && (
              <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-2xl py-3 z-[100] max-h-64 overflow-y-auto custom-scrollbar">
                <div onClick={() => selectOption('industry', 'All')} className="px-6 py-3.5 hover:bg-slate-50 cursor-pointer text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">All Industries</div>
                {INDUSTRIES.map(i => (
                  <div key={i} onClick={() => selectOption('industry', i)} className="px-6 py-3.5 hover:bg-red-50 cursor-pointer text-xs font-bold text-slate-700">{i}</div>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1 relative">
            <label className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-black text-slate-400 uppercase tracking-widest z-10">Functions</label>
            <button 
              onClick={() => toggleDropdown('function')}
              className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-6 flex items-center justify-between text-sm font-bold text-slate-700 hover:border-iron-red transition-all"
            >
              <span className="truncate">{activeFilter.function || 'Select Function'}</span>
              <svg className={`w-4 h-4 transition-transform ${openDropdown === 'function' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {openDropdown === 'function' && (
              <div className="absolute top-[110%] left-0 w-full bg-white border border-slate-100 shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-2xl py-3 z-[100] max-h-64 overflow-y-auto custom-scrollbar">
                <div onClick={() => selectOption('function', 'All')} className="px-6 py-3.5 hover:bg-slate-50 cursor-pointer text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">All Functions</div>
                {FUNCTIONS.map(f => (
                  <div key={f} onClick={() => selectOption('function', f)} className="px-6 py-3.5 hover:bg-red-50 cursor-pointer text-xs font-bold text-slate-700">{f}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <h2 className="text-5xl font-black text-slate-900 mb-16 uppercase tracking-tighter">All <span className="text-iron-red">Stories</span></h2>
        
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredStories.map(story => (
              <div key={story.id} className="group bg-white rounded-[48px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-3xl hover:-translate-y-3 transition-all duration-700 animate-in fade-in zoom-in-95">
                <div className="aspect-[4/5] overflow-hidden bg-slate-100 relative">
                  <img src={story.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" alt={story.name} />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-black/80 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest backdrop-blur-sm">Success Story</span>
                  </div>
                </div>
                <div className="p-10 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter leading-tight group-hover:text-iron-red transition-colors">{story.name}</h3>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-black text-iron-red uppercase tracking-widest">{story.role}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">{story.program}</span>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[10px] font-black bg-slate-50 text-slate-500 px-4 py-2 rounded-xl uppercase tracking-widest border border-slate-100">{story.industry}</span>
                    <button className="text-iron-red hover:underline text-[11px] font-black uppercase tracking-widest transition-all">Read Journey</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-white rounded-[60px] border border-dashed border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">No stories matched</h3>
            <p className="text-slate-500 text-sm font-medium mt-3 max-w-sm mx-auto">Try adjusting your filters to see more leadership breakthroughs from our incredible alumnae.</p>
            <button 
              onClick={() => setActiveFilter({})}
              className="mt-10 bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-iron-red transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Impact;
