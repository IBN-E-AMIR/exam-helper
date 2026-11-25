import { useApp } from '../store';
import { useT } from '../i18n';
import Icon from '../components/Icon';
import { PageHeader } from '../components/ui';

export default function Settings() {
  const { t } = useT();
  const app = useApp();
  const { settings, setSettings } = app;
  const set = (patch: Partial<typeof settings>) => setSettings({ ...settings, ...patch });
  return (
    <div>
      <PageHeader title={t('settings')} icon={<Icon name="settings" className="h-6 w-6" />} />
      <section className="card grid max-w-2xl gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor="sn">{t('yourName')}</label><input id="sn" className="input" value={settings.name} onChange={(e) => set({ name: e.target.value })} /></div>
        <div><label className="label" htmlFor="sd">{t('examDate')}</label><input id="sd" type="date" className="input" dir="ltr" value={settings.examDate} onChange={(e) => set({ examDate: e.target.value })} /></div>
        <div><label className="label" htmlFor="sl">{t('language')}</label>
          <select id="sl" className="input" value={settings.lang} onChange={(e) => set({ lang: e.target.value as 'en' | 'ur' })}><option value="en">{t('english')}</option><option value="ur">{t('urdu')}</option></select></div>
        <div><label className="label" htmlFor="st">{t('theme')}</label>
          <select id="st" className="input" value={settings.theme} onChange={(e) => set({ theme: e.target.value as 'light' | 'dark' })}><option value="light">{t('light')}</option><option value="dark">{t('dark')}</option></select></div>
      </section>
      <section className="card mt-4 max-w-2xl space-y-3">
        <p className="muted">{t('dataNote')}</p>
        <button className="btn bg-red-50 text-red-700 hover:bg-red-100" onClick={() => window.confirm(t('confirmReset')) && app.resetAll()}>{t('resetData')}</button>
      </section>
    </div>
  );
}
