import { NavLink, Outlet } from 'react-router-dom';
import { useT } from '../i18n';
import { useApp } from '../store';
import Icon from './Icon';
import NeonBackdrop from './NeonBackdrop';
import type { Key } from '../i18n';

const MAIN: { to: string; key: Key; icon: string }[] = [
  { to: '/', key: 'dashboard', icon: 'dashboard' },
  { to: '/subjects', key: 'subjects', icon: 'subjects' },
  { to: '/notes', key: 'notes', icon: 'notes' },
  { to: '/papers', key: 'papers', icon: 'papers' },
  { to: '/viva', key: 'viva', icon: 'viva' },
];
const MORE: { to: string; key: Key; icon: string }[] = [
  { to: '/planner', key: 'planner', icon: 'planner' },
  { to: '/progress', key: 'progress', icon: 'progress' },
  { to: '/settings', key: 'settings', icon: 'settings' },
];

export default function Layout() {
  const { t, lang } = useT();
  const { settings, setSettings } = useApp();
  const side = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive ? 'bg-white text-brand-800' : 'text-white/85 hover:bg-white/10'}`;

  return (
    <div className="min-h-screen">
      <NeonBackdrop />
      <aside className="sidebar fixed inset-y-0 start-0 z-30 hidden w-64 flex-col bg-gradient-to-b from-brand-800 to-brand-900 p-4 md:flex">
        <div className="mb-6 mt-2 flex items-center gap-3 px-2">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-white"><Icon name="cap" className="h-6 w-6" /></div>
          <span className="text-lg font-bold text-white">{t('appName')}</span>
        </div>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Main">
          {[...MAIN, ...MORE].map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={side}><Icon name={n.icon} />{t(n.key)}</NavLink>
          ))}
        </nav>
      </aside>

      <div className="relative z-10 md:ms-64">
        <header className="topbar sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-4 py-2 backdrop-blur dark:border-night-line dark:bg-night/90">
          <div className="flex items-center gap-2 md:hidden">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-brand-600 text-white"><Icon name="cap" className="h-5 w-5" /></div>
            <span className="whitespace-nowrap text-sm font-bold">{t('appName')}</span>
          </div>
          <div className="hidden md:block" />
          <div className="flex items-center gap-1.5">
            <button className="btn btn-soft !px-3" onClick={() => setSettings({ ...settings, lang: lang === 'en' ? 'ur' : 'en' })} aria-label={t('language')}>
              {lang === 'en' ? 'اردو' : 'English'}
            </button>
            <button className="btn btn-soft !px-2.5" onClick={() => setSettings({ ...settings, theme: settings.theme === 'dark' ? 'light' : 'dark' })} aria-label={t('theme')}>
              <Icon name={settings.theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <span className="flex gap-1.5 md:hidden">
              {MORE.map((n) => (
                <NavLink key={n.to} to={n.to} aria-label={t(n.key)} className={({ isActive }) => `btn !px-2.5 ${isActive ? 'btn-primary' : 'btn-soft'}`}><Icon name={n.icon} /></NavLink>
              ))}
            </span>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-57px)] max-w-5xl px-4 pb-28 pt-6 md:pb-10"><Outlet /></main>
      </div>

      <nav className="bottombar fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white text-slate-600 dark:border-night-line dark:bg-night-card dark:text-slate-300 md:hidden" aria-label="Main">
        {MAIN.map((n) => (
          <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `flex min-h-[60px] flex-col items-center justify-center gap-0.5 text-[11px] font-semibold ${isActive ? 'text-brand-600 dark:text-brand-200' : ''}`}>
            <Icon name={n.icon} className="h-6 w-6" />{t(n.key)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
