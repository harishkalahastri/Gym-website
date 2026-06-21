import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, ArrowLeft, Loader2, RefreshCw } from 'lucide-react';

const step1Schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsapp_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Enter a valid WhatsApp number (e.g. +919876543210)'),
});

const step2Schema = z.object({
  height_cm: z.number().min(100, 'Height must be between 100 and 250 cm').max(250, 'Height must be between 100 and 250 cm'),
  weight_kg: z.number().min(30, 'Weight must be between 30 and 300 kg').max(300, 'Weight must be between 30 and 300 kg'),
  age: z.number().min(14, 'Age must be between 14 and 100').max(100, 'Age must be between 14 and 100'),
  gender: z.enum(['male', 'female', 'other'], {
    message: 'Please select a gender',
  }),
});

type Step1Values = z.infer<typeof step1Schema>;
type Step2Values = z.infer<typeof step2Schema>;

export default function BMICalculator() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [leadData, setLeadData] = useState<Step1Values | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // Result state
  const [bmiResult, setBmiResult] = useState<{
    bmi_value: number;
    bmi_category: string;
    recommendation: string;
  } | null>(null);

  // Forms
  const {
    register: reg1,
    handleSubmit: handleSub1,
    formState: { errors: err1 },
  } = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
  });

  const {
    register: reg2,
    handleSubmit: handleSub2,
    formState: { errors: err2 },
    watch: watch2,
  } = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      height_cm: 170,
      weight_kg: 70,
      age: 28,
    },
  });

  const heightVal = watch2('height_cm');

  const onStep1Submit = (data: Step1Values) => {
    setLeadData(data);
    setStep(2);
  };

  const onStep2Submit = async (data: Step2Values) => {
    if (!leadData) return;
    setIsSubmitting(true);
    setServerError(null);
    try {
      const response = await fetch('/api/leads/bmi-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadData.name,
          whatsapp_number: leadData.whatsapp_number,
          height_cm: Number(data.height_cm),
          weight_kg: Number(data.weight_kg),
          age: Number(data.age),
          gender: data.gender,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Calculation request failed.');
      }

      const result = await response.json();
      setBmiResult(result);
      setStep(3);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Unable to compute BMI. Please verify values.';
      setServerError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetCalculator = () => {
    setBmiResult(null);
    setStep(1);
  };

  // Helper to determine indicator bar position based on category
  const getMarkerOffset = (category: string) => {
    switch (category.toLowerCase()) {
      case 'underweight':
        return '15%';
      case 'healthy':
        return '40%';
      case 'overweight':
        return '65%';
      case 'obese':
      default:
        return '90%';
    }
  };

  return (
    <section id="bmi-calculator" className="py-24 bg-brand-charcoal/20 relative overflow-hidden border-b border-brand-orange/5">
      <div className="absolute top-1/3 left-10 w-64 h-64 rounded-full bg-brand-orange/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-3">
            ASSESS YOUR BASELINE
          </span>
          <h2 className="font-bebas text-4xl sm:text-5xl text-white uppercase tracking-wider">
            Know Your Numbers
          </h2>
          <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
            Your body composition shapes your training parameters. Use our calculator to compute your BMI and retrieve structured guidance.
          </p>
        </div>

        {/* Card Container */}
        <div className="glass-card bg-brand-charcoal border border-brand-orange/10 p-8 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden min-h-[420px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: LEAD CAPTURE */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2.5 bg-brand-orange/10 rounded-xl">
                    <Calculator className="w-5 h-5 text-brand-orange" />
                  </div>
                  <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                    Step 1: Contact Details
                  </h3>
                </div>

                <form onSubmit={handleSub1(onStep1Submit)} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="bmi-name">
                        Your Full Name
                      </label>
                      <input
                        id="bmi-name"
                        type="text"
                        placeholder="Rohan Reddy"
                        {...reg1('name')}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm transition-colors"
                      />
                      {err1.name && (
                        <span className="text-xs text-red-500 mt-1">{err1.name.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="bmi-whatsapp">
                        WhatsApp Number
                      </label>
                      <input
                        id="bmi-whatsapp"
                        type="tel"
                        placeholder="WhatsApp Number (e.g. +919876543210)"
                        {...reg1('whatsapp_number')}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm transition-colors"
                      />
                      {err1.whatsapp_number && (
                        <span className="text-xs text-red-500 mt-1">{err1.whatsapp_number.message}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed">
                    *We value privacy. We will send your computed BMI report and a free training tip directly to this WhatsApp number. No promotional spam.
                  </p>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-brand-orange text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-brand-orange/95 transition-all flex items-center"
                    >
                      Continue to Calculator
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: CALCULATOR INPUTS */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-left"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-brand-orange/10 rounded-xl">
                      <Calculator className="w-5 h-5 text-brand-orange" />
                    </div>
                    <h3 className="font-bebas text-2xl text-white tracking-wide uppercase">
                      Step 2: Biometrics
                    </h3>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs text-gray-400 hover:text-white flex items-center"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back
                  </button>
                </div>

                <form onSubmit={handleSub2(onStep2Submit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Height input with numerical display */}
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs text-gray-400 font-semibold" htmlFor="bmi-height">
                          Height (cm)
                        </label>
                        <span className="text-sm font-bold text-brand-orange">{heightVal} cm</span>
                      </div>
                      <input
                        id="bmi-height"
                        type="range"
                        min="100"
                        max="250"
                        {...reg2('height_cm', { valueAsNumber: true })}
                        className="w-full h-1 bg-brand-black rounded-lg appearance-none cursor-pointer accent-brand-orange"
                      />
                      {err2.height_cm && (
                        <span className="text-xs text-red-500 mt-1">{err2.height_cm.message}</span>
                      )}
                    </div>

                    {/* Weight Input */}
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="bmi-weight">
                        Weight (kg)
                      </label>
                      <input
                        id="bmi-weight"
                        type="number"
                        placeholder="72"
                        {...reg2('weight_kg', { valueAsNumber: true })}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm transition-colors"
                      />
                      {err2.weight_kg && (
                        <span className="text-xs text-red-500 mt-1">{err2.weight_kg.message}</span>
                      )}
                    </div>

                    {/* Age Input */}
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="bmi-age">
                        Age (Years)
                      </label>
                      <input
                        id="bmi-age"
                        type="number"
                        placeholder="28"
                        {...reg2('age', { valueAsNumber: true })}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm transition-colors"
                      />
                      {err2.age && (
                        <span className="text-xs text-red-500 mt-1">{err2.age.message}</span>
                      )}
                    </div>

                    {/* Gender Select */}
                    <div className="flex flex-col">
                      <label className="text-xs text-gray-400 font-semibold mb-2" htmlFor="bmi-gender">
                        Biological Gender
                      </label>
                      <select
                        id="bmi-gender"
                        {...reg2('gender')}
                        className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm transition-colors cursor-pointer"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {err2.gender && (
                        <span className="text-xs text-red-500 mt-1">{err2.gender.message}</span>
                      )}
                    </div>
                  </div>

                  {serverError && (
                    <div className="text-xs text-red-500 text-left mt-2">{serverError}</div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-brand-orange text-black font-bold uppercase tracking-wider text-xs rounded-full hover:bg-brand-orange/95 transition-all flex items-center disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Analyzing Biometrics...
                        </>
                      ) : (
                        <>
                          Calculate My BMI
                          <Calculator className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 3: RESULT DISPLAY */}
            {step === 3 && bmiResult && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center"
              >
                <span className="text-xs uppercase font-bold tracking-widest text-brand-orange">
                  ANALYSIS RESULT
                </span>
                
                {/* Large BMI Number */}
                <h3 className="font-bebas text-6xl sm:text-7xl text-white tracking-wide mt-2">
                  BMI: {bmiResult.bmi_value.toFixed(1)}
                </h3>

                {/* Category tag */}
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-bold uppercase tracking-wider mt-1">
                  {bmiResult.bmi_category}
                </div>

                {/* Horizontal range bar indicator */}
                <div className="mt-8 max-w-md mx-auto relative px-2">
                  <div className="h-2 w-full bg-brand-black rounded-full flex overflow-hidden border border-white/5">
                    <div className="w-[20%] bg-blue-500/50" />
                    <div className="w-[30%] bg-green-500/50" />
                    <div className="w-[25%] bg-yellow-500/50" />
                    <div className="w-[25%] bg-red-500/50" />
                  </div>
                  {/* Sliding marker pin */}
                  <div
                    className="absolute -top-1 w-4 h-4 bg-brand-orange border border-white rounded-full shadow-lg transition-all duration-1000 -translate-x-1/2"
                    style={{ left: getMarkerOffset(bmiResult.bmi_category) }}
                  />
                  <div className="flex justify-between text-[8px] text-gray-500 mt-2 px-1 uppercase tracking-widest font-bold">
                    <span>Under</span>
                    <span>Healthy</span>
                    <span>Over</span>
                    <span>Obese</span>
                  </div>
                </div>

                {/* Encouraging Recommendation context */}
                <div className="mt-8 p-5 bg-brand-black/40 border border-white/5 rounded-2xl max-w-lg mx-auto">
                  <p className="text-xs text-gray-300 leading-relaxed text-left font-light">
                    {bmiResult.recommendation}
                  </p>
                </div>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href="#trial-form"
                    className="w-full sm:w-auto px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full hover:bg-brand-orange/90 transition-all"
                  >
                    Book Free Trial
                  </a>
                  <a
                    href="https://wa.me/919999999999?text=Hello!%20I%20just%20calculated%20my%20BMI%20on%20your%20website%20and%20got%20a%20result%20of%20"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white border border-brand-orange/30 rounded-full hover:border-brand-orange transition-all"
                  >
                    WhatsApp Coach
                  </a>
                  <button
                    onClick={resetCalculator}
                    className="text-xs text-gray-500 hover:text-white flex items-center py-2"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1" />
                    Reset
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
