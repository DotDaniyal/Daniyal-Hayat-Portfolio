import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { DEVELOPER_NAME, DEVELOPER_EMAIL, GITHUB_PROFILE_URL, PROJECTS, SKILL_GROUPS } from '../data/portfolioData';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  cmd: string;
  output: string | React.ReactNode;
}

export function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      cmd: 'init',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">✨ Welcome to the {DEVELOPER_NAME} Developer Terminal v1.0</p>
          <p className="text-xs text-slate-400">Type <span className="text-cyan-300 font-semibold">help</span> to view available system commands or <span className="text-cyan-300 font-semibold">clear</span> to wipe logs.</p>
        </div>
      )
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return;

    let output: string | React.ReactNode;

    switch (trimmed) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-cyan-400 font-semibold">Available Commands:</p>
            <p><span className="text-emerald-400 font-mono">whoami</span>: Display builder identity and mission</p>
            <p><span className="text-emerald-400 font-mono">skills</span>: List primary technical competencies</p>
            <p><span className="text-emerald-400 font-mono">projects</span>: List verified production repositories</p>
            <p><span className="text-emerald-400 font-mono">contact</span>: Reveal direct contact channels</p>
            <p><span className="text-emerald-400 font-mono">sudo hire</span>: Unlock VIP fast-track message</p>
            <p><span className="text-emerald-400 font-mono">clear</span>: Reset terminal history</p>
            <p><span className="text-emerald-400 font-mono">exit</span>: Close developer terminal</p>
          </div>
        );
        break;
      case 'whoami':
        output = `${DEVELOPER_NAME}: Software Engineer & Product Builder specializing in high-performance web platforms (React/TypeScript), native Android (Kotlin), and AI workflows.`;
        break;
      case 'skills':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            {SKILL_GROUPS.map((g, idx) => (
              <p key={idx}>
                <span className="text-cyan-300 font-semibold">{g.category}:</span> {g.skills.map(s => s.name).join(', ')}
              </p>
            ))}
          </div>
        );
        break;
      case 'projects':
        output = (
          <div className="space-y-1 text-xs text-slate-300">
            {PROJECTS.map(p => (
              <p key={p.id}>
                • <span className="text-cyan-400 font-semibold">{p.displayName}</span> ({p.category}): {p.technologies.join(', ')}
              </p>
            ))}
          </div>
        );
        break;
      case 'contact':
        output = `Direct Email: ${DEVELOPER_EMAIL} | GitHub: ${GITHUB_PROFILE_URL}`;
        break;
      case 'sudo hire':
      case 'hire':
        output = (
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs space-y-1">
            <p className="font-bold">🚀 ACCESS GRANTED: High Priority Developer Invitation!</p>
            <p>Daniyal is currently open for selected high-impact projects, product roles, and collaborations.</p>
            <p>Email directly at: <a href={`mailto:${DEVELOPER_EMAIL}`} className="underline font-bold text-white">{DEVELOPER_EMAIL}</a></p>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
      case 'quit':
        onClose();
        return;
      default:
        output = `Command not recognized: "${trimmed}". Type "help" for valid commands.`;
    }

    setHistory(prev => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl bg-[#090a10] border border-slate-800 shadow-2xl overflow-hidden font-mono z-10 text-xs sm:text-sm"
          >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d0f18] border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex items-center gap-1.5 ml-2 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>daniyal@portfolio-cli: ~</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="text-slate-500 hover:text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal History */}
          <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-4 text-slate-200">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-slate-500">guest@dnyl:~$</span>
                  <span>{item.cmd}</span>
                </div>
                <div className="text-slate-300 pl-4 border-l border-slate-800">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <form onSubmit={handleCommand} className="flex items-center gap-2 p-3 sm:p-4 bg-[#0d0f18] border-t border-slate-800">
            <span className="text-cyan-400 font-bold shrink-0">guest@dnyl:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type a command (e.g. help, skills, sudo hire)..."
              className="flex-1 bg-transparent border-none text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-0 text-xs sm:text-sm"
            />
            <button
              type="submit"
              className="p-1.5 rounded text-cyan-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
      )}
    </AnimatePresence>
  );
}
