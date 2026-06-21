import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ProgramCard {
  id: string;
  title: string;
  desc: string;
  img: string;
  tag: string;
  isFeatured?: boolean;
}

export default function Programs() {
  const [activeCard, setActiveCard] = useState<string>('p4'); // Default featured: Personal Training

  const programs: ProgramCard[] = [
    {
      id: 'p1',
      title: 'Weight Loss',
      desc: 'Lose fat, retain lean muscle, and optimize thyroid speed via dynamic caloric programming.',
      img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600',
      tag: 'Metabolic Split',
    },
    {
      id: 'p2',
      title: 'Muscle Gain',
      desc: 'Build structural muscle mass through focused hypertrophy schedules and nutrient-dense surplus planning.',
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600',
      tag: 'Hypertrophy Split',
    },
    {
      id: 'p3',
      title: 'Strength Training',
      desc: 'Re-engineer raw physical power through central nervous system conditioning and barbell mastery.',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
      tag: 'CNS Power Split',
    },
    {
      id: 'p4',
      title: 'Personal Training',
      desc: '1-on-1 private coaching utilizing biometric feedback and physical therapy alignment.',
      img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
      tag: '1-on-1 Private',
      isFeatured: true
    },
    {
      id: 'p5',
      title: 'Functional Fitness',
      desc: 'Enhance mobility, joint capsule stability, and raw athletic capacity for daily efficiency.',
      img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600',
      tag: 'Joint Longevity',
    },
    {
      id: 'p6',
      title: 'Women\'s Fitness',
      desc: 'Endocrine-supportive training and pelvic floor/core stabilization engineered for health and shape.',
      img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600',
      tag: 'Endocrine Support',
    },
    {
      id: 'p7',
      title: 'Athletic Performance',
      desc: 'Unilateral agility work, reactive force development, and raw explosive speed drills.',
      img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600',
      tag: 'Reactive Power',
    },
    {
      id: 'p8',
      title: 'Beginner Transformation',
      desc: 'Gentle, structured entry path targeting joint safety, motor patterns, and basic gym confidence.',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
      tag: 'Foundation Split',
    }
  ];

  return (
    <section id="programs" className="py-24 bg-black relative border-b border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              TRANSFORMATION BLUEPRINTS
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              Discover What Sets Us <span className="font-serif italic text-brand-orange lowercase font-normal">apart</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-sm text-sm">
            We target specific physical adaptations. Select the blueprint that matches your primary goal. Each program includes full nutritional templates.
          </p>
        </div>

        {/* 4x2 Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((prog, index) => {
            const isActive = activeCard === prog.id;
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onMouseEnter={() => setActiveCard(prog.id)}
                className={`group flex flex-col justify-between h-[380px] bg-brand-charcoal rounded-2xl overflow-hidden border-2 transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? 'border-brand-orange shadow-lg shadow-brand-orange/10 -translate-y-1'
                    : 'border-brand-orange/5 hover:border-brand-orange/30'
                }`}
              >
                {/* Photo with zoom effect */}
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img
                    src={prog.img}
                    alt={prog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
                  
                  {/* Tag */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/85 backdrop-blur-md rounded-md text-[9px] uppercase tracking-wider font-bold text-brand-orange">
                    {prog.tag}
                  </div>

                  {/* Featured badge */}
                  {prog.isFeatured && (
                    <div className="absolute top-4 right-4 p-1.5 bg-brand-orange rounded-full text-black" title="Recommended Split">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-bebas text-2xl tracking-wide text-white group-hover:text-brand-orange transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-2 leading-relaxed font-light">
                      {prog.desc}
                    </p>
                  </div>

                  {/* Action Link */}
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-brand-orange transition-colors">
                    <span>Adaptive Schedule</span>
                    <a href="#trial-form" className="text-brand-orange hover:underline font-bold">
                      Book Split &rarr;
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
