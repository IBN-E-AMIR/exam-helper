import { ReactNode } from 'react';

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-brand-100 dark:bg-white/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <div className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-500 transition-all" style={{ width: `${pct}%` }} />
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
