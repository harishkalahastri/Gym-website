import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ArrowRight, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsapp_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Enter a valid WhatsApp number (e.g. +919876543210)'),
});

type ContactValues = z.infer<typeof contactSchema>;

interface QuizAnswers {
  goal: string;
  frequency: string;
  experience: string;
}

export default function FitnessQuiz() {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [leadContact, setLeadContact] = useState<ContactValues | null>(null);
  const [answers, setAnswers] = useState<QuizAnswers>({
    goal: '',
    frequency: '',
    experience: '',
  });

  // removed unused state to pass strict linting
  const [serverError, setServerError] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<{
    matched_program: string;
    reason: string;
    recommendation: string;
  } | null>(null);

  const {
    register: regContact,
    handleSubmit: handleSubContact,
    formState: { errors: errContact },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
  });

  const onContactSubmit = (data: ContactValues) => {
    setLeadContact(data);
    setStep(2);
  };

  const handleGoalSelect = (val: string) => {
    setAnswers((prev) => ({ ...prev, goal: val }));
    setStep(3);
  };

  const handleFrequencySelect = (val: string) => {
    setAnswers((prev) => ({ ...prev, frequency: val }));
    setStep(4);
  };

  const handleExperienceSelect = async (val: string) => {
    if (!leadContact) return;
    const finalAnswers = { ...answers, experience: val };
    setAnswers(finalAnswers);
    setStep(5); // Loading
    // loading state set below
    setServerError(null);

    try {
      const response = await fetch('/api/leads/fitness-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadContact.name,
          whatsapp_number: leadContact.whatsapp_number,
          goal_answer: finalAnswers.goal,
          frequency_answer: finalAnswers.frequency,
          experience_answer: finalAnswers.experience,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Quiz submission failed.');
      }

      const result = await response.json();
      setQuizResult(result);
      setStep(6);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Unable to analyze quiz answers.';
      setServerError(errMsg);
      setStep(4); // Drop back to step 4 so they can retry
    } finally {
      // loading finished
    }
  };

  const resetQuiz = () => {
    setAnswers({ goal: '', frequency: '', experience: '' });
    setQuizResult(null);
    setStep(1);
  };

  // Content configuration
  const goalOptions = [
    { label: 'Lose Weight & Body Fat', value: 'weight_loss' },
    { label: 'Build Lean Muscle Mass', value: 'build_muscle' },
    { label: 'Improve General Fitness', value: 'general_fitness' },
    { label: 'Sport-Specific Training', value: 'sport_specific' },
  ];

  const frequencyOptions = [
    { label: '1-2 Days / Week', value: '1-2' },
    { label: '3-4 Days / Week', value: '3-4' },
    { label: '5+ Days / Week', value: '5+' },
  ];

  const experienceOptions = [
    { label: 'Beginner (0-6 months)', value: 'beginner' },
    { label: 'Some Experience (6m - 2 years)', value: 'some_experience' },
    { label: 'Advanced (2+ years of lifting)', value: 'advanced' },
  ];

  return (
    <section id="fitness-quiz" className="py-24 bg-black relative border-b border-brand-orange/5">
      <div className="absolute top-1/2 right-10 w-64 h-64 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
            BLUEPRINT ROUTING
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl text-white uppercase tracking-wider">
            Find Your Training Path
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
            Take our 60-second guided fitness quiz. Our algorithm maps your goals to a structured adaptive program.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="glass-card bg-brand-charcoal border border-brand-orange/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
          
          {/* Progress dots at top (Steps 2 to 4 show progress) */}
          {step >= 2 && step <= 4 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center space-x-2.5 z-20">
              <div className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-brand-orange' : 'bg-brand-black border border-white/10'}`} />
              <div className={`w-2.5 h-2.5 rounded-full ${step >= 3 ? 'bg-brand-orange' : 'bg-brand-black border border-white/10'}`} />
              <div className={`w-2.5 h-2.5 rounded-full ${step >= 4 ? 'bg-brand-orange' : 'bg-brand-black border border-white/10'}`} />
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: CONTACT CAPTURE */}
            {step === 1 && (
              <motion.div
                key="qstep1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 bg-brand-orange/10 rounded-xl">
                    <HelpCircle className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                    Step 1: Contact Verification
                  </h3>
                </div>

                <form onSubmit={handleSubContact(onContactSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="quiz-name">
                        Your Full Name
                      </label>
                      <input
                        id="quiz-name"
                        type="text"
                        placeholder="Aditya Vardhan"
                        {...regContact('name')}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm"
                      />
                      {errContact.name && (
                        <span className="text-xs text-red-500 mt-1">{errContact.name.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="quiz-whatsapp">
                        WhatsApp Number
                      </label>
                      <input
                        id="quiz-whatsapp"
                        type="tel"
                        placeholder="WhatsApp Number (e.g. +919876543210)"
                        {...regContact('whatsapp_number')}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm"
                      />
                      {errContact.whatsapp_number && (
                        <span className="text-xs text-red-500 mt-1">{errContact.whatsapp_number.message}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500">
                    *By proceeding, you consent to mapping your answers and receiving a summary of your matching program splits directly on WhatsApp.
                  </p>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-brand-orange text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-brand-orange/95 transition-all flex items-center"
                    >
                      Start Assessment Quiz
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: GOAL QUESTION */}
            {step === 2 && (
              <motion.div
                key="qstep2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                    Q1: What is your primary fitness goal?
                  </h3>
                  <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-white">
                    Back
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleGoalSelect(opt.value)}
                      className="p-5 text-left bg-brand-black text-sm text-gray-300 hover:text-black hover:bg-brand-orange border border-brand-orange/15 hover:border-transparent rounded-xl transition-all duration-300 font-bold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: FREQUENCY QUESTION */}
            {step === 3 && (
              <motion.div
                key="qstep3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                    Q2: How many days a week can you dedicate to lifting?
                  </h3>
                  <button onClick={() => setStep(2)} className="text-xs text-gray-400 hover:text-white">
                    Back
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {frequencyOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleFrequencySelect(opt.value)}
                      className="p-5 text-center bg-brand-black text-sm text-gray-300 hover:text-black hover:bg-brand-orange border border-brand-orange/15 hover:border-transparent rounded-xl transition-all duration-300 font-bold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: EXPERIENCE QUESTION */}
            {step === 4 && (
              <motion.div
                key="qstep4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                    Q3: What is your current lifting/gym experience level?
                  </h3>
                  <button onClick={() => setStep(3)} className="text-xs text-gray-400 hover:text-white">
                    Back
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {experienceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleExperienceSelect(opt.value)}
                      className="p-5 text-center bg-brand-black text-sm text-gray-300 hover:text-black hover:bg-brand-orange border border-brand-orange/15 hover:border-transparent rounded-xl transition-all duration-300 font-bold"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                {serverError && (
                  <div className="text-xs text-red-500 mt-4">{serverError}</div>
                )}
              </motion.div>
            )}

            {/* STEP 5: LOADER */}
            {step === 5 && (
              <motion.div
                key="qstep5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <Loader2 className="w-12 h-12 text-brand-orange animate-spin mx-auto mb-6" />
                <h3 className="font-bebas text-2xl text-white tracking-wider uppercase">
                  Mapping Adaptive Blueprint...
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Matching parameters against outcomes database, nutrition templates, and trainer capacities.
                </p>
              </motion.div>
            )}

            {/* STEP 6: RESULT SHOWCASE */}
            {step === 6 && quizResult && (
              <motion.div
                key="qstep6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange" />
                </div>
                
                <span className="text-xs uppercase font-bold tracking-widest text-brand-orange">
                  MATCHED TRAINING PATH
                </span>
                
                <h3 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide mt-2">
                  {quizResult.matched_program}
                </h3>

                <p className="text-xs text-gray-400 mt-3 max-w-lg mx-auto font-light leading-relaxed">
                  "{quizResult.reason}"
                </p>

                {/* AI Advice Context block (Encouraging Tone) */}
                <div className="mt-6 p-5 bg-brand-black/40 border border-white/5 rounded-2xl max-w-lg mx-auto text-left">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-brand-orange block mb-2">
                    COACH RECOMMENDATION
                  </span>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {quizResult.recommendation}
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="#trial-form"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full hover:bg-brand-orange/90 transition-all"
                  >
                    Book Free Trial
                  </a>
                  <a
                    href={`https://wa.me/919999999999?text=Hello!%20I%20just%20completed%20your%20fitness%20quiz%20and%20matched%20with%20the%20${encodeURIComponent(quizResult.matched_program)}%20program.%20I'd%20like%20to%20schedule%20an%20assessment.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-brand-orange/30 rounded-full hover:border-brand-orange transition-all"
                  >
                    WhatsApp Coach
                  </a>
                  <button
                    onClick={resetQuiz}
                    className="text-xs text-gray-500 hover:text-white flex items-center py-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 mr-1" />
                    Retake Quiz
                  </button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
