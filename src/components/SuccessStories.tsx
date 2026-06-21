import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Target, Activity, TrendingUp, Trophy } from 'lucide-react';

export default function SuccessStories() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const journey = [
    {
      id: 'j1',
      week: 'Week 1',
      title: 'Baseline Assessment',
      desc: 'Lesson: Fix mobility and build a caloric baseline before adding load.',
      icon: <Target className="w-5 h-5 text-brand-orange" />,
      metric: 'Starting Weight: 94kg',
    },
    {
      id: 'j2',
      week: 'Week 4',
      title: 'Structural Adaptation',
      desc: 'Lesson: Correct form eliminates pain and unlocks safe progression.',
      icon: <Activity className="w-5 h-5 text-brand-orange" />,
      metric: 'Pain-free Mobility Achieved',
    },
    {
      id: 'j3',
      week: 'Week 8',
      title: 'Performance Milestone',
      desc: 'Lesson: Consistent metabolic conditioning stabilizes daily energy levels.',
      icon: <TrendingUp className="w-5 h-5 text-brand-orange" />,
      metric: 'Body Fat -8%',
    },
    {
      id: 'j4',
      week: 'Week 12',
      title: 'Permanent Outcome',
      desc: 'Lesson: Education prevents relapse. The member now sustains the results.',
      icon: <Trophy className="w-5 h-5 text-brand-orange" />,
      metric: 'Final Weight: 76kg',
    }
  ];

  return (
    <section 
      id="success-stories" 
      ref={containerRef}
      className="py-24 bg-black relative border-b border-brand-orange/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="inline-flex items-center text-xs uppercase font-bold tracking-widest text-brand-orange mb-3 bg-brand-orange/10 px-3 py-1 rounded-full border border-brand-orange/20">
              Sample Transformation Journey
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] mt-4">
              Real Process.<br />
              Real <span className="font-serif italic text-brand-orange lowercase font-normal">Outcomes</span>.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-sm text-sm leading-relaxed">
            We don't sell 12-week magic pills. We engineer predictable physical adaptations. Here is exactly what a 90-day cycle looks like when you commit to the system.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Sticky Image */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border border-brand-orange/15 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800"
                alt="Member Training"
                className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-brand-charcoal/80 backdrop-blur-md border border-white/10 rounded-xl p-4">
                  <h4 className="font-bebas text-2xl text-white tracking-wide">Aditya Vardhan</h4>
                  <p className="text-xs text-brand-orange font-bold uppercase mt-1">12-Week Recomposition</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Timeline */}
          <div className="lg:col-span-7 relative pt-8 lg:pt-0">
            {/* Vertical Connecting Line */}
            <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-white/5" />

            <div className="space-y-12">
              {journey.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-16 lg:pl-20"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-0 top-0 lg:left-2 flex items-center justify-center w-12 h-12 rounded-full bg-brand-charcoal border-2 border-brand-orange shadow-lg z-10">
                    {step.icon}
                  </div>

                  {/* Content Card */}
                  <div className="bg-brand-charcoal border border-brand-orange/5 hover:border-brand-orange/20 rounded-2xl p-6 md:p-8 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                        {step.week}
                      </span>
                      <span className="text-[10px] font-bold uppercase bg-brand-black px-2.5 py-1 rounded-md text-gray-400 border border-white/5">
                        {step.metric}
                      </span>
                    </div>
                    
                    <h3 className="font-bebas text-3xl text-white tracking-wide mb-3">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trial CTA */}
            <div className="mt-16 pl-16 lg:pl-20">
              <a
                href="#trial-form"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-xl hover:bg-brand-orange/90 transition-all duration-300"
              >
                Start Your Own Journey
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
