import { ref, type Ref } from 'vue'
import { LetterStatus, type ILearningProgress } from '@/models'

const PROGRESS_KEY = 'progress'

export interface UseLearningProgressOptions {
  scoreToLearned: Ref<number>
}

export function useLearningProgress({ scoreToLearned }: UseLearningProgressOptions) {
  const learningProgressMap = ref(new Map<number, ILearningProgress>())

  function saveProgress() {
    const arr = [...learningProgressMap.value.values()]
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(arr))
  }

  function loadProgress() {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return
    try {
      const progress = JSON.parse(raw) as ILearningProgress[]
      progress.forEach((p) => {
        learningProgressMap.value.set(p.letterId, p)
      })
    } catch {
      /* ignore */
    }
  }

  function getProgressOrDefault(letterId: number): ILearningProgress {
    return (
      learningProgressMap.value.get(letterId) ?? {
        letterId,
        status: LetterStatus.NEW,
        score: 0,
        lastStudied: 0,
      }
    )
  }

  function isLearned(letterId: number): boolean {
    const p = learningProgressMap.value.get(letterId)
    if (!p) return false
    if (p.status === LetterStatus.LEARNED) return true
    return p.score >= scoreToLearned.value
  }

  /** @returns true, если буква стала выученной (нужно пересобрать пул). */
  function applyScoreDelta(letterId: number, delta: number): boolean {
    const existing = getProgressOrDefault(letterId)
    let score = Math.max(0, existing.score + delta)
    let status = existing.status

    if (score >= scoreToLearned.value) {
      score = scoreToLearned.value
      status = LetterStatus.LEARNED
    } else if (score > 0 || delta !== 0) {
      status = LetterStatus.LEARNING
    }

    learningProgressMap.value.set(letterId, {
      ...existing,
      letterId,
      score,
      status,
      lastStudied: Date.now(),
    })
    saveProgress()

    return status === LetterStatus.LEARNED
  }

  function clearProgress() {
    learningProgressMap.value.clear()
    localStorage.removeItem(PROGRESS_KEY)
  }

  loadProgress()

  return {
    learningProgressMap,
    loadProgress,
    saveProgress,
    getProgressOrDefault,
    isLearned,
    applyScoreDelta,
    clearProgress,
  }
}
