
import React, { useState, useEffect } from 'react';
import { getChatIntelligence } from '../services/gemini';

interface InternalWorkflowAssistantProps {
  activeTicket?: any;
  onApplySuggestion: (text: string) => void;
}

const CATEGORY_MAP: Record<string, { icon: string, color: string }> = {
  'Discovery': { icon: '🔍', color: 'text-blue-500' },
  'Eligibility': { icon: '🎓', color: 'text-purple-500' },
  'Mentorship': { icon: '🤝', color: 'text-emerald-500' },
  'Pricing': { icon: '💰', color: 'text-amber-500' },
  'Learning': { icon: '📚', color: 'text-indigo-500' },
  'Outcomes': { icon: '🚀', color: 'text-iron-red' },
  'Problem': { icon: '⚠️', color: 'text-red-500' }
};

const InternalWorkflowAssistant: React.FC<InternalWorkflowAssistantProps> = ({ 
  activeTicket, 
  onApplySuggestion
}) => {
  const [intelligence, setIntelligence] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const analyze = async () => {
      if (!activeTicket || activeTicket.status === 'Resolved') return;
      
      const lastMsg = activeTicket.messages[activeTicket.messages.length - 1];
      if (lastMsg?.sender === 'agent') return; // Don't analyze our own messages

      setIsLoading(true);
      try {
        const data = await getChatIntelligence(activeTicket.messages);
        setIntelligence({ ...data, id: activeTicket.id, msgCount: activeTicket.messages.length });
      } catch (e) {
        console.error("AI Analysis Failed", e);
      } finally {
        setIsLoading(false);
      }
    };
    analyze();
  }, [activeTicket?.id, activeTicket?.messages?.length]);

  if (!activeTicket) return null;

  return (
    <div className="hidden lg:flex w-80 shrink-0 bg-slate-50 border-l border-slate-100 flex-col h-full overflow-hidden animate-in slide-in-from-right duration-500">
      <div className="p-6 border-b bg-white flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-black text-[10px] shadow-lg">CO</div>
        <div>
          <h4 className="text-[10px] font-black uppercase text-slate-900 tracking-widest leading-none">Internal Copilot</h4>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">Context Analysis</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        {isLoading ? (
          <div className="space-y-6 animate-pulse">
            <div className="h-24 bg-slate-200 rounded-[24px]"></div>
            <div className="space-y-4">
              <div className="h-20 bg-slate-200 rounded-[24px]"></div>
              <div className="h-20 bg-slate-200 rounded-[24px]"></div>
            </div>
          </div>
        ) : intelligence ? (
          <>
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm relative">
              <div className="absolute top-4 right-4 text-xl opacity-20">
                {CATEGORY_MAP[intelligence.intent]?.icon || '✨'}
              </div>
              <p className={`text-[8px] font-black uppercase tracking-widest ${CATEGORY_MAP[intelligence.intent]?.color || 'text-slate-400'}`}>
                Detected: {intelligence.intent}
              </p>
              <p className="text-[11px] font-bold text-slate-700 leading-relaxed mt-3 italic">"{intelligence.summary}"</p>
            </div>

            <div className="space-y-4">
              <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Contextual Drafts</h5>
              {intelligence.suggestions?.map((s: any, i: number) => (
                <div key={i} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3">
                  <p className="text-[9px] font-black text-slate-900 uppercase tracking-tight">{s.label}</p>
                  <div className="space-y-2">
                    <button 
                      onClick={() => onApplySuggestion(s.short)}
                      className="w-full text-left p-3 bg-slate-50 hover:bg-slate-900 hover:text-white transition-all rounded-xl group"
                    >
                      <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/40 block mb-1">Direct Answer</span>
                      <span className="text-[10px] font-medium leading-relaxed block line-clamp-2">{s.short}</span>
                    </button>
                    <button 
                      onClick={() => onApplySuggestion(s.detailed)}
                      className="w-full text-left p-3 bg-slate-50 hover:bg-slate-900 hover:text-white transition-all rounded-xl group"
                    >
                      <span className="text-[7px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/40 block mb-1">Detailed Strategic</span>
                      <span className="text-[10px] font-medium leading-relaxed block line-clamp-3">{s.detailed}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h5 className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Standard Assets</h5>
              <div className="grid grid-cols-2 gap-2">
                {['Essentials', 'Board', 'Warfare', 'Pricing'].map(label => (
                  <button key={label} className="bg-slate-100 hover:bg-slate-200 py-3 rounded-xl text-[8px] font-black uppercase text-slate-500 tracking-widest transition-colors">
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-20 text-center space-y-3">
             <div className="text-2xl opacity-20">📡</div>
             <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">Awaiting Inquiry</p>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-50 text-center">
        <p className="text-[7px] font-bold text-slate-300 uppercase tracking-[0.3em]">IA-Copilot V3.2 Active</p>
      </div>
    </div>
  );
};

export default InternalWorkflowAssistant;
