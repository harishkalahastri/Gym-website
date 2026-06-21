import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Sparkles, Scale, Dumbbell, CalendarRange } from 'lucide-react';

interface FunnelStep {
  number: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function FirstVisit() {
  const steps: FunnelStep[] = [
    {
      number: '01',
      icon: <CalendarRange className="w-5 h-5 text-black" />,
      title: 'Book Trial',
      desc: 'Input your name and WhatsApp number. Secure your initial training slot instantly.'
    },
    {
      number: '02',
      icon: <Scale className="w-5 h-5 text-black" />,
      title: 'Fitness Assessment',
      desc: 'Meet your assigned coach. Review mobility restrictions, muscle imbalances, and biometrics.'
    },
    {
      number: '03',
      icon: <ClipboardList className="w-5 h-5 text-black" />,
      title: 'Personalized Plan',
      desc: 'Receive your custom training split, target weights, and precise daily nutritional macros.'
    },
    {
      number: '04',
      icon: <Dumbbell className="w-5 h-5 text-black" />,
      title: 'Active Training',
      desc: 'Execute your program. Track lifts and weight metrics under continuous coach supervision.'
    },
    {
      number: '05',
      icon: <Sparkles className="w-5 h-5 text-black" />,
      title: 'Transformation',
      desc: 'Evaluate progress in 30 days. Adjust variables, scale weights, and lock in outcomes.'
    }
  ];

  return (
    <section id="first-visit" className="py-24 bg-black relative border-b border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
            THE SYSTEM
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
            How We Get <span className="font-serif italic text-brand-orange lowercase font-normal">results</span>
          </h2>
          <p className="text-gray-400 text-sm mt-4">
            A structured path from curious visitor to transformed member. We take the speculation out of fitness. Follow the funnel, lock in the habit.
          </p>
        </div>

        {/* Timeline Path (Horizontal on desktop, Vertical on mobile) */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-brand-orange/20 via-brand-orange to-brand-orange/20 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center lg:items-start text-center lg:text-left group px-2"
              >
                {/* Index Circle Indicator */}
                <div className="relative flex items-center justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-brand-orange border border-brand-black flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 z-10">
                    {step.icon}
                  </div>
                  {/* Outer breathing ring */}
                  <div className="absolute -inset-1 rounded-full bg-brand-orange/10 animate-pulse z-0" />
                  
                  {/* Step index absolute numbering */}
                  <span className="absolute -top-3 -right-3 font-bebas text-lg text-brand-orange/80">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-bebas text-2xl text-white tracking-wide mt-2 group-hover:text-brand-orange transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-[11px] text-gray-500 mt-2 leading-relaxed font-light max-w-xs">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner at end of path */}
        <div className="mt-16 text-center">
          <a
            href="#trial-form"
            className="inline-flex items-center justify-center px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full hover:bg-brand-orange/95 transition-all shadow-md"
          >
            Launch Step 1: Book Free Trial
          </a>
        </div>

      </div>
    </section>
  );
}
