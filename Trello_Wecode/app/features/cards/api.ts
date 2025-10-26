import { trelloFetch } from '../../services/trelloClient';

export type TrelloCard = { id: string; name: string; idList: string; desc?: string; pos?: number };

type CardUpdatePayload = Partial<{
  name: string;
  desc: string;
  idList: string;
  pos: number | 'top' | 'bottom';
}>;

export function fetchCards(listId: string): Promise<TrelloCard[]> {
  return trelloFetch(`/lists/${listId}/cards`);
}

export function createCard(listId: string, name: string) {
  return trelloFetch('/cards', { method: 'POST', query: { idList: listId, name } });
}

export function updateCard(cardId: string, patch: CardUpdatePayload) {
  return trelloFetch(`/cards/${cardId}`, { method: 'PUT', query: patch as Record<string, any> });
}

export function deleteCard(cardId: string) {
  return trelloFetch(`/cards/${cardId}`, { method: 'DELETE' });
}

export function moveCard(cardId: string, toListId: string, pos: 'top' | 'bottom' | number = 'top') {
  return updateCard(cardId, { idList: toListId, pos });
}
