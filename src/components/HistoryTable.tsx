import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconEye, IconX, IconCheck, IconFlag, IconTrash } from '@tabler/icons-react';
import type { ModerationItem } from '@/store';

const decisionBadge = {
  allow: { icon: <IconCheck size={12} />, className: 'bg-success/15 text-success' },
  flag: { icon: <IconFlag size={12} />, className: 'bg-warning/15 text-warning' },
  remove: { icon: <IconTrash size={12} />, className: 'bg-destructive/15 text-destructive' },
};

interface HistoryTableProps {
  items: ModerationItem[];
}

export default function HistoryTable({ items }: HistoryTableProps) {
  const [selected, setSelected] = useState<ModerationItem | null>(null);

  return (
    <>
      <div className="glass overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Content</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Decision</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Correct</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</th>
                <th className="text-left p-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Time</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-glass-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4 max-w-[200px] truncate text-foreground">{item.content}</td>
                  <td className="p-4 capitalize text-muted-foreground">{item.type}</td>
                  <td className="p-4">
                    {item.decision && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${decisionBadge[item.decision].className}`}>
                        {decisionBadge[item.decision].icon}
                        {item.decision}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {item.correctDecision && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${decisionBadge[item.correctDecision].className}`}>
                        {decisionBadge[item.correctDecision].icon}
                        {item.correctDecision}
                      </span>
                    )}
                  </td>
                  <td className="p-4 font-medium text-foreground">{item.score}</td>
                  <td className="p-4 text-muted-foreground text-xs">{item.timestamp}</td>
                  <td className="p-4">
                    <button onClick={() => setSelected(item)} className="p-1.5 rounded-md hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                      <IconEye size={16} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {items.length === 0 && (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No history items yet. Start moderating content to see results here.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg">Content Details</h3>
                <button onClick={() => setSelected(null)} className="p-1 rounded-md hover:bg-secondary/50 text-muted-foreground">
                  <IconX size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Content</p>
                  <p className="text-sm text-foreground bg-secondary/30 p-3 rounded-lg">{selected.content}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Your Decision</p>
                    {selected.decision && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${decisionBadge[selected.decision].className}`}>
                        {decisionBadge[selected.decision].icon} {selected.decision}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Correct Decision</p>
                    {selected.correctDecision && (
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${decisionBadge[selected.correctDecision].className}`}>
                        {decisionBadge[selected.correctDecision].icon} {selected.correctDecision}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                  <div className="w-full h-2 rounded-full bg-secondary">
                    <div className="h-full rounded-full gradient-bg" style={{ width: `${selected.confidence}%` }} />
                  </div>
                  <p className="text-xs text-foreground mt-1">{selected.confidence}%</p>
                </div>
                {selected.explanation && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Explanation</p>
                    <p className="text-sm text-foreground bg-secondary/30 p-3 rounded-lg">{selected.explanation}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
