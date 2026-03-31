export function LogoMark({ className = 'h-12 w-12' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MR logo"
    >
      <rect x="8" y="8" width="104" height="104" rx="28" fill="url(#mr-bg)" />
      <path
        d="M29 84V36H42L60 64L78 36H91V84H78V58L64 79H56L42 58V84H29Z"
        fill="white"
      />
      <path
        d="M60 36H81C93 36 100 42 100 52C100 59 96 64 89 66L102 84H87L76 69H72V84H60V36ZM72 47V59H80C85 59 88 57 88 53C88 49 85 47 80 47H72Z"
        fill="rgba(255,255,255,0.84)"
      />
      <defs>
        <linearGradient id="mr-bg" x1="18" y1="16" x2="102" y2="112" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.55" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
    </svg>
  );
}
