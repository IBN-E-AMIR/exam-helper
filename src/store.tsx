import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';

export interface Settings { name: string; examDate: string; lang: 'en' | 'ur'; theme: 'light' | 'dark' }

function useLS<T>(key: string, init: T): [T, Dispatch<SetStateAction<T>>] {
  const [v, setV] = useState<T>(() => {
    try { const s = localStorage.getItem(key); return s ? (JSON.parse(s) as T) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage blocked */ } }, [key, v]);
  return [v, setV];
}

interface AppState {
  settings: Settings; setSettings: Dispatch<SetStateAction<Settings>>;
  planDone: Record<string, boolean>; setPlanDone: Dispatch<SetStateAction<Record<string, boolean>>>;
  resetAll: () => void;
}
const Ctx = createContext<AppState | null>(null);
const PREFIX = 'examhelper.';

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useLS<Settings>(PREFIX + 'settings2', { name: '', examDate: '', lang: 'en', theme: 'dark' });
  const [planDone, setPlanDone] = useLS<Record<string, boolean>>(PREFIX + 'planDone', {});
  const resetAll = () => {
    Object.keys(localStorage).filter((k) => k.startsWith(PREFIX)).forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  };
  return <Ctx.Provider value={{ settings, setSettings, planDone, setPlanDone, resetAll }}>{children}</Ctx.Provider>;
}
export function useApp(): AppState {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp must be used inside AppProvider');
  return c;
}
