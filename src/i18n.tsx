import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useApp } from './store';

/* English dictionary is the master. The Urdu dictionary is typed as Record<Key, string>,
   so the build FAILS if any Urdu text is missing. This guarantees no mixed-language screens. */
const en = {
  appName: 'Exam Helper',
  tagline: 'Plan, practise and revise for your exams in one place.',
  dashboard: 'Dashboard', subjects: 'Subjects', notes: 'Notes', papers: 'Papers', viva: 'Viva', planner: 'Planner', progress: 'Progress', settings: 'Settings',
  goodMorning: 'Good morning', goodAfternoon: 'Good afternoon', goodEvening: 'Good evening',
  welcomeBack: 'Ready to study today?',
  examCountdown: 'Exam countdown', daysLeft: 'days left', dayLeft: 'day left', examToday: 'Exam day. Best of luck!', examPassed: 'Your exam date has passed.',
  noExamDate: 'Set your exam date to start the countdown.', setDate: 'Set exam date',
  studyStreak: 'Study streak', days: 'days', studiedToday: 'Studied today', hourShort: 'h', minShort: 'min',
  todaysPlan: "Today's plan", weakTopics: 'Topics to revise', confidence: 'Confidence', subjectProgress: 'Subject progress',
  quickActions: 'Quick actions', makePaper: 'Make a mock paper', startViva: 'Start a viva', addNotes: 'Add notes',
  sampleNote: 'This page shows sample data. Your own data appears as you use the app.',
  comingTitle: 'Coming in the next step', comingBody: 'This page is being built step by step. Here is what it will do:', backHome: 'Back to dashboard',
  subjectsDesc: 'Add your subjects and topics, and mark how confident you feel in each one.',
  subjectsF1: 'Add subjects and topics', subjectsF2: 'Mark topics as done or weak', subjectsF3: 'See progress for each subject',
  notesDesc: 'Paste your notes and let the helper turn them into a summary, key points and flashcards.',
  notesF1: 'Paste or write notes', notesF2: 'Automatic summary and key points', notesF3: 'Flashcards for quick revision',
  papersDesc: 'Choose a subject, chapters and marks, then get a full mock paper to practise.',
  papersF1: 'Short, long and multiple-choice questions', papersF2: 'Timer for exam practice', papersF3: 'Marking and feedback on your answers',
  vivaDesc: 'Practise your oral exam with an examiner that asks questions and scores your answers.',
  vivaF1: 'Questions one at a time', vivaF2: 'Easy, medium and hard levels', vivaF3: 'Score and tips after every answer',
  plannerDesc: 'Enter your exam date and get a daily study plan that fits your free time.',
  plannerF1: 'Daily plan made for you', plannerF2: 'Revision reminders', plannerF3: 'Adjusts when you miss a day',
  progressDesc: 'See your scores and weak topics in simple charts.',
  progressF1: 'Score trend over time', progressF2: 'Weak topics list', progressF3: 'Weekly study hours',
  yourName: 'Your name', examDate: 'Exam date', language: 'Language', theme: 'Theme', light: 'Light', dark: 'Dark', english: 'English', urdu: 'Urdu',
  dataNote: 'Your settings are saved in this browser only.', resetData: 'Reset all data', confirmReset: 'Delete all saved data on this device?', saved: 'Saved',
  subj_sa: 'Software Architecture', subj_es: 'Embedded Systems', subj_db: 'Database Systems', subj_ca: 'Calculus',
  plan1: 'Revise architectural styles', plan2: 'Practise class diagrams', plan3: 'Quiz on interrupts and timers', plan4: 'Mock viva on database normalisation',
  weak1: 'Event-driven architecture', weak2: 'Interrupt handling', weak3: 'Integration by parts', weak4: 'Normal forms',
  minutes: 'min',
};
export type Key = keyof typeof en;

