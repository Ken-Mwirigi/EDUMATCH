import React, { useState } from 'react';
import { Search, Sparkles, School, GraduationCap, MapPin, Wallet, Accessibility, Activity, User, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SchoolFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export default function SchoolForm({ onSubmit, isLoading }: SchoolFormProps) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClasses = "w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-zinc-600";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-zinc-400 mb-2";

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit} 
      className="space-y-8 max-w-4xl mx-auto p-6 md:p-10 bg-zinc-950 border border-zinc-900 rounded-3xl shadow-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>
              <Wallet className="w-4 h-4" /> Budget (Annual Fees Range)
            </label>
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

          <div>
            <label className={labelClasses}>
              <MapPin className="w-4 h-4" /> Preferred Location
            </label>
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

          <div>
            <label className={labelClasses}>
              <GraduationCap className="w-4 h-4" /> Curriculum
            </label>
            <select
              name="curriculum"
              className={inputClasses}
              value={formData.curriculum}
              onChange={handleChange}
            >
              <option value="Any">Any Curriculum</option>
              <option value="CBC">CBC (Kenyan)</option>
              <option value="British">British (IGCSE/A-Levels)</option>
              <option value="American">American</option>
              <option value="IB">International Baccalaureate (IB)</option>
              <option value="8-4-4">8-4-4</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <School className="w-4 h-4" /> Level
            </label>
            <select
              name="levels"
              className={inputClasses}
              value={formData.levels}
              onChange={handleChange}
            >
              <option value="Kindergarten">Kindergarten</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="All-through">All-through (K-12)</option>
            </select>
          </div>
        </div>

        {/* Support & Activities */}
        <div className="space-y-4">
          <div>
            <label className={labelClasses}>
              <Accessibility className="w-4 h-4" /> Disability Support
            </label>
            <select
              name="disabilitySupport"
              className={inputClasses}
              value={formData.disabilitySupport}
              onChange={handleChange}
            >
              <option value="No">Not Required</option>
              <option value="Learning Disabilities">Learning Disabilities (Dyslexia, etc.)</option>
              <option value="Physical Disabilities">Physical Disabilities</option>
              <option value="Autism Spectrum">Autism Spectrum</option>
              <option value="General Special Needs">General Special Needs</option>
            </select>
          </div>

          <div>
            <label className={labelClasses}>
              <Activity className="w-4 h-4" /> Extracurricular Activities
            </label>
            <input
              type="text"
              name="extracurriculars"
              placeholder="e.g. Swimming, Chess, Coding, Music"
              className={inputClasses}
              value={formData.extracurriculars}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelClasses}>
              <User className="w-4 h-4" /> Child's Personality
            </label>
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
        </div>
      </div>

      {/* Detailed Description */}
      <div className="space-y-4">
        <label className={labelClasses}>
          <MessageSquare className="w-4 h-4" /> Tell us more about your child
        </label>
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

      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all",
          isLoading 
            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
            : "bg-white text-black hover:bg-zinc-200 active:scale-[0.98]"
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-zinc-500 border-t-transparent rounded-full animate-spin" />
            Analyzing Schools...
          </div>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Find Best Fit Schools
          </>
        )}
      </button>
    </motion.form>
  );
}
