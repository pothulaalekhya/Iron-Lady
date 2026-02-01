
import React from 'react';

interface FooterProps {
  onNavigate: (view: string, subSection?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 pb-12 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-white/10 pb-20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center gap-4">
              <div className="bg-white text-black w-14 h-14 flex flex-col items-center justify-center leading-none rounded-sm shadow-xl">
                <span className="text-[11px] font-black tracking-tighter">IRON</span>
                <span className="text-[11px] font-black tracking-tighter">LADY</span>
              </div>
              <div>
                <p className="text-iron-red text-[12px] font-black uppercase tracking-[0.2em] leading-tight">Fast-track to Top</p>
                <p className="text-white text-[12px] font-black uppercase tracking-[0.2em] leading-tight opacity-40">Leadership roles</p>
              </div>
            </div>
            <p className="text-white/40 text-sm font-medium leading-relaxed max-w-sm italic">
              Empowering the next generation of women board members and corporate leaders through elite business war tactics and unapologetic ambition.
            </p>
            <div className="flex items-center gap-5 pt-2">
              <SocialIcon platform="facebook" />
              <SocialIcon platform="linkedin" />
              <SocialIcon platform="instagram" />
              <SocialIcon platform="twitter" />
              <SocialIcon platform="youtube" />
            </div>
          </div>

          {/* Nav Columns */}
          <div className="lg:col-span-2 space-y-7">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-iron-red">Offerings</h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('programs', 'essentials')}>Leadership Essentials</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('programs', 'board')}>100 Board Members</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('programs', 'warfare')}>Business Warfare</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('masterclass')}>Masterclass</li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-7">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-iron-red">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('about')}>Our Mission</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('impact')}>Global Impact</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('latest')}>Latest News</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('contact', 'careers')}>Careers</li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-7">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-iron-red">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('resources')}>Knowledge Base</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('contact', 'scholarship')}>Scholarships</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('contact', 'referral')}>Referral Portal</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('contact', 'partnership')}>Partner with Us</li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-7">
            <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-iron-red">Connect</h4>
            <ul className="space-y-4 text-sm font-bold text-white/40">
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('contact', 'help')}>Get in Touch</li>
              <li className="hover:text-white transition-colors cursor-pointer" onClick={() => onNavigate('resources', 'faq')}>Help Center</li>
              <li className="hover:text-white transition-colors cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition-colors cursor-pointer">Privacy</li>
            </ul>
          </div>

        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <p>© 2024 Iron Lady. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <span>Corporate Headquarter: Bangalore, India</span>
            <div className="flex items-center gap-2">
              MADE BY <span className="text-iron-red font-black">IRON LADY</span> FOR LEADERS
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ platform }: { platform: string }) => {
  return (
    <a href={`https://${platform}.com`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-iron-red transition-all group">
      <div className={`w-4 h-4 bg-white/30 group-hover:bg-white mask-icon`} 
           style={{ WebkitMask: `url(https://cdn.simpleicons.org/${platform}) no-repeat center / contain` }}></div>
    </a>
  );
};

export default Footer;
