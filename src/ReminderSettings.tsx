// Réglage du rappel quotidien (issue #16), dans l'écran Compte.
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { loadReminder, reminderSupport, ReminderError, setReminder, type Reminder } from './reminders';
import { useI18n } from './i18n';

export default function ReminderSettings() {
  const { t } = useI18n();
  const [reminder, setLocal] = useState<Reminder>(loadReminder);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const support = reminderSupport();

  const apply = async (next: Reminder) => {
    setBusy(true);
    setError(null);
    try {
      await setReminder(next, { title: t.reminderTitle, body: t.reminderBody });
      setLocal(next);
    } catch (e) {
      if (e instanceof ReminderError) setError(e.code === 'denied' ? t.reminderDenied : t.reminderSignIn);
      else setError(t.authError(e instanceof Error ? e.message : String(e)));
    } finally {
      setBusy(false);
    }
  };

  const available = support === 'native' || support === 'web';

  return (
    <div className="mt-6 rounded-3xl bg-surface border border-line shadow-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <span className="grid place-items-center w-10 h-10 rounded-full bg-accent-soft text-accent">
          <Bell className="w-5 h-5" aria-hidden />
        </span>
        <h2 className="font-display text-2xl text-ink">{t.reminder}</h2>
      </div>
      <p className="text-sm text-muted">{t.reminderIntro}</p>

      {available ? (
        <>
          <label className="flex items-center justify-between gap-4 cursor-pointer">
            <span className="font-medium text-ink">{t.reminderToggle}</span>
            <button
              type="button"
              role="switch"
              aria-checked={reminder.on}
              disabled={busy}
              onClick={() => apply({ ...reminder, on: !reminder.on })}
              className={`relative w-12 h-7 rounded-full transition cursor-pointer disabled:opacity-60 ${reminder.on ? 'bg-accent' : 'bg-surface-2 border border-line'}`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full shadow transition-all ${reminder.on ? 'left-6 bg-accent-ink' : 'left-1 bg-muted'}`}
              />
            </button>
          </label>
          <label className="flex items-center justify-between gap-4">
            <span className="font-medium text-ink">{t.reminderTime}</span>
            <input
              type="time"
              value={reminder.time}
              disabled={busy}
              onChange={(e) => e.target.value && apply({ ...reminder, time: e.target.value })}
              className="px-3 py-2 rounded-xl bg-bg border border-line focus:border-accent outline-none text-ink disabled:opacity-60"
            />
          </label>
          {reminder.on && !error && <p className="text-sm text-success">{t.reminderOn(reminder.time)}</p>}
        </>
      ) : (
        <p className="text-sm text-ink">{support === 'ios-install' ? t.reminderInstallIos : t.reminderUnsupported}</p>
      )}
      {error && <p className="text-sm text-danger">{error}</p>}
    </div>
  );
}
