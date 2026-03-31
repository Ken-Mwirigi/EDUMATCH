import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, GraduationCap, ArrowLeft, Search } from 'lucide-react';
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
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
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
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-zinc-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-900/20 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        {/* Header */}
        <header className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-white" />
            AI-Powered School Discovery
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent"
          >
            Find the perfect <br /> school in Kenya.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Stop drowning in brochures. Our AI analyzes your child's unique personality and your family's needs to recommend the 10 best-fit schools.
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {schools.length === 0 ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <SchoolForm onSubmit={handleSearch} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              ref={resultsRef}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Top 10 Recommendations</h2>
                  <p className="text-zinc-400">Based on your child's profile and preferences</p>
                </div>
                <button
                  onClick={resetSearch}
                  className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-white hover:text-black transition-all self-start"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Start New Search
                </button>
              </div>

              <SchoolResults schools={schools} />
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 p-4 bg-rose-950/30 border border-rose-900/50 rounded-2xl text-rose-400 text-center max-w-lg mx-auto"
          >
            {error}
          </motion.div>
        )}

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-5 h-5" />
            <span className="font-bold tracking-widest uppercase">EduMatch Kenya</span>
          </div>
          <p>© 2026 EduMatch. Helping parents make smarter decisions for happier students.</p>
        </footer>
      </main>
    </div>
  );
}
