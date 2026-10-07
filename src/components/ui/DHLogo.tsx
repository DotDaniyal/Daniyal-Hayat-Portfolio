import React from 'react';

interface DHLogoProps {
  className?: string;
  glow?: boolean;
}

export function DHLogo({ className = "w-full h-full", glow = true }: DHLogoProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Daniyal Hayat (DH) Logo"
    >
      <defs>
        {/* Intense Neon Cyan Glow Filter */}
        <filter id="neonGlowOuter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur1" />
          <feGaussianBlur stdDeviation="8" result="blur2" />
          <feGaussianBlur stdDeviation="1.5" result="sharp" />
          <feMerge>
            <feMergeNode in="blur2" />
            <feMergeNode in="blur1" />
            <feMergeNode in="sharp" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft Ambient Core Glow */}
        <radialGradient id="dhAmbientGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#0891b2" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="dhNeonGrad" x1="30" y1="40" x2="170" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#00f0ff" />
          <stop offset="80%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>

        <linearGradient id="dhCoreWhite" x1="0" y1="0" x2="0" y2="200" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e0faff" />
          <stop offset="100%" stopColor="#a5f3fc" />
        </linearGradient>
      </defs>

      {/* Ambient backdrop glow circle */}
      {glow && (
        <circle cx="100" cy="100" r="85" fill="url(#dhAmbientGlow)" />
      )}

      {/* Group with Neon Glow Filter */}
      <g filter={glow ? "url(#neonGlowOuter)" : undefined}>
        
        {/* --- 1. OUTER CONTOUR OF DH MONOGRAM --- */}
        {/* D Letter Outer Path */}
        <path
          d="M 40 60
             L 58 60
             L 100 60
             C 122 60 134 74 134 94
             C 134 104 128 112 118 118
             C 124 118 136 118 144 118
             L 144 60
             L 158 60
             L 158 48
             L 182 72
             L 182 140
             L 164 140
             L 164 128
             L 144 128
             L 144 140
             L 126 140
             L 126 122
             C 118 126 108 128 98 128
             L 58 128
             L 58 96
             L 42 96
             L 40 84
             L 54 70
             L 40 70
             Z"
          fill="none"
          stroke="url(#dhNeonGrad)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- 2. INNER CONTOUR & CIRCUIT FLOW --- */}
        {/* Inner D loop that flows seamlessly into the H crossbar */}
        <path
          d="M 58 74
             L 94 74
             C 110 74 118 84 118 94
             C 118 104 108 112 94 114
             L 58 114
             Z"
          fill="none"
          stroke="url(#dhNeonGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* H Left Pillar & Bridge Flow */}
        <path
          d="M 126 60
             L 126 94
             C 126 104 134 108 144 108
             L 164 108
             L 164 60"
          fill="none"
          stroke="url(#dhNeonGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Center Hi-Intensity Core Highlight Lines */}
        <path
          d="M 40 60 L 58 60 L 100 60 C 122 60 134 74 134 94"
          fill="none"
          stroke="url(#dhCoreWhite)"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M 158 48 L 182 72 L 182 140"
          fill="none"
          stroke="url(#dhCoreWhite)"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.9"
        />
      </g>

      {/* Subtle bottom reflection beam */}
      {glow && (
        <ellipse cx="100" cy="168" rx="35" ry="4" fill="#00f0ff" opacity="0.4" filter="blur(3px)" />
      )}
    </svg>
  );
}
