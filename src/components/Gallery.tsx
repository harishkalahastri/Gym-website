import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: string;
  img: string;
  title: string;
  category: 'facility' | 'equipment' | 'coaching' | 'community' | 'transformation';
}

export default function Gallery() {
  const [selectedImg, setSelectedImg] = useState<GalleryItem | null>(null);

  const images: GalleryItem[] = [
    {
      id: 'g1',
      title: 'Barbell Strength Racks',
      category: 'equipment',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'g2',
      title: 'Premium Strength Training Floor',
      category: 'facility',
      img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'g3',
      title: '1-on-1 Biomechanics Coaching',
      category: 'coaching',
      img: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'g4',
      title: 'Focused Community Lifting Agility',
      category: 'community',
      img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'g5',
      title: 'Barbell Clean Transformation Moment',
      category: 'transformation',
      img: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'g6',
      title: 'Recovery Bay & Foam Rolling Zone',
      category: 'facility',
      img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-charcoal/10 relative border-b border-brand-orange/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
              THE CLUB
            </span>
            <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              Train Smarter.<br />
              Unleash Your <span className="font-serif italic text-brand-orange lowercase font-normal">potential</span>.
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-gray-400 max-w-sm text-sm">
            A visual walk through our training zones, precision equipment, and community. We don't use stock photos. This is the real facility you'll be training in.
          </p>
        </div>

        {/* Asymmetrical Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              onClick={() => setSelectedImg(item)}
              className="relative overflow-hidden rounded-2xl border border-brand-orange/5 group cursor-pointer break-inside-avoid shadow-lg"
            >
              {/* Optional partial grayscale filter (80% gray, transitions to color on hover) */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-auto object-cover grayscale-[70%] group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-102"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-left" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-left">
                <div>
                  <span className="text-[8px] uppercase tracking-wider font-bold text-brand-orange px-2 py-0.5 rounded bg-black/80 border border-brand-orange/20">
                    {item.category}
                  </span>
                  <h4 className="font-bebas text-lg text-white tracking-wide mt-1.5 leading-none">
                    {item.title}
                  </h4>
                </div>
                <div className="p-1.5 bg-brand-orange/95 text-black rounded-lg">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {selectedImg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImg(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-brand-charcoal border border-brand-orange/10 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/5 z-20"
                aria-label="Close lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <img
                src={selectedImg.img}
                alt={selectedImg.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />

              <div className="w-full p-4 bg-brand-black border-t border-white/5 flex items-center justify-between text-left">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-brand-orange">
                    Zone: {selectedImg.category}
                  </span>
                  <h4 className="font-bebas text-xl text-white tracking-wide mt-1">
                    {selectedImg.title}
                  </h4>
                </div>
                <a
                  href="#trial-form"
                  onClick={() => setSelectedImg(null)}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full"
                >
                  Book Free Visit
                </a>
              </div>
            </motion.div>
          </div>

        )}
      </AnimatePresence>
    </section>
  );
}
