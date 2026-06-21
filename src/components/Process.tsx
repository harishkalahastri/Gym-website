import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, NotebookPen, Dumbbell, LineChart, Trophy } from 'lucide-react';

export default function Process() {
  const steps = [
    {
      id: 'step-1',
      title: 'Assessment',
      desc: 'We start by measuring your baseline. We analyze your body composition, joint mobility, and discuss your lifestyle constraints to understand exactly where you are starting from.',
      icon: <ClipboardList className="w-6 h-6 text-brand-orange" />,
    },
    {
      id: 'step-2',
      title: 'Planning',
      desc: 'No generic templates. Your coach builds a custom 90-day roadmap targeting your specific goals, complete with an adaptive nutrition plan that fits your life.',
      icon: <NotebookPen className="w-6 h-6 text-brand-orange" />,
    },
    {
      id: 'step-3',
      title: 'Coaching',
      desc: 'You execute the plan under the guidance of our expert coaches. We ensure your form is perfect, protecting you from injury while pushing you to your actual limits.',
      icon: <Dumbbell className="w-6 h-6 text-brand-orange" />,
    },
    {
      id: 'step-4',
      title: 'Tracking',
      desc: 'We monitor your progress weekly. If your weight loss stalls or your strength plateaus, we adjust the variables immediately so you never stop moving forward.',
      icon: <LineChart className="w-6 h-6 text-brand-orange" />,
    },
    {
      id: 'step-5',
      title: 'Transformation',
      desc: 'You hit your goals, but more importantly, you learn how to sustain them. You leave with a new body and the knowledge of exactly how to keep it forever.',
      icon: <Trophy className="w-6 h-6 text-brand-orange" />,
    }
  ];

  return (
    <section id="process" className="py-24 bg-brand-charcoal/40 relative border-b border-brand-orange/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              THE SYSTEM
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              How Results Are <span className="font-serif italic text-brand-orange lowercase font-normal">Built</span>
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-sm text-sm">
            We don't just rent you equipment and hope for the best. We take you through a structured, 5-step protocol guaranteed to produce results.
          </p>
        </div>

        {/* Vertical Timeline Process */}
        <div className="relative max-w-3xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-orange/0 via-brand-orange/20 to-brand-orange/0 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-20 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Center Node (Icon) */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-brand-charcoal border-2 border-brand-orange shadow-[0_0_15px_rgba(255,95,0,0.2)] z-20">
                    {step.icon}
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 pl-20 md:px-12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-brand-charcoal border border-white/5 rounded-2xl p-6 md:p-8 hover:border-brand-orange/20 transition-colors shadow-xl">
                      <div className={`flex items-center space-x-3 mb-3 ${isEven ? 'md:flex-row-reverse md:space-x-reverse' : ''}`}>
                        <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded">
                          Step 0{index + 1}
                        </span>
                        <h3 className="font-bebas text-2xl text-white tracking-wide">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Global CTA */}
        <div className="mt-20 text-center">
          <a
            href="#trial-form"
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full hover:bg-brand-orange/90 transition-all duration-300 transform hover:scale-[1.03] shadow-lg shadow-brand-orange/20"
          >
            Start Your Assessment
          </a>
        </div>

      </div>
    </section>
  );
}
