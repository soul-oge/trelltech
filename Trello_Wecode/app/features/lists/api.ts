import { trelloFetch } from '../../../app/services/trelloClient';

export type TrelloList = { id: string; name: string; idBoard: string; pos?: number; closed?: boolean };

export function fetchLists(boardId: string): Promise<TrelloList[]> {
  return trelloFetch(`/boards/${boardId}/lists`, { query: { cards: 'none' } });
}

export function createList(boardId: string, name: string) {
  return trelloFetch('/lists', { method: 'POST', body: JSON.stringify({ idBoard: boardId, name }) });
}

export function updateListName(listId: string, name: string) {
  return trelloFetch(`/lists/${listId}/name`, { method: 'PUT', body: JSON.stringify({ value: name }) });
}

export function deleteList(listId: string) {
  return trelloFetch(`/lists/${listId}/closed`, { method: 'DELETE', body: JSON.stringify({ value: true }) });
}

export function archiveList(listId: string) {
  return trelloFetch(`/lists/${listId}/closed`, { method: 'PUT', body: JSON.stringify({ value: true }) });
}

export function moveList(listId: string, pos: number) {
  return trelloFetch(`/lists/${listId}/pos`, { method: 'PUT', body: JSON.stringify({ value: pos }) });
}
