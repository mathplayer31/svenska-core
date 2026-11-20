// Écran Compte (issue #8) : connexion / inscription par e-mail et mot de passe, synchro, déconnexion.
import { useState } from 'react';
import { ArrowLeft, CircleUser, RefreshCw } from 'lucide-react';
import * as data from './dataSource';
import { useI18n } from './i18n';

interface Props {
  email: string | null;
  syncError: string | null;
  onClose: () => void;
  /** Après connexion, déconnexion ou synchro : l'app recharge la progression */
  onChanged: () => Promise<void> | void;
}

export default function AccountScreen({ email, syncError, onClose, onChanged }: Props) {
  const { t } = useI18n();
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const run = async (action: () => Promise<string | null>) => {
    setBusy(true);
    setMessage(null);
    try {
      const text = await action();
      await onChanged();
      if (text) setMessage({ ok: true, text });
    } catch (e) {
      setMessage({ ok: false, text: t.authError(e instanceof Error ? e.message : String(e)) });
    } finally {
      setBusy(false);
    }
  };

  const signIn = () => run(async () => (await data.signIn(formEmail.trim(), password), null));
  const signUp = () =>
    run(async () => {
      const mustConfirm = await data.signUp(formEmail.trim(), password);
      return mustConfirm ? t.confirmEmail : null;
    });
  const syncNow = () => run(async () => (await data.sync(), t.syncedOk));
  const signOut = () => run(async () => (await data.signOut(), null));

  const canSubmit = formEmail.includes('@') && password.length >= 6 && !busy;
  const input =
    'w-full px-4 py-3 rounded-xl bg-bg border border-line focus:border-accent outline-none text-ink placeholder:text-faint';

  return (
    <div className="min-h-dvh px-5 md:px-8 pt-6 md:pt-10 pb-10">
      <div className="mx-auto w-full max-w-md">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-1.5 -ml-2 px-2 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-ink hover:bg-surface-2 transition cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden /> {t.back}
        </button>

        <div className="flex items-center gap-3">
          <span className="grid place-items-center w-12 h-12 rounded-full bg-accent-soft text-accent">
            <CircleUser className="w-6 h-6" aria-hidden />
          </span>
          <h1 className="font-display text-4xl text-ink">{t.account}</h1>
        </div>

        <div className="mt-8 rounded-3xl bg-surface border border-line shadow-card p-6 space-y-5">
          {email ? (
            <>
              <p className="text-ink">{t.signedInAs(email)}</p>
              {syncError && <p className="text-sm text-danger">{t.syncFailed(syncError)}</p>}
              <button
                onClick={syncNow}
                disabled={busy}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${busy ? 'animate-spin' : ''}`} aria-hidden /> {t.syncNow}
              </button>
              <button
                onClick={signOut}
                disabled={busy}
                className="w-full py-3 rounded-xl border border-line hover:bg-surface-2 text-ink font-medium transition cursor-pointer disabled:opacity-60"
              >
                {t.signOut}
              </button>
            </>
          ) : (
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (canSubmit) signIn();
              }}
            >
              <p className="text-sm text-muted">{t.accountIntro}</p>
              <label className="block">
                <span className="block text-sm font-medium text-ink mb-1.5">{t.email}</span>
                <input
                  type="email"
                  autoComplete="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  className={input}
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-ink mb-1.5">{t.password}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={input}
                />
                <span className="block text-xs text-faint mt-1">{t.passwordHint}</span>
              </label>
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.signIn}
              </button>
              <button
                type="button"
                onClick={signUp}
                disabled={!canSubmit}
                className="w-full py-3 rounded-xl border border-line hover:bg-surface-2 text-ink font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t.signUp}
              </button>
            </form>
          )}
          {message && <p className={`text-sm ${message.ok ? 'text-success' : 'text-danger'}`}>{message.text}</p>}
        </div>
      </div>
    </div>
  );
}