const ur: Record<Key, string> = {
  appName: 'امتحانی مددگار',
  tagline: 'اپنے امتحانوں کی تیاری، مشق اور دہرائی ایک ہی جگہ۔',
  dashboard: 'ڈیش بورڈ', subjects: 'مضامین', notes: 'نوٹس', papers: 'پرچے', viva: 'زبانی امتحان', planner: 'منصوبہ', progress: 'پیش رفت', settings: 'ترتیبات',
  goodMorning: 'صبح بخیر', goodAfternoon: 'سہ پہر بخیر', goodEvening: 'شام بخیر',
  welcomeBack: 'کیا آج پڑھائی کے لیے تیار ہیں؟',
  examCountdown: 'امتحان میں باقی وقت', daysLeft: 'دن باقی', dayLeft: 'دن باقی', examToday: 'آج امتحان ہے۔ اللہ کامیابی دے!', examPassed: 'آپ کے امتحان کی تاریخ گزر چکی ہے۔',
  noExamDate: 'گنتی شروع کرنے کے لیے امتحان کی تاریخ درج کریں۔', setDate: 'تاریخ درج کریں',
  studyStreak: 'مسلسل پڑھائی', days: 'دن', studiedToday: 'آج کی پڑھائی', hourShort: 'گھنٹہ', minShort: 'منٹ',
  todaysPlan: 'آج کا منصوبہ', weakTopics: 'دہرانے کے موضوعات', confidence: 'اعتماد', subjectProgress: 'مضامین کی پیش رفت',
  quickActions: 'فوری کام', makePaper: 'مشقی پرچہ بنائیں', startViva: 'زبانی امتحان شروع کریں', addNotes: 'نوٹس شامل کریں',
  sampleNote: 'اس صفحے پر نمونے کا ڈیٹا دکھایا گیا ہے۔ ایپ استعمال کرنے پر آپ کا اپنا ڈیٹا نظر آئے گا۔',
  comingTitle: 'اگلے مرحلے میں آ رہا ہے', comingBody: 'یہ صفحہ قدم بہ قدم تیار ہو رہا ہے۔ یہ یہ کام کرے گا:', backHome: 'ڈیش بورڈ پر واپس',
  subjectsDesc: 'اپنے مضامین اور موضوعات شامل کریں، اور ہر ایک میں اپنا اعتماد درج کریں۔',
  subjectsF1: 'مضامین اور موضوعات شامل کرنا', subjectsF2: 'موضوع کو مکمل یا کمزور نشان زد کرنا', subjectsF3: 'ہر مضمون کی پیش رفت دیکھنا',
  notesDesc: 'اپنے نوٹس چسپاں کریں، اور مددگار انہیں خلاصے، اہم نکات اور فلیش کارڈز میں بدل دے گا۔',
  notesF1: 'نوٹس چسپاں یا تحریر کرنا', notesF2: 'خود بخود خلاصہ اور اہم نکات', notesF3: 'تیز دہرائی کے لیے فلیش کارڈز',
  papersDesc: 'مضمون، ابواب اور نمبر چنیں، اور مشق کے لیے پورا مشقی پرچہ حاصل کریں۔',
  papersF1: 'مختصر، طویل اور کثیر انتخابی سوالات', papersF2: 'امتحان کی مشق کے لیے گھڑی', papersF3: 'آپ کے جوابات کی جانچ اور مشورے',
  vivaDesc: 'ایسے ممتحن کے ساتھ زبانی امتحان کی مشق کریں جو سوال پوچھتا ہے اور آپ کے جوابات پر نمبر دیتا ہے۔',
  vivaF1: 'ایک وقت میں ایک سوال', vivaF2: 'آسان، درمیانہ اور مشکل درجے', vivaF3: 'ہر جواب کے بعد نمبر اور مشورے',
  plannerDesc: 'امتحان کی تاریخ درج کریں اور اپنے فارغ وقت کے مطابق روزانہ پڑھائی کا منصوبہ حاصل کریں۔',
  plannerF1: 'آپ کے لیے بنا ہوا روزانہ منصوبہ', plannerF2: 'دہرائی کی یاد دہانیاں', plannerF3: 'ناغہ ہونے پر خود بخود ردوبدل',
  progressDesc: 'اپنے نمبر اور کمزور موضوعات سادہ چارٹس میں دیکھیں۔',
  progressF1: 'وقت کے ساتھ نمبروں کا رجحان', progressF2: 'کمزور موضوعات کی فہرست', progressF3: 'ہفتہ وار پڑھائی کے گھنٹے',
  yourName: 'آپ کا نام', examDate: 'امتحان کی تاریخ', language: 'زبان', theme: 'رنگ و روپ', light: 'روشن', dark: 'تاریک', english: 'انگریزی', urdu: 'اردو',
  dataNote: 'آپ کی ترتیبات صرف اسی براؤزر میں محفوظ ہیں۔', resetData: 'تمام ڈیٹا مٹائیں', confirmReset: 'اس ڈیوائس پر محفوظ تمام ڈیٹا حذف کریں؟', saved: 'محفوظ ہو گیا',
  subj_sa: 'سافٹ ویئر آرکیٹیکچر', subj_es: 'ایمبیڈڈ سسٹمز', subj_db: 'ڈیٹا بیس سسٹمز', subj_ca: 'کیلکولس',
  plan1: 'تعمیراتی طرزوں کی دہرائی', plan2: 'کلاس ڈایاگرام کی مشق', plan3: 'انٹرپٹس اور ٹائمرز پر کوئز', plan4: 'ڈیٹا بیس نارملائزیشن پر مشقی زبانی امتحان',
  weak1: 'واقعہ پر مبنی تعمیر', weak2: 'انٹرپٹ کی ہینڈلنگ', weak3: 'حصص کے ذریعے تکمل', weak4: 'نارمل فارمز',
  minutes: 'منٹ',
};

const DICTS = { en, ur };
type Ctx = { t: (k: Key) => string; n: (x: number) => string; pct: (x: number) => string; comma: string; date: (iso: string) => string; lang: 'en' | 'ur'; rtl: boolean };
const I18nCtx = createContext<Ctx>({ t: (k) => k, n: (x) => String(x), pct: (x) => `${x}%`, comma: ',', date: (s) => s, lang: 'en', rtl: false });

export function I18nProvider({ children }: { children: ReactNode }) {
  const { settings } = useApp();
  const lang = settings.lang;
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ur' ? 'rtl' : 'ltr';
    root.classList.toggle('dark', settings.theme === 'dark');
    document.title = DICTS[lang].appName;
  }, [lang, settings.theme]);

  const numLocale = lang === 'ur' ? 'ur-PK-u-nu-arabext' : 'en-US';
  const dateLocale = lang === 'ur' ? 'ur-PK-u-nu-arabext' : 'en-GB';
  const value: Ctx = {
    t: (k) => DICTS[lang][k],
    n: (x) => new Intl.NumberFormat(numLocale).format(x),
    pct: (x) => new Intl.NumberFormat(numLocale).format(x) + (lang === 'ur' ? '٪' : '%'),
    comma: lang === 'ur' ? '،' : ',',
    date: (iso) => new Date(iso + 'T00:00:00').toLocaleDateString(dateLocale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }),
    lang, rtl: lang === 'ur',
  };
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}
export const useT = () => useContext(I18nCtx);
