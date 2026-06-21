import React from 'react';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Flame, Star, Award } from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  featuredLabel?: string;
  icon: React.ReactNode;
}

export default function Pricing() {
  const tiers: PricingTier[] = [
    {
      id: 'pr1',
      name: 'Standard Split',
      price: '₹3,500',
      period: 'Month',
      description: 'Perfect for self-disciplined lifters seeking premium equipment access.',
      icon: <Flame className="w-5 h-5 text-gray-400" />,
      features: [
        'Uncapped elite equipment access',
        '1 Biometric physical assessment',
        'Locker room & shower access',
        'Standard opening hour entry'
      ]
    },
    {
      id: 'pr2',
      name: 'Quarterly Adapt',
      price: '₹9,500',
      period: '3 Months',
      description: 'The optimal window to correct motor patterns and adapt metabolism.',
      isFeatured: true,
      featuredLabel: 'Most Popular Plan',
      icon: <Award className="w-5 h-5 text-brand-orange" />,
      features: [
        'Everything in Monthly, plus...',
        'Personalized Macro nutrition targets',
        '3 Core sessions with Senior Coach',
        'Bi-weekly progress compositions reviews',
        'Priority support channel access'
      ]
    },
    {
      id: 'pr3',
      name: 'Half-Year Build',
      price: '₹17,000',
      period: '6 Months',
      description: 'For individuals committed to structural athletic rebuilds.',
      icon: <Star className="w-5 h-5 text-gray-400" />,
      features: [
        'Everything in Quarterly, plus...',
        'Advanced performance testing splits',
        '6 Coach-led mobility workshops',
        'Continuous program micro adjustments',
        'Freeze membership option (up to 15 days)'
      ]
    },
    {
      id: 'pr4',
      name: 'Annual Transform',
      price: '₹30,000',
      period: '12 Months',
      description: 'Our ultimate commitment level for absolute metabolic transformations.',
      isFeatured: true,
      featuredLabel: 'Best Value Plan',
      icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />,
      features: [
        'Everything in Half-Year, plus...',
        'Full metabolic and metabolic profiling tests',
        'Weekly 1-on-1 private check-ins',
        'Complimentary training gear bundle',
        'Freeze membership option (up to 45 days)',
        'Unrestricted guest passes (12 / year)'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-brand-charcoal/20 relative overflow-hidden border-b border-brand-orange/5">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
            MEMBERSHIP INVESTMENT
          </span>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
            Structured Pricing. No Hidden <span className="font-serif italic text-brand-orange lowercase font-normal">fees</span>.
          </h2>
          <p className="text-gray-400 text-sm mt-4">
            Select an investment level that matches your horizon. Real physical adaptations require consistency.
          </p>
        </div>

        {/* 4-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`glass-card p-8 rounded-3xl bg-brand-charcoal flex flex-col justify-between transition-all duration-300 relative border-2 ${
                tier.isFeatured
                  ? 'border-brand-orange shadow-lg shadow-brand-orange/10 scale-[1.02] md:scale-100 lg:scale-[1.02] z-10'
                  : 'border-brand-orange/5 hover:border-brand-orange/20'
              }`}
            >
              {/* Popular/Featured Indicator Tag */}
              {tier.isFeatured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-orange text-black text-[9px] uppercase tracking-wider font-bold shadow-md">
                  {tier.featuredLabel}
                </span>
              )}

              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
                    {tier.name}
                  </span>
                  <div className="p-2 bg-brand-orange/5 rounded-lg border border-brand-orange/10">
                    {tier.icon}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-1.5 my-6">
                  <span className="font-bebas text-5xl text-white">{tier.price}</span>
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    / {tier.period}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed font-light mb-8">
                  {tier.description}
                </p>

                {/* Features checklist */}
                <div className="border-t border-white/5 pt-6">
                  <ul className="space-y-3.5 text-left">
                    {tier.features.map((feat, fidx) => (
                      <li key={fidx} className="flex items-start text-xs text-gray-300">
                        <Check className="w-4 h-4 text-brand-orange mr-2 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4">
                <a
                  href="#trial-form"
                  className={`w-full py-3.5 block text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                    tier.isFeatured
                      ? 'bg-brand-orange text-black hover:bg-brand-orange/90'
                      : 'bg-brand-black text-white hover:bg-brand-charcoal border border-brand-orange/15 hover:border-brand-orange/30'
                  }`}
                >
                  Join {tier.name.split(' ')[0]}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
