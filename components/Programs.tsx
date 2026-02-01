
import React from 'react';

interface ProgramsProps {
  onNavigate: (section: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ onNavigate }) => {
  const offerings = [
    {
      id: "essentials",
      title: "Leadership Essentials Program",
      desc: "Are you often asked - 'Learn to BALANCE? Do you feel \"Guilty\" about being Ambitious? Learn the art of maximizing, shameless pitching and deal with office politics and biases. Be unapologetically ambitious."
    },
    {
      id: "board",
      title: "100 Board Members Program",
      desc: "Have you been feeling stuck at the same level in your career and no tactics are working? Enrol for 100 Board Member Program to learn innovative techniques to fasttrack your overdue growth."
    },
    {
      id: "warfare",
      title: "Master of Business Warfare",
      desc: "Are you committed to reach the C-suite, but don't know how? Is 1+ Crore Income your dream band? Join our Master of Business Warfare program to understand cutting-edge business warfare tactics for these breakthroughs in your career."
    }
  ];

  return (
    <section id="programs" className="py-24 bg-[#F2F0E4]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <h2 className="text-4xl font-black text-slate-900 mb-16 uppercase">What We <span className="text-iron-red">Offer</span></h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {offerings.map((p, idx) => (
            <div key={idx} className="space-y-6">
              <h3 className="text-3xl font-black text-iron-red leading-tight">{p.title}</h3>
              <p className="text-slate-600 font-medium leading-relaxed">
                {p.desc}
              </p>
              <button 
                onClick={() => onNavigate(p.id)}
                className="inline-flex items-center text-iron-red font-black text-sm uppercase tracking-widest group"
              >
                Know more 
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 17l9.2-9.2M17 17V7H7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
