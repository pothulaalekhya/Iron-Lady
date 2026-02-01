
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChoose from './components/WhyChoose';
import Programs from './components/Programs';
import WhoIsItFor from './components/WhoIsItFor';
import Testimonials from './components/Testimonials';
import Impact from './components/Impact';
import GoogleReviews from './components/GoogleReviews';
import CTASection from './components/CTASection';
import Latest from './components/Latest';
import AIAdvisor from './components/AIAdvisor';
import InternalPortal from './components/InternalPortal';
import PortalLogin, { UserRole } from './components/PortalLogin';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';

// Internal Page Components
import AboutPage from './pages/AboutPage';
import ResourcesPage from './pages/ResourcesPage';
import ProgramsPage from './pages/ProgramsPage';
import MasterclassPage from './pages/MasterclassPage';
import ContactPage from './pages/ContactPage';

type ViewState = 'home' | 'programs' | 'impact' | 'about' | 'resources' | 'latest' | 'masterclass' | 'portal' | 'contact';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('home');
  const [subSection, setSubSection] = useState<string | undefined>(undefined);
  const [showAiChat, setShowAiChat] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | undefined>(undefined);

  // --- Bot Trigger Positioning Logic ---
  const [position, setPosition] = useState({ 
    x: window.innerWidth - 100, 
    y: window.innerHeight - 120 
  });

  // Automatically adjust bot trigger position when view changes
  useEffect(() => {
    if (view === 'portal') {
      // Move to bottom-left for Internal Portal
      setPosition({ x: 30, y: window.innerHeight - 120 });
    } else {
      // Stay bottom-right for the main pages
      setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 120 });
    }
  }, [view]);

  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  // Ensure bot doesn't get stuck outside viewport on window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(prev.x, window.innerWidth - 80),
        y: Math.min(prev.y, window.innerHeight - 80)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    hasMoved.current = false;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - position.x, y: clientY - position.y };
  };

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const newX = clientX - dragStart.current.x;
    const newY = clientY - dragStart.current.y;

    if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
      hasMoved.current = true;
    }

    const boundedX = Math.min(Math.max(20, newX), window.innerWidth - 80);
    const boundedY = Math.min(Math.max(20, newY), window.innerHeight - 80);

    setPosition({ x: boundedX, y: boundedY });
  }, [isDragging, position]);

  const handleMouseUp = () => {
    if (!hasMoved.current && isDragging) {
      setShowAiChat(true);
    }
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove, { passive: false });
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const navigate = (v: ViewState, section?: string) => {
    setView(v);
    setSubSection(section);
    if (!section) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (view) {
      case 'programs': return <ProgramsPage targetSection={subSection} onNavigate={() => navigate('home')} />;
      case 'about': return <AboutPage targetSection={subSection} />;
      case 'resources': return <ResourcesPage targetSection={subSection} />;
      case 'masterclass': return <MasterclassPage targetSection={subSection} />;
      case 'contact': return <ContactPage targetSection={subSection} />;
      case 'impact': return <Impact />;
      case 'latest': return <Latest />;
      case 'portal': return isAuth ? <InternalPortal onLogout={() => { setIsAuth(false); setUserRole(undefined); }} userRole={userRole} /> : <PortalLogin onLogin={(role) => { setIsAuth(true); setUserRole(role); }} />;
      default: return (
        <>
          <Hero onLearnMore={() => setShowAiChat(true)} />
          <WhyChoose />
          <Programs onNavigate={(section) => navigate('programs', section)} />
          <WhoIsItFor />
          <Testimonials onNavigate={() => navigate('programs')} />
          <Impact />
          <GoogleReviews />
          <ContactSection />
          <CTASection onNavigate={(v, s) => navigate(v as ViewState, s)} />
          <Latest />
        </>
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F2F0E4] font-['Outfit'] selection:bg-slate-900 selection:text-white overflow-x-hidden">
      <Navbar currentView={view} onNavigate={(v, s) => navigate(v as ViewState, s)} />
      
      <main className={view !== 'home' ? 'pt-16' : ''}>{renderView()}</main>
      
      <Footer onNavigate={(v, s) => navigate(v as ViewState, s)} />

      {/* DRAGGABLE BOT TRIGGER - POSITION CONDITIONAL BASED ON VIEW */}
      <div 
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          position: 'fixed',
          cursor: isDragging ? 'grabbing' : 'grab',
          display: showAiChat ? 'none' : 'flex' 
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        className={`z-[70] select-none touch-none flex flex-col items-center gap-2 group/bot transition-all ${isDragging ? '' : 'duration-500'}`}
        title="Executive Advisor - Drag to move"
      >
        <div className={`w-16 h-16 rounded-[22px] shadow-[0_25px_50px_rgba(0,0,0,0.6)] flex items-center justify-center transition-all duration-300 border-2 border-white/20 overflow-hidden relative bg-black ring-2 ring-white/10 hover:scale-110 active:scale-95 animate-bot-pulse`}>
           <div className="relative">
              <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M12 4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4V4a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="8.5" cy="11.5" r="1.5" fill="white" className="animate-pulse" />
                <circle cx="15.5" cy="11.5" r="1.5" fill="white" className="animate-pulse" />
                <circle cx="9" cy="16.5" r="0.8" fill="white" className="dot-1" />
                <circle cx="12" cy="16.5" r="0.8" fill="white" className="dot-2" />
                <circle cx="15" cy="16.5" r="0.8" fill="white" className="dot-3" />
              </svg>
           </div>
           <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
        </div>
        
        {!isDragging && (
          <div className="bg-black px-3 py-1.5 rounded-full border border-white/10 shadow-xl opacity-0 group-hover/bot:opacity-100 transition-all scale-90 group-hover/bot:scale-100 whitespace-nowrap">
             <span className="text-[9px] font-black text-white uppercase tracking-widest">{view === 'portal' ? 'INTERNAL CO-PILOT' : 'OPEN ADVISOR'}</span>
          </div>
        )}
      </div>

      {showAiChat && <AIAdvisor onClose={() => setShowAiChat(false)} />}
    </div>
  );
};

export default App;
