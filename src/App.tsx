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
  ChevronRight,
  Compass,
  Layers,
  RotateCcw,
  Lock,
  MessageCircle,
  Trophy,
  ClipboardCheck,
  Dumbbell,
  Play,
  Snail,
} from 'lucide-react';
import { getDataSource, LOCAL_USER_ID } from './dataSource';
import SectionTest from './SectionTest';
import { useI18n, type Lang } from './i18n';
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
  explanation: string;
  audioUrl?: string;
  gloss: GlossItem[] | null;
  fsrsCard: FSRSCard;
}

const f = fsrs();

// Mini-rendu markdown des notes (**gras**, *italique*, ~~barré~~), sans dépendance
function renderInlineMd(text: string) {
  return text.split(/(\*\*[^*]+\*\*|~~[^~]+~~|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
    if (part.startsWith('~~') && part.endsWith('~~')) return <s key={i} className="text-danger">{part.slice(2, -2)}</s>;
    if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) return <em key={i} className="text-accent">{part.slice(1, -1)}</em>;
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
  const { lang, setLang, t } = useI18n();
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
  const [tab, setTab] = useState<(typeof NAV)[number]['id']>('parcours');
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
        titleEn: d.title_en ?? null,
      }))
    );

    setSections(
      (sectionsRes.data || []).map((s) => ({
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
          promptEn: row.prompt_en ?? null,
          swedishTarget: row.swedish_target,
          english: row.french_translation || row.english_translation,
          englishEn: row.english_translation ?? null,
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
    if (diffMins < 60) return `${diffMins}${t.unitMinutes}`;
    const diffDays = Math.round(diffMins / 1440);
    return diffDays >= 1 ? `${diffDays}${t.unitDays}` : `${Math.round(diffMins / 60)}${t.unitHours}`;
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

  // Contenu dans la langue choisie (repli sur le français si une traduction manque)
  const L = {
    prompt: (c: SwedishCard) => (lang === 'en' && c.promptEn) || c.swedishPrompt,
    tr: (c: SwedishCard) => (lang === 'en' && c.englishEn) || c.english,
    gloss: (c: SwedishCard) => c.gloss?.map((g) => ({ sv: g.sv, fr: (lang === 'en' && g.en) || g.fr })) ?? null,
    deck: (d: DeckInfo) => (lang === 'en' && d.titleEn) || d.title,
    section: (x: SectionInfo) => (lang === 'en' && x.titleEn) || x.title,
    sectionDesc: (x: SectionInfo) => (lang === 'en' && x.descriptionEn) || x.description,
  };
  const localize = (c: SwedishCard) => ({ ...c, swedishPrompt: L.prompt(c), english: L.tr(c), gloss: L.gloss(c) });

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Wordmark className="text-3xl animate-pulse" />
      </div>
    );
  }

  const availableCards = cards.filter((c) => unlockedDeckIds.has(c.deckId));
  const globalStats = getStats(availableCards);
  const startGlobalSession = () => {
    setCramMode(globalStats.totalDue === 0);
    setUnitDeckId(null);
    setSelectedDeckId('ALL');
  };

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
    const { eyebrow, title } = splitTitle(L.deck(unitDeck));

    const lexiconRow = (c: SwedishCard) => {
      const hidden = c.fsrsCard.state === 0;
      return (
        <li key={c.id}>
          <button
            onClick={() => playCardAudio(c.audioUrl)}
            disabled={hidden}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-surface-2 text-left transition cursor-pointer disabled:cursor-default disabled:opacity-45"
          >
            <span className="min-w-0">
              <span className="block font-medium text-ink truncate">{hidden ? t.toDiscover : c.swedishTarget}</span>
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
        <header className="pt-2 pb-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink mt-2">{title}</h1>
          <div className="mt-6 flex items-center gap-4">
            <ProgressBar value={unitCards.length ? seen / unitCards.length : 0} />
            <span className="text-sm text-muted tabular-nums shrink-0">
              {t.discovered(seen, unitCards.length)}
            </span>
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <StepCard
            step={1}
            title={t.discover}
            text={t.discoverText(vocabCards.length, phraseCards.length)}
            status={
              stats.totalDue > 0
                ? t.discoverDue(stats.newCount, stats.learningCount + stats.reviewCount)
                : t.discoverUpToDate(stats.nextDueLabel)
            }
            done={stats.totalDue === 0}
            action={stats.totalDue > 0 ? t.studyCards : t.reviewFreely}
            primary={stats.totalDue > 0}
            onClick={() => {
              setCramMode(stats.totalDue === 0);
              setSelectedDeckId(unitDeck.id);
            }}
          />
          <StepCard
            step={2}
            title={t.practice}
            text={t.practiceText}
            status={allSeen ? (best !== undefined ? t.bestScore(best) : t.readyToStart) : t.discoverMore(remaining)}
            done={best !== undefined && best >= 80}
            locked={!allSeen}
            action={t.train}
            primary={allSeen && stats.totalDue === 0}
            onClick={() => allSeen && setPracticeDeckId(unitDeck.id)}
          />
        </div>

        <section className="mt-10">
          <h2 className="font-serif text-2xl text-ink mb-3">{t.lexicon}</h2>
          <div className="rounded-2xl bg-surface border border-line shadow-card p-2">
            <ul className="grid sm:grid-cols-2">{vocabCards.map(lexiconRow)}</ul>
            {phraseCards.length > 0 && (
              <>
                <p className="px-4 pt-4 pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-faint">{t.phrases}</p>
                <ul>{phraseCards.map(lexiconRow)}</ul>
              </>
            )}
          </div>
        </section>
      </Page>
    );
  }

  // ============================================================================
  // VUE 1 : TABLEAU DE BORD (3 onglets)
  // ============================================================================
  if (!selectedDeckId) {
    const foundationDecks = sortedDecks.filter((d) => d.track === 'foundation' && !d.sectionId);
    const orphanThematicDecks = sortedDecks.filter((d) => d.track === 'thematic' && !d.sectionId);
    const thematicCards = cards.filter((c) => decks.find((d) => d.id === c.deckId)?.track === 'thematic');
    const thematicSeen = thematicCards.filter((c) => c.fsrsCard.state !== 0).length;

    const lockReasonFor = (deck: DeckInfo) => {
      if (deck.sectionId && !unlockedSectionIds.has(deck.sectionId)) return t.lockPrevSection;
      const prereqDeck = deck.prerequisiteDeckId ? decks.find((d) => d.id === deck.prerequisiteDeckId) : undefined;
      if (!prereqDeck) return '';
      const prereq = L.deck(prereqDeck);
      return t.lockAfter(splitTitle(prereq).eyebrow || prereq);
    };

    const openDeck = (deck: DeckInfo, totalDue: number) => {
      if (!unlockedDeckIds.has(deck.id)) return;
      if (deck.track === 'thematic') {
        setUnitDeckId(deck.id);
        return;
      }
      // Tout est à jour : clic = mode libre direct
      setCramMode(totalDue === 0);
      setSelectedDeckId(deck.id);
    };

    const renderUnitRow = (deck: DeckInfo) => {
      const deckCards = cards.filter((c) => c.deckId === deck.id);
      const stats = getStats(deckCards);
      const locked = !unlockedDeckIds.has(deck.id);
      const seen = deckCards.filter((c) => c.fsrsCard.state !== 0).length;
      const complete = deckCards.length > 0 && seen === deckCards.length;
      const { title } = splitTitle(L.deck(deck));

      return (
        <li key={deck.id}>
          <button
            onClick={() => openDeck(deck, stats.totalDue)}
            disabled={locked}
            className="group w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-surface border border-line shadow-card transition hover:border-accent/40 cursor-pointer disabled:cursor-not-allowed disabled:shadow-none disabled:bg-transparent"
          >
            <span
              className={`grid place-items-center w-11 h-11 rounded-full shrink-0 font-serif text-lg ${
                locked
                  ? 'bg-surface-2 text-faint'
                  : complete
                    ? 'bg-gold text-[#14213d]'
                    : 'bg-accent-soft text-accent'
              }`}
            >
              {locked ? <Lock className="w-4 h-4" aria-hidden /> : deck.unitNumber}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block font-semibold ${locked ? 'text-muted' : 'text-ink'}`}>{title}</span>
              <span className="block text-sm text-muted mt-0.5">
                {locked
                  ? lockReasonFor(deck)
                  : stats.totalDue > 0
                    ? t.unitDue(stats.totalDue, seen, deckCards.length)
                    : t.unitUpToDate(deckCards.length)}
              </span>
              {!locked && <ProgressBar value={deckCards.length ? seen / deckCards.length : 0} className="mt-3" thin />}
            </span>
            {!locked && <ChevronRight className="w-5 h-5 text-faint group-hover:text-accent transition shrink-0" aria-hidden />}
          </button>
        </li>
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
      const prevTitle = idx > 0 ? splitTitle(L.section(sortedSections[idx - 1])).title : null;
      const { eyebrow, title } = splitTitle(L.section(section));

      return (
        <section key={section.id} className="space-y-4">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <div>
              <Eyebrow>{eyebrow}</Eyebrow>
              <h2 className={`font-serif text-3xl font-medium tracking-tight mt-1 ${unlocked ? 'text-ink' : 'text-muted'}`}>
                {title}
              </h2>
              <p className="text-sm text-muted mt-1.5 max-w-prose">
                {unlocked ? L.sectionDesc(section) : t.sectionLocked(prevTitle ?? '')}
              </p>
            </div>
            {unlocked && progress?.passed && (
              <span className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-soft text-gold-ink">
                <Trophy className="w-3.5 h-3.5" aria-hidden /> {t.sectionPassed(progress.bestScore)}
              </span>
            )}
          </div>

          <ul className="space-y-3">{sectionDecks.map(renderUnitRow)}</ul>

          {unlocked && (
            <button
              onClick={() => testReady && setTestSectionId(section.id)}
              disabled={!testReady}
              className="w-full flex items-center gap-4 p-4 md:p-5 rounded-2xl border border-dashed border-line text-left transition enabled:hover:border-accent enabled:hover:bg-accent-soft cursor-pointer disabled:cursor-not-allowed"
            >
              <span className={`grid place-items-center w-11 h-11 rounded-full shrink-0 ${testReady ? 'bg-accent text-accent-ink' : 'bg-surface-2 text-faint'}`}>
                <ClipboardCheck className="w-5 h-5" aria-hidden />
              </span>
              <span>
                <span className={`block font-semibold ${testReady ? 'text-ink' : 'text-muted'}`}>
                  {progress?.passed ? t.retakeTest : t.sectionTest}
                </span>
                <span className="block text-sm text-muted mt-0.5">
                  {testReady
                    ? `${t.testReady(section.passScore)}${progress ? t.bestScoreSuffix(progress.bestScore) : ''}`
                    : t.testNotReady(seen, sectionCards.length)}
                </span>
              </span>
            </button>
          )}
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
            onClick={() => openDeck(deck, stats.totalDue)}
            disabled={locked}
            className="group w-full text-left flex items-center gap-4 p-4 md:p-5 rounded-2xl bg-surface border border-line shadow-card transition hover:border-accent/40 cursor-pointer disabled:cursor-not-allowed disabled:shadow-none disabled:bg-transparent"
          >
            <span className={`grid place-items-center w-11 h-11 rounded-xl shrink-0 ${locked ? 'bg-surface-2 text-faint' : 'bg-accent-soft text-accent'}`}>
              {locked ? <Lock className="w-4 h-4" aria-hidden /> : <Icon className="w-5 h-5" aria-hidden />}
            </span>
            <span className="min-w-0 flex-1">
              <span className={`block font-semibold ${locked ? 'text-muted' : 'text-ink'}`}>{L.deck(deck).replace(/^\d+\.\s*/, '')}</span>
              <span className="block text-sm text-muted mt-0.5">
                {locked
                  ? lockReasonFor(deck)
                  : stats.totalDue > 0
                    ? t.foundationDue(stats.newCount, stats.learningCount + stats.reviewCount)
                    : t.foundationUpToDate(deckCards.length, stats.nextDueLabel)}
              </span>
            </span>
            {!locked && <ChevronRight className="w-5 h-5 text-faint group-hover:text-accent transition shrink-0" aria-hidden />}
          </button>
        </li>
      );
    };

    return (
      <Page withNav>
        <header className="flex items-center justify-between gap-4 pt-2 pb-8">
          <Wordmark className="text-2xl" />
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-surface border border-line" aria-label={t.mainNav}>
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? 'page' : undefined}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
                  tab === item.id ? 'bg-accent text-accent-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {t[item.labelKey]}
              </button>
            ))}
          </nav>
          <LangSwitch lang={lang} onChange={setLang} label={t.langLabel} />
        </header>

        {tab === 'parcours' && (
          <div className="space-y-12">
            <div>
              <Eyebrow>{t.levelA1}</Eyebrow>
              <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink mt-2">{t.yourPath}</h1>
              <div className="mt-6 flex items-center gap-4">
                <ProgressBar value={thematicCards.length ? thematicSeen / thematicCards.length : 0} />
                <span className="text-sm text-muted tabular-nums shrink-0">
                  {t.cardsCount(thematicSeen, thematicCards.length)}
                </span>
              </div>
              {globalStats.totalDue > 0 && (
                <button
                  onClick={startGlobalSession}
                  className="mt-6 w-full flex items-center justify-between gap-4 p-4 rounded-2xl bg-accent text-accent-ink transition hover:bg-accent-hover cursor-pointer"
                >
                  <span className="text-left">
                    <span className="block font-semibold">
                      {t.dueToday(globalStats.totalDue)}
                    </span>
                    <span className="block text-sm opacity-80">{t.dueTodaySub}</span>
                  </span>
                  <Play className="w-5 h-5 shrink-0" aria-hidden />
                </button>
              )}
            </div>
            {sortedSections.map(renderSection)}
            {orphanThematicDecks.length > 0 && <ul className="space-y-3">{orphanThematicDecks.map(renderUnitRow)}</ul>}
          </div>
        )}

        {tab === 'reviser' && (
          <div>
            <Eyebrow>{t.spacedRepetition}</Eyebrow>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink mt-2">{t.navReviser}</h1>
            <p className="text-muted mt-3 max-w-prose">
              {t.reviewIntro}
            </p>
            <div className="mt-8 rounded-3xl bg-surface border border-line shadow-card p-6 md:p-8">
              <p className="font-serif text-6xl text-ink tabular-nums">{globalStats.totalDue}</p>
              <p className="text-muted mt-1">
                {t.toStudyNow(globalStats.totalDue)}
                {globalStats.totalDue === 0 && globalStats.nextDueLabel ? t.nextIn(globalStats.nextDueLabel) : ''}
              </p>
              <dl className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { label: t.statNew, value: globalStats.newCount },
                  { label: t.statLearning, value: globalStats.learningCount },
                  { label: t.statReview, value: globalStats.reviewCount },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl bg-surface-2 p-3">
                    <dt className="text-xs text-muted">{s.label}</dt>
                    <dd className="font-serif text-2xl text-ink tabular-nums mt-0.5">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <button
                onClick={startGlobalSession}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
              >
                <Play className="w-4 h-4" aria-hidden />
                {globalStats.totalDue > 0 ? t.startSession : t.freePractice}
              </button>
            </div>
          </div>
        )}

        {tab === 'fondations' && (
          <div>
            <Eyebrow>{t.supportsPath}</Eyebrow>
            <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-ink mt-2">{t.navFondations}</h1>
            <p className="text-muted mt-3 max-w-prose">
              {t.foundationsIntro}
            </p>
            <ul className="space-y-3 mt-8">{foundationDecks.map(renderFoundationRow)}</ul>
          </div>
        )}

        <nav
          className="md:hidden fixed bottom-0 inset-x-0 z-10 border-t border-line bg-surface/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
          aria-label={t.mainNav}
        >
          <div className="grid grid-cols-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                aria-current={tab === item.id ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition cursor-pointer ${
                  tab === item.id ? 'text-accent' : 'text-muted'
                }`}
              >
                <item.Icon className="w-5 h-5" aria-hidden />
                {t[item.labelKey]}
              </button>
            ))}
          </div>
        </nav>
      </Page>
    );
  }

  const backLabel = unitDeckId ? t.unit : t.home;

  // ============================================================================
  // VUE 2 : FIN DE SESSION
  // ============================================================================
  if (!currentCard) {
    return (
      <Page>
        <div className="min-h-[70dvh] flex items-center justify-center">
          <div className="w-full max-w-md text-center">
            <span className="grid place-items-center w-16 h-16 mx-auto rounded-full bg-success-soft text-success">
              <CheckCircle2 className="w-8 h-8" aria-hidden />
            </span>
            <h1 className="font-serif text-4xl text-ink mt-6">{t.sessionDone}</h1>
            <p className="text-muted mt-3">{t.sessionDoneText}</p>
            <div className="flex flex-col gap-3 mt-8">
              <button
                onClick={() => setSelectedDeckId(null)}
                className="w-full py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
              >
                {unitDeckId ? t.backToUnit : t.backHome}
              </button>
              <button
                onClick={() => setCramMode(true)}
                className="w-full py-3 rounded-xl border border-line hover:bg-surface-2 text-ink font-medium text-sm inline-flex items-center justify-center gap-2 transition cursor-pointer"
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
  // VUE 3 : SESSION DE CARTES
  // ============================================================================
  const audioUrls = currentCard.audioUrl
    ? currentCard.audioUrl.split('|').map((u) => u.trim()).filter(Boolean)
    : [];
  const targetParts = currentCard.swedishTarget.split(' / ').map((s) => s.trim());
  const currentGloss = L.gloss(currentCard);
  const TypeIcon =
    currentCard.cardType === 'minimal_pair'
      ? Ear
      : currentCard.cardType === 'cloze_grammar'
        ? BookOpen
        : currentCard.cardType === 'phrase'
          ? MessageCircle
          : Sparkles;

  return (
    <Page narrow>
      <TopBar
        onBack={() => {
          setIsFlipped(false);
          setSelectedDeckId(null);
        }}
        backLabel={backLabel}
        right={
          <span className="text-sm text-muted tabular-nums">
            {cramMode ? t.freeMode : t.remaining(sessionQueue.length)}
          </span>
        }
      />

      <article className="rounded-3xl bg-surface border border-line shadow-card p-6 md:p-10">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <TypeIcon className="w-3.5 h-3.5" aria-hidden />
            {t.cardType[currentCard.cardType] ?? currentCard.cardType}
          </span>
          {currentCard.pitchAccent && <span className="text-xs text-faint">{currentCard.pitchAccent}</span>}
        </div>

        <h1 className="font-serif text-2xl md:text-3xl text-ink leading-snug mt-5">{L.prompt(currentCard)}</h1>

        {isFlipped ? (
          <div className="mt-8 pt-8 border-t border-line space-y-6">
            <div>
              <p className="font-serif text-3xl md:text-4xl text-accent leading-tight">{currentCard.swedishTarget}</p>
              {currentCard.ipa && <p className="font-mono text-sm text-faint mt-2">{currentCard.ipa}</p>}
              <p className="text-lg text-ink mt-3">{L.tr(currentCard)}</p>
            </div>

            {audioUrls.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {audioUrls.map((url, idx) => (
                  <div key={url} className="inline-flex items-center rounded-full border border-line overflow-hidden">
                    <button
                      onClick={() => playSingleUrl(url, 1.0)}
                      className="inline-flex items-center gap-2 pl-3.5 pr-3 py-2 text-sm font-medium text-ink hover:bg-surface-2 transition cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-accent" aria-hidden />
                      {targetParts[idx] || t.audioN(idx + 1)}
                    </button>
                    <button
                      onClick={() => playSingleUrl(url, 0.65)}
                      aria-label={`${t.listenSlowly} ${targetParts[idx] ?? ''}`}
                      className="px-3 py-2 border-l border-line text-muted hover:bg-surface-2 hover:text-ink transition cursor-pointer"
                    >
                      <Snail className="w-4 h-4" aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {currentGloss && currentGloss.length > 1 && (
              <div className="flex flex-wrap gap-2">
                {currentGloss.map((g, i) => (
                  <span key={`${g.sv}-${i}`} className="px-3 py-1.5 rounded-lg bg-surface-2 text-center">
                    <span className="block text-sm font-semibold text-ink">{g.sv}</span>
                    <span className="block text-xs text-muted">{g.fr}</span>
                  </span>
                ))}
              </div>
            )}

            <div className="rounded-2xl bg-gold-soft/60 border border-gold/30 p-4 text-[15px] leading-relaxed text-ink">
              {t.noteLabel && (
                <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-gold-ink mb-1.5">{t.noteLabel}</span>
              )}
              {renderInlineMd(currentCard.explanation)}
            </div>
          </div>
        ) : (
          <p className="mt-10 mb-2 text-center text-muted">{t.sayItFirst}</p>
        )}
      </article>

      <div className="sticky bottom-0 mt-6 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-bg/90 backdrop-blur">
        {!isFlipped ? (
          <button
            onClick={() => {
              setIsFlipped(true);
              playCardAudio(currentCard.audioUrl, 1.0);
            }}
            className="w-full py-4 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-semibold transition cursor-pointer"
          >
            {t.showAnswer} <span className="hidden md:inline opacity-70 font-normal">{t.spaceKey}</span>
          </button>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {(
              [
                { label: t.rateAgain, key: '1', grade: Rating.Again, tone: 'text-danger' },
                { label: t.rateHard, key: '2', grade: Rating.Hard, tone: 'text-gold-ink' },
                { label: t.rateGood, key: '3', grade: Rating.Good, tone: 'text-success' },
                { label: t.rateEasy, key: '4', grade: Rating.Easy, tone: 'text-accent' },
              ] satisfies { label: string; key: string; grade: Grade; tone: string }[]
            ).map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleRate(btn.grade)}
                className="flex flex-col items-center py-3 px-1 rounded-xl bg-surface border border-line hover:border-accent/40 hover:bg-surface-2 transition cursor-pointer"
              >
                <span className={`font-semibold text-sm ${btn.tone}`}>{btn.label}</span>
                <span className="text-xs text-faint tabular-nums mt-0.5">
                  {getIntervalLabel(btn.grade)}
                  <span className="hidden md:inline"> · {btn.key}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </Page>
  );
}

// ============================================================================
// Éléments d'interface partagés
// ============================================================================
const NAV = [
  { id: 'parcours', labelKey: 'navParcours', Icon: Compass },
  { id: 'reviser', labelKey: 'navReviser', Icon: Layers },
  { id: 'fondations', labelKey: 'navFondations', Icon: BookOpen },
] as const;

/** « Unité 1 : Salutations » ou "Unit 1: Greetings" -> { eyebrow: 'Unité 1', title: 'Salutations' } */
function splitTitle(text: string) {
  const m = text.match(/^(.*?) ?: (.*)$/);
  return m ? { eyebrow: m[1], title: m[2] } : { eyebrow: '', title: text };
}

function LangSwitch({ lang, onChange, label }: { lang: Lang; onChange: (l: Lang) => void; label: string }) {
  return (
    <div role="group" aria-label={label} className="flex items-center p-1 rounded-full bg-surface border border-line text-xs font-semibold">
      {(['fr', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          lang={l}
          className={`px-2.5 py-1 rounded-full uppercase tracking-wide transition cursor-pointer ${
            lang === l ? 'bg-ink text-bg' : 'text-muted hover:text-ink'
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-serif font-semibold tracking-tight text-ink ${className}`}>
      Svenska<span className="text-accent">Core</span>
      <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold ml-1 align-super" aria-hidden />
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{children}</p>;
}

function ProgressBar({ value, className = '', thin = false }: { value: number; className?: string; thin?: boolean }) {
  return (
    <div
      className={`w-full rounded-full bg-surface-2 overflow-hidden ${thin ? 'h-1' : 'h-1.5'} ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${value * 100}%` }} />
    </div>
  );
}

function Page({ children, withNav = false, narrow = false }: { children: React.ReactNode; withNav?: boolean; narrow?: boolean }) {
  return (
    <div className={`min-h-dvh px-5 md:px-8 pt-6 md:pt-10 ${withNav ? 'pb-28 md:pb-16' : 'pb-10'}`}>
      <div className={`mx-auto w-full ${narrow ? 'max-w-xl' : 'max-w-3xl'}`}>{children}</div>
    </div>
  );
}

function TopBar({ onBack, backLabel, right }: { onBack: () => void; backLabel: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 -ml-2 px-2 py-1.5 rounded-lg text-sm font-medium text-muted hover:text-ink hover:bg-surface-2 transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden /> {backLabel}
      </button>
      {right}
    </div>
  );
}

function StepCard(props: {
  step: number;
  title: string;
  text: string;
  status: string;
  action: string;
  onClick: () => void;
  primary?: boolean;
  done?: boolean;
  locked?: boolean;
}) {
  const { step, title, text, status, action, onClick, primary, done, locked } = props;
  return (
    <div className={`flex flex-col rounded-2xl border p-5 md:p-6 ${locked ? 'border-dashed border-line' : 'bg-surface border-line shadow-card'}`}>
      <div className="flex items-center gap-3">
        <span
          className={`grid place-items-center w-9 h-9 rounded-full font-serif ${
            locked ? 'bg-surface-2 text-faint' : done ? 'bg-gold text-[#14213d]' : 'bg-accent-soft text-accent'
          }`}
        >
          {locked ? <Lock className="w-4 h-4" aria-hidden /> : done ? <Check className="w-4 h-4" aria-hidden /> : step}
        </span>
        <h2 className={`font-serif text-2xl ${locked ? 'text-muted' : 'text-ink'}`}>{title}</h2>
      </div>
      <p className="text-sm text-muted mt-3">{text}</p>
      <p className={`text-sm font-medium mt-2 ${locked ? 'text-faint' : 'text-ink'}`}>{status}</p>
      <button
        onClick={onClick}
        disabled={locked}
        className={`mt-5 inline-flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition cursor-pointer disabled:cursor-not-allowed ${
          primary
            ? 'bg-accent hover:bg-accent-hover text-accent-ink'
            : 'border border-line text-ink hover:bg-surface-2 disabled:text-faint disabled:hover:bg-transparent'
        }`}
      >
        {step === 1 ? <Play className="w-4 h-4" aria-hidden /> : <Dumbbell className="w-4 h-4" aria-hidden />}
        {action}
      </button>
    </div>
  );
}
