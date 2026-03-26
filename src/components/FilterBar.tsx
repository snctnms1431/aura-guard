import { IconSearch, IconFilter } from '@tabler/icons-react';

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  decision: string;
  onDecisionChange: (v: string) => void;
  type: string;
  onTypeChange: (v: string) => void;
}

export default function FilterBar({ search, onSearchChange, decision, onDecisionChange, type, onTypeChange }: FilterBarProps) {
  return (
    <div className="glass-sm p-4 flex flex-wrap gap-3 items-center">
      <div className="flex items-center gap-2 flex-1 min-w-[200px] bg-secondary/30 rounded-lg px-3 py-2 border border-glass-border/50">
        <IconSearch size={16} className="text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search content..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
        />
      </div>

      <div className="flex items-center gap-2">
        <IconFilter size={16} className="text-muted-foreground" />
        <select
          value={decision}
          onChange={(e) => onDecisionChange(e.target.value)}
          className="bg-secondary/30 border border-glass-border/50 rounded-lg px-3 py-2 text-sm text-foreground outline-none appearance-none cursor-pointer"
        >
          <option value="">All Decisions</option>
          <option value="allow">Allowed</option>
          <option value="flag">Flagged</option>
          <option value="remove">Removed</option>
        </select>

        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="bg-secondary/30 border border-glass-border/50 rounded-lg px-3 py-2 text-sm text-foreground outline-none appearance-none cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="text">Text</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="audio">Audio</option>
        </select>
      </div>
    </div>
  );
}
