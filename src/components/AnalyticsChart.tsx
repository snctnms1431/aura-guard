import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const areaData = [
  { name: 'Mon', accuracy: 72, score: 65 },
  { name: 'Tue', accuracy: 78, score: 70 },
  { name: 'Wed', accuracy: 85, score: 80 },
  { name: 'Thu', accuracy: 82, score: 75 },
  { name: 'Fri', accuracy: 90, score: 88 },
  { name: 'Sat', accuracy: 88, score: 85 },
  { name: 'Sun', accuracy: 93, score: 91 },
];

const pieData = [
  { name: 'Allowed', value: 45 },
  { name: 'Flagged', value: 30 },
  { name: 'Removed', value: 25 },
];

const COLORS = ['hsl(150, 60%, 45%)', 'hsl(40, 90%, 55%)', 'hsl(0, 72%, 55%)'];

export default function AnalyticsChart() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6"
      >
        <h3 className="font-display font-semibold text-sm mb-4 text-foreground">Performance Over Time</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={areaData}>
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(260, 70%, 60%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(260, 70%, 60%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 80%, 55%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(220, 80%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
            <XAxis dataKey="name" tick={{ fill: 'hsl(220, 15%, 55%)', fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: 'hsl(220, 15%, 55%)', fontSize: 12 }} axisLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(230, 25%, 11%)', border: '1px solid hsl(230, 20%, 22%)', borderRadius: '8px', color: 'hsl(220, 20%, 95%)' }}
            />
            <Area type="monotone" dataKey="accuracy" stroke="hsl(260, 70%, 60%)" fillOpacity={1} fill="url(#colorAccuracy)" strokeWidth={2} />
            <Area type="monotone" dataKey="score" stroke="hsl(220, 80%, 55%)" fillOpacity={1} fill="url(#colorScore)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-6"
      >
        <h3 className="font-display font-semibold text-sm mb-4 text-foreground">Decision Distribution</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(230, 25%, 11%)', border: '1px solid hsl(230, 20%, 22%)', borderRadius: '8px', color: 'hsl(220, 20%, 95%)' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-2">
          {pieData.map((entry, i) => (
            <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
              {entry.name}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
