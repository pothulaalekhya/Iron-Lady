
import React, { useState } from 'react';

export type UserRole = 'Admin' | 'Support' | 'Content';

interface PortalLoginProps {
  onLogin: (role: UserRole) => void;
}

const PortalLogin: React.FC<PortalLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Requirement 1: Strictly prohibit non-.com domain names
    if (!email.toLowerCase().endsWith('.com')) {
      setError('Access Denied: Only .com enterprise domains permitted.');
      return;
    }

    // Role Mapping
    if (password === 'leadership') {
      if (email.startsWith('admin')) onLogin('Admin');
      else if (email.startsWith('support')) onLogin('Support');
      else if (email.startsWith('content')) onLogin('Content');
      else onLogin('Support'); // Default
    } else {
      setError('Invalid credentials for Iron Lady Grid.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FDFCF0] px-6">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-black text-white rounded-2xl flex flex-col items-center justify-center leading-none mx-auto mb-6">
            <span className="text-[11px] font-black">IRON</span>
            <span className="text-[11px] font-black">LADY</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Internal <span className="text-iron-red">Portal</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-2">Team Command Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Team Email</label>
            <input 
              type="email" 
              required
              className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold focus:border-iron-red outline-none transition-all"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              placeholder="admin@ironlady.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Passkey</label>
            <input 
              type="password" 
              required
              className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl font-bold focus:border-iron-red outline-none transition-all"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-[10px] text-red-500 font-black uppercase text-center animate-pulse">{error}</p>}
          <button className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-iron-red transition-all shadow-xl active:scale-95">
            Unlock Dashboard
          </button>
        </form>
        
        <p className="text-center text-[9px] font-bold text-slate-300 uppercase tracking-widest mt-12">
          Strict security: Only .com domains permitted.
        </p>
      </div>
    </div>
  );
};

export default PortalLogin;
