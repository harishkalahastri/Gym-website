import { motion } from 'framer-motion';
import { UserCheck, LineChart, CalendarCheck2, Apple, Users2, Shield } from 'lucide-react';

interface SuccessPillar {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export default function WhySucceed() {
  const pillars: SuccessPillar[] = [
    {
      id: 'p1',
      icon: <UserCheck className="w-6 h-6 text-brand-orange" />,
      title: 'Personalized Coaching',
      subtitle: 'No templates, ever.',
      description: 'Your biomechanics, injuries, and lifestyle dictate your lifting schedules. We program specifically for your bone lengths and joint structures.'
    },
    {
      id: 'p2',
      icon: <LineChart className="w-6 h-6 text-brand-orange" />,
      title: 'Progress Tracking',
      subtitle: 'Metrics control results.',
      description: 'Every set, rep, weight, macro, and body composition metric is logged and reviewed weekly to guarantee continuous metabolic progression.'
    },
    {
      id: 'p3',
      icon: <CalendarCheck2 className="w-6 h-6 text-brand-orange" />,
      title: 'Accountability Coaching',
      subtitle: 'Zero gaps in consistency.',
      description: 'Our coaching system checks in automatically when you miss a session. We help you navigate travel, stress, and busy schedules.'
    },
    {
      id: 'p4',
      icon: <Apple className="w-6 h-6 text-brand-orange" />,
      title: 'Nutrition Engineering',
      subtitle: 'Fuel for performance.',
      description: 'Sustainable nutritional macros customized to support muscle repair and thyroid health without aggressive, unsustainable fasting.'
    },
    {
      id: 'p5',
      icon: <Users2 className="w-6 h-6 text-brand-orange" />,
      title: 'Community Support',
      subtitle: 'Lift with the focused.',
      description: 'Surround yourself with professionals, athletes, and builders working toward physical excellence. An elite environment breeds discipline.'
    },
    {
      id: 'p6',
      icon: <Shield className="w-6 h-6 text-brand-orange" />,
      title: 'Recovery & Longevity',
      subtitle: 'Protect your joints.',
      description: 'Systematic mobility work, tissue release coaching, and sleep hygiene tracking to keep you lifting pain-free year after year.'
    }
  ];

  return (
    <section id="succeed" className="py-24 bg-black relative border-b border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
            THE BLUEPRINT
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
            Why Members <span className="font-serif italic text-brand-orange lowercase font-normal">succeed</span> Here
          </h2>
          <p className="text-gray-400 text-sm mt-4">
            Most fitness programs fail because they ignore the details. We bridge the gap between emotional desire and logical system execution.
          </p>
        </div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="glass-card p-8 rounded-2xl border border-brand-orange/5 bg-brand-charcoal/40 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                {/* Icon wrapper */}
                <div className="p-3 bg-brand-orange/10 rounded-xl w-fit mb-6">
                  {pillar.icon}
                </div>

                <h3 className="font-bebas text-2xl text-white tracking-wide">
                  {pillar.title}
                </h3>
                
                <h4 className="text-brand-orange text-xs font-semibold uppercase tracking-wider mt-1.5 mb-4">
                  {pillar.subtitle}
                </h4>

                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {pillar.description}
                </p>
              </div>

              {/* Next Step Action */}
              <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-gray-500 hover:text-brand-orange transition-colors">
                <span>Outcome Pillar {index + 1}</span>
                <a href="#trial-form" className="text-brand-orange hover:underline font-bold">
                  Book Consultation &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
