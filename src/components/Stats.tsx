import { motion } from 'framer-motion';
import { IconTarget, IconChartBar, IconChecklist, IconAlertCircle } from '@tabler/icons-react';
import { useAppState } from '@/store';

const statItems = [
  { key: 'accuracy', label: 'Accuracy', icon: <IconTarget size={20} />, suffix: '%', color: 'text-primary' },
  { key: 'avgScore', label: 'Avg Score', icon: <IconChartBar size={20} />, suffix: '', color: 'text-accent' },
  { key: 'totalProcessed', label: 'Processed', icon: <IconChecklist size={20} />, suffix: '', color: 'text-success' },
  { key: 'mistakes', label: 'Mistakes', icon: <IconAlertCircle size={20} />, suffix: '', color: 'text-destructive' },
] as const;

export default function Stats() {
  const { state } = useAppState();

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map((s, i) => (
        <motion.div
          key={s.key}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass-sm p-4 text-center"
        >
          <div className={`${s.color} mb-2 flex justify-center`}>{s.icon}</div>
          <p className="text-2xl font-bold text-foreground">
            {state.stats[s.key]}{s.suffix}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
