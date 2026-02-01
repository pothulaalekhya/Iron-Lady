
import React, { useState } from 'react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, subSection?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleContactClick = () => {
    onNavigate('contact');
  };

  const NavItem = ({ label, view, hasDropdown = false, onClick }: { label: string; view: string; hasDropdown?: boolean; onClick?: () => void }) => (
    <div 
      onMouseEnter={() => hasDropdown && setActiveDropdown(view)}
      onMouseLeave={() => setActiveDropdown(null)}
      onClick={() => {
        if (onClick) {
          onClick();
        } else if (!hasDropdown) {
          onNavigate(view);
        }
      }}
      className="relative h-full flex items-center"
    >
      <div className={`flex items-center gap-1 cursor-pointer transition-all py-2 px-1 ${currentView === view ? 'text-iron-red font-extrabold underline decoration-2 underline-offset-8' : 'hover:text-iron-red text-slate-800 font-semibold'}`}>
        <span className="text-[13px] tracking-tight">{label}</span>
        {hasDropdown && (
          <svg className={`w-3 h-3 transition-transform ${activeDropdown === view ? 'rotate-180 text-iron-red' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Programs Dropdown */}
      {view === 'programs' && activeDropdown === 'programs' && (
        <div className="absolute top-[85%] left-0 w-[340px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] rounded-2xl p-4 border border-slate-100 flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200 z-[100]">
          <DropdownCard icon="user" title="Leadership Essentials Program" desc="Lead fearlessly and break limits in 4 weeks" onClick={(e) => { e.stopPropagation(); onNavigate('programs', 'essentials'); setActiveDropdown(null); }} isRedTheme />
          <DropdownCard icon="users" title="100 Board Members Program" desc="Master politics, lead boldly in 6 months" onClick={(e) => { e.stopPropagation(); onNavigate('programs', 'board'); setActiveDropdown(null); }} isRedTheme />
          <DropdownCard icon="vip" title="C-Suite League – Master of Business Warfare" desc="Explore this program in detail." onClick={(e) => { e.stopPropagation(); onNavigate('programs', 'warfare'); setActiveDropdown(null); }} isRedTheme />
        </div>
      )}

      {/* Resources Dropdown */}
      {view === 'resources' && activeDropdown === 'resources' && (
        <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[620px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-2xl p-6 border border-slate-100 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200 z-[100]">
          <DropdownCard icon="blogs" title="Blogs" desc="Everything that you need to fast-track" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'blogs'); setActiveDropdown(null); }} />
          <DropdownCard icon="events" title="Events" desc="Workshops for women leaders" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'events'); setActiveDropdown(null); }} />
          <DropdownCard icon="videos" title="Video Resources" desc="Leadership strategies videos" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'videos'); setActiveDropdown(null); }} />
          <DropdownCard icon="case" title="Case Study" desc="Real Life & Leadership success stories" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'case'); setActiveDropdown(null); }} />
          <DropdownCard icon="news" title="Newsletter" desc="Iron Lady Speaks monthly updates" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'newsletter'); setActiveDropdown(null); }} />
          <DropdownCard icon="faq" title="FAQ" desc="We have your questions answered" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'faq'); setActiveDropdown(null); }} />
          <DropdownCard icon="publication" title="Publication" desc="Discover stories, insights, and monthly highlights" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'publication'); setActiveDropdown(null); }} />
          <DropdownCard icon="book" title="Book-The Shameless Lady" desc="Get your book copy today" onClick={(e) => { e.stopPropagation(); onNavigate('resources', 'book'); setActiveDropdown(null); }} />
        </div>
      )}

      {/* Contact Dropdown */}
      {view === 'contact' && activeDropdown === 'contact' && (
        <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[620px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-2xl p-6 border border-slate-100 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200 z-[100]">
          <DropdownCard icon="help" title="Contact Us" desc="Have questions? We're here to help." onClick={(e) => { e.stopPropagation(); onNavigate('contact', 'help'); setActiveDropdown(null); }} />
          <DropdownCard icon="partnership" title="Partnership" desc="Explore partnership opportunities with us." onClick={(e) => { e.stopPropagation(); onNavigate('contact', 'partnership'); setActiveDropdown(null); }} />
          <DropdownCard icon="scholarship" title="Scholarship" desc="Learn how our scholarships can support you." onClick={(e) => { e.stopPropagation(); onNavigate('contact', 'scholarship'); setActiveDropdown(null); }} />
          <DropdownCard icon="referral" title="Referral Program" desc="Refer friends and earn exciting rewards." onClick={(e) => { e.stopPropagation(); onNavigate('contact', 'referral'); setActiveDropdown(null); }} />
          <DropdownCard icon="corporate" title="Corporate Program" desc="Transform your workplace with our expert programs." onClick={(e) => { e.stopPropagation(); onNavigate('contact', 'corporate'); setActiveDropdown(null); }} />
          <DropdownCard icon="careers" title="Careers" desc="Explore career opportunities with us." onClick={(e) => { e.stopPropagation(); onNavigate('contact', 'careers'); setActiveDropdown(null); }} />
        </div>
      )}

      {/* About Us Dropdown */}
      {view === 'about' && activeDropdown === 'about' && (
        <div className="absolute top-[85%] left-1/2 -translate-x-1/2 w-[580px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-2xl p-6 border border-slate-100 grid grid-cols-2 gap-4 animate-in fade-in zoom-in-95 duration-200 z-[100]">
          <DropdownCard icon="about" title="About Us" desc="Discover how we're empowering women to lead." onClick={(e) => { e.stopPropagation(); onNavigate('about'); setActiveDropdown(null); }} />
          <DropdownCard icon="rajesh" title="Rajesh Bhat" desc="Get inspired by the visionary behind Iron Lady." onClick={(e) => { e.stopPropagation(); onNavigate('about', 'rajesh'); setActiveDropdown(null); }} />
          <DropdownCard icon="vision" title="Purpose and Vision" desc="Reaching a million women to the top." onClick={(e) => { e.stopPropagation(); onNavigate('about', 'vision'); setActiveDropdown(null); }} />
          <DropdownCard icon="founders" title="Founders" desc="Meet the visionaries behind Iron Lady." onClick={(e) => { e.stopPropagation(); onNavigate('about', 'founders'); setActiveDropdown(null); }} />
        </div>
      )}

      {/* Masterclass Dropdown */}
      {view === 'masterclass' && activeDropdown === 'masterclass' && (
        <div className="absolute top-[85%] right-0 w-[380px] bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-2xl p-6 border border-slate-100 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 z-[100]">
          <DropdownCard icon="winner" title="2 Day Leadership Masterclass" desc="Lead confidently with impact" onClick={(e) => { e.stopPropagation(); onNavigate('masterclass', '2day'); setActiveDropdown(null); }} />
          <DropdownCard icon="vision" title="Fast track to 100 Board Members" desc="Your path to boardroom success" onClick={(e) => { e.stopPropagation(); onNavigate('masterclass', 'boardtrack'); setActiveDropdown(null); }} />
        </div>
      )}
    </div>
  );

  const DropdownCard = ({ icon, title, desc, onClick, isRedTheme }: { icon: string; title: string; desc: string; onClick: (e: React.MouseEvent) => void, isRedTheme?: boolean }) => {
    const iconPath = {
      blogs: <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
      events: <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      videos: <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
      case: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
      news: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      faq: <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      publication: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
      book: <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
      help: <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      partnership: <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
      scholarship: <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />,
      corporate: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
      referral: <path d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />,
      winner: <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
      careers: <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
      user: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      users: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
      vip: <path d="M9 12l2 2 4-4M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5M5 19v-2" strokeWidth="2" />,
      about: <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
      rajesh: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      vision: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
      founders: <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    };

    return (
      <div onClick={onClick} className={`flex gap-4 p-4 rounded-xl border ${isRedTheme ? 'border-red-500 bg-[#FDFCF0]' : 'border-slate-100 bg-white'} hover:bg-iron-red/5 hover:border-iron-red transition-all cursor-pointer group`}>
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-slate-100 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
          <svg className="w-5 h-5 text-iron-red" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            {iconPath[icon as keyof typeof iconPath]}
          </svg>
        </div>
        <div>
          <h4 className="text-[11px] font-black uppercase text-slate-900 leading-tight group-hover:text-iron-red">{title}</h4>
          <p className="text-[9px] text-slate-400 font-bold mt-1 leading-snug">{desc}</p>
        </div>
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F2F0E4]/95 backdrop-blur-md border-b border-gray-200 shadow-sm h-16">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex justify-between items-center">
        <div className="flex items-center space-x-7 h-full">
          <NavItem label="Home" view="home" />
          <NavItem label="Programs" view="programs" hasDropdown />
          <NavItem label="Impact" view="impact" />
          <NavItem label="About Us" view="about" hasDropdown />
          <NavItem label="Resources" view="resources" hasDropdown />
          <NavItem label="Contact Us" view="contact" hasDropdown onClick={handleContactClick} />
          <NavItem label="Latest" view="latest" />
          <NavItem label="MasterClass" view="masterclass" hasDropdown />
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('portal')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl text-slate-500 hover:text-iron-red transition-colors group"
          >
            <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Team Access</span>
          </button>
          
          <a href="tel:+91-6360823123" className="flex items-center bg-white border border-gray-100 rounded-xl pl-1 pr-4 py-1.5 shadow-sm hover:shadow-md transition-all active:scale-95 group">
            <div className="bg-[#FF4D4D] text-white p-2 rounded-lg mr-3 group-hover:rotate-12 transition-transform">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
            </div>
            <span className="text-[#FF4D4D] text-sm font-black">+91 - 6360823123</span>
          </a>
          <div className="bg-black text-white w-14 h-14 flex flex-col items-center justify-center leading-[0.7] rounded-sm select-none cursor-pointer" onClick={() => onNavigate('home')}>
            <span className="text-[12px] font-black">IRON</span>
            <span className="text-[12px] font-black">LADY</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
