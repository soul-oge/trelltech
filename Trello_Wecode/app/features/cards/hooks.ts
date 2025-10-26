import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCard, deleteCard, fetchCards, moveCard, updateCard } from './api';

export function useCards(listId: string) {
  return useQuery({ queryKey: ['cards', listId], queryFn: () => fetchCards(listId), enabled: !!listId });
}

export function useCreateCard(listId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createCard(listId, name),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cards', listId] })
  });
}

export function useUpdateCard(listId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, patch }: { cardId: string; patch: any }) => updateCard(cardId, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cards', listId] })
  });
}

export function useDeleteCard(listId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (cardId: string) => deleteCard(cardId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cards', listId] })
  });
}

export function useMoveCard(listId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ cardId, toListId, pos }: { cardId: string; toListId: string; pos?: 'top'|'bottom'|number }) =>
      moveCard(cardId, toListId, pos),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cards'] });
      qc.invalidateQueries({ queryKey: ['lists'] });
    }
  });
}
