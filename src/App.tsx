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
import Process from './components/Process';
import AssessmentFlow from './components/AssessmentFlow';
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
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);

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
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 1. Global Navigation */}
      <Navbar
        onOpenAssessment={() => setIsAssessmentOpen(true)}
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

        {/* Section 8.5: Our Process */}
        <Process />

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
      <FloatingActions onOpenAssessment={() => setIsAssessmentOpen(true)} />
      <Chatbot />
      <ExitIntent />
      <OpsCenter />

      {/* Premium Assessment Flow Modal */}
      <AssessmentFlow 
        isOpen={isAssessmentOpen} 
        onClose={() => setIsAssessmentOpen(false)} 
      />
    </div>
  );
}
