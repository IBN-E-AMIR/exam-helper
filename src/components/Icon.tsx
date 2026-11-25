const PATHS: Record<string, string> = {
  dashboard: 'M4 4h7v9H4z M13 4h7v5h-7z M13 11h7v9h-7z M4 15h7v5H4z',
  subjects: 'M4 19.5A2.5 2.5 0 016.5 17H20V3H6.5A2.5 2.5 0 004 5.5z M4 19.5A2.5 2.5 0 006.5 22H20v-5',
  notes: 'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z M14 3v5h5 M9 13h6 M9 17h6',
  papers: 'M7 3h8l4 4v14H7z M15 3v4h4 M10 12l1.5 1.5L14 11 M10 17h5',
  viva: 'M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z M5 11a7 7 0 0014 0 M12 18v3 M9 21h6',
  planner: 'M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z M4 10h16 M8 3v4 M16 3v4',
  progress: 'M4 20V10 M10 20V4 M16 20v-8 M22 20H2',
  settings: 'M4 6h10 M18 6h2 M4 12h4 M12 12h8 M4 18h9 M17 18h3 M16 4a2 2 0 100 4 2 2 0 000-4z M10 10a2 2 0 100 4 2 2 0 000-4z M15 16a2 2 0 100 4 2 2 0 000-4z',
  moon: 'M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z',
  sun: 'M12 8a4 4 0 100 8 4 4 0 000-8z M12 2v2 M12 20v2 M4.9 4.9l1.4 1.4 M17.7 17.7l1.4 1.4 M2 12h2 M20 12h2 M4.9 19.1l1.4-1.4 M17.7 6.3l1.4-1.4',
  check: 'M5 12l5 5L20 7',
  flame: 'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-9z',
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5l3 2',
  target: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 7a5 5 0 100 10 5 5 0 000-10z M12 11a1 1 0 100 2 1 1 0 000-2z',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  cap: 'M3 9l9-5 9 5-9 5z M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5',
  sparkle: 'M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z',
};

export default function Icon({ name, className = 'h-5 w-5', rtlFlip = false }: { name: string; className?: string; rtlFlip?: boolean }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${rtlFlip ? 'rtl:-scale-x-100' : ''} ${className}`} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
