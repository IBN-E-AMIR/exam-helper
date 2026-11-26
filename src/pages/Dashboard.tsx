import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store';
import { useT } from '../i18n';
import Icon from '../components/Icon';
import { ProgressBar, burst } from '../components/ui';
import { SAMPLE_BADGES, SAMPLE_PLAN, SAMPLE_STREAK, SAMPLE_XP, SAMPLE_STUDY_MIN_TODAY, SAMPLE_SUBJECTS, SAMPLE_WEAK, daysUntil, todayStr } from '../data';

const Hero3D = lazy(() => import('../components/Hero3D'));

export default function Dashboard() {
  const { t, n, pct, comma, date } = useT();
  const { settings, planDone, setPlanDone } = useApp();
  const hour = new Date().getHours();
  const greet = hour < 12 ? t('goodMorning') : hour < 17 ? t('goodAfternoon') : t('goodEvening');
  const left = settings.examDate ? daysUntil(settings.examDate) : null;
  const h = Math.floor(SAMPLE_STUDY_MIN_TODAY / 60), m = SAMPLE_STUDY_MIN_TODAY % 60;
  const today = todayStr();

  return (
    <div className="space-y-5">
      <section className="card relative min-h-[190px] overflow-hidden">
        <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
          <h1 className="h1">{greet}{settings.name ? `${comma} ${settings.name}` : ''}</h1>
          <p className="muted mt-1">{t('welcomeBack')}</p>
          <p className="muted num mt-1">{date(today)}</p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 end-0 w-[44%] sm:w-[42%]"><Suspense fallback={null}><Hero3D /></Suspense></div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="card hero-card relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800 text-white sm:col-span-1">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-100"><Icon name="target" />{t('examCountdown')}</div>
          {left === null ? (
            <div className="mt-3"><p className="text-sm text-brand-100">{t('noExamDate')}</p><Link to="/settings" className="btn btn-accent mt-3">{t('setDate')}</Link></div>
          ) : left > 0 ? (
            <div className="mt-2"><span className="num text-5xl font-bold">{n(left)}</span> <span className="text-lg">{left === 1 ? t('dayLeft') : t('daysLeft')}</span></div>
          ) : (
            <p className="mt-3 text-lg font-semibold">{left === 0 ? t('examToday') : t('examPassed')}</p>
          )}
        </div>
        <div className="card">
          <div className="flex items-center gap-2 text-sm font-semibold text-accent-dark dark:text-accent"><Icon name="flame" />{t('studyStreak')}</div>
          <div className="mt-2"><span className="num text-4xl font-bold">{n(SAMPLE_STREAK)}</span> <span className="muted">{t('days')}</span></div>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 text-sm font-semibold text-brand-700 dark:text-brand-200"><Icon name="clock" />{t('studiedToday')}</div>
          <div className="mt-2 text-3xl font-bold"><span className="num">{n(h)}</span> <span className="text-base font-medium text-ink-soft dark:text-slate-400">{t('hourShort')}</span> <span className="num">{n(m)}</span> <span className="text-base font-medium text-ink-soft dark:text-slate-400">{t('minShort')}</span></div>
        </div>
      </section>

      <section className="card">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="min-w-[220px] flex-1">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="glow-text flex items-center gap-2 text-lg font-bold"><Icon name="award" />{t('level')} <span className="num">{n(SAMPLE_XP.level)}</span></span>
              <span className="muted"><span className="num">{n(SAMPLE_XP.xp)}</span> / <span className="num">{n(SAMPLE_XP.next)}</span> {t('xpUnit')}</span>
            </div>
            <ProgressBar value={(SAMPLE_XP.xp / SAMPLE_XP.next) * 100} label={t('level')} />
            <p className="muted mt-1"><span className="num">{n(SAMPLE_XP.next - SAMPLE_XP.xp)}</span> {t('xpUnit')} {t('toNextLevel')}</p>
          </div>
          <div>
            <div className="muted mb-1">{t('badges')}</div>
            <div className="flex gap-2">
              {SAMPLE_BADGES.map((b) => (
                <div key={b.id} title={b.on ? t(b.key) : `${t(b.key)} · ${t('locked')}`} className={`flex w-24 flex-col items-center gap-1 rounded-xl p-2 text-center ${b.on ? 'bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-neon-cyan' : 'bg-slate-100 text-slate-400 opacity-60 dark:bg-white/5'}`}>
                  <Icon name={b.icon} className="h-6 w-6" /><span className="text-[11px] font-semibold leading-tight">{t(b.key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="mb-3 text-lg font-bold">{t('todaysPlan')}</h2>
          <ul className="space-y-2">
            {SAMPLE_PLAN.map((p) => {
              const done = !!planDone[today + p.id];
              return (
                <li key={p.id}>
                  <button onClick={(e) => { if (!done) burst(e.currentTarget); setPlanDone((s) => ({ ...s, [today + p.id]: !done })); }} aria-pressed={done}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-start transition ${done ? 'border-brand-200 bg-brand-50 dark:border-night-line dark:bg-white/5' : 'border-slate-200 hover:border-brand-200 dark:border-night-line'}`}>
                    <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 ${done ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 dark:border-slate-500'}`}>{done && <Icon name="check" className="h-4 w-4" />}</span>
                    <span className={`flex-1 ${done ? 'line-through opacity-60' : ''}`}>{t(p.key)}</span>
                    <span className="chip bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-200"><span className="num">{n(p.minutes)}</span>&nbsp;{t('minutes')}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card">
          <h2 className="mb-3 text-lg font-bold">{t('weakTopics')}</h2>
          <ul className="space-y-4">
            {SAMPLE_WEAK.map((w) => (
              <li key={w.id}>
                <div className="flex items-center justify-between gap-2"><span className="font-semibold">{t(w.key)}</span><span className="chip bg-accent-soft text-accent-dark"><span className="num">{pct(w.confidence)}</span></span></div>
                <p className="muted mb-2 mt-1">{t(w.subject)} · {t('confidence')}</p>
                <ProgressBar value={w.confidence} label={t(w.key)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card">
        <h2 className="mb-3 text-lg font-bold">{t('subjectProgress')}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SAMPLE_SUBJECTS.map((s) => (
            <div key={s.id}>
              <div className="mb-1 flex justify-between"><span className="font-semibold">{t(s.key)}</span><span className="num muted">{pct(s.progress)}</span></div>
              <ProgressBar value={s.progress} label={t(s.key)} />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">{t('quickActions')}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {([['/papers', 'papers', 'makePaper'], ['/viva', 'viva', 'startViva'], ['/notes', 'notes', 'addNotes']] as const).map(([to, icon, key]) => (
            <Link key={to} to={to} className="card flex items-center gap-3 transition hover:-translate-y-0.5 hover:ring-brand-500">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-200"><Icon name={icon} /></span>
              <span className="flex-1 font-semibold">{t(key)}</span>
              <Icon name="arrow" rtlFlip className="h-5 w-5 text-slate-400" />
            </Link>
          ))}
        </div>
      </section>
      <p className="muted text-center">{t('sampleNote')}</p>
    </div>
  );
}
