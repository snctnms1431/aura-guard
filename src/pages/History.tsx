import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IconDownload, IconTrash } from '@tabler/icons-react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import HistoryTable from '@/components/HistoryTable';
import AnalyticsChart from '@/components/AnalyticsChart';
import FilterBar from '@/components/FilterBar';
import { useAppState } from '@/store';

export default function History() {
  const { state, dispatch } = useAppState();
  const [search, setSearch] = useState('');
  const [decisionFilter, setDecisionFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  const filtered = useMemo(() => {
    return state.history.filter((item) => {
      if (search && !item.content.toLowerCase().includes(search.toLowerCase())) return false;
      if (decisionFilter && item.decision !== decisionFilter) return false;
      if (typeFilter && item.type !== typeFilter) return false;
      return true;
    });
  }, [state.history, search, decisionFilter, typeFilter]);

  const exportData = (format: 'csv' | 'json') => {
    let content: string;
    let mime: string;
    let ext: string;

    if (format === 'json') {
      content = JSON.stringify(filtered, null, 2);
      mime = 'application/json';
      ext = 'json';
    } else {
      const headers = 'Content,Type,Decision,Correct Decision,Score,Confidence,Timestamp\n';
      const rows = filtered.map((i) => `"${i.content}",${i.type},${i.decision},${i.correctDecision},${i.score},${i.confidence},${i.timestamp}`).join('\n');
      content = headers + rows;
      mime = 'text/csv';
      ext = 'csv';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `moderation-history.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-2xl font-display font-bold">History & Analytics</h1>
                <p className="text-sm text-muted-foreground">Review past moderation decisions and performance</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => exportData('csv')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-sm text-xs font-medium text-foreground hover:bg-secondary/50 transition-colors">
                  <IconDownload size={14} /> CSV
                </button>
                <button onClick={() => exportData('json')} className="flex items-center gap-1.5 px-3 py-2 rounded-lg glass-sm text-xs font-medium text-foreground hover:bg-secondary/50 transition-colors">
                  <IconDownload size={14} /> JSON
                </button>
                <button onClick={() => dispatch({ type: 'CLEAR_HISTORY' })} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-destructive/10 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">
                  <IconTrash size={14} /> Clear
                </button>
              </div>
            </div>

            {/* Analytics summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Accuracy', value: `${state.stats.accuracy}%` },
                { label: 'Avg Score', value: String(state.stats.avgScore) },
                { label: 'Total Items', value: String(state.stats.totalProcessed) },
                { label: 'Mistakes', value: String(state.stats.mistakes) },
              ].map((s, i) => (
                <div key={i} className="glass-sm p-4 text-center">
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="mb-6">
              <AnalyticsChart />
            </div>

            {/* Filters */}
            <div className="mb-4">
              <FilterBar
                search={search}
                onSearchChange={setSearch}
                decision={decisionFilter}
                onDecisionChange={setDecisionFilter}
                type={typeFilter}
                onTypeChange={setTypeFilter}
              />
            </div>

            {/* Table */}
            <HistoryTable items={filtered} />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
