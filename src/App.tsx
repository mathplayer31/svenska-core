import { useState, useEffect, useCallback, useMemo } from 'react';
import { createEmptyCard, fsrs, Rating, type Card as FSRSCard, type Grade } from 'ts-fsrs';
import {
  Volume2,
  BookOpen,
  Ear,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Check,
  ChevronDown,
  ChevronRight,
  Compass,
  RotateCcw,
  Lock,
  ClipboardCheck,
  Dumbbell,
  Play,
  CircleUser,
  Moon,
  Sun,
  Trophy,
} from 'lucide-react';
import * as data from './dataSource';
import AccountScreen from './AccountScreen';
import { refreshReminder } from './reminders';
import Leaderboard from './Leaderboard';
import SectionTest from './SectionTest';
import { COURSE_LANGS, useI18n, type Course, type Lang } from './i18n';
import UnitPractice, { type PracticeCard } from './UnitPractice';
import UnitSession, { type SessionItem } from './UnitSession';
import StudyCard, { playAll, type StudyCardData } from './StudyCard';
import { AlbumCover, COURSE_NAME, CourseSheet, Equalizer, Flag, ThemeToggle, WaveProgress } from './Melodi';
import { useTheme } from './theme';
import type { Tone } from './ToneCurve';
import { MAX_NEW, MAX_RECALL } from './sessionPlan';

interface DeckInfo {
  id: string;
  slug: string;
  title: string;
  category: 'phonetics' | 'grammar' | 'vocabulary';
  cefrLevel: string;
  sortOrder: number;
  track: 'foundation' | 'thematic';
  unitNumber: number | null;
  prerequisiteDeckId: string | null;
  sectionId: string | null;
  titleEn: string | null;
}

interface SectionInfo {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  titleEn: string | null;
  descriptionEn: string | null;
  sortOrder: number;
  passScore: number;
}

interface SectionProgress {
  bestScore: number;
  passed: boolean;
  attempts: number;
}

interface GlossItem {
  sv: string;
  fr: string;
  en?: string;
}

interface SwedishCard {
  id: string;
  deckId: string;
  cardType: string;
  swedishPrompt: string;
  promptEn: string | null;
  swedishTarget: string;
  english: string; // traduction française
  englishEn: string | null;
  ipa: string;
  pitchAccent?: string;
  tone: Tone | null;
  explanation: string;
  explanationEn: string | null;
  ipaEn: string | null;
  audioUrl?: string;
  gloss: GlossItem[] | null;
  fsrsCard: FSRSCard;
}

/** Séance d'unité en cours : listes figées au lancement pour que la séance ne bouge pas en route */
interface ActiveSession {
  unitId: string | null;
  title: string;
  newIds: string[];
  recallIds: string[];
  key: number;
}

const f = fsrs();

// Meilleurs scores d'entraînement par unité : confort local (pas de DB pour l'instant)
const PRACTICE_KEY = 'svenska.practiceScores';
function loadPracticeScores(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(PRACTICE_KEY) || '{}');
  } catch {
    return {};
  }
}
function savePracticeScores(scores: Record<string, number>) {
  try {
    localStorage.setItem(PRACTICE_KEY, JSON.stringify(scores));
  } catch {
    // stockage indisponible : on ignore
  }
}

