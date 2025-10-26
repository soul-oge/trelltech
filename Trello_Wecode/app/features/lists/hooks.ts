import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { archiveList, createList, fetchLists, moveList, updateListName } from './api';

export function useLists(boardId: string) {
  return useQuery({ queryKey: ['lists', boardId], queryFn: () => fetchLists(boardId), enabled: !!boardId });
}

export function useCreateList(boardId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => createList(boardId, name),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['lists', boardId] })
  });
}

export function useUpdateListName(boardId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ listId, name }: { listId: string; name: string }) => updateListName(listId, name),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['lists', boardId] })
  });
}

export function useArchiveList(boardId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (listId: string) => archiveList(listId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['lists', boardId] })
  });
}

export function useMoveList(boardId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ listId, pos }: { listId: string; pos: number }) => moveList(listId, pos),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['lists', boardId] })
  });
}