import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, GraduationCap, ArrowLeft, Search, MapPin, Users } from 'lucide-react';
import SchoolForm from './components/SchoolForm';
import SchoolResults from './components/SchoolResults';
import { getSchoolRecommendations, SchoolRecommendation } from './services/gemini';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [schools, setSchools] = useState<SchoolRecommendation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSearch = async (formData: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getSchoolRecommendations(formData);
      setSchools(results);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setSchools([]);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-zinc-900/10 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-zinc-900/10 blur-[160px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <main className="relative z-10 container mx-auto px-6 py-16 md:py-32">
        {/* Hero Section */}
        <header className="text-center mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-[0.2em] mb-10"
          >
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            AI-Powered School Discovery
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 text-gradient leading-[0.9]"
          >
            Find the perfect <br className="hidden md:block" /> school in Kenya.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-zinc-500 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Stop drowning in brochures. Our AI analyzes your child's unique personality and your family's needs to recommend the 10 best-fit schools.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 text-zinc-600"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Kenya Wide</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Personalized</span>
            </div>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {schools.length === 0 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <SchoolForm onSubmit={handleSearch} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              ref={resultsRef}
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                    <Search className="w-4 h-4" /> Search Results
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Top 10 Recommendations</h2>
                  <p className="text-zinc-500 text-lg font-medium leading-relaxed">
                    We've analyzed hundreds of schools to find these perfect matches for your child's unique profile.
                  </p>
                </div>
                <button
                  onClick={resetSearch}
                  className="flex items-center gap-3 px-8 py-4 glass border border-white/10 rounded-2xl font-bold hover:bg-white hover:text-black transition-all duration-300 self-start group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  New Search
                </button>
              </div>

              <SchoolResults schools={schools} />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 p-6 glass border-rose-500/20 rounded-[2rem] text-rose-400 text-center max-w-lg mx-auto font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Footer */}
        <footer className="mt-48 pb-24 text-center">
          <div className="inline-flex items-center justify-center gap-3 px-6 py-3 glass rounded-2xl mb-8">
            <GraduationCap className="w-6 h-6 text-white" />
            <span className="font-bold tracking-[0.3em] uppercase text-xs">EduMatch Kenya</span>
          </div>
          <p className="text-zinc-600 text-sm max-w-md mx-auto leading-relaxed">
            Helping parents make smarter decisions for happier students. <br />
            Powered by advanced AI educational insights.
          </p>
        </footer>
      </main>
    </div>
  );
}