export default function App() {
  const { lang, setLang, course, setCourse, t } = useI18n();
  // Rappel quotidien (issue #16) : texte dans la langue de l'interface, fuseau à jour
  useEffect(() => {
    refreshReminder({ title: t.reminderTitle, body: t.reminderBody });
  }, [t.reminderTitle, t.reminderBody]);
  const theme = useTheme();
  const [decks, setDecks] = useState<DeckInfo[]>([]);
  const [cards, setCards] = useState<SwedishCard[]>([]);
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [sectionProgress, setSectionProgress] = useState<Map<string, SectionProgress>>(new Map());
  const [loading, setLoading] = useState(true);

  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [testSectionId, setTestSectionId] = useState<string | null>(null);
  const [unitDeckId, setUnitDeckId] = useState<string | null>(null);
  const [practiceDeckId, setPracticeDeckId] = useState<string | null>(null);
  const [session, setSession] = useState<ActiveSession | null>(null);
  const [practiceScores, setPracticeScores] = useState<Record<string, number>>(loadPracticeScores);
  const [tab, setTab] = useState<(typeof NAV)[number]['id']>('parcours');
  const [cramMode, setCramMode] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [showAccount, setShowAccount] = useState(false);
  const [showCourses, setShowCourses] = useState(false);

  // silent : rechargement en arrière-plan (retour sur l'app), sans écran de chargement
  const loadData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    // Synchro du compte d'abord (sans effet si déconnecté) ; en cas d'échec réseau, la progression locale suffit
    try {
      await data.sync();
      setSyncError(null);
    } catch (e) {
      setSyncError(e instanceof Error ? e.message : String(e));
    }
    setUserEmail((await data.currentUser())?.email ?? null);
    const loaded = await data.load();
    // Seul le cours actif est chargé : parcours, rappels et fondations ne voient que lui
    const inCourse = (x: { course?: string | null }) => (x.course ?? 'sv') === course;
    const courseDecks = loaded.decks.filter(inCourse);
    const courseDeckIds = new Set(courseDecks.map((d) => d.id));
    const progressMap = new Map((loaded.progress || []).map((p) => [p.card_id, p]));

    setDecks(
      courseDecks.map((d) => ({
        id: d.id,
        slug: d.slug,
        title: d.title,
        category: d.category,
        cefrLevel: d.cefr_level,
        sortOrder: d.sort_order,
        track: d.track ?? 'foundation',
        unitNumber: d.unit_number ?? null,
        prerequisiteDeckId: d.prerequisite_deck_id ?? null,
        sectionId: d.section_id ?? null,
        titleEn: d.title_en ?? null,
      }))
    );

    setSections(
      loaded.sections.filter(inCourse).map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.description ?? null,
        titleEn: s.title_en ?? null,
        descriptionEn: s.description_en ?? null,
        sortOrder: s.sort_order,
        passScore: s.pass_score,
      }))
    );

    setSectionProgress(
      new Map(
        (loaded.sectionProgress || []).map((p) => [
          p.section_id as string,
          { bestScore: p.best_score, passed: p.passed, attempts: p.attempts },
        ])
      )
    );

    setCards(
      loaded.cards
        .filter((c) => courseDeckIds.has(c.deck_id))
        .map((row) => {
          const saved = progressMap.get(row.id);
          const fsrsCard: FSRSCard = saved
            ? {
                due: new Date(saved.due),
                stability: saved.stability,
                difficulty: saved.difficulty,
                elapsed_days: saved.elapsed_days,
                scheduled_days: saved.scheduled_days,
                reps: saved.reps,
                lapses: saved.lapses,
                state: saved.state,
                last_review: saved.last_review ? new Date(saved.last_review) : undefined,
                learning_steps: saved.learning_steps ?? 0,
              }
            : createEmptyCard();

          return {
            id: row.id,
            deckId: row.deck_id,
            cardType: row.card_type,
            swedishPrompt: row.swedish_prompt,
            promptEn: row.prompt_en ?? null,
            swedishTarget: row.swedish_target,
            english: row.french_translation || row.english_translation,
            englishEn: row.english_translation ?? null,
            ipa: row.ipa_transcription || '',
            pitchAccent: row.pitch_accent,
            tone: row.tone ?? null,
            explanation: row.explanation_md,
            explanationEn: row.explanation_en ?? null,
            ipaEn: row.ipa_en ?? null,
            audioUrl: row.audio_url,
            gloss: Array.isArray(row.gloss) ? row.gloss : null,
            fsrsCard,
          };
        })
    );

    setLoading(false);
  }, [course]);

  useEffect(() => {
    loadData();
    // Retour sur l'app (onglet ou appli Android) : on récupère ce qui a été fait sur un autre appareil
    const onVisible = () => document.visibilityState === 'visible' && loadData(true);
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, [loadData]);

  // Chaque changement d'écran repart du haut de la page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [unitDeckId, session, practiceDeckId, testSectionId, selectedDeckId, tab]);

  // ---------------------------------------------------------------------------
  // Ordre, sections et verrouillage
  // ---------------------------------------------------------------------------
  const sortedDecks = useMemo(
    () =>
      [...decks].sort((a, b) => {
        if (a.track !== b.track) return a.track === 'thematic' ? -1 : 1;
        if (a.track === 'thematic' && a.unitNumber !== b.unitNumber) {
          return (a.unitNumber ?? 99) - (b.unitNumber ?? 99);
        }
        return a.sortOrder - b.sortOrder;
      }),
    [decks]
  );

  const deckById = useMemo(() => new Map(decks.map((d) => [d.id, d])), [decks]);

  const sortedSections = useMemo(() => [...sections].sort((a, b) => a.sortOrder - b.sortOrder), [sections]);

  // La 1re section est toujours ouverte ; la suivante s'ouvre quand le test de la précédente est réussi.
  const unlockedSectionIds = useMemo(() => {
    const set = new Set<string>();
    sortedSections.forEach((s, i) => {
      if (i === 0 || sectionProgress.get(sortedSections[i - 1].id)?.passed) set.add(s.id);
    });
    return set;
  }, [sortedSections, sectionProgress]);

  // Un deck est débloqué si sa section est ouverte ET si son prérequis a été entièrement vu.
  const unlockedDeckIds = useMemo(() => {
    const set = new Set<string>();
    for (const deck of decks) {
      if (deck.sectionId && !unlockedSectionIds.has(deck.sectionId)) continue;
      if (!deck.prerequisiteDeckId) {
        set.add(deck.id);
        continue;
      }
      const prereqCards = cards.filter((c) => c.deckId === deck.prerequisiteDeckId);
      if (prereqCards.length === 0 || prereqCards.every((c) => c.fsrsCard.state !== 0)) {
        set.add(deck.id);
      }
    }
    return set;
  }, [decks, cards, unlockedSectionIds]);

  // Séances des fondations : cartes dues, puis nouvelles (ou toutes en mode libre)
  const sessionQueue = useMemo(() => {
    if (!selectedDeckId) return [];
    const now = new Date();
    const pool = cards.filter((c) => c.deckId === selectedDeckId);
    if (cramMode) return pool;
    const due = pool
      .filter((c) => c.fsrsCard.state !== 0 && c.fsrsCard.due <= now)
      .sort((a, b) => a.fsrsCard.due.getTime() - b.fsrsCard.due.getTime());
    const fresh = pool.filter((c) => c.fsrsCard.state === 0);
    return [...due, ...fresh];
  }, [cards, selectedDeckId, cramMode]);

  const currentCard = useMemo(() => {
    if (sessionQueue.length === 0) return null;
    if (currentCardId) {
      const found = sessionQueue.find((c) => c.id === currentCardId);
      if (found) return found;
    }
    return sessionQueue[0];
  }, [sessionQueue, currentCardId]);

  // ---------------------------------------------------------------------------
  // Notation FSRS (cartes retournées et rappels des séances)
  // ---------------------------------------------------------------------------
  const rateCard = useCallback(
    async (cardId: string, grade: Grade) => {
      const card = cards.find((c) => c.id === cardId);
      if (!card) return;
      const now = new Date();
      const updated = f.repeat(card.fsrsCard, now)[grade].card;
      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, fsrsCard: updated } : c)));
      await data.saveCardProgress({
        card_id: cardId,
        state: updated.state,
        due: updated.due.toISOString(),
        stability: updated.stability,
        difficulty: updated.difficulty,
        elapsed_days: updated.elapsed_days,
        scheduled_days: updated.scheduled_days,
        learning_steps: updated.learning_steps,
        reps: updated.reps,
        lapses: updated.lapses,
        last_review: now.toISOString(),
      });
    },
    [cards]
  );

  const handleFoundationRate = useCallback(
    (grade: Grade) => {
      if (!currentCard) return;
      data.awardXp(currentCard.fsrsCard.state === 0 ? 'new' : grade === Rating.Again ? 'miss' : 'ok');
      // Dernière carte de la séance (une carte notée sort de la file jusqu'à sa prochaine échéance)
      if (!cramMode && sessionQueue.length === 1) data.awardXp('session');
      setIsFlipped(false);
      if (cramMode && sessionQueue.length > 1) {
        const idx = sessionQueue.findIndex((c) => c.id === currentCard.id);
        setCurrentCardId(sessionQueue[(idx + 1) % sessionQueue.length].id);
      } else {
        setCurrentCardId(null);
      }
      rateCard(currentCard.id, grade);
    },
    [currentCard, cramMode, sessionQueue, rateCard]
  );

  // ---------------------------------------------------------------------------
  // Test de section
  // ---------------------------------------------------------------------------
  const handleTestFinish = useCallback(
    async (score: number) => {
      const section = sections.find((s) => s.id === testSectionId);
      if (!section) return;

      const prev = sectionProgress.get(section.id);
      const next: SectionProgress = {
        bestScore: Math.max(prev?.bestScore ?? 0, score),
        passed: (prev?.passed ?? false) || score >= section.passScore,
        attempts: (prev?.attempts ?? 0) + 1,
      };

      setSectionProgress((old) => new Map(old).set(section.id, next));

      await data.saveSectionProgress({
        section_id: section.id,
        best_score: next.bestScore,
        passed: next.passed,
        attempts: next.attempts,
        last_attempt: new Date().toISOString(),
      });
    },
    [sections, testSectionId, sectionProgress]
  );

  const formatTimeDiff = (targetDate: Date) => {
    const now = new Date();
    const diffMins = Math.max(1, Math.round((targetDate.getTime() - now.getTime()) / 60000));
    if (diffMins < 60) return `${diffMins}${t.unitMinutes}`;
    const diffDays = Math.round(diffMins / 1440);
    return diffDays >= 1 ? `${diffDays}${t.unitDays}` : `${Math.round(diffMins / 60)}${t.unitHours}`;
  };

  const intervalsFor = (cardId: string): Record<number, string> => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return {};
    const next = f.repeat(card.fsrsCard, new Date());
    return Object.fromEntries(
      ([Rating.Again, Rating.Hard, Rating.Good, Rating.Easy] as Grade[]).map((g) => [g, formatTimeDiff(next[g].card.due)])
    );
  };

  const getStats = (subset: SwedishCard[]) => {
    const now = new Date();
    let newCount = 0;
    let dueCount = 0;
    let nextDueDate: Date | null = null;
    for (const c of subset) {
      if (c.fsrsCard.state === 0) newCount++;
      else if (c.fsrsCard.due <= now) dueCount++;
      else if (!nextDueDate || c.fsrsCard.due < nextDueDate) nextDueDate = c.fsrsCard.due;
    }
    return {
      newCount,
      dueCount,
      totalDue: newCount + dueCount,
      nextDueLabel: nextDueDate ? formatTimeDiff(nextDueDate) : null,
    };
  };

  // Contenu dans la langue choisie : champs `En` en anglais, sinon langue de base du cours (français ou suédois)
  const L = {
    prompt: (c: SwedishCard) => (lang === 'en' && c.promptEn) || c.swedishPrompt,
    tr: (c: SwedishCard) => (lang === 'en' && c.englishEn) || c.english,
    note: (c: SwedishCard) => (lang === 'en' && c.explanationEn) || c.explanation,
    ipa: (c: SwedishCard) => (lang === 'en' && c.ipaEn) || c.ipa,
    // Les accents tonals sont saisis en français (« Accent 1 (Aigu) ») : seuls ces deux mots changent
    accent: (x: string) => (lang === 'en' ? x.replace('(Aigu)', '(acute)').replace('(Grave)', '(grave)') : x),
    gloss: (c: SwedishCard) => c.gloss?.map((g) => ({ sv: g.sv, fr: (lang === 'en' && g.en) || g.fr })) ?? null,
    deck: (d: DeckInfo) => (lang === 'en' && d.titleEn) || d.title,
    section: (x: SectionInfo) => (lang === 'en' && x.titleEn) || x.title,
    sectionDesc: (x: SectionInfo) => (lang === 'en' && x.descriptionEn) || x.description,
  };
  const switchCourse = (c: Course) => {
    setSelectedDeckId(null);
    setTestSectionId(null);
    setUnitDeckId(null);
    setPracticeDeckId(null);
    setSession(null);
    setCurrentCardId(null);
    setTab('parcours');
    setShowCourses(false);
    window.scrollTo(0, 0);
    if (c !== course) setCourse(c);
  };
  const localize = (c: SwedishCard) => ({ ...c, swedishPrompt: L.prompt(c), english: L.tr(c), gloss: L.gloss(c) });
  const toStudy = (c: SwedishCard): StudyCardData => ({
    id: c.id,
    cardType: c.cardType,
    prompt: L.prompt(c),
    target: c.swedishTarget,
    translation: L.tr(c),
    ipa: L.ipa(c),
    note: L.note(c),
    gloss: L.gloss(c),
    audioUrl: c.audioUrl,
    accentLabel: c.pitchAccent ? L.accent(c.pitchAccent) : undefined,
    tone: c.tone,
  });
  const toPractice = (c: SwedishCard): PracticeCard => ({
    id: c.id,
    cardType: c.cardType,
    swedishTarget: c.swedishTarget,
    english: L.tr(c),
    audioUrl: c.audioUrl,
    gloss: L.gloss(c),
  });
  const unitLabelOf = (c: SwedishCard) => {
    const d = deckById.get(c.deckId);
    if (!d) return '';
    const { eyebrow, title } = splitTitle(L.deck(d));
    return eyebrow || title;
  };

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Wordmark className="text-3xl animate-pulse" />
      </div>
    );
  }

  // Cartes des unités ouvertes : source des rappels et des distracteurs d'exercices
  const openThematic = cards.filter((c) => deckById.get(c.deckId)?.track === 'thematic' && unlockedDeckIds.has(c.deckId));
  const dueRecalls = () => {
    const now = new Date();
    return openThematic
      .filter((c) => c.fsrsCard.state !== 0 && c.fsrsCard.due <= now)
      .sort((a, b) => a.fsrsCard.due.getTime() - b.fsrsCard.due.getTime());
  };
  const freshOf = (deckId: string) => cards.filter((c) => c.deckId === deckId && c.fsrsCard.state === 0);

  const startSession = (unit: DeckInfo | null) => {
    setSession({
      unitId: unit?.id ?? null,
      title: unit ? splitTitle(L.deck(unit)).title : t.recallsTitle,
      newIds: unit ? freshOf(unit.id).map((c) => c.id) : [],
      recallIds: dueRecalls().map((c) => c.id),
      key: Date.now(),
    });
  };

  // Unité en cours : la première unité ouverte qui a encore des cartes à découvrir
  const currentUnit =
    sortedDecks.find((d) => d.track === 'thematic' && unlockedDeckIds.has(d.id) && freshOf(d.id).length > 0) ?? null;

  // ============================================================================
  // VUE COMPTE (connexion, inscription, synchro)
  // ============================================================================
  if (showAccount) {
    return (
      <AccountScreen
        email={userEmail}
        syncError={syncError}
        onClose={() => setShowAccount(false)}
        onChanged={() => loadData(true)}
      />
    );
  }

  // ============================================================================
  // VUE 0 : TEST DE FIN DE SECTION
  // ============================================================================
  const testSection = testSectionId ? sections.find((s) => s.id === testSectionId) : undefined;
  if (testSection) {
    const sectionDeckIds = new Set(decks.filter((d) => d.sectionId === testSection.id).map((d) => d.id));
    const testCards = cards.filter((c) => sectionDeckIds.has(c.deckId));
    return (
      <SectionTest
        sectionTitle={L.section(testSection)}
        passScore={testSection.passScore}
        cards={testCards.map(localize)}
        bestScore={sectionProgress.get(testSection.id)?.bestScore ?? 0}
        onFinish={handleTestFinish}
        onExit={() => setTestSectionId(null)}
      />
    );
  }

  // ============================================================================
  // VUE 0 bis : ENTRAÎNEMENT LIBRE D'UNITÉ
  // ============================================================================
  const practiceDeck = practiceDeckId ? deckById.get(practiceDeckId) : undefined;
  if (practiceDeck) {
    const unitCards = cards.filter((c) => c.deckId === practiceDeck.id);
    // Distracteurs des blocs : mots des unités thématiques précédentes
    const previousWords = cards
      .filter((c) => {
        const d = deckById.get(c.deckId);
        return d?.track === 'thematic' && (d.unitNumber ?? 0) < (practiceDeck.unitNumber ?? 0);
      })
      .map((c) => c.swedishTarget);
    return (
      <UnitPractice
        key={practiceDeck.id}
        unitTitle={L.deck(practiceDeck)}
        cards={unitCards.map(localize)}
        extraWords={previousWords}
        bestScore={practiceScores[practiceDeck.id] ?? 0}
        onFinish={(score) => {
          setPracticeScores((prev) => {
            const next = { ...prev, [practiceDeck.id]: Math.max(prev[practiceDeck.id] ?? 0, score) };
            savePracticeScores(next);
            return next;
          });
        }}
        onExit={() => setPracticeDeckId(null)}
      />
    );
  }

  // ============================================================================
  // VUE 0 ter : SÉANCE D'UNITÉ (nouvelles cartes, exercices, rappels)
  // ============================================================================
  if (session) {
    const byId = new Map(cards.map((c) => [c.id, c]));
    const toItem = (id: string): SessionItem[] => {
      const c = byId.get(id);
      return c ? [{ study: toStudy(c), practice: toPractice(c), unitLabel: unitLabelOf(c) }] : [];
    };
    const unit = session.unitId ? deckById.get(session.unitId) : undefined;
    const allSeen = unit ? freshOf(unit.id).length === 0 : false;
    return (
      <UnitSession
        key={session.key}
        title={session.title}
        newItems={session.newIds.flatMap(toItem)}
        recallItems={session.recallIds.flatMap(toItem)}
        poolCards={openThematic.map(toPractice)}
        extraWords={openThematic.map((c) => c.swedishTarget)}
        onRate={rateCard}
        intervals={intervalsFor}
        onExit={() => setSession(null)}
        onAgain={() => startSession(unit ?? null)}
        onFreePractice={
          unit && allSeen
            ? () => {
                setSession(null);
                setPracticeDeckId(unit.id);
              }
            : undefined
        }
      />
    );
  }

  // ============================================================================
  // VUE 1 : PAGE D'UNITÉ (séance, entraînement libre, lexique)
  // ============================================================================
  const unitDeck = !selectedDeckId && unitDeckId ? deckById.get(unitDeckId) : undefined;
  if (unitDeck) {
    const unitCards = cards.filter((c) => c.deckId === unitDeck.id);
    const stats = getStats(unitCards);
    const seen = unitCards.filter((c) => c.fsrsCard.state !== 0).length;
    const allSeen = unitCards.length > 0 && seen === unitCards.length;
    const best = practiceScores[unitDeck.id];
    const vocabCards = unitCards.filter((c) => c.cardType === 'vocab');
    const phraseCards = unitCards.filter((c) => c.cardType === 'phrase');
    const { eyebrow, title } = splitTitle(L.deck(unitDeck));
    const recallCount = Math.min(MAX_RECALL, dueRecalls().length);
    const newCount = Math.min(MAX_NEW, stats.newCount);
    const pct = unitCards.length ? Math.round((seen / unitCards.length) * 100) : 0;

    const lexiconRow = (c: SwedishCard) => {
      const hidden = c.fsrsCard.state === 0;
      return (
        <li key={c.id}>
          <button
            onClick={() => playAll(c.audioUrl)}
            disabled={hidden}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl hover:bg-bg text-left transition cursor-pointer disabled:cursor-default disabled:opacity-50"
          >
            <span className="min-w-0">
              <span className="block font-semibold text-ink truncate">{hidden ? t.toDiscover : c.swedishTarget}</span>
              <span className="block text-sm text-muted truncate">{L.tr(c)}</span>
            </span>
            {!hidden && c.audioUrl && <Volume2 className="w-4 h-4 text-faint shrink-0" aria-hidden />}
          </button>
        </li>
      );
    };

    return (
      <Page>
        <TopBar onBack={() => setUnitDeckId(null)} backLabel={t.navParcours} />
        <header className="pt-1 pb-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-ink mt-1">{title}</h1>
          <div className="mt-5 flex items-center gap-4">
            <ProgressBar value={unitCards.length ? seen / unitCards.length : 0} label={t.unitProgress(pct, seen, unitCards.length)} />
            <span className="text-sm font-semibold text-muted tabular-nums shrink-0" aria-hidden>
              {pct} %
            </span>
          </div>
        </header>

        <div className="grid gap-3 md:grid-cols-2">
          <button
            onClick={() => startSession(unitDeck)}
            className="text-left rounded-[28px] bg-strong text-strong-ink p-5 flex items-center justify-between gap-4 cursor-pointer hover:opacity-95 transition"
          >
            <span>
              <span className="block font-display text-2xl font-extrabold tracking-tight">{t.startUnitSession}</span>
              <span className="block text-sm text-strong-muted mt-1">
                {newCount + recallCount > 0 ? t.resumeSub(newCount, recallCount) : t.allCaughtUpSub(stats.nextDueLabel)}
              </span>
            </span>
            <span className="grid place-items-center w-14 h-14 rounded-full bg-white text-[#3b4fa8] shrink-0" aria-hidden>
              <Play className="w-6 h-6 fill-current" />
            </span>
          </button>
          <button
            onClick={() => allSeen && setPracticeDeckId(unitDeck.id)}
            disabled={!allSeen}
            className="text-left rounded-[28px] bg-surface shadow-card p-5 flex items-center justify-between gap-4 cursor-pointer disabled:cursor-not-allowed transition enabled:hover:bg-surface-2"
          >
            <span>
              <span className={`block font-display text-2xl font-extrabold tracking-tight ${allSeen ? 'text-ink' : 'text-muted'}`}>
                {t.freePractice}
              </span>
              <span className="block text-sm text-muted mt-1">
                {allSeen ? (best !== undefined ? t.bestScore(best) : t.practiceText) : t.discoverMore(unitCards.length - seen)}
              </span>
            </span>
            <span
              className={`grid place-items-center w-14 h-14 rounded-full shrink-0 ${allSeen ? 'bg-accent-soft text-accent' : 'bg-bg text-faint'}`}
              aria-hidden
            >
              {allSeen ? <Dumbbell className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
            </span>
          </button>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink mb-3">{t.lexicon}</h2>
          <div className="rounded-[28px] bg-surface shadow-card p-2">
            <ul className="grid sm:grid-cols-2">{vocabCards.map(lexiconRow)}</ul>
            {phraseCards.length > 0 && (
              <>
                <p className="px-4 pt-4 pb-1 text-xs font-bold uppercase tracking-[0.12em] text-muted">{t.phrases}</p>
                <ul>{phraseCards.map(lexiconRow)}</ul>
              </>
            )}
          </div>
        </section>
      </Page>
    );
  }

  // ============================================================================
  // VUE 2 : ACCUEIL (parcours en albums, fondations)
  // ============================================================================
  if (!selectedDeckId) {
    const foundationDecks = sortedDecks.filter((d) => d.track === 'foundation' && !d.sectionId);
    const orphanThematicDecks = sortedDecks.filter((d) => d.track === 'thematic' && !d.sectionId);
    const sectionLevel = (x: SectionInfo) => decks.find((d) => d.sectionId === x.id)?.cefrLevel ?? 'A1';
    const foundationIds = new Set(foundationDecks.filter((d) => unlockedDeckIds.has(d.id)).map((d) => d.id));
    const foundationDue = getStats(cards.filter((c) => foundationIds.has(c.deckId))).dueCount;
    const recallCount = Math.min(MAX_RECALL, dueRecalls().length);

    const lockReasonFor = (deck: DeckInfo) => {
      if (deck.sectionId && !unlockedSectionIds.has(deck.sectionId)) return t.lockPrevSection;
      const prereqDeck = deck.prerequisiteDeckId ? deckById.get(deck.prerequisiteDeckId) : undefined;
      if (!prereqDeck) return '';
      const prereq = L.deck(prereqDeck);
      return t.lockAfter(splitTitle(prereq).eyebrow || prereq);
    };

    const openFoundation = (deck: DeckInfo, totalDue: number) => {
      if (!unlockedDeckIds.has(deck.id)) return;
      // Tout est à jour : clic = mode libre direct
      setCramMode(totalDue === 0);
      setSelectedDeckId(deck.id);
    };

    const renderTrack = (deck: DeckInfo) => {
      const deckCards = cards.filter((c) => c.deckId === deck.id);
      const stats = getStats(deckCards);
      const locked = !unlockedDeckIds.has(deck.id);
      const seen = deckCards.filter((c) => c.fsrsCard.state !== 0).length;
      const complete = deckCards.length > 0 && seen === deckCards.length;
      const isCurrent = currentUnit?.id === deck.id;
      const { title } = splitTitle(L.deck(deck));
      const sub = locked
        ? lockReasonFor(deck)
        : isCurrent
          ? `${t.trackCards(deckCards.length)} · ${t.inProgress}`
          : stats.dueCount > 0
            ? `${t.trackCards(deckCards.length)} · ${t.toReview(stats.dueCount)}`
            : t.trackCards(deckCards.length);

      return (
        <li key={deck.id}>
          <button
            onClick={() => !locked && setUnitDeckId(deck.id)}
            disabled={locked}
            aria-current={isCurrent ? 'step' : undefined}
            className={`w-full min-h-[60px] flex items-center gap-3 px-3 py-2 rounded-2xl text-left transition cursor-pointer disabled:cursor-not-allowed ${
              isCurrent ? 'bg-accent-soft' : 'enabled:hover:bg-bg'
            }`}
          >
            <span className="w-7 grid place-items-center shrink-0 font-semibold text-muted tabular-nums">
              {isCurrent ? <Equalizer /> : deck.unitNumber}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate ${isCurrent ? 'text-accent font-bold' : locked ? 'text-muted font-semibold' : 'text-ink font-semibold'}`}>
                {title}
              </span>
              <span className="block text-xs text-muted mt-0.5 truncate">{sub}</span>
            </span>
            {locked ? (
              <Lock className="w-4 h-4 text-faint shrink-0" aria-label={t.locked} />
            ) : complete ? (
              <Check className="w-5 h-5 text-accent shrink-0" aria-label={t.done} />
            ) : (
              <span className="text-xs font-semibold text-muted tabular-nums shrink-0">
                {seen}/{deckCards.length}
              </span>
            )}
          </button>
        </li>
      );
    };

    const renderAlbum = (section: SectionInfo, idx: number) => {
      const sectionDecks = sortedDecks.filter((d) => d.sectionId === section.id);
      const deckIds = new Set(sectionDecks.map((d) => d.id));
      const sectionCards = cards.filter((c) => deckIds.has(c.deckId));
      const unlocked = unlockedSectionIds.has(section.id);
      const progress = sectionProgress.get(section.id);
      const seen = sectionCards.filter((c) => c.fsrsCard.state !== 0).length;
      const testReady = unlocked && sectionCards.length > 0 && seen === sectionCards.length;
      const prevTitle = idx > 0 ? splitTitle(L.section(sortedSections[idx - 1])).title : null;
      const { title } = splitTitle(L.section(section));

      return (
        <section key={section.id} id={`album-${section.id}`} className="scroll-mt-6">
          <div className="flex items-center gap-4">
            <AlbumCover n={idx + 1} dim={!unlocked} />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-muted">{t.albumVol(idx + 1, sectionLevel(section))}</p>
              <h2 className={`font-display text-2xl md:text-3xl font-extrabold tracking-tight leading-tight ${unlocked ? 'text-ink' : 'text-muted'}`}>
                {title}
              </h2>
              <p className={`text-sm mt-0.5 ${progress?.passed ? 'text-accent font-semibold' : 'text-muted'}`}>
                {progress?.passed ? t.sectionPassed(progress.bestScore) : unlocked ? L.sectionDesc(section) : t.sectionLocked(prevTitle ?? '')}
              </p>
            </div>
          </div>

          <ol className="mt-3 p-1.5 rounded-[24px] bg-surface shadow-card space-y-0.5">
            {sectionDecks.map(renderTrack)}
            {unlocked && (
              <li>
                <button
                  onClick={() => testReady && setTestSectionId(section.id)}
                  disabled={!testReady}
                  className="w-full min-h-[60px] flex items-center gap-3 px-3 py-2 rounded-2xl text-left transition cursor-pointer disabled:cursor-not-allowed enabled:hover:bg-bg"
                >
                  <span className={`w-7 grid place-items-center shrink-0 ${testReady ? 'text-accent' : 'text-faint'}`}>
                    <ClipboardCheck className="w-5 h-5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-semibold ${testReady ? 'text-ink' : 'text-muted'}`}>
                      {progress?.passed ? t.retakeTest : t.sectionTest}
                    </span>
                    <span className="block text-xs text-muted mt-0.5">
                      {testReady
                        ? `${t.testReady(section.passScore)}${progress ? t.bestScoreSuffix(progress.bestScore) : ''}`
                        : t.testNotReady(seen, sectionCards.length)}
                    </span>
                  </span>
                </button>
              </li>
            )}
          </ol>
        </section>
      );
    };

    const renderFoundationRow = (deck: DeckInfo) => {
      const deckCards = cards.filter((c) => c.deckId === deck.id);
      const stats = getStats(deckCards);
      const locked = !unlockedDeckIds.has(deck.id);
      const Icon = deck.category === 'phonetics' ? Ear : deck.category === 'grammar' ? BookOpen : Sparkles;
      return (
        <li key={deck.id}>
          <button
            onClick={() => openFoundation(deck, stats.totalDue)}
            disabled={locked}
            className="group w-full min-h-[64px] flex items-center gap-3.5 px-3 py-2.5 rounded-2xl text-left transition cursor-pointer disabled:cursor-not-allowed enabled:hover:bg-bg"
          >
            <span className={`grid place-items-center w-11 h-11 rounded-xl shrink-0 ${locked ? 'bg-bg text-faint' : 'bg-accent-soft text-accent'}`}>
              {locked ? <Lock className="w-4 h-4" aria-hidden /> : <Icon className="w-5 h-5" aria-hidden />}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block font-semibold ${locked ? 'text-muted' : 'text-ink'}`}>{L.deck(deck).replace(/^\d+\.\s*/, '')}</span>
              <span className="block text-xs text-muted mt-0.5">
                {locked
                  ? lockReasonFor(deck)
                  : stats.totalDue > 0
                    ? t.foundationDue(stats.newCount, stats.dueCount)
                    : t.foundationUpToDate(deckCards.length, stats.nextDueLabel)}
              </span>
            </span>
            {!locked && <ChevronRight className="w-5 h-5 text-faint group-hover:text-accent transition shrink-0" aria-hidden />}
          </button>
        </li>
      );
    };

    // Bloc « Reprendre » : l'unité en cours, sinon les rappels, sinon tout est à jour
    const resume = (() => {
      if (currentUnit) {
        const unitCards = cards.filter((c) => c.deckId === currentUnit.id);
        const seen = unitCards.filter((c) => c.fsrsCard.state !== 0).length;
        const value = unitCards.length ? seen / unitCards.length : 0;
        return {
          eyebrow: `${t.resume} · ${t.trackN(currentUnit.unitNumber ?? 0)}`,
          title: splitTitle(L.deck(currentUnit)).title,
          sub: t.resumeSub(Math.min(MAX_NEW, freshOf(currentUnit.id).length), recallCount),
          progress: { value, label: t.unitProgress(Math.round(value * 100), seen, unitCards.length) },
          start: () => startSession(currentUnit),
        };
      }
      if (recallCount > 0) {
        return { eyebrow: t.resume, title: t.recallsTitle, sub: t.resumeSub(0, recallCount), progress: null, start: () => startSession(null) };
      }
      return { eyebrow: t.resume, title: t.allCaughtUp, sub: t.allCaughtUpSub(getStats(openThematic).nextDueLabel), progress: null, start: null };
    })();

    const navItems = NAV.map((item) => ({ ...item, badge: item.id === 'fondations' ? foundationDue : 0 }));
    const courseButton = (extra = '') => (
      <button
        onClick={() => setShowCourses(true)}
        aria-label={t.changeCourse(COURSE_NAME[course])}
        className={`inline-flex items-center gap-2 min-h-11 rounded-xl px-1 cursor-pointer hover:bg-surface-2 transition ${extra}`}
      >
        <Flag course={course} size={24} />
        <Wordmark className="text-2xl" />
        <ChevronDown className="w-4 h-4 text-muted" aria-hidden />
      </button>
    );

    return (
      <div className="min-h-dvh md:flex md:gap-4 md:p-4">
        {/* Barre latérale (PC) */}
        <aside className="hidden md:flex md:flex-col gap-5 w-64 lg:w-72 shrink-0 sticky top-4 h-[calc(100dvh-2rem)] overflow-y-auto rounded-[28px] bg-surface shadow-card p-4">
          {courseButton('self-start')}
          <nav aria-label={t.mainNav} className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? 'page' : undefined}
                className={`h-11 px-3.5 rounded-xl flex items-center gap-3 font-semibold text-left transition cursor-pointer ${
                  tab === item.id ? 'bg-cover text-white' : 'text-ink hover:bg-bg'
                }`}
              >
                <item.Icon className="w-5 h-5" aria-hidden />
                <span className="flex-1">{t[item.labelKey]}</span>
                {item.badge > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gold-soft text-gold-ink" aria-label={t.toReview(item.badge)}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            {data.accountsAvailable && (
              <button
                onClick={() => setShowAccount(true)}
                title={userEmail ?? t.account}
                className="h-11 px-3.5 rounded-xl flex items-center gap-3 font-semibold text-left text-ink hover:bg-bg transition cursor-pointer"
              >
                <CircleUser className={`w-5 h-5 ${userEmail ? 'text-accent' : ''}`} aria-hidden />
                {t.account}
              </button>
            )}
          </nav>
          {tab === 'parcours' && (
            <div>
              <p className="px-2 text-xs font-bold uppercase tracking-[0.12em] text-muted">{t.albums}</p>
              <ul className="mt-2 space-y-0.5">
                {sortedSections.map((s, i) => (
                  <li key={s.id}>
                    <button
                      onClick={() => document.getElementById(`album-${s.id}`)?.scrollIntoView({ behavior: 'smooth' })}
                      className="w-full flex items-center gap-2.5 p-1.5 rounded-xl text-left hover:bg-bg transition cursor-pointer"
                    >
                      <AlbumCover n={i + 1} size={36} dim={!unlockedSectionIds.has(s.id)} />
                      <span className={`text-sm truncate ${unlockedSectionIds.has(s.id) ? 'text-ink font-semibold' : 'text-muted'}`}>
                        {splitTitle(L.section(s)).title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-auto pt-3 border-t border-line space-y-2">
            <div role="group" aria-label={t.courseTitle} className="grid grid-cols-2 gap-1 p-1 rounded-2xl bg-bg">
              {(['sv', 'fr'] as Course[]).map((c) => (
                <button
                  key={c}
                  onClick={() => switchCourse(c)}
                  aria-pressed={course === c}
                  className={`h-10 rounded-xl flex items-center justify-center gap-1.5 text-xs transition cursor-pointer ${
                    course === c ? 'bg-surface text-ink font-bold shadow-card' : 'text-muted font-semibold hover:text-ink'
                  }`}
                >
                  <Flag course={c} size={16} />
                  {COURSE_NAME[c]}
                </button>
              ))}
            </div>
            <button
              onClick={theme.toggle}
              className="w-full h-11 px-3 rounded-xl bg-bg text-ink flex items-center gap-2.5 text-sm font-semibold hover:bg-surface-2 transition cursor-pointer"
            >
              {theme.isDark ? <Sun className="w-5 h-5" aria-hidden /> : <Moon className="w-5 h-5" aria-hidden />}
              {theme.isDark ? t.toLight : t.toDark}
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 px-4 md:px-2 pt-5 md:pt-2 pb-28 md:pb-10">
          <div className="mx-auto w-full max-w-3xl">
            <header className="flex items-center justify-between gap-3 pb-5">
              {courseButton('-ml-1 md:hidden')}
              <div className="flex items-center gap-2 ml-auto">
                <ThemeToggle isDark={theme.isDark} onToggle={theme.toggle} className="md:hidden" />
                <LangSwitch langs={COURSE_LANGS[course]} lang={lang} onChange={setLang} label={t.langLabel} />
              </div>
            </header>

            {tab === 'parcours' && (
              <div className="space-y-9">
                <section aria-label={resume.title} className="rounded-[28px] bg-strong text-strong-ink p-5 md:p-6">
                  <p className="text-sm font-semibold text-strong-muted">{resume.eyebrow}</p>
                  <div className="flex items-end justify-between gap-4 mt-1.5">
                    <div className="min-w-0">
                      <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight leading-none">{resume.title}</h1>
                      <p className="text-sm text-strong-muted mt-2">{resume.sub}</p>
                    </div>
                    {resume.start && (
                      <button
                        onClick={resume.start}
                        aria-label={`${t.startUnitSession} : ${resume.title}`}
                        className="grid place-items-center w-16 h-16 rounded-full bg-white text-[#3b4fa8] shrink-0 cursor-pointer hover:scale-105 transition"
                      >
                        <Play className="w-7 h-7 fill-current" aria-hidden />
                      </button>
                    )}
                  </div>
                  {resume.progress && (
                    <div className="mt-4">
                      <WaveProgress value={resume.progress.value} label={resume.progress.label} />
                    </div>
                  )}
                </section>

                {sortedSections.map(renderAlbum)}
                {orphanThematicDecks.length > 0 && (
                  <ol className="p-1.5 rounded-[24px] bg-surface shadow-card">{orphanThematicDecks.map(renderTrack)}</ol>
                )}
              </div>
            )}

            {tab === 'fondations' && (
              <div>
                <Eyebrow>{t.supportsPath}</Eyebrow>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-ink mt-1">{t.navFondations}</h1>
                <p className="text-muted mt-3 max-w-prose">{t.foundationsIntro}</p>
                {/* Un bloc par niveau CECR : les decks de vocabulaire thématique (issue #18) allongent la liste */}
                {[...new Set(foundationDecks.map((d) => d.cefrLevel))].sort().map((level) => (
                  <section key={level} className="mt-6">
                    <Eyebrow>{level}</Eyebrow>
                    <ul className="mt-2 p-1.5 rounded-[24px] bg-surface shadow-card space-y-0.5">
                      {foundationDecks.filter((d) => d.cefrLevel === level).map(renderFoundationRow)}
                    </ul>
                  </section>
                ))}
              </div>
            )}

            {tab === 'classement' && <Leaderboard signedIn={!!userEmail} onOpenAccount={() => setShowAccount(true)} />}
          </div>
        </main>

        {/* Navigation mobile */}
        <nav
          aria-label={t.mainNav}
          className="md:hidden fixed inset-x-4 z-10 bottom-[max(1rem,env(safe-area-inset-bottom))] grid gap-1 p-1.5 rounded-full bg-cover shadow-card"
          style={{ gridTemplateColumns: `repeat(${navItems.length + (data.accountsAvailable ? 1 : 0)}, minmax(0, 1fr))` }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? 'page' : undefined}
              className={`relative h-12 rounded-full text-sm transition cursor-pointer ${
                tab === item.id ? 'bg-surface text-ink font-bold' : 'text-cover-muted font-semibold'
              }`}
            >
              {t[item.labelKey]}
              {item.badge > 0 && (
                <span
                  className="absolute top-1 right-1.5 min-w-5 h-5 px-1 rounded-full bg-gold text-[#141a2b] text-[11px] font-bold grid place-items-center"
                  aria-label={t.toReview(item.badge)}
                >
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          {data.accountsAvailable && (
            <button onClick={() => setShowAccount(true)} className="h-12 rounded-full text-sm font-semibold text-cover-muted cursor-pointer">
              {t.account}
            </button>
          )}
        </nav>

        {showCourses && (
          <CourseSheet onClose={() => setShowCourses(false)} onPickCourse={switchCourse} theme={theme.choice} onTheme={theme.setChoice} />
        )}
      </div>
    );
  }

  // ============================================================================
  // VUE 3 : FIN DE SÉANCE DES FONDATIONS
  // ============================================================================
  if (!currentCard) {
    return (
      <Page>
        <div className="min-h-[70dvh] flex items-center justify-center">
          <div className="w-full max-w-md text-center rounded-[28px] bg-surface shadow-card p-8">
            <span className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-success-soft text-success">
              <CheckCircle2 className="w-8 h-8" aria-hidden />
            </span>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink mt-5">{t.sessionDone}</h1>
            <p className="text-muted mt-3">{t.sessionDoneText}</p>
            <div className="flex flex-col gap-3 mt-7">
              <button
                onClick={() => setSelectedDeckId(null)}
                className="w-full py-3.5 rounded-full bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
              >
                {t.backHome}
              </button>
              <button
                onClick={() => setCramMode(true)}
                className="w-full py-3 rounded-full bg-surface-2 hover:bg-line text-ink font-medium text-sm inline-flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" aria-hidden /> {t.reviewAnyway}
              </button>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  // ============================================================================
  // VUE 4 : SÉANCE DE CARTES DES FONDATIONS
  // ============================================================================
  return (
    <Page narrow>
      <TopBar
        onBack={() => {
          setIsFlipped(false);
          setSelectedDeckId(null);
        }}
        backLabel={t.home}
        right={<span className="text-sm font-semibold text-muted tabular-nums">{cramMode ? t.freeMode : t.remaining(sessionQueue.length)}</span>}
      />
      <StudyCard
        key={currentCard.id}
        card={toStudy(currentCard)}
        flipped={isFlipped}
        onFlip={() => setIsFlipped(true)}
        onRate={handleFoundationRate}
        intervals={intervalsFor(currentCard.id)}
      />
    </Page>
  );
}

// ============================================================================
// Éléments d'interface partagés
// ============================================================================
const NAV = [
  { id: 'parcours', labelKey: 'navParcours', Icon: Compass },
  { id: 'fondations', labelKey: 'navFondations', Icon: BookOpen },
  { id: 'classement', labelKey: 'navClassement', Icon: Trophy },
] as const;

/** « Unité 1 : Salutations » ou "Unit 1: Greetings" -> { eyebrow: 'Unité 1', title: 'Salutations' } */
function splitTitle(text: string) {
  const m = text.match(/^(.*?) ?: (.*)$/);
  return m ? { eyebrow: m[1], title: m[2] } : { eyebrow: '', title: text };
}

function LangSwitch({ langs, lang, onChange, label }: { langs: Lang[]; lang: Lang; onChange: (l: Lang) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center p-1 rounded-full bg-surface text-xs font-semibold">
      {langs.map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`min-w-11 h-9 px-3 rounded-full uppercase tracking-wide transition cursor-pointer ${
            lang === l ? 'bg-cover text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Wordmark({ className = '' }: { className?: string }) {
  const { course } = useI18n();
  return (
    <span className={`font-display font-extrabold tracking-tight text-ink ${className}`}>{course === 'sv' ? 'svenskacore' : 'francecore'}</span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return <p className="text-sm font-semibold text-muted">{children}</p>;
}

function ProgressBar({ value, label, className = '' }: { value: number; label?: string; className?: string }) {
  return (
    <div
      className={`w-full h-2 rounded-full bg-surface-2 overflow-hidden ${className}`}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${value * 100}%` }} />
    </div>
  );
}

function Page({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return (
    <div className="min-h-dvh px-4 md:px-8 pt-5 md:pt-10 pb-10">
      <div className={`mx-auto w-full ${narrow ? 'max-w-xl' : 'max-w-3xl'}`}>{children}</div>
    </div>
  );
}

function TopBar({ onBack, backLabel, right }: { onBack: () => void; backLabel: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-5">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 h-11 pl-1.5 pr-4 rounded-full bg-surface text-sm font-semibold text-ink hover:bg-surface-2 transition cursor-pointer"
      >
        <span className="grid place-items-center w-8 h-8 rounded-full bg-bg" aria-hidden>
          <ArrowLeft className="w-4 h-4" />
        </span>
        {backLabel}
      </button>
      {right}
    </div>
  );
}
