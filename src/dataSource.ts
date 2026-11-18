// Couche d'accès aux données.
//  - Web (dev) : Supabase local, contenu + progression en base.
//  - Android / mode « local » : contenu embarqué (content.json, exporté par generate-audio.mjs)
//    et progression stockée sur l'appareil. Aucun réseau nécessaire.
import { Capacitor } from '@capacitor/core';

// Utilisateur unique tant qu'il n'y a pas d'authentification
export const LOCAL_USER_ID = '00000000-0000-0000-0000-000000000001';

type Row = Record<string, any>;

export interface LoadedData {
  decks: Row[];
  cards: Row[];
  sections: Row[];
  progress: Row[];
  sectionProgress: Row[];
}

export interface DataSource {
  readonly kind: 'supabase' | 'local';
  load(): Promise<LoadedData>;
  saveCardProgress(row: Row): Promise<void>;
  saveSectionProgress(row: Row): Promise<void>;
}

// ---------------------------------------------------------------------------
// Supabase (web, dev)
// ---------------------------------------------------------------------------
async function createSupabaseSource(): Promise<DataSource> {
  const { supabase } = await import('./supabaseClient');
  return {
    kind: 'supabase',
    async load() {
      const [decks, cards, progress, sections, sectionProgress] = await Promise.all([
        supabase.from('decks').select('*').order('sort_order', { ascending: true }),
        supabase.from('cards').select('*').order('created_at', { ascending: true }),
        supabase.from('user_card_progress').select('*').eq('user_id', LOCAL_USER_ID),
        supabase.from('sections').select('*').order('sort_order', { ascending: true }),
        supabase.from('user_section_progress').select('*').eq('user_id', LOCAL_USER_ID),
      ]);
      return {
        decks: decks.data ?? [],
        cards: cards.data ?? [],
        progress: progress.data ?? [],
        sections: sections.data ?? [],
        sectionProgress: sectionProgress.data ?? [],
      };
    },
    async saveCardProgress(row) {
      await supabase.from('user_card_progress').upsert(row);
    },
    async saveSectionProgress(row) {
      await supabase.from('user_section_progress').upsert(row);
    },
  };
}

// ---------------------------------------------------------------------------
// Local (Android, hors ligne)
// Les identifiants du contenu exporté sont les slugs : la progression survit à un re-seed.
// ---------------------------------------------------------------------------
const CARD_KEY = 'svenska.cardProgress';
const SECTION_KEY = 'svenska.sectionProgress';

function readMap(key: string): Record<string, Row> {
  try {
    return JSON.parse(localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
}

function writeEntry(key: string, id: string, row: Row) {
  try {
    const map = readMap(key);
    map[id] = row;
    localStorage.setItem(key, JSON.stringify(map));
  } catch {
    // stockage indisponible : la progression de cette session ne sera pas conservée
  }
}

async function createLocalSource(): Promise<DataSource> {
  const content = (await import('./content.json')).default as {
    sections: Row[];
    decks: Row[];
    cards: Row[];
  };
  return {
    kind: 'local',
    async load() {
      return {
        decks: content.decks,
        cards: content.cards,
        sections: content.sections,
        progress: Object.values(readMap(CARD_KEY)),
        sectionProgress: Object.values(readMap(SECTION_KEY)),
      };
    },
    async saveCardProgress(row) {
      writeEntry(CARD_KEY, row.card_id, row);
    },
    async saveSectionProgress(row) {
      writeEntry(SECTION_KEY, row.section_id, row);
    },
  };
}

export function isLocalMode(): boolean {
  return Capacitor.isNativePlatform() || import.meta.env.VITE_DATA_SOURCE === 'local';
}

let sourcePromise: Promise<DataSource> | null = null;
export function getDataSource(): Promise<DataSource> {
  sourcePromise ??= isLocalMode() ? createLocalSource() : createSupabaseSource();
  return sourcePromise;
}
