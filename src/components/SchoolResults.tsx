import { motion } from 'motion/react';
import { ExternalLink, MapPin, GraduationCap, Trophy, Heart, Info, Accessibility } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { SchoolRecommendation } from '../services/gemini';

interface SchoolResultsProps {
  schools: SchoolRecommendation[];
}

export default function SchoolResults({ schools }: SchoolResultsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {schools.map((school, index) => (
        <motion.div
          key={school.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group bg-zinc-950 border border-zinc-900 rounded-3xl p-8 hover:border-zinc-700 transition-all shadow-xl flex flex-col"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 pr-4">
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-zinc-300 transition-colors">
                {school.name}
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <MapPin className="w-4 h-4" />
                {school.location}
              </div>
            </div>
            {school.website && (
              <a
                href={school.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-zinc-900 rounded-full hover:bg-white hover:text-black transition-all shrink-0"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
              <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">
                <GraduationCap className="w-3 h-3" /> Curriculum
              </div>
              <div className="text-sm font-medium text-zinc-200">{school.curriculum}</div>
            </div>
            <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50">
              <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider font-bold mb-1">
                <Info className="w-3 h-3" /> Levels
              </div>
              <div className="text-sm font-medium text-zinc-200">{school.levels}</div>
            </div>
          </div>

          <div className="space-y-6 flex-grow">
            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-2">
                <Heart className="w-4 h-4 text-rose-500" /> Why it's a best fit
              </div>
              <div className="text-zinc-300 text-sm leading-relaxed italic prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{school.whyFit}</ReactMarkdown>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-bold mb-2">
                <Trophy className="w-4 h-4 text-amber-500" /> Extracurriculars
              </div>
              <div className="flex flex-wrap gap-2">
                {school.extracurriculars.map(item => (
                  <span key={item} className="px-3 py-1 bg-zinc-900 text-zinc-400 rounded-full text-xs border border-zinc-800">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900">
              <div className="text-zinc-500 text-sm leading-relaxed prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{school.description}</ReactMarkdown>
              </div>
            </div>

            {school.disabilitySupport !== "None" && school.disabilitySupport !== "No" && (
              <div className="bg-zinc-900/30 rounded-2xl p-4 border border-blue-900/20">
                <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1">
                  <Accessibility className="w-3 h-3" /> Special Support
                </div>
                <div className="text-xs text-zinc-400">{school.disabilitySupport}</div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center">
            <div className="text-xs text-zinc-500 font-mono tracking-tighter">
              EST. BUDGET: {school.budget}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
