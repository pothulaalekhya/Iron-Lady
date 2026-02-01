
import React, { useState, useEffect, useRef } from 'react';
import { UserRole } from './PortalLogin';
import InternalWorkflowAssistant from './InternalWorkflowAssistant';
import { getWritingHelp } from '../services/gemini';

// --- Interfaces ---
interface Message { sender: 'user' | 'agent'; text: string; timestamp: number; }

interface Ticket { 
  id: string; learnerName: string; phone?: string; messages: Message[]; 
  status: 'Open' | 'Assigned' | 'Resolved' | 'Escalated'; priority: 'Low' | 'Medium' | 'High';
  assignedTo?: string; summary?: string; createdAt: number; 
}

interface Program { 
  id: string; name: string; duration: string; fees: string; 
  capacity: number; enrolledCount: number; active: boolean; 
}

interface Mentor { 
  id: string; name: string; specialization: string; exp: number; 
  rating: number; activeLearners: number; available: boolean; 
}

interface StaffUser {
  id: string; name: string; email: string; role: UserRole; status: 'Active' | 'Inactive';
}

interface Customer {
  id: string; name: string; email: string; program: string; joinDate: string; status: 'Active' | 'Completed' | 'On-Hold';
}

const TICKETS_DB_KEY = 'il-db-tickets';
const PROGRAMS_DB_KEY = 'il-db-programs';
const MENTORS_DB_KEY = 'il-db-mentors';
const CUSTOMERS_DB_KEY = 'il-db-participants';
const STAFF_DB_KEY = 'il-db-staff';

