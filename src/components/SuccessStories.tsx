import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Quote, Calendar, Star } from 'lucide-react';

interface SuccessStory {
  id: string;
  name: string;
  planName: string;
  quote: string;
  story: string;
  image: string;
  achievement: string;
}

export default function SuccessStories() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const stories: SuccessStory[] = [
    {
      id: 's1',
      name: 'Aditya Vardhan',
      planName: 'Elite Coaching Program',
      achievement: 'Lost 22kg & Rebuilt Metabolic Health',
      quote: "Onyx Fitness completely restructured how I view training and food. It wasn't about starving; it was about scientific balance.",
      story: "Before joining, I was struggling with chronic fatigue and desk-bound back stiffness. The team created a hybrid strength and conditioning blueprint combined with custom caloric macros. Within 4 months, my body weight dropped from 94kg to 72kg, but more importantly, my energy levels are higher than in my college days. It's the most structured coaching setup in the city.",
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 's2',
      name: 'Shalini Rao',
      planName: '12-Week Transformation Split',
      achievement: 'Built Lean Strength & Fixed Posture',
      quote: 'The coaching team does not offer standard templates. Every session is tracked, scaled, and optimized for your specific bone structure.',
      story: "I wanted to gain strength without injuring my knees. The assessment highlighted hip-hinge deficiencies. My trainer re-engineered my squat patterns before pushing heavy loads. I went from squatting 20kg to a controlled 80kg with perfect form. My body fat is down 6%, and I feel stronger than ever. The accountability is what sets them apart.",
      image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 's3',
      name: 'Michael D\'Souza',
      planName: 'Athletic Conditioning Blueprint',
      achievement: 'Rebuilt Athletic Baseline Post-Injury',
      quote: 'They bridge the gap between physiotherapy and strength training. The recovery metrics are as important as the weights.',
      story: 'After a minor ligament strain, I was hesitant to lift heavy. The coaches worked in alignment with structural assessment guidelines. We focused on unilateral strength, stabilizing the joint capsules, and dynamic agility. 6 months in, I am back to high-intensity training, pain-free. This isn\'t just a gym; it\'s a performance lab.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
    }
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden border-b border-brand-orange/5">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              LIFESTYLE SHIFTS
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              Success Stories.<br />
              Our <span className="font-serif italic text-brand-orange lowercase font-normal">inspiration</span>.
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <span className="text-xs font-semibold px-3 py-1 rounded bg-brand-charcoal text-gray-400 border border-white/5">
              Sample member stories
            </span>
            <button
              onClick={scrollPrev}
              className="p-3 bg-brand-charcoal hover:bg-brand-orange hover:text-black text-white rounded-full border border-brand-orange/10 hover:border-transparent transition-all duration-300"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="p-3 bg-brand-charcoal hover:bg-brand-orange hover:text-black text-white rounded-full border border-brand-orange/10 hover:border-transparent transition-all duration-300"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex-[0_0_100%] min-w-0 px-4 md:px-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-brand-charcoal/40 border border-brand-orange/10 p-8 md:p-12 rounded-3xl backdrop-blur-md">
                  
                  {/* Portrait photo (Full Color Preferred) */}
                  <div className="lg:col-span-4 relative h-64 md:h-[350px] rounded-2xl overflow-hidden border border-brand-orange/10">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="font-bebas text-2xl tracking-wide text-white">
                        {story.name}
                      </h4>
                      <p className="text-xs text-brand-orange font-bold uppercase mt-0.5">
                        {story.planName}
                      </p>
                    </div>
                  </div>

                  {/* Story Text details */}
                  <div className="lg:col-span-8 flex flex-col justify-between text-left">
                    <div>
                      <Quote className="w-12 h-12 text-brand-orange/20 mb-4" />
                      
                      <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug">
                        "{story.quote}"
                      </h3>

                      <div className="mt-4 flex items-center space-x-2 text-xs font-bold text-brand-orange">
                        <Star className="w-4 h-4 fill-brand-orange" />
                        <span>{story.achievement}</span>
                      </div>

                      <p className="mt-6 text-sm text-gray-400 leading-relaxed font-light">
                        {story.story}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center space-x-6 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-brand-orange" />
                        Verified Member Journey
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
