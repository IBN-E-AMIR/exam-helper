import { ReactNode } from 'react';

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="pbar h-2.5 w-full overflow-hidden rounded-full bg-brand-100" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="pbar-fill h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 transition-all" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function PageHeader({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: ReactNode }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      {icon && <div className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">{icon}</div>}
      <div>
        <h1 className="h1">{title}</h1>
        {subtitle && <p className="muted mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

/* Small celebration: coloured dots fly out of an element. Skipped if the user prefers reduced motion. */
export function burst(el: HTMLElement) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const r = el.getBoundingClientRect();
  const colors = ['#FF2BD6', '#22D3EE', '#FFD166', '#8B5CF6'];
  for (let i = 0; i < 24; i++) {
    const s = document.createElement('span');
    Object.assign(s.style, { position: 'fixed', left: `${r.left + r.width / 2}px`, top: `${r.top + r.height / 2}px`, width: '8px', height: '8px', borderRadius: '50%', background: colors[i % colors.length], pointerEvents: 'none', zIndex: '70' });
    document.body.appendChild(s);
    const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * 90;
    s.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(.3)`, opacity: 0 }], { duration: 650 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => s.remove();
  }
}
