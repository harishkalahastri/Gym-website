import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Check, Loader2, ShieldCheck } from 'lucide-react';

const enrollmentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  whatsapp_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Enter a valid WhatsApp number (e.g. +919876543210)'),
  email: z.string().email('Please enter a valid email address'),
  fitness_goal: z.enum(['weight_loss', 'build_muscle', 'general_fitness', 'sport_specific'], {
    message: 'Please select a primary goal',
  }),
  preferred_start_date: z.string().min(1, 'Please select a start date'),
  gender: z.enum(['male', 'female', 'other'], { message: 'Please select gender' }),
  age: z.string().min(1, 'Age is required'),
});

type EnrollmentFormValues = z.infer<typeof enrollmentSchema>;

export interface SelectedPlan {
  name: string;
  price: string;
  period: string;
  description: string;
}

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: SelectedPlan | null;
}

export default function EnrollmentModal({ isOpen, onClose, plan }: EnrollmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(enrollmentSchema),
  });

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setServerError(null);
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: EnrollmentFormValues) => {
    setIsSubmitting(true);
    setServerError(null);
    try {
      // Map it to the existing trial-form endpoint to avoid schema changes
      // We will cram the extra details into the preferred_time parameter
      const enhancedTimeField = `Plan: ${plan?.name} | Start: ${data.preferred_start_date} | Age: ${data.age} | Gender: ${data.gender}`;

      const response = await fetch('/api/leads/trial-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          whatsapp_number: data.whatsapp_number,
          email: data.email,
          fitness_goal: data.fitness_goal,
          preferred_time: enhancedTimeField,
          source: 'enrollment_modal',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Enrollment request failed');
      }

      setIsSuccess(true);
    } catch (err) {
      console.error(err);
      const errMsg = err instanceof Error ? err.message : 'Something went wrong. Please check your network and try again.';
      setServerError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !plan) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-brand-charcoal border border-brand-orange/15 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar"
          data-lenis-prevent="true"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-brand-black/60 text-gray-400 hover:text-white border border-white/5 z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header showing selected plan */}
          <div className="bg-brand-black p-8 border-b border-white/5 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange/20 via-brand-orange to-brand-orange/20" />
            <span className="text-xs uppercase font-bold tracking-widest text-brand-orange block mb-2">
              Membership Enrollment
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h3 className="font-bebas text-4xl text-white uppercase tracking-wider">{plan.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="font-bebas text-3xl text-brand-orange">{plan.price}</div>
                <div className="text-xs uppercase tracking-wider text-gray-500">/ {plan.period}</div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-brand-orange/10 border border-brand-orange/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-brand-orange" />
                </div>
                <h3 className="font-bebas text-4xl text-white tracking-wider uppercase mb-3">
                  Request Received
                </h3>
                <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed font-light mb-8">
                  Your enrollment request for the {plan.name} has been securely logged. Our membership manager will contact you shortly to finalize your setup.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#20bd5a] transition-colors"
                  >
                    WhatsApp Us Now
                  </a>
                  <a
                    href="tel:+919876543210"
                    className="px-6 py-3 bg-brand-black border border-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:border-brand-orange/30 transition-colors"
                  >
                    Call Gym
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 font-semibold mb-2">Full Name</label>
                    <input
                      type="text"
                      {...register('name')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm"
                    />
                    {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 font-semibold mb-2">WhatsApp Number</label>
                    <input
                      type="tel"
                      {...register('whatsapp_number')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm"
                    />
                    {errors.whatsapp_number && <span className="text-xs text-red-500 mt-1">{errors.whatsapp_number.message}</span>}
                  </div>

                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-xs text-gray-400 font-semibold mb-2">Email Address</label>
                    <input
                      type="email"
                      {...register('email')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm"
                    />
                    {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email.message}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 font-semibold mb-2">Age</label>
                    <input
                      type="number"
                      {...register('age')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm"
                    />
                    {errors.age && <span className="text-xs text-red-500 mt-1">{errors.age.message}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 font-semibold mb-2">Gender</label>
                    <select
                      {...register('gender')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <span className="text-xs text-red-500 mt-1">{errors.gender.message}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 font-semibold mb-2">Primary Goal</label>
                    <select
                      {...register('fitness_goal')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm cursor-pointer"
                    >
                      <option value="">Select Goal</option>
                      <option value="weight_loss">Lose Weight</option>
                      <option value="build_muscle">Build Muscle</option>
                      <option value="general_fitness">General Fitness</option>
                      <option value="sport_specific">Athletic Performance</option>
                    </select>
                    {errors.fitness_goal && <span className="text-xs text-red-500 mt-1">{errors.fitness_goal.message}</span>}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs text-gray-400 font-semibold mb-2">Preferred Start Date</label>
                    <input
                      type="date"
                      {...register('preferred_start_date')}
                      disabled={isSubmitting}
                      className="px-4 py-3 bg-brand-black text-white rounded-xl border border-brand-orange/10 focus:border-brand-orange/50 focus:outline-none text-sm [color-scheme:dark]"
                    />
                    {errors.preferred_start_date && <span className="text-xs text-red-500 mt-1">{errors.preferred_start_date.message}</span>}
                  </div>
                </div>

                {serverError && (
                  <div className="text-xs text-red-500 text-left mt-3">{serverError}</div>
                )}

                <div className="mt-8 pt-6 border-t border-white/5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-orange text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-brand-orange/90 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Reserve My Membership'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
