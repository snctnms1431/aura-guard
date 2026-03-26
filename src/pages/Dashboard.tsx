import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconRefresh, IconTrophy, IconX } from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import PostCard from '@/components/PostCard';
import Stats from '@/components/Stats';
import { useAppState, type ModerationItem } from '@/store';

const samplePosts: ModerationItem[] = [
  { id: '1', type: 'text', content: 'This product is amazing! I love how easy it is to use and the customer support is fantastic.', timestamp: '2 min ago', confidence: 95, score: 0, correctDecision: 'allow', category: 'positive', explanation: 'Positive review with no harmful content.' },
  { id: '2', type: 'text', content: 'You are so stupid and worthless. Nobody likes you and you should just disappear.', timestamp: '5 min ago', confidence: 92, score: 0, correctDecision: 'remove', category: 'harassment', explanation: 'Contains direct harassment and bullying language targeted at an individual.' },
  { id: '3', type: 'image', content: '[Image] A sunset photo with the caption "Beautiful evening view from my balcony"', timestamp: '8 min ago', confidence: 88, score: 0, correctDecision: 'allow', category: 'nature', explanation: 'Harmless nature photography.' },
  { id: '4', type: 'text', content: 'I think we should discuss this policy more carefully. While I disagree, I respect different viewpoints.', timestamp: '12 min ago', confidence: 85, score: 0, correctDecision: 'allow', category: 'discussion', explanation: 'Respectful disagreement and constructive discourse.' },
  { id: '5', type: 'text', content: 'Click here to win $10000 instantly! Limited time offer, act now before it expires!', timestamp: '15 min ago', confidence: 90, score: 0, correctDecision: 'flag', category: 'spam', explanation: 'Spam/scam content designed to lure users with false promises.' },
  { id: '6', type: 'video', content: '[Video] Tutorial on how to build a website using React and Tailwind CSS', timestamp: '20 min ago', confidence: 91, score: 0, correctDecision: 'allow', category: 'educational', explanation: 'Educational programming tutorial.' },
];

export default function Dashboard() {
  const { state, dispatch } = useAppState();
  const [items, setItems] = useState<ModerationItem[]>(samplePosts);
  const [showResult, setShowResult] = useState(false);
  const difficulty = state.difficulty;

  const handleDecision = useCallback((id: string, decision: 'allow' | 'flag' | 'remove') => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const isCorrect = decision === item.correctDecision;
        const score = isCorrect ? (difficulty === 'easy' ? 8 : difficulty === 'medium' ? 10 : 15) : 0;
        const updated = { ...item, decision, score };
        dispatch({ type: 'ADD_TO_HISTORY', payload: updated });
        return updated;
      })
    );
  }, [difficulty, dispatch]);

  const handleReset = () => {
    setItems(samplePosts.map((p) => ({ ...p, decision: undefined, score: 0 })));
    dispatch({ type: 'RESET_SESSION' });
  };

  const allDecided = items.every((i) => i.decision);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-display font-bold">Content Moderation</h1>
                  <p className="text-sm text-muted-foreground">Review and moderate incoming content</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={difficulty}
                    onChange={(e) => dispatch({ type: 'SET_DIFFICULTY', payload: e.target.value as any })}
                    className="bg-secondary/30 border border-glass-border rounded-lg px-3 py-2 text-sm text-foreground outline-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  <button onClick={handleReset} className="p-2 rounded-lg glass-sm text-muted-foreground hover:text-foreground transition-colors">
                    <IconRefresh size={18} />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence>
                  {items.map((item) => (
                    <PostCard key={item.id} item={item} onDecision={handleDecision} />
                  ))}
                </AnimatePresence>
              </div>

              {allDecided && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                  <button
                    onClick={() => setShowResult(true)}
                    className="w-full py-3 rounded-lg gradient-bg text-primary-foreground font-semibold text-sm glow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <IconTrophy size={18} /> View Results
                  </button>
                </motion.div>
              )}
            </div>

            {/* Stats panel */}
            <div className="lg:w-72 shrink-0">
              <h2 className="font-display font-semibold text-sm mb-4 text-foreground">Session Stats</h2>
              <Stats />
            </div>
          </div>
        </main>
      </div>

      {/* Result modal */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-8 max-w-md w-full text-center"
            >
              <button onClick={() => setShowResult(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <IconX size={20} />
              </button>
              <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4 glow">
                <IconTrophy size={28} className="text-primary-foreground" />
              </div>
              <h2 className="text-xl font-display font-bold mb-2">Session Complete!</h2>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="glass-sm p-4">
                  <p className="text-2xl font-bold text-foreground">{state.stats.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
                <div className="glass-sm p-4">
                  <p className="text-2xl font-bold text-foreground">{state.stats.avgScore}</p>
                  <p className="text-xs text-muted-foreground">Avg Score</p>
                </div>
                <div className="glass-sm p-4">
                  <p className="text-2xl font-bold text-foreground">{state.stats.totalProcessed}</p>
                  <p className="text-xs text-muted-foreground">Processed</p>
                </div>
                <div className="glass-sm p-4">
                  <p className="text-2xl font-bold text-foreground">{state.stats.mistakes}</p>
                  <p className="text-xs text-muted-foreground">Mistakes</p>
                </div>
              </div>
              <button onClick={() => { setShowResult(false); handleReset(); }} className="mt-6 w-full py-2.5 rounded-lg border border-glass-border text-sm font-medium text-foreground hover:bg-secondary/30 transition-colors">
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
