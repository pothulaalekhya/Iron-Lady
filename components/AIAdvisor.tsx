
import React, { useState, useRef, useEffect } from 'react';
import { getLeadershipAdvice, getWritingHelp } from '../services/gemini';

const STORAGE_KEY = 'ironlady_advisor_history';
const PROFILE_KEY = 'ironlady_user_profile';
const STATE_KEY = 'ironlady_chat_state';
const TICKETS_DB_KEY = 'il-db-tickets';

interface Choice { label: string; action: string; value?: string; }
interface Message { 
  role: 'user' | 'model' | 'agent'; 
  text: string; 
  choices?: Choice[]; 
  timestamp: number; 
}

const AIAdvisor: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [chatState, setChatState] = useState<string>('welcome');
  const [userProfile, setUserProfile] = useState<string | undefined>();
  const [lead, setLead] = useState({ name: '', email: '', phone: '', code: '+91' });
  const [activeTicketId, setActiveTicketId] = useState<string | null>(localStorage.getItem('il-active-ticket-id'));
  const [isResolved, setIsResolved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const state = localStorage.getItem(STATE_KEY);
    if (saved && state !== 'welcome') {
      setMessages(JSON.parse(saved));
      setChatState(state || 'welcome');
      setUserProfile(localStorage.getItem(PROFILE_KEY) || undefined);
    } else {
      startFresh();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    localStorage.setItem(STATE_KEY, chatState);
    if (userProfile) localStorage.setItem(PROFILE_KEY, userProfile);
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, chatState]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!activeTicketId) return;
      const tickets = JSON.parse(localStorage.getItem(TICKETS_DB_KEY) || '[]');
      const ticket = tickets.find((t: any) => t.id === activeTicketId);
      if (ticket) {
        if (ticket.status === 'Resolved' && !isResolved) {
          setIsResolved(true);
          addModelMessage("Thank you for choosing Iron Lady. Your query has been completed. We look forward to seeing you at the top!");
        }
        
        const agentMsgs = ticket.messages.filter((m: any) => m.sender === 'agent');
        setMessages(prev => {
          const existingTexts = prev.filter(m => m.role === 'agent').map(m => m.text);
          const newOnes = agentMsgs.filter((m: any) => !existingTexts.includes(m.text));
          if (newOnes.length > 0) {
            return [...prev, ...newOnes.map((m: any) => ({ role: 'agent', text: m.text, timestamp: m.timestamp }))];
          }
          return prev;
        });
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeTicketId, isResolved]);

  const startFresh = () => {
    const welcome: Message = {
      role: 'model',
      text: "Welcome to Iron Lady. We are here to help you reach the top. \n\nPlease tell us about yourself:",
      choices: [
        { label: "Working Professional", action: "SELECT_PROFILE", value: "Working Professional" },
        { label: "Entrepreneur", action: "SELECT_PROFILE", value: "Entrepreneur" },
        { label: "Student / Returning", action: "SELECT_PROFILE", value: "Student / Returning" }
      ],
      timestamp: Date.now()
    };
    setMessages([welcome]);
    setChatState('welcome');
    setUserProfile(undefined);
    setIsResolved(false);
    setActiveTicketId(null);
    setError(null);
    localStorage.removeItem('il-active-ticket-id');
  };

  const addModelMessage = (text: string, choices?: Choice[]) => {
    setMessages(prev => [...prev, { role: 'model', text, choices, timestamp: Date.now() }]);
  };

  const syncToPortal = (text: string, sender: 'user' | 'agent') => {
    const tickets = JSON.parse(localStorage.getItem(TICKETS_DB_KEY) || '[]');
    let tid = activeTicketId;
    if (!tid) {
      tid = `T-${Date.now()}`;
      setActiveTicketId(tid);
      localStorage.setItem('il-active-ticket-id', tid);
      const newTicket = {
        id: tid,
        learnerName: lead.name || "New Customer",
        phone: lead.phone ? `${lead.code} ${lead.phone}` : "Not provided",
        messages: [{ sender, text, timestamp: Date.now() }],
        status: 'Open',
        priority: 'Medium',
        createdAt: Date.now()
      };
      localStorage.setItem(TICKETS_DB_KEY, JSON.stringify([newTicket, ...tickets]));
    } else {
      const updated = tickets.map((t: any) => t.id === tid ? {
        ...t,
        messages: [...t.messages, { sender, text, timestamp: Date.now() }],
        learnerName: lead.name || t.learnerName,
        phone: lead.phone ? `${lead.code} ${lead.phone}` : t.phone
      } : t);
      localStorage.setItem(TICKETS_DB_KEY, JSON.stringify(updated));
    }
  };

  const handlePolishInput = async () => {
    if (!input.trim() || input.length < 5) return;
    setIsPolishing(true);
    const corrected = await getWritingHelp(input);
    setInput(corrected);
    setIsPolishing(false);
  };

  const handleFreeTextInput = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: Date.now() }]);
    
    if (activeTicketId || chatState === 'handover') {
      syncToPortal(userMsg, 'user');
    }

    setIsTyping(true);
    const history = messages
      .filter(m => m.role !== 'agent')
      .map(m => ({
        role: (m.role === 'model' ? 'model' : 'user') as 'user' | 'model',
        parts: [{ text: m.text }]
      }));

    try {
      const response = await getLeadershipAdvice(userMsg, history);
      addModelMessage(response.text);
    } catch (err) {
      addModelMessage("I'm having a technical glitch. Could you rephrase that?");
    } finally {
      setIsTyping(false);
    }
  };

  const handleChoice = (choice: Choice) => {
    setMessages(prev => [...prev, { role: 'user', text: choice.label, timestamp: Date.now() }]);
    if (activeTicketId) syncToPortal(choice.label, 'user');

    switch (choice.action) {
      case 'SELECT_PROFILE':
        setUserProfile(choice.value);
        setChatState('menu');
        addModelMessage("Great! How can we help you reach the top today?", [
          { label: "Explore Programs", action: "EXPLORE" },
          { label: "Talk to a Mentor", action: "TALK_MENTOR" }
        ]);
        break;
      
      case 'EXPLORE':
        setChatState('explore');
        addModelMessage("Here are our elite pathways:", [
          { label: "Leadership Essentials Program", action: "PROGRAM_INFO", value: "Essentials" },
          { label: "100 Board Members Program", action: "PROGRAM_INFO", value: "Board" },
          { label: "C-Suite League - Master of Business Warfare", action: "PROGRAM_INFO", value: "Warfare" },
          { label: "Back", action: "GO_WELCOME" }
        ]);
        break;

      case 'PROGRAM_INFO': handleProgramInfo(choice.value!); break;
      case 'TALK_MENTOR': setChatState('form'); break;
      case 'GO_MENU':
        setChatState('menu');
        addModelMessage("What would you like to explore?", [
          { label: "Explore Programs", action: "EXPLORE" },
          { label: "Talk to a Mentor", action: "TALK_MENTOR" }
        ]);
        break;
      case 'GO_WELCOME':
        setChatState('welcome');
        addModelMessage("Please tell us about yourself:", [
          { label: "Working Professional", action: "SELECT_PROFILE", value: "Working Professional" },
          { label: "Entrepreneur", action: "SELECT_PROFILE", value: "Entrepreneur" },
          { label: "Student / Returning", action: "SELECT_PROFILE", value: "Student / Returning" }
        ]);
        break;
      case 'REQUEST_TYPE':
        setChatState('handover');
        syncToPortal(`Customer requested a ${choice.label}`, 'user');
        addModelMessage(`A mentor has been notified. They will join this chat shortly. Feel free to ask me anything in the meantime!`);
        break;
    }
  };

  const handleProgramInfo = async (prog: string) => {
    setIsTyping(true);
    await new Promise(r => setTimeout(r, 600));
    const msg = prog === 'Essentials' ? "Leadership Essentials is a 4-week program for women to master office politics and eliminate career blocks." :
                prog === 'Board' ? "The 100 Board Members program is a 6-month journey to master boardroom strategy and governance." :
                "Business Warfare is our elite 1-year program for C-Suite aspiring leaders aiming for 1Cr+ salary breakthroughs.";
    
    addModelMessage(msg, [
      { label: "Talk to a Mentor", action: "TALK_MENTOR" },
      { label: "Back", action: "EXPLORE" }
    ]);
    setIsTyping(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const emailLower = lead.email.toLowerCase().trim();
    if (!emailLower.endsWith('.com')) {
      setError("Please use a .com email domain (e.g., name@company.com).");
      return;
    }
    const phoneDigits = lead.phone.replace(/\D/g, '');
    if (lead.code === '+91' && phoneDigits.length !== 10) {
      setError("Indian mobile numbers must be exactly 10 digits.");
      return;
    }
    setChatState('request_choice');
    addModelMessage("How would you like our mentor to connect with you?", [
      { label: "Call Request", action: "REQUEST_TYPE" },
      { label: "Message / Chat Request", action: "REQUEST_TYPE" },
      { label: "Back", action: "GO_MENU" }
    ]);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-white shadow-2xl z-[100] flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-500 font-['Outfit']">
      <div className="p-5 bg-slate-900 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-iron-red text-white w-9 h-9 rounded-lg flex flex-col items-center justify-center font-black text-[7px]">IRON<br/>LADY</div>
          <h2 className="text-white text-[11px] font-black uppercase tracking-widest">Leadership Advisor</h2>
        </div>
        <div className="flex gap-1">
          <button onClick={startFresh} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="2.5"/></svg></button>
          <button onClick={onClose} className="p-2 hover:bg-red-500 rounded-lg text-white/50 hover:text-white transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2.5"/></svg></button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F9FAFB] custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'} animate-pop`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
              m.role === 'user' ? 'bg-iron-red text-white rounded-tr-none shadow-md' : 
              m.role === 'agent' ? 'bg-slate-800 text-white rounded-tl-none border-l-4 border-iron-red shadow-lg' :
              'bg-white text-slate-800 border border-slate-100 rounded-tl-none shadow-sm'
            }`}>{m.text}</div>
            {m.choices && i === messages.length - 1 && !isResolved && chatState !== 'form' && (
              <div className="mt-4 flex flex-col gap-2 w-full max-w-[80%]">
                {m.choices.map((c, idx) => (
                  <button key={idx} onClick={() => handleChoice(c)} className="w-full text-left p-3.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:border-iron-red hover:text-iron-red hover:bg-red-50/30 transition-all shadow-sm">{c.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isTyping && <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest animate-pulse ml-2">Thinking...</div>}
      </div>

      {chatState === 'form' && (
        <div className="p-8 bg-white border-t border-slate-100 animate-in slide-in-from-bottom duration-300">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
              <input required placeholder="Full Name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-iron-red transition-all" value={lead.name} onChange={e => setLead({...lead, name: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Email (.com only)</label>
              <input required type="email" placeholder="name@company.com" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-iron-red transition-all" value={lead.email} onChange={e => setLead({...lead, email: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone (10 digits for India)</label>
              <div className="flex gap-2">
                <select className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs font-bold w-24 outline-none focus:border-iron-red appearance-none text-center" value={lead.code} onChange={e => setLead({...lead, code: e.target.value})}>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                </select>
                <input required type="tel" placeholder="Mobile" className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-iron-red transition-all" value={lead.phone} onChange={e => setLead({...lead, phone: e.target.value})} />
              </div>
            </div>
            {error && <p className="text-[10px] text-red-600 font-bold uppercase tracking-tight p-3 bg-red-50 rounded-lg">{error}</p>}
            <button type="submit" className="w-full bg-iron-red text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-slate-900 transition-all active:scale-95">Submit</button>
            <button type="button" onClick={() => setChatState('menu')} className="w-full py-2 text-[9px] font-black text-slate-300 uppercase tracking-widest hover:text-slate-500 transition-colors">Back to Menu</button>
          </form>
        </div>
      )}

      {(chatState === 'handover' || chatState === 'explore' || chatState === 'menu') && !isResolved && (
        <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-2">
          {input.length >= 5 && (
            <button onClick={handlePolishInput} disabled={isPolishing} className="self-end text-[8px] font-black uppercase text-emerald-500 hover:text-emerald-600 tracking-widest flex items-center gap-1.5 transition-all mb-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              {isPolishing ? <span className="animate-spin text-[10px]">✨</span> : <span>✨</span>}
              {isPolishing ? 'Polishing...' : 'Suggest Improvement'}
            </button>
          )}
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleFreeTextInput()} placeholder="Ask me a question..." className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:border-iron-red transition-all" />
            <button onClick={handleFreeTextInput} disabled={!input.trim()} className="w-12 h-12 bg-iron-red text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAdvisor;