const SidebarBtn = ({ active, onClick, label, icon, badge }: { active: boolean, onClick: () => void, label: string, icon: string, badge?: number }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all relative group ${active ? 'bg-iron-red text-white shadow-lg shadow-iron-red/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
    <span className="text-sm shrink-0">{icon}</span>
    <span className="hidden lg:block text-[10px] font-black uppercase tracking-widest leading-none">{label}</span>
    {badge !== undefined && badge > 0 && <span className="absolute right-2 top-2 bg-white text-iron-red text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md">{badge}</span>}
  </button>
);

const StatCard = ({ label, val, trend, isCall }: { label: string, val: string | number, trend?: string, isCall?: boolean }) => (
  <div className={`bg-white p-6 rounded-[32px] border ${isCall ? 'border-amber-100 bg-amber-50/10' : 'border-slate-100'} shadow-sm flex flex-col justify-between min-h-[140px] transition-transform hover:-translate-y-1`}>
    <div className="flex justify-between items-start">
      <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isCall ? 'text-amber-500' : 'text-slate-400'}`}>{label}</p>
      {trend && <span className="text-[9px] font-black text-emerald-500">{trend}</span>}
      {isCall && <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>}
    </div>
    <p className={`text-4xl font-black ${isCall ? 'text-amber-600' : 'text-slate-900'}`}>{val}</p>
  </div>
);

const InternalPortal: React.FC<{ onLogout: () => void, userRole?: UserRole }> = ({ onLogout, userRole = 'Admin' }) => {
  const [tab, setTab] = useState<'overview' | 'inbox' | 'programs' | 'mentors' | 'customers' | 'staff'>('overview');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [staff, setStaff] = useState<StaffUser[]>([]);
  
  const [selectedTicketId, setSelectedId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'program' | 'mentor' | 'customer' | 'staff'>('program');
  const [editingItem, setEditingItem] = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = () => {
      // Initialize with mock data if keys don't exist
      const initDb = (key: string, mock: any) => {
        const stored = localStorage.getItem(key);
        if (!stored) {
          localStorage.setItem(key, JSON.stringify(mock));
          return mock;
        }
        return JSON.parse(stored);
      };

      setTickets(initDb(TICKETS_DB_KEY, []));
      setPrograms(initDb(PROGRAMS_DB_KEY, [
        { id: 'P-1', name: 'Leadership Essentials', duration: '4 Weeks', fees: '₹ 15,000', capacity: 100, enrolledCount: 45, active: true },
        { id: 'P-2', name: '100 Board Members', duration: '6 Months', fees: '₹ 45,000', capacity: 50, enrolledCount: 12, active: true }
      ]));
      setMentors(initDb(MENTORS_DB_KEY, [
        { id: 'M-1', name: 'Suvarna Hegde', specialization: 'Business Warfare', exp: 15, rating: 4.9, activeLearners: 120, available: true }
      ]));
      setCustomers(initDb(CUSTOMERS_DB_KEY, []));
      setStaff(initDb(STAFF_DB_KEY, [
        { id: 'S-1', name: 'Rajesh Bhat', email: 'rajesh@ironlady.com', role: 'Admin', status: 'Active' }
      ]));
    };
    fetchData();

    const interval = setInterval(() => {
      setTickets(JSON.parse(localStorage.getItem(TICKETS_DB_KEY) || '[]'));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [selectedTicketId, tickets, tab]);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  // --- CRUD Actions ---
  const saveToDb = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    if (key === PROGRAMS_DB_KEY) setPrograms(data);
    if (key === MENTORS_DB_KEY) setMentors(data);
    if (key === CUSTOMERS_DB_KEY) setCustomers(data);
    if (key === STAFF_DB_KEY) setStaff(data);
  };

  const handleDelete = (type: string, id: string) => {
    if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
    if (type === 'program') saveToDb(PROGRAMS_DB_KEY, programs.filter(p => p.id !== id));
    if (type === 'mentor') saveToDb(MENTORS_DB_KEY, mentors.filter(m => m.id !== id));
    if (type === 'customer') saveToDb(CUSTOMERS_DB_KEY, customers.filter(c => c.id !== id));
    if (type === 'staff') saveToDb(STAFF_DB_KEY, staff.filter(s => s.id !== id));
  };

  const handleOpenModal = (type: any, item?: any) => {
    setModalType(type);
    setEditingItem(item || null);
    setIsModalOpen(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = Object.fromEntries(formData.entries());
    
    let dbKey = '';
    let currentList: any[] = [];
    
    if (modalType === 'program') { dbKey = PROGRAMS_DB_KEY; currentList = programs; }
    if (modalType === 'mentor') { dbKey = MENTORS_DB_KEY; currentList = mentors; }
    if (modalType === 'customer') { dbKey = CUSTOMERS_DB_KEY; currentList = customers; }
    if (modalType === 'staff') { dbKey = STAFF_DB_KEY; currentList = staff; }

    const newItem = {
      ...editingItem,
      ...data,
      id: editingItem?.id || `${modalType.toUpperCase()}-${Date.now()}`,
      active: data.active === 'on' || data.active === true || data.active === 'Active'
    };

    const updatedList = editingItem 
      ? currentList.map(item => item.id === editingItem.id ? newItem : item)
      : [newItem, ...currentList];

    saveToDb(dbKey, updatedList);
    setIsModalOpen(false);
  };

  // --- Chat Actions ---
  const handlePolishReply = async () => {
    if (!replyText.trim() || replyText.length < 5) return;
    setIsPolishing(true);
    const corrected = await getWritingHelp(replyText);
    setReplyText(corrected);
    setIsPolishing(false);
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicketId) return;
    const msg: Message = { sender: 'agent', text: replyText, timestamp: Date.now() };
    const updated = tickets.map((t) => t.id === selectedTicketId ? { 
      ...t, 
      messages: [...t.messages, msg],
      status: 'Assigned' as const
    } : t);
    setTickets(updated);
    localStorage.setItem(TICKETS_DB_KEY, JSON.stringify(updated));
    setReplyText('');
  };

  const handleStatusUpdate = (status: 'Escalated' | 'Resolved') => {
    if (!selectedTicketId) return;
    const text = status === 'Resolved' ? "Thank you. Your inquiry is now resolved." : "This chat is escalated to senior review.";
    const finalMsg: Message = { sender: 'agent', text, timestamp: Date.now() };
    const updated = tickets.map((t) => t.id === selectedTicketId ? { ...t, status, messages: [...t.messages, finalMsg] } : t);
    setTickets(updated);
    localStorage.setItem(TICKETS_DB_KEY, JSON.stringify(updated));
  };

  return (
    <div className="flex h-screen bg-[#F8F9FB] font-['Outfit'] overflow-hidden text-slate-900 relative">
      {/* SIDEBAR */}
      <aside className="w-16 lg:w-64 bg-slate-950 flex flex-col p-5 shrink-0 border-r border-slate-800 z-50">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="bg-iron-red text-white w-9 h-9 rounded-xl flex items-center justify-center font-black text-[7px]">IRON LADY</div>
          <div className="hidden lg:block">
            <h1 className="text-[10px] font-black uppercase text-white tracking-widest leading-none">Intelligence Hub</h1>
            <p className="text-[8px] font-bold text-iron-red uppercase tracking-widest mt-1">{userRole}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2">
          <SidebarBtn active={tab === 'overview'} onClick={() => setTab('overview')} label="Overview" icon="📊" />
          <SidebarBtn active={tab === 'inbox'} onClick={() => setTab('inbox')} label="Inbox" icon="✉️" badge={tickets.filter(t => t.status === 'Open').length} />
          <SidebarBtn active={tab === 'programs'} onClick={() => setTab('programs')} label="Programs" icon="🏗️" />
          <SidebarBtn active={tab === 'customers'} onClick={() => setTab('customers')} label="Customers" icon="🎓" />
          <SidebarBtn active={tab === 'mentors'} onClick={() => setTab('mentors')} label="Mentors" icon="👔" />
          <SidebarBtn active={tab === 'staff'} onClick={() => setTab('staff')} label="Staff" icon="👥" />
        </nav>
        <button onClick={onLogout} className="mt-auto p-4 rounded-2xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:bg-red-600 hover:text-white transition-all">Logout</button>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0 shadow-sm relative z-40">
          <h2 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">{tab.toUpperCase()}</h2>
          
          {['programs', 'mentors', 'customers', 'staff'].includes(tab) && (
            <button 
              onClick={() => handleOpenModal(tab === 'programs' ? 'program' : tab === 'mentors' ? 'mentor' : tab === 'customers' ? 'customer' : 'staff')}
              className="bg-iron-red text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-iron-red/20 active:scale-95 transition-all"
            >
              Add New {tab === 'staff' ? 'Member' : tab.slice(0, -1)}
            </button>
          )}
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/30 custom-scrollbar">
          {tab === 'overview' && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard label="Inbox" val={tickets.length} trend="+12%" />
              <StatCard label="Customers" val={customers.length} />
              <StatCard label="Escalated" val={tickets.filter(t => t.status === 'Escalated').length} isCall />
              <StatCard label="Mentors" val={mentors.length} />
            </div>
          )}

          {tab === 'inbox' && (
            <div className="h-full flex -m-10 bg-white border border-slate-100 rounded-[40px] shadow-2xl overflow-hidden">
              <div className="w-80 border-r flex flex-col shrink-0 bg-slate-50/20">
                <div className="p-6 border-b bg-white">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Inquiry Stream</h3>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {tickets.length > 0 ? tickets.map(t => (
                    <div key={t.id} onClick={() => setSelectedId(t.id)} className={`p-6 border-b cursor-pointer transition-all ${selectedTicketId === t.id ? 'bg-white border-l-4 border-l-iron-red shadow-lg' : 'hover:bg-white/40'}`}>
                      <p className="text-sm font-black uppercase text-slate-900 truncate mb-1">{t.learnerName}</p>
                      <span className={`text-[7px] font-black uppercase px-2 py-0.5 rounded-full ${t.status === 'Escalated' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{t.status}</span>
                    </div>
                  )) : <div className="p-10 text-center text-[10px] font-black text-slate-300 uppercase">Empty Inbox</div>}
                </div>
              </div>

              <div className="flex-1 flex bg-white relative">
                {selectedTicket ? (
                  <>
                    <div className="flex-1 flex flex-col min-w-0">
                      <div className="p-8 border-b flex justify-between items-center shadow-sm relative z-10 bg-white">
                        <h4 className="text-xl font-black uppercase text-slate-900 tracking-tight leading-none">{selectedTicket.learnerName}</h4>
                        <div className="flex gap-3">
                          {selectedTicket.status !== 'Resolved' && (
                            <button onClick={() => handleStatusUpdate('Resolved')} className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase px-6 py-2 rounded-xl border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all">Resolve</button>
                          )}
                        </div>
                      </div>
                      
                      <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-6 bg-slate-50/20 custom-scrollbar">
                        {selectedTicket.messages.map((m, i) => (
                          <div key={i} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'} animate-pop`}>
                            <div className={`max-w-[75%] p-6 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${m.sender === 'agent' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                              {m.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-8 border-t flex flex-col gap-2 bg-white relative z-10">
                        {replyText.length >= 5 && (
                          <button onClick={handlePolishReply} disabled={isPolishing} className="self-end text-[8px] font-black uppercase text-amber-500 hover:text-amber-600 tracking-widest flex items-center gap-1.5 transition-all bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                            {isPolishing ? <span className="animate-spin">💡</span> : <span>💡</span>}
                            {isPolishing ? 'Optimizing...' : 'Professional Fix'}
                          </button>
                        )}
                        <div className="flex gap-4 items-center">
                          <input className="flex-1 bg-slate-50 border border-slate-200 px-8 py-5 rounded-[24px] text-sm font-bold outline-none focus:border-iron-red transition-all shadow-inner h-14" placeholder="Type reply..." value={replyText} onChange={e => setReplyText(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendReply()} />
                          <button onClick={handleSendReply} disabled={!replyText.trim()} className="w-14 h-14 bg-iron-red text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all shadow-xl active:scale-90">
                             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <InternalWorkflowAssistant activeTicket={selectedTicket} onApplySuggestion={(text) => setReplyText(text)} />
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center opacity-10 uppercase tracking-[0.4em] text-[10px] font-black">Select Inbox Thread</div>
                )}
              </div>
            </div>
          )}

          {tab === 'programs' && (
            <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-slate-100 animate-in fade-in duration-500">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Program Name', 'Duration', 'Fees', 'Enrollment', 'Actions'].map(h => (
                      <th key={h} className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {programs.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-6"><p className="text-sm font-bold text-slate-900">{p.name}</p></td>
                      <td className="p-6 text-sm font-medium text-slate-600">{p.duration}</td>
                      <td className="p-6 text-sm font-bold text-iron-red">{p.fees}</td>
                      <td className="p-6"><p className="text-sm font-medium">{p.enrolledCount} / {p.capacity}</p></td>
                      <td className="p-6">
                        <div className="flex gap-4">
                          <button onClick={() => handleOpenModal('program', p)} className="text-[10px] font-black uppercase text-slate-400 hover:text-iron-red transition-colors">Edit</button>
                          <button onClick={() => handleDelete('program', p.id)} className="text-[10px] font-black uppercase text-slate-300 hover:text-red-600 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {programs.length === 0 && <div className="p-20 text-center text-slate-300 font-black uppercase tracking-widest">No Programs Created</div>}
            </div>
          )}

          {tab === 'customers' && (
            <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-slate-100 animate-in fade-in duration-500">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Member', 'Program', 'Status', 'Actions'].map(h => (
                      <th key={h} className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {customers.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-6">
                        <p className="text-sm font-bold text-slate-900">{c.name}</p>
                        <p className="text-[10px] text-slate-400">{c.email}</p>
                      </td>
                      <td className="p-6 text-sm font-medium text-slate-600">{c.program}</td>
                      <td className="p-6">
                        <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full ${c.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>{c.status}</span>
                      </td>
                      <td className="p-6">
                        <div className="flex gap-4">
                          <button onClick={() => handleOpenModal('customer', c)} className="text-[10px] font-black uppercase text-slate-400 hover:text-iron-red transition-colors">Edit</button>
                          <button onClick={() => handleDelete('customer', c.id)} className="text-[10px] font-black uppercase text-slate-300 hover:text-red-600 transition-colors">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {customers.length === 0 && <div className="p-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs italic">No Customer Data Available</div>}
            </div>
          )}

          {tab === 'mentors' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
              {mentors.map(m => (
                <div key={m.id} className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 space-y-4 hover:shadow-xl transition-all relative group">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 bg-iron-red text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-iron-red/20">👔</div>
                    <div className="flex gap-2">
                       <button onClick={() => handleOpenModal('mentor', m)} className="p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">✏️</button>
                       <button onClick={() => handleDelete('mentor', m.id)} className="p-2 bg-slate-50 rounded-lg hover:bg-red-50 transition-colors">🗑️</button>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 leading-none">{m.name}</h4>
                    <p className="text-[10px] font-bold text-iron-red uppercase tracking-widest mt-2">{m.specialization}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-50 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">Experience</p>
                      <p className="text-sm font-bold">{m.exp} Years</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase">Availability</p>
                      <p className={`text-[10px] font-black uppercase ${m.available ? 'text-emerald-500' : 'text-slate-400'}`}>{m.available ? 'Online' : 'Busy'}</p>
                    </div>
                  </div>
                </div>
              ))}
              {mentors.length === 0 && <div className="col-span-3 py-32 text-center text-slate-300 uppercase tracking-widest font-black text-xs bg-white rounded-[40px] border border-dashed border-slate-200">No Mentors Configured</div>}
            </div>
          )}

          {tab === 'staff' && (
            <div className="bg-white rounded-[40px] shadow-sm overflow-hidden border border-slate-100 animate-in fade-in duration-500">
               <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Team Member', 'System Role', 'Connectivity', 'Actions'].map(h => (
                      <th key={h} className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {staff.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-6">
                        <p className="text-sm font-bold text-slate-900">{s.name}</p>
                        <p className="text-[10px] text-slate-400">{s.email}</p>
                      </td>
                      <td className="p-6">
                         <span className="text-[10px] font-black text-iron-red uppercase tracking-widest border border-iron-red/20 px-2 py-1 rounded-md bg-iron-red/5">{s.role}</span>
                      </td>
                      <td className="p-6">
                        <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-full ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{s.status}</span>
                      </td>
                      <td className="p-6">
                         <div className="flex gap-4">
                            <button onClick={() => handleOpenModal('staff', s)} className="text-[10px] font-black uppercase text-slate-400 hover:text-iron-red transition-colors">Edit</button>
                            <button onClick={() => handleDelete('staff', s.id)} className="text-[10px] font-black uppercase text-slate-300 hover:text-red-600 transition-colors">Delete</button>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {staff.length === 0 && <div className="p-20 text-center text-slate-300 font-black uppercase tracking-widest text-xs">No Staff Members Found</div>}
            </div>
          )}
        </div>
      </main>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-end bg-black/40 backdrop-blur-sm p-4 lg:p-10 animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-white rounded-[40px] shadow-2xl h-full flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
            <div className="p-10 bg-slate-950 text-white flex justify-between items-center shrink-0">
               <div>
                 <h3 className="text-xl font-black uppercase tracking-tighter leading-none">Intelligence Hub</h3>
                 <p className="text-[10px] font-bold text-iron-red uppercase tracking-widest mt-2">{editingItem ? 'Update' : 'Register'} {modalType.toUpperCase()}</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="p-4 bg-white/5 rounded-2xl hover:bg-red-600 transition-all">✕</button>
            </div>
            
            <form onSubmit={handleSaveItem} className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
              {modalType === 'program' && (
                <>
                  <FormField label="Program Title" name="name" defaultValue={editingItem?.name} required />
                  <FormField label="Execution Duration" name="duration" defaultValue={editingItem?.duration} placeholder="e.g. 6 Months" />
                  <FormField label="Investment Fee" name="fees" defaultValue={editingItem?.fees} placeholder="e.g. ₹ 45,000" />
                  <div className="grid grid-cols-2 gap-6">
                    <FormField label="Cohort Capacity" name="capacity" type="number" defaultValue={editingItem?.capacity} />
                    <FormField label="Enrolled Count" name="enrolledCount" type="number" defaultValue={editingItem?.enrolledCount || 0} />
                  </div>
                </>
              )}

              {modalType === 'mentor' && (
                <>
                  <FormField label="Professional Name" name="name" defaultValue={editingItem?.name} required />
                  <FormField label="Core Specialization" name="specialization" defaultValue={editingItem?.specialization} />
                  <FormField label="Industry Experience (Years)" name="exp" type="number" defaultValue={editingItem?.exp} />
                  <div className="flex items-center gap-3">
                    <input type="checkbox" name="available" id="available" defaultChecked={editingItem?.available} className="w-5 h-5 accent-iron-red" />
                    <label htmlFor="available" className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Connectivity</label>
                  </div>
                </>
              )}

              {modalType === 'customer' && (
                <>
                  <FormField label="Customer Name" name="name" defaultValue={editingItem?.name} required />
                  <FormField label="Enterprise Email" name="email" type="email" defaultValue={editingItem?.email} required />
                  <FormField label="Target Program" name="program" defaultValue={editingItem?.program} />
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Engagement Status</label>
                    <select name="status" defaultValue={editingItem?.status || 'Active'} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-iron-red appearance-none">
                       <option value="Active">Active</option>
                       <option value="Completed">Completed</option>
                       <option value="On-Hold">On-Hold</option>
                    </select>
                  </div>
                </>
              )}

              {modalType === 'staff' && (
                <>
                  <FormField label="Staff Full Name" name="name" defaultValue={editingItem?.name} required />
                  <FormField label="System Email" name="email" type="email" defaultValue={editingItem?.email} required />
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Designated Role</label>
                    <select name="role" defaultValue={editingItem?.role || 'Support'} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-iron-red appearance-none">
                       <option value="Admin">Admin</option>
                       <option value="Support">Support</option>
                       <option value="Content">Content</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">System Status</label>
                    <select name="status" defaultValue={editingItem?.status || 'Active'} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-iron-red appearance-none">
                       <option value="Active">Active</option>
                       <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
            </form>

            <div className="p-10 border-t bg-slate-50 flex gap-4 shrink-0">
               <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-white border border-slate-200 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest text-slate-400">Cancel</button>
               <button onClick={(e) => { e.preventDefault(); (document.querySelector('form') as any)?.requestSubmit(); }} className="flex-1 bg-iron-red text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-iron-red/20">Commit Sync</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const FormField = ({ label, name, type = "text", defaultValue, required, placeholder }: any) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <input 
      required={required}
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full p-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:border-iron-red transition-all"
    />
  </div>
);

export default InternalPortal;
