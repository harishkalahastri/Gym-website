import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Transformations from './components/Transformations';
import EarlyLead from './components/EarlyLead';
import SuccessStories from './components/SuccessStories';
import Metrics from './components/Metrics';
import WhySucceed from './components/WhySucceed';
import WhyUs from './components/WhyUs';
import Programs from './components/Programs';
import BMICalculator from './components/BMICalculator';
import FitnessQuiz from './components/FitnessQuiz';
import Gallery from './components/Gallery';
import FirstVisit from './components/FirstVisit';
import Pricing from './components/Pricing';
import TrialForm from './components/TrialForm';
import Trainers from './components/Trainers';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import Chatbot from './components/Chatbot';
import ExitIntent from './components/ExitIntent';
import OpsCenter from './components/OpsCenter';

export default function App() {
  const [isBmiModalOpen, setIsBmiModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* 1. Global Navigation */}
      <Navbar
        onOpenQuiz={() => setIsQuizModalOpen(true)}
        onOpenBMI={() => setIsBmiModalOpen(true)}
      />

      {/* 2. Structured Layout sections */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Outcomes/Before-After Grid */}
        <Transformations />

        {/* Section 3: Early Lead capture (Fast-track) */}
        <EarlyLead />

        {/* Section 4: Success Stories Stories carousel */}
        <SuccessStories />

        {/* Section 5: Results & Metrics local dashboard */}
        <Metrics />

        {/* Section 6: Why Members Succeed (Emotional/Logical bridge) */}
        <WhySucceed />

        {/* Section 7: Why Choose Us (Bullet list + action picture) */}
        <WhyUs />

        {/* Section 8: Programs Adaptation Splits */}
        <Programs />

        {/* Section 9: BMI Calculator (In-page Flow) */}
        <BMICalculator />

        {/* Section 10: Fitness Quiz (In-page Flow) */}
        <FitnessQuiz />

        {/* Section 11: Club zones gallery */}
        <Gallery />

        {/* Section 12: First Visit ExperienceTimeline Visual Funnel */}
        <FirstVisit />

        {/* Section 13: Membership pricing cards */}
        <Pricing />

        {/* Section 14: Comprehensive trial booking form */}
        <TrialForm />

        {/* Section 15: Coaches grid bio details */}
        <Trainers />

        {/* Section 16: Accordion FAQ checklist */}
        <FAQ />

        {/* Section 17: Full-bleed urgency CTA banner */}
        <FinalCTA />
      </main>

      {/* 3. Footer & SEO Metadata */}
      <Footer />

      {/* 4. Global Overlays, Sticky CTAs & Analytics panels */}
      <FloatingActions />
      <Chatbot />
      <ExitIntent />
      <OpsCenter />

      {/* BMI Calculator Quick Modal */}
      <AnimatePresence>
        {isBmiModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBmiModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl z-10"
            >
              <button
                onClick={() => setIsBmiModalOpen(false)}
                className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-white bg-brand-charcoal/80 rounded-full border border-white/5"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <BMICalculator />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Fitness Quiz Quick Modal */}
      <AnimatePresence>
        {isQuizModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsQuizModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl z-10"
            >
              <button
                onClick={() => setIsQuizModalOpen(false)}
                className="absolute top-4 right-4 z-30 p-2 text-gray-400 hover:text-white bg-brand-charcoal/80 rounded-full border border-white/5"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <FitnessQuiz />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
