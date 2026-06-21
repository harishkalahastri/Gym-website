import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Target, X, CheckCircle2 } from 'lucide-react';

interface TransformationItem {
  id: string;
  name: string;
  age: number;
  stat: string;
  beforeImg: string;
  afterImg: string;
  duration: string;
  trainer: string;
  goal: string;
  details: string[];
}

export default function Transformations() {
  const [selectedItem, setSelectedItem] = useState<TransformationItem | null>(null);

  const transformations: TransformationItem[] = [
    {
      id: 't1',
      name: 'Rohan Sharma',
      age: 29,
      stat: 'Gained 7kg Muscle',
      beforeImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
      afterImg: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
      duration: '16 Weeks',
      trainer: 'Coach Vikram',
      goal: 'Bulking & Strength',
      details: [
        'Increased deadlift from 100kg to 180kg',
        'Reduced overall body fat percentage by 4%',
        'Significantly improved shoulder mobility and posture'
      ]
    },
    {
      id: 't2',
      name: 'Priya Patel',
      age: 34,
      stat: 'Lost 14kg & Toned',
      beforeImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600',
      afterImg: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600',
      duration: '12 Weeks',
      trainer: 'Coach Riya',
      goal: 'Fat Loss & Core',
      details: [
        'Dropped 3 dress sizes in 3 months',
        'Built full cardiovascular endurance (runs 5k comfortably)',
        'Healed chronic lower back pain through core strengthening'
      ]
    },
    {
      id: 't3',
      name: 'Karthik Rao',
      age: 42,
      stat: 'Rebuilt Athletic Base',
      beforeImg: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
      afterImg: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
      duration: '24 Weeks',
      trainer: 'Coach Harish',
      goal: 'Functional Longevity',
      details: [
        'Normalized blood pressure and cholesterol levels',
        'Achieved first pull-up in 15 years',
        'Decreased resting heart rate from 78 to 61 BPM'
      ]
    }
  ];

  return (
    <section id="transformations" className="py-24 bg-black relative border-t border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              PROOF OF PROCESS
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              Real Members.<br />
              Real <span className="font-serif italic text-brand-orange lowercase font-normal">transformations</span>.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-sm text-sm">
            We don't sell hope. We sell structured blueprints that yield verifiable, visible results. Here are the outcomes of members who put in the work.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-brand-charcoal border border-brand-orange/5 rounded-2xl overflow-hidden hover:border-brand-orange/20 transition-all duration-300 shadow-xl"
            >
              {/* Double Photo comparison side by side */}
              <div className="relative h-72 flex overflow-hidden">
                <div className="w-1/2 h-full relative">
                  <img
                    src={item.beforeImg}
                    alt={`${item.name} Before`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-black/75 backdrop-blur-md rounded-md text-[9px] uppercase font-bold text-gray-400">
                    Before
                  </div>
                </div>
                <div className="w-1/2 h-full relative border-l border-brand-black">
                  <img
                    src={item.afterImg}
                    alt={`${item.name} After`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-brand-orange rounded-md text-[9px] uppercase font-bold text-black">
                    After
                  </div>
                </div>
              </div>

              {/* Card Meta details */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bebas text-2xl tracking-wide text-white group-hover:text-brand-orange transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs text-gray-500">{item.duration} Plan</span>
                </div>
                
                {/* Result Pill */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold">
                    {item.stat}
                  </div>
                  <span className="text-xs text-gray-400 hover:underline">
                    View Blueprint &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Outcome Blueprint Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-brand-charcoal border border-brand-orange/15 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-brand-black/50 text-gray-400 hover:text-white border border-white/5 hover:border-white/10 z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Left side comparisons */}
                <div className="md:col-span-6 relative h-64 md:h-[400px] flex">
                  <div className="w-1/2 h-full relative">
                    <img
                      src={selectedItem.beforeImg}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-md text-xs uppercase font-bold text-gray-400">
                      Before
                    </div>
                  </div>
                  <div className="w-1/2 h-full relative border-l border-brand-black">
                    <img
                      src={selectedItem.afterImg}
                      alt="After"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-brand-orange rounded-md text-xs uppercase font-bold text-black">
                      After
                    </div>
                  </div>
                </div>

                {/* Right side information */}
                <div className="md:col-span-6 p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-brand-orange">
                      Blueprint Details
                    </span>
                    <h4 className="font-bebas text-4xl text-white mt-1">
                      {selectedItem.name}, {selectedItem.age}
                    </h4>

                    {/* Stats pills list */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      <div className="flex items-center text-xs text-gray-300 bg-brand-black px-3 py-1.5 rounded-lg border border-brand-orange/10">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
                        {selectedItem.duration}
                      </div>
                      <div className="flex items-center text-xs text-gray-300 bg-brand-black px-3 py-1.5 rounded-lg border border-brand-orange/10">
                        <User className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
                        {selectedItem.trainer}
                      </div>
                      <div className="flex items-center text-xs text-gray-300 bg-brand-black px-3 py-1.5 rounded-lg border border-brand-orange/10">
                        <Target className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
                        {selectedItem.goal}
                      </div>
                    </div>

                    {/* Achievement Details */}
                    <div className="mt-6">
                      <h5 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-3">
                        Key Achievements
                      </h5>
                      <ul className="space-y-2.5">
                        {selectedItem.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-300">
                            <CheckCircle2 className="w-4 h-4 mr-2.5 mt-0.5 text-brand-orange shrink-0" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions inside Modal */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex gap-4">
                    <a
                      href="#trial-form"
                      onClick={() => setSelectedItem(null)}
                      className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-xl hover:bg-brand-orange/90 transition-all"
                    >
                      Book Similar Plan
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
