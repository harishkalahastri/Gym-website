import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, X } from 'lucide-react';

import { useGym } from '../context/GymContext';

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  exp: string;
  insta: string;
  bio: string;
  portraitImg: string;
  actionImg: string;
}

export default function Trainers() {
  const { gym } = useGym();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  const trainers: Trainer[] = gym.trainers.map((t, idx) => ({
    id: `tr${idx}`,
    name: t.name,
    specialty: t.specialty,
    exp: 'Expert Coach',
    insta: '#',
    bio: t.bio,
    portraitImg: t.image,
    actionImg: t.image,
  }));

  return (
    <section id="trainers" className="py-24 bg-brand-charcoal/20 relative border-b border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              THE EXPERTS
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              Your Fitness Goals.<br />
              Their <span className="font-serif italic text-brand-orange lowercase font-normal">expertise</span>.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-sm text-sm">
            We do not hire floor managers. Our coaches are qualified sports science practitioners tracking daily adaptation metrics.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-brand-charcoal border border-brand-orange/5 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              {/* Image hover swap container */}
              <div className="relative h-96 overflow-hidden group cursor-pointer" onClick={() => setSelectedTrainer(item)}>
                {/* Standard Portrait */}
                <img
                  src={item.portraitImg}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                />
                {/* Action shot on hover */}
                <img
                  src={item.actionImg}
                  alt={`${item.name} Action`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100 scale-102"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-left">
                  <span className="text-[9px] uppercase tracking-wider font-bold text-brand-orange px-2 py-0.5 rounded bg-black/80 border border-brand-orange/20">
                    {item.exp} Exp
                  </span>
                  <h3 className="font-bebas text-2xl text-white mt-1.5 leading-none">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Summary / CTAs */}
              <div className="p-5 text-left flex flex-col justify-between flex-1">
                <div>
                  <span className="text-xs text-brand-orange font-bold uppercase tracking-wider">
                    {item.specialty}
                  </span>
                  <p className="text-[11px] text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                    {item.bio}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={item.insta}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-brand-black hover:bg-brand-orange hover:text-black rounded-lg text-gray-400 transition-colors border border-white/5"
                    aria-label="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setSelectedTrainer(item)}
                    className="px-4 py-2 bg-brand-orange text-black font-bold uppercase tracking-wider text-[10px] rounded-lg hover:bg-brand-orange/90 transition-all"
                  >
                    Review Bio
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Trainer Bio Modal */}
      <AnimatePresence>
        {selectedTrainer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTrainer(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-charcoal border border-brand-orange/15 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-black/60 text-gray-400 hover:text-white border border-white/5 z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-12">
                {/* Left portrait image */}
                <div className="sm:col-span-5 h-64 sm:h-auto min-h-[300px]">
                  <img
                    src={selectedTrainer.portraitImg}
                    alt={selectedTrainer.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right content */}
                <div className="sm:col-span-7 p-8 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-brand-orange">
                      Certified Specialist ({selectedTrainer.exp})
                    </span>
                    <h4 className="font-bebas text-3xl text-white mt-1">
                      {selectedTrainer.name}
                    </h4>
                    <p className="text-xs text-gray-400 font-semibold mt-1">
                      {selectedTrainer.specialty}
                    </p>

                    <p className="text-xs text-gray-300 leading-relaxed font-light mt-5">
                      {selectedTrainer.bio}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                    <a
                      href="#trial-form"
                      onClick={() => setSelectedTrainer(null)}
                      className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-xl hover:bg-brand-orange/90 transition-all flex items-center justify-center"
                    >
                      Book Free Assessment Session
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
