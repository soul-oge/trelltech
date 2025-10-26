import AsyncStorage from '@react-native-async-storage/async-storage';

type List = { id: string; idBoard: string; name: string; pos: number; closed?: boolean };
type Card = { id: string; idList: string; name: string; desc?: string; pos: number };

type DB = {
  lists: Record<string, List>;  
  cards: Record<string, Card>;  
};

const STORAGE_KEY = 'mock_trello_db_v1';

function uid(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

async function loadDB(): Promise<DB> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  const boardId = 'demo-board';
  const l1: List = { id: uid('list'), idBoard: boardId, name: 'To Do',    pos: 1000 };
  const l2: List = { id: uid('list'), idBoard: boardId, name: 'Doing',    pos: 2000 };
  const l3: List = { id: uid('list'), idBoard: boardId, name: 'Done',     pos: 3000 };
  const c1: Card = { id: uid('card'), idList: l1.id, name: 'Configurer le mock', pos: 1000 };
  const c2: Card = { id: uid('card'), idList: l2.id, name: 'Écrire hooks Lists', pos: 1000 };
  const db: DB = {
    lists: { [l1.id]: l1, [l2.id]: l2, [l3.id]: l3 },
    cards: { [c1.id]: c1, [c2.id]: c2 }
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  return db;
}

async function saveDB(db: DB) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(db));
}

export async function mockRouter<T>(path: string, options: any = {}): Promise<T> {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};
  const db = await loadDB();
  let m = path.match(/^\/boards\/([^/]+)\/lists$/);
  if (method === 'GET' && m) {
    const boardId = m[1];
    const lists = Object.values(db.lists)
      .filter(l => l.idBoard === boardId && !l.closed)
      .sort((a,b)=>a.pos-b.pos);
    return lists as any;
  }
  if (method === 'POST' && path === '/lists') {
    const { idBoard, name } = body;
    const pos = Math.max(0, ...Object.values(db.lists).filter(l => l.idBoard===idBoard).map(l=>l.pos)) + 1000;
    const list: List = { id: uid('list'), idBoard, name, pos };
    db.lists[list.id] = list;
    await saveDB(db);
    return list as any;
  }
  m = path.match(/^\/lists\/([^/]+)\/name$/);
  if (method === 'PUT' && m) {
    const listId = m[1];
    if (db.lists[listId]) db.lists[listId].name = body.value;
    await saveDB(db);
    return db.lists[listId] as any;
  }
  m = path.match(/^\/lists\/([^/]+)\/closed$/);
  if (method === 'PUT' && m) {
    const listId = m[1];
    if (db.lists[listId]) db.lists[listId].closed = !!body.value;
    await saveDB(db);
    return db.lists[listId] as any;
  }
  m = path.match(/^\/lists\/([^/]+)\/pos$/);
  if (method === 'PUT' && m) {
    const listId = m[1];
    if (db.lists[listId]) db.lists[listId].pos = Number(body.value) || db.lists[listId].pos;
    await saveDB(db);
    return db.lists[listId] as any;
  }
  m = path.match(/^\/lists\/([^/]+)\/cards$/);
  if (method === 'GET' && m) {
    const listId = m[1];
    const cards = Object.values(db.cards).filter(c => c.idList === listId).sort((a,b)=>a.pos-b.pos);
    return cards as any;
  }
  if (method === 'POST' && path === '/cards') {
    const { idList, name } = body;
    const pos = Math.max(0, ...Object.values(db.cards).filter(c => c.idList===idList).map(c=>c.pos)) + 1000;
    const card: Card = { id: uid('card'), idList, name, pos };
    db.cards[card.id] = card;
    await saveDB(db);
    return card as any;
  }
  m = path.match(/^\/cards\/([^/]+)$/);
  if (method === 'PUT' && m) {
    const cardId = m[1];
    const patch = body || {};
    if (db.cards[cardId]) {
      db.cards[cardId] = { ...db.cards[cardId], ...patch };
    }
    await saveDB(db);
    return db.cards[cardId] as any;
  }
  if (method === 'DELETE' && m) {
    const cardId = m[1];
    delete db.cards[cardId];
    await saveDB(db);
    return { ok: true } as any;
  }

  throw new Error(`Mock route not implemented: ${method} ${path}`);
}
