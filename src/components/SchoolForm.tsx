import React, { useState } from 'react';
import { Sparkles, School, GraduationCap, MapPin, Wallet, Accessibility, Activity, User, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface SchoolFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const STEPS = [
  { id: 'basics', title: 'The Basics', icon: School },
  { id: 'needs', title: 'Specific Needs', icon: Accessibility },
  { id: 'child', title: 'About the Child', icon: User },
];

export default function SchoolForm({ onSubmit, isLoading }: SchoolFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    budget: '',
    disabilitySupport: 'No',
    curriculum: 'Any',
    levels: 'Primary',
    location: '',
    extracurriculars: '',
    childPersonality: '',
    childDescription: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-600 text-lg";
  const labelClasses = "flex items-center gap-2 text-sm font-semibold text-zinc-500 mb-3 uppercase tracking-wider";

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className={labelClasses}><Wallet className="w-4 h-4" /> Budget (Annual Fees)</label>
                <input
                  type="text"
                  name="budget"
                  placeholder="e.g. 100k - 300k KES"
                  className={inputClasses}
                  value={formData.budget}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className={labelClasses}><MapPin className="w-4 h-4" /> Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Westlands, Nairobi"
                  className={inputClasses}
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className={labelClasses}><GraduationCap className="w-4 h-4" /> Curriculum</label>
                <select name="curriculum" className={inputClasses} value={formData.curriculum} onChange={handleChange}>
                  <option value="Any">Any Curriculum</option>
                  <option value="CBC">CBC (Kenyan)</option>
                  <option value="British">British (IGCSE/A-Levels)</option>
                  <option value="American">American</option>
                  <option value="IB">International Baccalaureate (IB)</option>
                  <option value="8-4-4">8-4-4</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className={labelClasses}><School className="w-4 h-4" /> Level</label>
                <select name="levels" className={inputClasses} value={formData.levels} onChange={handleChange}>
                  <option value="Kindergarten">Kindergarten</option>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="All-through">All-through (K-12)</option>
                </select>
              </div>
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label className={labelClasses}><Accessibility className="w-4 h-4" /> Disability Support</label>
              <select name="disabilitySupport" className={inputClasses} value={formData.disabilitySupport} onChange={handleChange}>
                <option value="No">Not Required</option>
                <option value="Learning Disabilities">Learning Disabilities (Dyslexia, etc.)</option>
                <option value="Physical Disabilities">Physical Disabilities</option>
                <option value="Autism Spectrum">Autism Spectrum</option>
                <option value="General Special Needs">General Special Needs</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className={labelClasses}><Activity className="w-4 h-4" /> Extracurricular Interests</label>
              <input
                type="text"
                name="extracurriculars"
                placeholder="e.g. Swimming, Chess, Coding, Music"
                className={inputClasses}
                value={formData.extracurriculars}
                onChange={handleChange}
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2">
              <label className={labelClasses}><User className="w-4 h-4" /> Child's Personality</label>
              <input
                type="text"
                name="childPersonality"
                placeholder="e.g. Introverted, Creative, Athletic"
                className={inputClasses}
                value={formData.childPersonality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label className={labelClasses}><MessageSquare className="w-4 h-4" /> Tell us more about your child</label>
              <textarea
                name="childDescription"
                rows={4}
                placeholder="Describe their unique needs, interests, and what you're looking for in a school..."
                className={cn(inputClasses, "resize-none")}
                value={formData.childDescription}
                onChange={handleChange}
                required
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-12 px-4">
        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isActive = idx <= currentStep;
          const isCurrent = idx === currentStep;
          
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-3 relative">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                  isActive ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-white/5 text-zinc-600"
                )}>
                  {idx < currentStep ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.2em] absolute -bottom-6 whitespace-nowrap transition-colors",
                  isActive ? "text-white" : "text-zinc-600"
                )}>
                  {step.title}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] mx-4 bg-white/5 overflow-hidden">
                  <motion.div 
                    className="h-full bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles className="w-32 h-32" />
        </div>

        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between gap-4">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          ) : <div />}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-zinc-200 transition-all active:scale-95"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                "flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all active:scale-95",
                isLoading 
                  ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-zinc-200"
              )}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </div>
              ) : (
                <>Find Schools <Sparkles className="w-5 h-5" /></>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
