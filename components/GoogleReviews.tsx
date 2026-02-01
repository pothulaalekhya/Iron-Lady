
import React from 'react';

const GoogleReviews: React.FC = () => {
  const reviews = [
    {
      name: "Karuna Sapru",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      text: "It's been a wonderful experience joining the Iron Lady. I am using the techniques shared every day and I am seeing the d...",
      stars: 5
    },
    {
      name: "Rabeka Akerele",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      text: "I wish to express my heartfelt gratitude for the exceptional session on C-Suite pathway for business owners held by Suva...",
      stars: 4
    },
    {
      name: "Chaya Devi Rudraraju",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200",
      text: "The Iron Lady program gave me excellent support for my success. When I started my career again, I was clueless on how to...",
      stars: 5
    }
  ];

  return (
    <section className="py-24 bg-[#F2F0E4]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 uppercase">Our <span className="text-iron-red">Google Reviews</span></h2>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <span className="text-xl font-bold text-slate-800">4.8 rating of 512 reviews</span>
            </div>
          </div>
          <button className="bg-iron-red text-white px-8 py-4 rounded-md font-black uppercase tracking-widest text-xs hover:bg-black transition-all">
            Write a Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center text-center group hover:shadow-2xl transition-all">
              <img src={rev.img} alt={rev.name} className="w-24 h-24 rounded-full mb-6 border-4 border-[#F2F0E4] object-cover" />
              <h4 className="text-2xl font-black text-slate-900 mb-2">{rev.name}</h4>
              <div className="flex text-yellow-400 mb-6">
                {[...Array(5)].map((_, i) => <svg key={i} className={`w-4 h-4 ${i >= rev.stars ? 'text-gray-200' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                "{rev.text}" <span className="text-blue-500 cursor-pointer font-bold">Show More</span>
              </p>
              <div className="mt-auto pt-6 border-t border-gray-50 w-full flex justify-center">
                <svg className="w-5 h-5 text-slate-200" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h4.76c-.19 1.1-1.2 3.22-4.76 3.22-3.07 0-5.56-2.54-5.56-5.67s2.49-5.67 5.56-5.67c1.75 0 2.92.74 3.59 1.39l2.59-2.5c-1.66-1.55-3.82-2.49-6.18-2.49-5.26 0-9.53 4.27-9.53 9.53s4.27 9.53 9.53 9.53c5.49 0 9.15-3.86 9.15-9.3 0-.62-.07-1.09-.15-1.56h-8.99z"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
