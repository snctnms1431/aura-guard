import { motion } from 'framer-motion';
import { IconCheck, IconFlag, IconTrash, IconPhoto, IconVideo, IconMusic, IconFileText } from '@tabler/icons-react';
import type { ModerationItem } from '@/store';

const typeIcons = {
  text: <IconFileText size={16} />,
  image: <IconPhoto size={16} />,
  video: <IconVideo size={16} />,
  audio: <IconMusic size={16} />,
};

interface PostCardProps {
  item: ModerationItem;
  onDecision: (id: string, decision: 'allow' | 'flag' | 'remove') => void;
}

export default function PostCard({ item, onDecision }: PostCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-hover p-5"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="p-1.5 rounded-md bg-primary/10 text-primary">{typeIcons[item.type]}</span>
        <span className="text-xs text-muted-foreground capitalize">{item.type}</span>
        <span className="ml-auto text-xs text-muted-foreground">{item.timestamp}</span>
      </div>

      <p className="text-sm text-foreground leading-relaxed mb-4 line-clamp-3">{item.content}</p>

      <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
        <span>Confidence: <strong className="text-foreground">{item.confidence}%</strong></span>
        {item.category && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{item.category}</span>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDecision(item.id, 'allow')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            item.decision === 'allow'
              ? 'bg-success text-success-foreground'
              : 'bg-success/10 text-success hover:bg-success/20'
          }`}
        >
          <IconCheck size={14} /> Allow
        </button>
        <button
          onClick={() => onDecision(item.id, 'flag')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            item.decision === 'flag'
              ? 'bg-warning text-warning-foreground'
              : 'bg-warning/10 text-warning hover:bg-warning/20'
          }`}
        >
          <IconFlag size={14} /> Flag
        </button>
        <button
          onClick={() => onDecision(item.id, 'remove')}
          className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
            item.decision === 'remove'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-destructive/10 text-destructive hover:bg-destructive/20'
          }`}
        >
          <IconTrash size={14} /> Remove
        </button>
      </div>
    </motion.div>
  );
}
