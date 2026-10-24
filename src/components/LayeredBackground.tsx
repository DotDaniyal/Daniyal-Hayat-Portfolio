export function LayeredBackground({ isDarkMode = true }: { isDarkMode?: boolean }) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none" aria-hidden="true">
      {/* Restrained Architectural Neutral Canvas */}
      <div className="absolute inset-0 bg-transparent transition-colors duration-300" />

      {/* Subtle, soft focal ambient glow at the top */}
      <div 
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-700 ${
          isDarkMode ? 'bg-cyan-500/5 opacity-70' : 'bg-slate-300/30 opacity-40'
        }`} 
      />

      {/* Subtle Noise / Editorial Texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
