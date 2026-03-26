import { motion } from 'framer-motion';
import { IconUser, IconMail, IconCalendar, IconTarget, IconChartBar, IconChecklist } from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useAppState } from '@/store';

export default function Profile() {
  const { state } = useAppState();
  const user = state.user || { name: 'Guest User', email: 'guest@example.com', joinedAt: new Date().toISOString() };

  const recentScores = state.history.slice(0, 10).map((h) => h.score);
  const activityItems = state.history.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Profile header */}
            <div className="glass p-6 mb-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-2xl font-bold text-primary-foreground glow-sm">
                {user.name.charAt(0)}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className="text-xl font-display font-bold text-foreground">{user.name}</h1>
                <div className="flex flex-wrap gap-4 mt-2 justify-center sm:justify-start text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><IconMail size={14} /> {user.email}</span>
                  <span className="flex items-center gap-1"><IconCalendar size={14} /> Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { icon: <IconTarget size={20} />, label: 'Accuracy', value: `${state.stats.accuracy}%` },
                { icon: <IconChartBar size={20} />, label: 'Avg Score', value: String(state.stats.avgScore) },
                { icon: <IconChecklist size={20} />, label: 'Total Items', value: String(state.stats.totalProcessed) },
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-sm p-5 text-center">
                  <div className="text-primary mb-2 flex justify-center">{s.icon}</div>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Past scores */}
            <div className="glass p-6 mb-6">
              <h2 className="font-display font-semibold text-sm mb-4">Recent Scores</h2>
              {recentScores.length > 0 ? (
                <div className="flex items-end gap-2 h-24">
                  {recentScores.map((score, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${Math.max(score * 6, 8)}px` }}
                      transition={{ delay: i * 0.05 }}
                      className="flex-1 rounded-t gradient-bg opacity-80 hover:opacity-100 transition-opacity"
                      title={`Score: ${score}`}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No scores yet</p>
              )}
            </div>

            {/* Activity */}
            <div className="glass p-6">
              <h2 className="font-display font-semibold text-sm mb-4">Activity History</h2>
              {activityItems.length > 0 ? (
                <div className="space-y-3">
                  {activityItems.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/20">
                      <div className={`w-2 h-2 rounded-full ${item.decision === item.correctDecision ? 'bg-success' : 'bg-destructive'}`} />
                      <p className="text-sm text-foreground truncate flex-1">{item.content}</p>
                      <span className="text-xs text-muted-foreground capitalize">{item.decision}</span>
                      <span className="text-xs font-medium text-foreground">{item.score}pts</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No activity yet</p>
              )}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
