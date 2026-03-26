import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconFileText, IconPhoto, IconVideo, IconMusic, IconUpload, IconShieldCheck, IconAlertTriangle } from '@tabler/icons-react';

type ContentType = 'text' | 'image' | 'video' | 'audio';

const tabs: { type: ContentType; label: string; icon: React.ReactNode }[] = [
  { type: 'text', label: 'Text', icon: <IconFileText size={18} /> },
  { type: 'image', label: 'Image', icon: <IconPhoto size={18} /> },
  { type: 'video', label: 'Video', icon: <IconVideo size={18} /> },
  { type: 'audio', label: 'Audio', icon: <IconMusic size={18} /> },
];

export default function UploadSection() {
  const [activeTab, setActiveTab] = useState<ContentType>('text');
  const [textContent, setTextContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { safe: boolean; confidence: number; highlights: string[] }>(null);

  const handleAnalyze = () => {
    if (!textContent.trim() && activeTab === 'text') return;
    setIsAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const isSafe = Math.random() > 0.4;
      setResult({
        safe: isSafe,
        confidence: Math.round(70 + Math.random() * 28),
        highlights: isSafe ? [] : ['harmful', 'toxic', 'inappropriate'],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Try It <span className="gradient-text">Now</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Upload your content and let our AI analyze it in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto glass p-6 md:p-8"
        >
          <div className="flex gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.type}
                onClick={() => { setActiveTab(tab.type); setResult(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.type
                    ? 'gradient-bg text-primary-foreground'
                    : 'bg-secondary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {activeTab === 'text' ? (
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste your text content here to analyze..."
              className="w-full h-40 p-4 rounded-lg bg-secondary/30 border border-glass-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 transition-colors"
            />
          ) : (
            <div className="h-40 rounded-lg border-2 border-dashed border-glass-border flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-primary/40 transition-colors">
              <IconUpload size={32} className="text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drop your {activeTab} file here or click to browse
              </p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="mt-4 w-full py-3 rounded-lg gradient-bg text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" />
                Analyzing...
              </>
            ) : (
              'Check Content'
            )}
          </button>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-5 rounded-lg border ${
                  result.safe
                    ? 'bg-success/10 border-success/30'
                    : 'bg-destructive/10 border-destructive/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  {result.safe ? (
                    <IconShieldCheck size={24} className="text-success" />
                  ) : (
                    <IconAlertTriangle size={24} className="text-destructive" />
                  )}
                  <span className="font-semibold text-foreground">
                    {result.safe ? 'Content is Safe' : 'Harmful Content Detected'}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Confidence: <strong className="text-foreground">{result.confidence}%</strong></span>
                  {!result.safe && (
                    <span>Flagged: <strong className="text-destructive">{result.highlights.join(', ')}</strong></span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
