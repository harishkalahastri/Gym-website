import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Calendar, Apple, Users, Award, Shield } from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      title: 'Nutrition Guidance',
      desc: 'Simple, realistic meal plans that fit your lifestyle, not starving crash diets.',
      icon: <Apple className="w-5 h-5 text-brand-orange" />
    },
    {
      title: 'Expert Trainers',
      desc: 'Experienced coaches who focus on perfect form and preventing injuries.',
      icon: <Award className="w-5 h-5 text-brand-orange" />
    },
    {
      title: 'Progress Tracking',
      desc: 'Weekly check-ins to track your strength gains and body fat loss.',
      icon: <Dumbbell className="w-5 h-5 text-brand-orange" />
    },
    {
      title: 'Premium Facility',
      desc: 'Clean, uncrowded training floor with premium equipment and recovery zones.',
      icon: <Shield className="w-5 h-5 text-brand-orange" />
    },
    {
      title: 'Community Support',
      desc: 'A supportive environment of professionals working toward the same goals.',
      icon: <Users className="w-5 h-5 text-brand-orange" />
    },
    {
      title: 'Flexible Timings',
      desc: 'Open 6AM to 11PM daily. Training that fits around your busy work schedule.',
      icon: <Calendar className="w-5 h-5 text-brand-orange" />
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-brand-charcoal/20 relative overflow-hidden border-b border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Large Color Action Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative h-[350px] sm:h-[480px] rounded-3xl overflow-hidden border border-brand-orange/15 shadow-2xl"
          >
            {/* Color action photo with premium grading */}
            <img
              src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800"
              alt="Premium Coach Guiding Lift"
              className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            />
            {/* Corner border highlights */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-brand-orange rounded-tl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-brand-orange rounded-br-lg" />
          </motion.div>

          {/* Right Side: Header and Bullet List */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 text-left flex flex-col justify-center"
          >
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              THE EXPERTISE
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95] mb-6">
              Build Habits That <span className="font-serif italic text-brand-orange lowercase font-normal">Last</span>.
            </h2>
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
              You don't need another generic gym membership. You need a dedicated coach to hold you accountable, fix your form, and guarantee you actually hit your goals.
            </p>

            {/* Combined Bullet List Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
              {features.map((feat, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start space-x-4 group p-4 -m-4 rounded-2xl border border-transparent hover:border-brand-orange/20 hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(255,95,0,0.12)] hover:bg-brand-orange/[0.02] transition-all duration-300"
                >
                  <div className="p-2.5 bg-brand-orange/10 border border-brand-orange/5 rounded-xl group-hover:bg-brand-orange/15 group-hover:border-brand-orange/40 group-hover:shadow-[0_0_25px_rgba(255,95,0,0.25)] group-hover:scale-105 transition-all duration-300 shrink-0">
                    {feat.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition-colors duration-300">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Consultation CTA */}
            <div className="mt-10 pt-8 border-t border-white/5">
              <a
                href="#trial-form"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-brand-orange hover:text-white transition-colors"
              >
                Schedule An Initial Assessment &rarr;
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
