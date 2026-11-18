import { useState, useEffect, useCallback, useMemo } from 'react';
import { createEmptyCard, fsrs, Rating, type Card as FSRSCard, type Grade } from 'ts-fsrs';
import {
  Volume2,
  BookOpen,
  Ear,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Flame,
  RotateCcw,
  Clock,
  Lock,
  MessageCircle,
  Trophy,
  ClipboardCheck,
  Dumbbell,
  Play,
  Puzzle,
  Keyboard,
  Headphones,
  ListChecks,
} from 'lucide-react';
import { getDataSource, LOCAL_USER_ID } from './dataSource';
import SectionTest from './SectionTest';
import UnitPractice from './UnitPractice';

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
}

interface SectionInfo {
  id: string;
  slug: string;
  title: string;
  description: string | null;
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
}

interface SwedishCard {
  id: string;
  deckId: string;
  cardType: string;
  swedishPrompt: string;
  swedishTarget: string;
  english: string;
  ipa: string;
  pitchAccent?: string;
  explanation: string;
  audioUrl?: string;
  gloss: GlossItem[] | null;
  fsrsCard: FSRSCard;
}

const f = fsrs();

// Mini-rendu markdown des notes (**gras**, *italique*, ~~barré~~), sans dépendance
function renderInlineMd(text: string) {
  return text.split(/(\*\*[^*]+\*\*|~~[^~]+~~|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="text-white">{part.slice(2, -2)}</strong>;
    if (part.startsWith('~~') && part.endsWith('~~')) return <s key={i} className="text-rose-300/80">{part.slice(2, -2)}</s>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i} className="text-amber-200">{part.slice(1, -1)}</em>;
    return part;
  });
}

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
  const [decks, setDecks] = useState<DeckInfo[]>([]);
  const [cards, setCards] = useState<SwedishCard[]>([]);
  const [sections, setSections] = useState<SectionInfo[]>([]);
  const [sectionProgress, setSectionProgress] = useState<Map<string, SectionProgress>>(new Map());
  const [loading, setLoading] = useState(true);

  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [testSectionId, setTestSectionId] = useState<string | null>(null);
  const [unitDeckId, setUnitDeckId] = useState<string | null>(null);
  const [practiceDeckId, setPracticeDeckId] = useState<string | null>(null);
  const [practiceScores, setPracticeScores] = useState<Record<string, number>>(loadPracticeScores);
  const [cramMode, setCramMode] = useState(false);
  const [currentCardId, setCurrentCardId] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const source = await getDataSource();
    const loaded = await source.load();
    const decksRes = { data: loaded.decks };
    const cardsRes = { data: loaded.cards };
    const progressRes = { data: loaded.progress };
    const sectionsRes = { data: loaded.sections };
    const sectionProgRes = { data: loaded.sectionProgress };

    const progressMap = new Map(
      (progressRes.data || []).map((p) => [p.card_id, p])
    );

    setDecks(
      (decksRes.data || []).map((d) => ({
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
      }))
    );

    setSections(
      (sectionsRes.data || []).map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.description ?? null,
        sortOrder: s.sort_order,
        passScore: s.pass_score,
      }))
    );

    setSectionProgress(
      new Map(
        (sectionProgRes.data || []).map((p) => [
          p.section_id as string,
          { bestScore: p.best_score, passed: p.passed, attempts: p.attempts },
        ])
      )
    );

    setCards(
      (cardsRes.data || []).map((row) => {
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
              learning_steps: 0,
            }
          : createEmptyCard();

        return {
          id: row.id,
          deckId: row.deck_id,
          cardType: row.card_type,
          swedishPrompt: row.swedish_prompt,
          swedishTarget: row.swedish_target,
          english: row.french_translation || row.english_translation,
          ipa: row.ipa_transcription || '',
          pitchAccent: row.pitch_accent,
          explanation: row.explanation_md,
          audioUrl: row.audio_url,
          gloss: Array.isArray(row.gloss) ? row.gloss : null,
          fsrsCard,
        };
      })
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const deckRank = useMemo(
    () => new Map(sortedDecks.map((d, i) => [d.id, i])),
    [sortedDecks]
  );

  const deckTitleById = useMemo(
    () => new Map(decks.map((d) => [d.id, d.title])),
    [decks]
  );

  const sortedSections = useMemo(
    () => [...sections].sort((a, b) => a.sortOrder - b.sortOrder),
    [sections]
  );

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

  const sessionQueue = useMemo(() => {
    if (!selectedDeckId) return [];
    const now = new Date();
    const pool =
      selectedDeckId === 'ALL'
        ? cards.filter((c) => unlockedDeckIds.has(c.deckId))
        : cards.filter((c) => c.deckId === selectedDeckId);

    const rank = (c: SwedishCard) => deckRank.get(c.deckId) ?? 99;

    if (cramMode) return [...pool].sort((a, b) => rank(a) - rank(b));

    const due = pool
      .filter((c) => c.fsrsCard.state !== 0 && c.fsrsCard.due <= now)
      .sort((a, b) => a.fsrsCard.due.getTime() - b.fsrsCard.due.getTime());
    const fresh = pool
      .filter((c) => c.fsrsCard.state === 0)
      .sort((a, b) => rank(a) - rank(b));

    return [...due, ...fresh];
  }, [cards, selectedDeckId, cramMode, unlockedDeckIds, deckRank]);

  const currentCard = useMemo(() => {
    if (sessionQueue.length === 0) return null;
    if (currentCardId) {
      const found = sessionQueue.find((c) => c.id === currentCardId);
      if (found) return found;
    }
    return sessionQueue[0];
  }, [sessionQueue, currentCardId]);

  // ---------------------------------------------------------------------------
  // Audio
  // ---------------------------------------------------------------------------
  const playSingleUrl = useCallback((url: string, playbackRate = 1.0): Promise<void> => {
    return new Promise((resolve) => {
      const audio = new Audio(url.trim());
      audio.playbackRate = playbackRate;
      audio.preservesPitch = true;
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    });
  }, []);

  const playCardAudio = useCallback(
    async (audioUrl?: string, playbackRate = 1.0) => {
      if (!audioUrl) return;
      const urls = audioUrl.split('|').map((u) => u.trim()).filter(Boolean);
      for (let i = 0; i < urls.length; i++) {
        await playSingleUrl(urls[i], playbackRate);
        if (i < urls.length - 1) {
          await new Promise((r) => setTimeout(r, 350));
        }
      }
    },
    [playSingleUrl]
  );

  // ---------------------------------------------------------------------------
  // Notation FSRS
  // ---------------------------------------------------------------------------
  const handleRate = useCallback(
    async (grade: Grade) => {
      if (!currentCard) return;
      const now = new Date();
      const updated = f.repeat(currentCard.fsrsCard, now)[grade].card;

      setIsFlipped(false);

      if (cramMode && sessionQueue.length > 1) {
        const idx = sessionQueue.findIndex((c) => c.id === currentCard.id);
        const nextCard = sessionQueue[(idx + 1) % sessionQueue.length];
        setCurrentCardId(nextCard.id);
      } else {
        setCurrentCardId(null);
      }

      setCards((prev) =>
        prev.map((c) => (c.id === currentCard.id ? { ...c, fsrsCard: updated } : c))
      );

      await (await getDataSource()).saveCardProgress({
        user_id: LOCAL_USER_ID,
        card_id: currentCard.id,
        state: updated.state,
        due: updated.due.toISOString(),
        stability: updated.stability,
        difficulty: updated.difficulty,
        elapsed_days: updated.elapsed_days,
        scheduled_days: updated.scheduled_days,
        reps: updated.reps,
        lapses: updated.lapses,
        last_review: now.toISOString(),
      });
    },
    [currentCard, cramMode, sessionQueue]
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

      await (await getDataSource()).saveSectionProgress({
        user_id: LOCAL_USER_ID,
        section_id: section.id,
        best_score: next.bestScore,
        passed: next.passed,
        attempts: next.attempts,
        last_attempt: new Date().toISOString(),
      });
    },
    [sections, testSectionId, sectionProgress]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!currentCard || !selectedDeckId) return;
      if (e.code === 'Space' && !isFlipped) {
        e.preventDefault();
        setIsFlipped(true);
        playCardAudio(currentCard.audioUrl, 1.0);
      } else if (isFlipped) {
        if (e.key === '1') handleRate(Rating.Again);
        if (e.key === '2') handleRate(Rating.Hard);
        if (e.key === '3') handleRate(Rating.Good);
        if (e.key === '4') handleRate(Rating.Easy);
        if (e.key.toLowerCase() === 'r') playCardAudio(currentCard.audioUrl, 1.0);
        if (e.key.toLowerCase() === 's') playCardAudio(currentCard.audioUrl, 0.65);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFlipped, currentCard, selectedDeckId, handleRate, playCardAudio]);

  const formatTimeDiff = (targetDate: Date) => {
    const now = new Date();
    const diffMins = Math.max(1, Math.round((targetDate.getTime() - now.getTime()) / 60000));
    if (diffMins < 60) return `${diffMins}m`;
    const diffDays = Math.round(diffMins / 1440);
    return diffDays >= 1 ? `${diffDays}j` : `${Math.round(diffMins / 60)}h`;
  };

  const getIntervalLabel = (grade: Grade) => {
    if (!currentCard) return '';
    const now = new Date();
    const nextDue = f.repeat(currentCard.fsrsCard, now)[grade].card.due;
    return formatTimeDiff(nextDue);
  };

  const getStats = (subset: SwedishCard[]) => {
    const now = new Date();
    let newCount = 0;
    let learningCount = 0;
    let reviewCount = 0;
    let nextDueDate: Date | null = null;

    for (const c of subset) {
      if (c.fsrsCard.state === 0) {
        newCount++;
      } else if (c.fsrsCard.due <= now) {
        if (c.fsrsCard.state === 1 || c.fsrsCard.state === 3) learningCount++;
        else reviewCount++;
      } else {
        if (!nextDueDate || c.fsrsCard.due < nextDueDate) {
          nextDueDate = c.fsrsCard.due;
        }
      }
    }
    return {
      newCount,
      learningCount,
      reviewCount,
      totalDue: newCount + learningCount + reviewCount,
      nextDueLabel: nextDueDate ? formatTimeDiff(nextDueDate) : null,
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center">
        Chargement de SvenskaCore...
      </div>
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
        sectionTitle={testSection.title}
        passScore={testSection.passScore}
        cards={testCards}
        bestScore={sectionProgress.get(testSection.id)?.bestScore ?? 0}
        onFinish={handleTestFinish}
        onExit={() => setTestSectionId(null)}
      />
    );
  }

  // ============================================================================
  // VUE 0 bis : EXERCICES D'UNITÉ
  // ============================================================================
  const practiceDeck = practiceDeckId ? decks.find((d) => d.id === practiceDeckId) : undefined;
  if (practiceDeck) {
    const unitCards = cards.filter((c) => c.deckId === practiceDeck.id);
    // Distracteurs des blocs : mots des unités thématiques précédentes
    const previousWords = cards
      .filter((c) => {
        const d = decks.find((x) => x.id === c.deckId);
        return d?.track === 'thematic' && (d.unitNumber ?? 0) < (practiceDeck.unitNumber ?? 0);
      })
      .map((c) => c.swedishTarget);
    return (
      <UnitPractice
        key={practiceDeck.id}
        unitTitle={practiceDeck.title}
        cards={unitCards}
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
  // VUE 0 ter : PAGE D'UNITÉ (Découvrir -> Pratiquer)
  // ============================================================================
  const unitDeck = !selectedDeckId && unitDeckId ? decks.find((d) => d.id === unitDeckId) : undefined;
  if (unitDeck) {
    const unitCards = cards.filter((c) => c.deckId === unitDeck.id);
    const stats = getStats(unitCards);
    const seen = unitCards.filter((c) => c.fsrsCard.state !== 0).length;
    const allSeen = unitCards.length > 0 && seen === unitCards.length;
    const best = practiceScores[unitDeck.id];
    const vocabCards = unitCards.filter((c) => c.cardType === 'vocab');
    const phraseCards = unitCards.filter((c) => c.cardType === 'phrase');
    const remaining = unitCards.length - seen;

    const lexiconRow = (c: SwedishCard) => {
      const hidden = c.fsrsCard.state === 0;
      return (
        <button
          key={c.id}
          onClick={() => playCardAudio(c.audioUrl)}
          disabled={hidden}
          className="w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800/70 text-left transition cursor-pointer disabled:cursor-default disabled:opacity-40"
        >
          <span className="min-w-0">
            <span className="block font-semibold text-amber-300 truncate">{hidden ? '• • •' : c.swedishTarget}</span>
            <span className="block text-xs text-slate-400 truncate">{c.english}</span>
          </span>
          {!hidden && c.audioUrl && <Volume2 className="w-4 h-4 text-slate-500 shrink-0" />}
        </button>
      );
    };

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-6 mt-4">
          <button
            onClick={() => setUnitDeckId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Tableau de bord
          </button>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Unité {unitDeck.unitNumber}</p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
              {unitDeck.title.replace(/^Unité \d+\s*—\s*/, '')}
            </h1>
            <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all"
                style={{ width: `${unitCards.length ? (seen / unitCards.length) * 100 : 0}%` }}
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              {seen}/{unitCards.length} cartes découvertes
            </p>
          </div>

          {/* Étape 1 : Découvrir */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-white">1. Découvrir</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {vocabCards.length} mots et {phraseCards.length} phrases en cartes audio, avec glose mot à mot.
                </p>
                <p className="text-xs mt-1.5 font-semibold">
                  {stats.totalDue > 0 ? (
                    <span className="text-sky-400">
                      {stats.newCount} nouvelle{stats.newCount > 1 ? 's' : ''} •{' '}
                      {stats.learningCount + stats.reviewCount} à revoir
                    </span>
                  ) : (
                    <span className="text-emerald-400">
                      À jour{stats.nextDueLabel ? ` • prochaine révision dans ${stats.nextDueLabel}` : ''}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setCramMode(stats.totalDue === 0);
                setSelectedDeckId(unitDeck.id);
              }}
              className={`shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition cursor-pointer ${
                stats.totalDue > 0
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Play className="w-4 h-4" /> {stats.totalDue > 0 ? 'Étudier les cartes' : 'Revoir (mode libre)'}
            </button>
          </div>

          {/* Étape 2 : Pratiquer */}
          <div
            className={`border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              allSeen ? 'bg-slate-900 border-slate-800' : 'bg-slate-900/50 border-slate-800/60'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl ${allSeen ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-800 text-slate-500'}`}>
                {allSeen ? <Dumbbell className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
              <div>
                <h2 className={`font-bold ${allSeen ? 'text-white' : 'text-slate-400'}`}>2. Pratiquer</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paires, QCM, écoute, phrases à composer en blocs, écriture et dictée.
                </p>
                <div className="flex items-center gap-2 mt-2 text-slate-500">
                  <Puzzle className="w-4 h-4" />
                  <ListChecks className="w-4 h-4" />
                  <Headphones className="w-4 h-4" />
                  <Keyboard className="w-4 h-4" />
                  {allSeen ? (
                    best !== undefined && (
                      <span className="ml-1 text-xs font-semibold text-emerald-400">Meilleur score : {best}%</span>
                    )
                  ) : (
                    <span className="ml-1 text-xs">
                      Découvre encore {remaining} carte{remaining > 1 ? 's' : ''} pour débloquer
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => allSeen && setPracticeDeckId(unitDeck.id)}
              disabled={!allSeen}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition cursor-pointer bg-sky-600 hover:bg-sky-500 text-white disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
            >
              <Dumbbell className="w-4 h-4" /> S’entraîner
            </button>
          </div>

          {/* Lexique */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-4 pt-2 pb-1">
              Lexique de l’unité
            </h2>
            <div className="grid sm:grid-cols-2 gap-x-2">{vocabCards.map(lexiconRow)}</div>
            {phraseCards.length > 0 && (
              <>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-4 pt-3 pb-1">Phrases</h3>
                {phraseCards.map(lexiconRow)}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VUE 1 : TABLEAU DE BORD (DASHBOARD)
  // ============================================================================
  if (!selectedDeckId) {
    const availableCards = cards.filter((c) => unlockedDeckIds.has(c.deckId));
    const globalStats = getStats(availableCards);
    const foundationDecks = sortedDecks.filter((d) => d.track === 'foundation' && !d.sectionId);
    const orphanThematicDecks = sortedDecks.filter((d) => d.track === 'thematic' && !d.sectionId);

    const renderDeckRow = (deck: DeckInfo) => {
      const deckCards = cards.filter((c) => c.deckId === deck.id);
      const stats = getStats(deckCards);
      const locked = !unlockedDeckIds.has(deck.id);
      const prereqTitle = deck.prerequisiteDeckId
        ? deckTitleById.get(deck.prerequisiteDeckId)
        : null;

      let lockReason = '';
      if (locked) {
        if (deck.sectionId && !unlockedSectionIds.has(deck.sectionId)) {
          lockReason = 'Valide le test de la section précédente';
        } else if (prereqTitle) {
          lockReason = `Se débloque après : ${prereqTitle}`;
        }
      }

      return (
        <div
          key={deck.id}
          onClick={() => {
            if (locked) return;
            // Unité thématique : page d'unité (Découvrir -> Pratiquer)
            if (deck.track === 'thematic') {
              setUnitDeckId(deck.id);
              return;
            }
            // Si toutes les cartes du module sont déjà faites, clic = mode libre direct
            setCramMode(stats.totalDue === 0);
            setSelectedDeckId(deck.id);
          }}
          className={`group bg-slate-900 border border-slate-800 rounded-2xl p-5 transition flex items-center justify-between ${
            locked
              ? 'opacity-50 cursor-not-allowed'
              : 'hover:bg-slate-800/80 cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-slate-800 text-sky-400 group-hover:bg-slate-700 transition">
              {locked ? (
                <Lock className="w-5 h-5 text-slate-400" />
              ) : deck.track === 'thematic' ? (
                <MessageCircle className="w-5 h-5 text-amber-400" />
              ) : deck.category === 'phonetics' ? (
                <Ear className="w-5 h-5 text-amber-400" />
              ) : deck.category === 'grammar' ? (
                <BookOpen className="w-5 h-5 text-sky-400" />
              ) : (
                <Sparkles className="w-5 h-5 text-emerald-400" />
              )}
            </div>
            <div>
              <h3 className="font-bold text-white text-base">{deck.title}</h3>
              <div className="flex flex-wrap items-center gap-x-3 text-xs text-slate-400 mt-0.5">
                <span>{deckCards.length} cartes au total</span>
                {locked && lockReason && <span>• {lockReason}</span>}
                {!locked && stats.totalDue === 0 && stats.nextDueLabel && (
                  <span className="inline-flex items-center gap-1 text-amber-400/90 font-medium">
                    • Prochaine dans {stats.nextDueLabel} (Clic = mode libre)
                  </span>
                )}
              </div>
            </div>
          </div>

          {!locked && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              <span className="px-2.5 py-1 rounded-lg bg-sky-950 text-sky-400 border border-sky-800/60" title="Nouvelles">
                {stats.newCount}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-orange-950 text-orange-400 border border-orange-800/60" title="En apprentissage">
                {stats.learningCount}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60" title="À réviser">
                {stats.reviewCount}
              </span>
            </div>
          )}
        </div>
      );
    };

    const renderSection = (section: SectionInfo, idx: number) => {
      const sectionDecks = sortedDecks.filter((d) => d.sectionId === section.id);
      const deckIds = new Set(sectionDecks.map((d) => d.id));
      const sectionCards = cards.filter((c) => deckIds.has(c.deckId));
      const unlocked = unlockedSectionIds.has(section.id);
      const progress = sectionProgress.get(section.id);
      const seen = sectionCards.filter((c) => c.fsrsCard.state !== 0).length;
      const testReady = unlocked && sectionCards.length > 0 && seen === sectionCards.length;
      const prevTitle = idx > 0 ? sortedSections[idx - 1].title : null;

      return (
        <div key={section.id} className="space-y-3">
          <div className="flex items-start justify-between gap-3 px-1">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                {!unlocked && <Lock className="w-4 h-4 text-slate-400" />}
                {section.title}
              </h2>
              {section.description && (
                <p className="text-xs text-slate-400 mt-1">{section.description}</p>
              )}
              {!unlocked && prevTitle && (
                <p className="text-xs text-slate-500 mt-1">
                  Réussis le test de « {prevTitle} » pour débloquer cette section.
                </p>
              )}
            </div>
            {unlocked &&
              (progress?.passed ? (
                <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Trophy className="w-3.5 h-3.5" /> Validée • {progress.bestScore}%
                </span>
              ) : (
                <span className="shrink-0 px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300">
                  {seen}/{sectionCards.length} cartes vues
                </span>
              ))}
          </div>

          {sectionDecks.map(renderDeckRow)}

          {unlocked && (
            <button
              onClick={() => testReady && setTestSectionId(section.id)}
              disabled={!testReady}
              className={`w-full rounded-2xl p-4 border flex items-center justify-between gap-3 text-left transition ${
                testReady
                  ? 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 cursor-pointer'
                  : 'bg-slate-900 border-slate-800 opacity-60 cursor-not-allowed'
              }`}
            >
              <span className="inline-flex items-center gap-3">
                <ClipboardCheck className={`w-5 h-5 ${testReady ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>
                  <span className="block font-bold text-white text-sm">
                    {progress?.passed ? 'Refaire le test de section' : 'Test de fin de section'}
                  </span>
                  <span className="block text-xs text-slate-400 mt-0.5">
                    {testReady
                      ? `10 questions • ${section.passScore}% pour valider${
                          progress ? ` • Meilleur score : ${progress.bestScore}%` : ''
                        }`
                      : 'Vois toutes les cartes de la section pour débloquer le test'}
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
        <div className="w-full max-w-2xl space-y-8 mt-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Svenska<span className="text-amber-400">Core</span>
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Phonétique native, grammaire V2 & répétition espacée FSRS
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Niveau A1 • {cards.length} cartes
            </span>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Flame className="w-4 h-4" /> File d'attente du jour
              </div>
              <p className="text-2xl font-bold text-white">
                {globalStats.totalDue} carte{globalStats.totalDue > 1 ? 's' : ''} à étudier maintenant
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                <span className="text-sky-400 font-semibold">{globalStats.newCount} Nouvelles</span>
                <span className="text-orange-400 font-semibold">{globalStats.learningCount} En cours</span>
                <span className="text-emerald-400 font-semibold">{globalStats.reviewCount} À réviser</span>
                {globalStats.totalDue === 0 && globalStats.nextDueLabel && (
                  <span className="inline-flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Prochaine dans {globalStats.nextDueLabel}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setCramMode(globalStats.totalDue === 0);
                setUnitDeckId(null);
                setSelectedDeckId('ALL');
              }}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shadow-lg cursor-pointer"
            >
              {globalStats.totalDue > 0 ? 'Lancer la session' : 'Entraînement libre'}
            </button>
          </div>

          {sortedSections.map(renderSection)}

          {orphanThematicDecks.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                Parcours Thématique
              </h2>
              {orphanThematicDecks.map(renderDeckRow)}
            </div>
          )}

          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
              Fondations Linguistiques
            </h2>
            {foundationDecks.map(renderDeckRow)}
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VUE 2 : ÉCRAN DE FIN DE SESSION
  // ============================================================================
  if (!currentCard) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5 shadow-2xl">
          <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Session terminée !</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Toutes les cartes dues pour ce module ont été programmées par l'algorithme FSRS.
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => setSelectedDeckId(null)}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition cursor-pointer"
            >
              {unitDeckId ? 'Retour à l’unité' : 'Retour au Tableau de Bord'}
            </button>
            <button
              onClick={() => setCramMode(true)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs inline-flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Réviser quand même (Mode Libre)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================================
  // VUE 3 : SESSION DE RÉVISION ACTIVE
  // ============================================================================
  const audioUrls = currentCard.audioUrl
    ? currentCard.audioUrl.split('|').map((u) => u.trim()).filter(Boolean)
    : [];
  const targetParts = currentCard.swedishTarget.split('—').map((s) => s.trim());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-xl mb-6 flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => {
            setIsFlipped(false);
            setSelectedDeckId(null);
          }}
          className="inline-flex items-center gap-1.5 font-semibold text-slate-300 hover:text-amber-400 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> {unitDeckId ? 'Unité' : 'Tableau de bord'}
        </button>

        <span className="inline-flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          {cramMode ? 'Mode Libre' : `${sessionQueue.length} restante(s)`} • Reps: {currentCard.fsrsCard.reps}
        </span>
      </div>

      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-sky-400">
            {currentCard.cardType === 'minimal_pair' && <Ear className="w-3.5 h-3.5" />}
            {currentCard.cardType === 'cloze_grammar' && <BookOpen className="w-3.5 h-3.5" />}
            {currentCard.cardType === 'vocab' && <Sparkles className="w-3.5 h-3.5" />}
            {currentCard.cardType === 'phrase' && <MessageCircle className="w-3.5 h-3.5" />}
            {currentCard.cardType.replace('_', ' ').toUpperCase()}
          </span>
          {currentCard.pitchAccent && (
            <span className="text-xs text-slate-400 font-mono">{currentCard.pitchAccent}</span>
          )}
        </div>

        <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-snug">
          {currentCard.swedishPrompt}
        </h2>

        {isFlipped ? (
          <div className="mt-6 pt-6 border-t border-slate-800 space-y-4">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-2xl font-bold text-amber-400">{currentCard.swedishTarget}</p>
                <p className="text-sm font-mono text-slate-400 mt-1">{currentCard.ipa}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2">
                {audioUrls.map((url, idx) => (
                  <div
                    key={url}
                    className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1.5"
                  >
                    <button
                      onClick={() => playSingleUrl(url, 1.0)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold transition cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      {targetParts[idx] || `Audio ${idx + 1}`}
                    </button>
                    <button
                      onClick={() => playSingleUrl(url, 0.65)}
                      className="px-2.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-sky-400 text-xs font-mono font-bold transition cursor-pointer"
                    >
                      0.65x
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-base text-slate-300 font-medium">{currentCard.english}</p>

            {currentCard.gloss && currentCard.gloss.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentCard.gloss.map((g, i) => (
                  <div
                    key={`${g.sv}-${i}`}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-center"
                  >
                    <div className="text-sm font-semibold text-amber-300">{g.sv}</div>
                    <div className="text-xs text-slate-400">{g.fr}</div>
                  </div>
                ))}
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm text-slate-300 leading-relaxed">
              <span className="font-semibold text-sky-400 block mb-1">Note Linguistique :</span>
              {renderInlineMd(currentCard.explanation)}
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500 text-sm">
            Prononce la réponse à voix haute avant de retourner la carte.
          </div>
        )}
      </div>

      <div className="w-full max-w-xl mt-6">
        {!isFlipped ? (
          <button
            onClick={() => {
              setIsFlipped(true);
              playCardAudio(currentCard.audioUrl, 1.0);
            }}
            className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition shadow-lg cursor-pointer"
          >
            Afficher la réponse (Espace)
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {([
              { label: 'Again', key: '1', grade: Rating.Again, color: 'bg-rose-950 hover:bg-rose-900 text-rose-300 border-rose-800' },
              { label: 'Hard', key: '2', grade: Rating.Hard, color: 'bg-orange-950 hover:bg-orange-900 text-orange-300 border-orange-800' },
              { label: 'Good', key: '3', grade: Rating.Good, color: 'bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border-emerald-800' },
              { label: 'Easy', key: '4', grade: Rating.Easy, color: 'bg-sky-950 hover:bg-sky-900 text-sky-300 border-sky-800' },
            ] satisfies { label: string; key: string; grade: Grade; color: string }[]).map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleRate(btn.grade)}
                className={`flex flex-col items-center py-3 px-2 rounded-xl border transition cursor-pointer ${btn.color}`}
              >
                <span className="text-xs opacity-75 mb-0.5">{getIntervalLabel(btn.grade)}</span>
                <span className="font-bold text-sm">
                  {btn.label} <span className="text-xs opacity-60 hidden md:inline">({btn.key})</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
