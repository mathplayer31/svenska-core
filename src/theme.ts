// Thème clair / sombre (issue #10). « system » suit le réglage du téléphone ou de l'ordinateur.
// Le choix est appliqué sur <html data-theme> ; index.html le relit avant le premier rendu.
import { useEffect, useState } from 'react';

export type ThemeChoice = 'light' | 'dark' | 'system';
const KEY = 'svenska.theme';

function readChoice(): ThemeChoice {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch {
    return 'system';
  }
}

const systemDark = () => typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;

export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(readChoice);
  const [sysDark, setSysDark] = useState(systemDark);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const on = () => setSysDark(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (choice === 'system') delete root.dataset.theme;
    else root.dataset.theme = choice;
    try {
      if (choice === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, choice);
    } catch {
      // stockage indisponible : le choix vaut pour cette session seulement
    }
  }, [choice]);

  const isDark = choice === 'dark' || (choice === 'system' && sysDark);
  return { choice, setChoice, isDark, toggle: () => setChoice(isDark ? 'light' : 'dark') };
}
