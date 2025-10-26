import { trelloFetch } from '../../services/trelloClient';

export type TrelloList = { id: string; name: string; idBoard: string; pos?: number; closed?: boolean };

export function fetchLists(boardId: string): Promise<TrelloList[]> {
  return trelloFetch(`/boards/${boardId}/lists`, { query: { cards: 'none' } });
}

export function createList(boardId: string, name: string) {
  // ✅ Trello attend idBoard + name en query, pas en JSON body
  return trelloFetch('/lists', { method: 'POST', query: { idBoard: boardId, name } });
}

export function updateListName(listId: string, name: string) {
  // ✅ idem: value en query
  return trelloFetch(`/lists/${listId}/name`, { method: 'PUT', query: { value: name } });
}

export function archiveList(listId: string) {
  return trelloFetch(`/lists/${listId}/closed`, { method: 'PUT', query: { value: true } });
}

export function moveList(listId: string, pos: number) {
  return trelloFetch(`/lists/${listId}/pos`, { method: 'PUT', query: { value: pos } });
}
