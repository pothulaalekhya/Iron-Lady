
import React, { useState } from 'react';
import { analyzeBrandImage, generateBrandImagePro } from '../services/gemini';

const CreativeStudio: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [status, setStatus] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');

  // Supported aspect ratios for gemini-3-pro-image-preview
  const aspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setAnalysis(null);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAction = async (type: 'analyze' | 'generate') => {
    setIsProcessing(true);
    setResultImage(null);
    setAnalysis(null);
    setStatus(type === 'analyze' ? 'Analyzing Presence...' : 'Generating Visual...');
    
    try {
      if (type === 'analyze') {
        if (!image) return;
        const res = await analyzeBrandImage(image, prompt);
        setAnalysis(res);
      } else {
        /**
         * Mandatory API key selection for high-quality Gemini 3 Pro Image model.
         * User must choose a paid GCP project key.
         */
        if (typeof window.aistudio !== 'undefined') {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            await window.aistudio.openSelectKey();
            // Proceed assuming success after trigger as per guidelines
          }
        }
        
        try {
          const res = await generateBrandImagePro(prompt || 'Executive woman leading in a boardroom', aspectRatio);
          setResultImage(res);
        } catch (error: any) {
          // Handle specific key selection errors
          if (error?.message?.includes("Requested entity was not found.") && typeof window.aistudio !== 'undefined') {
            setStatus('Please select a valid paid API key.');
            await window.aistudio.openSelectKey();
          } else {
            throw error;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setStatus('Action failed. Try again.');
    } finally {
      setIsProcessing(false);
      setStatus('');
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">
            Branding <span className="text-iron-red">Lab</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto italic">
            Analyze your leadership presence or generate high-quality brand assets using Gemini 3 Pro.
            <br />
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="text-[10px] text-iron-red underline font-bold mt-2 inline-block">
              Billing setup required for Pro Generation
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8 animate-in slide-in-from-left duration-700">
            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Upload headshot</label>
              <div className="group relative aspect-video bg-[#FDFCF0] border-2 border-dashed border-red-100 rounded-[32px] overflow-hidden flex flex-col items-center justify-center transition-all hover:border-iron-red cursor-pointer">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" alt="Source" />
                ) : (
                  <div className="text-center p-8 opacity-50 group-hover:opacity-100 transition-opacity">
                    <svg className="w-10 h-10 text-iron-red mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-black uppercase tracking-widest text-[10px]">Tap to Upload</p>
                  </div>
                )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileChange} accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Select Aspect Ratio</label>
              <div className="flex flex-wrap gap-2">
                {aspectRatios.map(ratio => (
                  <button 
                    key={ratio}
                    onClick={() => setAspectRatio(ratio)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all border ${aspectRatio === ratio ? 'bg-black text-white border-black' : 'bg-white text-slate-500 border-gray-100 hover:border-iron-red'}`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <textarea 
                placeholder="E.g. 'How can I improve my professional posture?' or 'Generate a modern minimalist CEO desk setup'"
                className="w-full bg-slate-50 border border-slate-100 p-5 rounded-2xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-iron-red/10 focus:border-iron-red transition-all min-h-[100px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => handleAction('analyze')}
                  disabled={isProcessing || !image}
                  className="bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all disabled:opacity-30 active:scale-95 flex items-center justify-center gap-2"
                >
                  Analyze Image
                </button>
                <button 
                  onClick={() => handleAction('generate')}
                  disabled={isProcessing}
                  className="bg-iron-red text-white py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-red-600 transition-all disabled:opacity-30 active:scale-95 shadow-lg shadow-red-500/10 flex items-center justify-center gap-2"
                >
                  Generate Asset
                </button>
              </div>
              {status && <p className="text-center text-[10px] font-black text-iron-red animate-pulse uppercase tracking-widest">{status}</p>}
            </div>
          </div>

          {/* Result Area */}
          <div className="lg:col-span-7 h-full min-h-[500px] bg-slate-900 rounded-[40px] p-8 lg:p-12 relative flex items-center justify-center animate-in slide-in-from-right duration-700 overflow-hidden shadow-2xl">
            {isProcessing ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 border-4 border-iron-red border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-white/40 font-black uppercase tracking-[0.3em] text-[10px]">Processing Vision...</p>
              </div>
            ) : resultImage ? (
              <div className="w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500">
                <img src={resultImage} className="max-w-full max-h-full rounded-2xl shadow-2xl" alt="Generated" />
              </div>
            ) : analysis ? (
              <div className="w-full h-full flex flex-col animate-in fade-in duration-500">
                <h4 className="text-iron-red font-black uppercase tracking-widest text-xs mb-6 border-b border-white/10 pb-4">Lab Insights</h4>
                <div className="text-white/80 text-sm leading-relaxed font-medium overflow-y-auto custom-scrollbar pr-4">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="text-center opacity-10">
                <svg className="w-24 h-24 text-white mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <p className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Awaiting Lab Execution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativeStudio;
