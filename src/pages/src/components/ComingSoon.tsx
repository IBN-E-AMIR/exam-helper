import { Link } from 'react-router-dom';
import { useT } from '../i18n';
import Icon from '../components/Icon';
import { PageHeader } from '../components/ui';
import type { Key } from '../i18n';

export default function ComingSoon({ icon, title, desc, features }: { icon: string; title: Key; desc: Key; features: [Key, Key, Key] }) {
  const { t } = useT();
  return (
    <div>
      <PageHeader title={t(title)} subtitle={t(desc)} icon={<Icon name={icon} className="h-6 w-6" />} />
      <div className="card max-w-xl">
        <div className="mb-2 flex items-center gap-2 font-bold text-brand-700 dark:text-brand-200"><Icon name="sparkle" />{t('comingTitle')}</div>
        <p className="muted mb-3">{t('comingBody')}</p>
        <ul className="space-y-2">
          {features.map((f) => <li key={f} className="flex items-center gap-2"><Icon name="check" className="h-5 w-5 text-brand-600" />{t(f)}</li>)}
        </ul>
        <Link to="/" className="btn btn-soft mt-5">{t('backHome')}</Link>
      </div>
    </div>
  );
}
