import { ref, type ComputedRef, type Ref } from 'vue'
import type { ILetter } from '@/models'

export interface UseLetterPoolOptions {
  letters: Ref<ILetter[]>
  poolSize: Ref<number>
  isLearned: (letterId: number) => boolean
}

export function useLetterPool({ letters, poolSize, isLearned }: UseLetterPoolOptions) {
  const learningPoolIds = ref<number[]>([])

  function syncPoolFromFrequency() {
    const pool: number[] = []
    for (const l of letters.value) {
      if (pool.length >= poolSize.value) break
      if (isLearned(l.id)) continue
      pool.push(l.id)
    }
    learningPoolIds.value = pool
  }

  return { learningPoolIds, syncPoolFromFrequency }
}
