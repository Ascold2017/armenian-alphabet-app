import { computed, ref, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useSettingsStore } from '@/store/settings'
import { useLearningProgress } from '@/store/helpers/useLearningProgress'
import { useLetterPool } from '@/store/helpers/useLetterPool'
import { useLearningSession } from '@/store/helpers/useLearningSession'
import { useExerciseGenerator } from '@/store/helpers/useExerciseGenerator'
import { useLetterAudio } from '@/store/helpers/useLetterAudio'
import { useLettersList } from '@/store/helpers/useLettersList'
import alphabet from '@/assets/alphabet.json'
export const useLearningStore = defineStore('learning', () => {
  const letters = ref(alphabet)
  const settings = useSettingsStore()
  const { learningPoolSize, scoreToLearned } = storeToRefs(settings)


  const progress = useLearningProgress({ scoreToLearned })

  const pool = useLetterPool({
    letters,
    poolSize: learningPoolSize,
    isLearned: progress.isLearned,
  })

  const session = useLearningSession()

  const exercise = useExerciseGenerator({
    letters,
    sessionOrder: session.sessionOrder,
    sessionIndex: session.sessionIndex,
  })

  const audio = useLetterAudio()

  const { parsedLetters } = useLettersList({
    learningProgressMapRef: progress.learningProgressMap,
  })

  function bootstrapPoolAndSession() {
    pool.syncPoolFromFrequency()
    session.reshuffleSessionOrder(pool.learningPoolIds.value)
    exercise.spawnExerciseForCurrentSlot()
  }

  function submitChoice(choiceKey: string): boolean | null {
    const ex = exercise.activeExercise.value
    if (!ex) return null

    const correct = choiceKey === ex.correctChoiceKey
    const becameLearned = progress.applyScoreDelta(
      ex.targetLetterId,
      correct ? 1 : -1,
    )

    if (correct) {
      void audio.playLetterAudio(ex.targetLetterId)
    }

    if (becameLearned) {
      pool.syncPoolFromFrequency()
      session.reshuffleSessionOrder(pool.learningPoolIds.value)
    } else {
      session.advanceSessionAfterAnswer()
    }
    exercise.spawnExerciseForCurrentSlot()
    return correct
  }

  function currentLetterScore(): number {
    const ex = exercise.activeExercise.value
    if (!ex) return 0
    return progress.getProgressOrDefault(ex.targetLetterId).score
  }

  function resetAllProgress() {
    progress.clearProgress()
    bootstrapPoolAndSession()
  }

  watch(
    () => [settings.learningPoolSize, settings.scoreToLearned],
    () => {
      settings.saveConfig()
      bootstrapPoolAndSession()
    },
  )

  bootstrapPoolAndSession()

  return {
    letters,
    learningPoolIds: pool.learningPoolIds,
    sessionOrder: session.sessionOrder,
    activeExercise: exercise.activeExercise,
    parsedLetters,
    currentLetterScore,
    submitChoice,
    spawnExerciseForCurrentSlot: exercise.spawnExerciseForCurrentSlot,
    resetAllProgress,
    bootstrapPoolAndSession,
  }
})
