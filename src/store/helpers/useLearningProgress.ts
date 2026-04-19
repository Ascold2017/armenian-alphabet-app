import { ref, type Ref } from 'vue'
import { LetterStatus, type ILearningProgress } from '@/models'

const PROGRESS_KEY = 'progress'
const HOUR_MS = 60 * 60 * 1000

function scoreDecayForIdleMs(idleMs: number): number {
  if (idleMs < 6 * HOUR_MS) return 0
  if (idleMs < 12 * HOUR_MS) return 1
  if (idleMs < 24 * HOUR_MS) return 2
  return 3
}

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
      const now = Date.now()
      let mutated = false

      for (const p of progress) {
        let entry = p

        if (p.status === LetterStatus.LEARNING && p.lastStudied > 0) {
          const decay = scoreDecayForIdleMs(now - p.lastStudied)
          if (decay > 0) {
            const score = Math.max(0, p.score - decay)
            const status = score > 0 ? LetterStatus.LEARNING : LetterStatus.NEW
            entry = { ...p, score, status }
            mutated = true
          }
        }

        learningProgressMap.value.set(entry.letterId, entry)
      }

      if (mutated) saveProgress()
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
    let score = existing.score + delta
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
