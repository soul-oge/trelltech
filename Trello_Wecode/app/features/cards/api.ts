import { trelloFetch } from '@app/services/trelloClient';

export type TrelloCard = { id: string; name: string; idList: string; desc?: string; pos?: number; idMembers?: string[] };

export function fetchCards(listId: string): Promise<TrelloCard[]> {
  return trelloFetch(`/lists/${listId}/cards`);
}

export function createCard(listId: string, name: string) {
  return trelloFetch('/cards', { method: 'POST', body: JSON.stringify({ idList: listId, name }) });
}

export function updateCard(cardId: string, patch: Partial<Pick<TrelloCard, 'name'|'desc'|'pos'|'idList'>>) {
  return trelloFetch(`/cards/${cardId}`, { method: 'PUT', body: JSON.stringify(patch) });
}

export function deleteCard(cardId: string) {
  return trelloFetch(`/cards/${cardId}`, { method: 'DELETE' });
}

export function moveCard(cardId: string, toListId: string, pos: 'top'|'bottom'|number = 'top') {
  return updateCard(cardId, { idList: toListId, pos });
}
