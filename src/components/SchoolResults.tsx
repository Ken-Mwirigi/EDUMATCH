import { motion } from 'motion/react';
import { ExternalLink, MapPin, GraduationCap, Trophy, Heart, Info, Accessibility, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SchoolRecommendation } from '../services/gemini';
import { cn } from '../lib/utils';

interface SchoolResultsProps {
  schools: SchoolRecommendation[];
}

export default function SchoolResults({ schools }: SchoolResultsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
      {schools.map((school, index) => (
        <motion.div
          key={school.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group glass rounded-[2.5rem] p-8 md:p-10 hover:bg-white/[0.05] transition-all duration-500 flex flex-col relative overflow-hidden"
        >
          {/* Accent Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors duration-500" />

          <div className="flex justify-between items-start mb-8 relative">
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                  Recommendation #{index + 1}
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight group-hover:text-gradient transition-all duration-500">
                {school.name}
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                <MapPin className="w-4 h-4 text-zinc-600" />
                {school.location}
              </div>
            </div>
            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 shrink-0 shadow-xl"
              >
                <ExternalLink className="w-6 h-6" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10 relative">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                <GraduationCap className="w-3 h-3" /> Curriculum
              </div>
              <div className="text-sm font-semibold text-white">{school.curriculum}</div>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-2">
                <Info className="w-3 h-3" /> Levels
              </div>
              <div className="text-sm font-semibold text-white">{school.levels}</div>
            </div>
          </div>

          <div className="space-y-8 flex-grow relative">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6">
              <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Why it's a best fit
              </div>
              <div className="text-zinc-200 text-base leading-relaxed italic prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{school.whyFit}</ReactMarkdown>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-bold mb-4">
                <Trophy className="w-4 h-4 text-zinc-600" /> Extracurriculars
              </div>
              <div className="flex flex-wrap gap-2">
                {school.extracurriculars.map(item => (
                  <span key={item} className="px-4 py-2 bg-white/5 text-zinc-400 rounded-xl text-xs font-medium border border-white/5 hover:border-white/20 transition-colors">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="text-zinc-500 text-sm leading-relaxed prose prose-invert prose-sm max-w-none opacity-80">
                <ReactMarkdown>{school.description}</ReactMarkdown>
              </div>
            </div>

            {school.disabilitySupport !== "None" && school.disabilitySupport !== "No" && (
              <div className="bg-blue-500/5 rounded-2xl p-5 border border-blue-500/10">
                <div className="flex items-center gap-2 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                  <Accessibility className="w-4 h-4" /> Special Support
                </div>
                <div className="text-xs text-zinc-400 leading-relaxed">{school.disabilitySupport}</div>
              </div>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-white/5 flex justify-between items-center relative">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1">Estimated Fees</span>
              <div className="text-lg font-bold text-white font-mono tracking-tight">
                {school.budget}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <Heart className="w-5 h-5 text-zinc-600 group-hover:text-rose-500 transition-colors" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
