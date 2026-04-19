import { ref, type Ref } from 'vue'
import type {
  IActiveExercise,
  IExerciseChoice,
  ILetter,
} from '@/models'
import { randomCase, randomChoiceKey, shuffleInPlace } from './shuffle'

export interface UseExerciseGeneratorOptions {
  letters: Ref<ILetter[]>
  sessionOrder: Ref<number[]>
  sessionIndex: Ref<number>
}

export function useExerciseGenerator({
  letters,
  sessionOrder,
  sessionIndex,
}: UseExerciseGeneratorOptions) {
  const activeExercise = ref<IActiveExercise | null>(null)

  function pickDistractorLetterIds(excludeId: number, count: number): number[] {
    const ids = letters.value
      .filter((l) => l.id !== excludeId)
      .map((l) => l.id)
    shuffleInPlace(ids)
    return ids.slice(0, count)
  }

  function pickDistractorLetterIdsForGlyph(
    target: ILetter,
    letterCase: 'upper' | 'lower',
    count: number,
  ): number[] {
    const tg = letterCase === 'upper' ? target.letterU : target.letterL
    const ids = letters.value
      .filter((l) => {
        if (l.id === target.id) return false
        const g = letterCase === 'upper' ? l.letterU : l.letterL
        return g !== tg
      })
      .map((l) => l.id)
    shuffleInPlace(ids)
    return ids.slice(0, count)
  }

  function buildTranscriptionChoices(
    target: ILetter,
    wrongLetterIds: number[],
  ): { choices: IExerciseChoice[]; correctChoiceKey: string } {
    const correctChoiceKey = randomChoiceKey()
    const choices: IExerciseChoice[] = [
      { key: correctChoiceKey, display: target.transcription },
    ]
    for (const id of wrongLetterIds) {
      const w = letters.value.find(l => l.id === id)
      if (w) {
        choices.push({ key: randomChoiceKey(), display: w.transcription })
      }
    }
    shuffleInPlace(choices)
    return { choices, correctChoiceKey }
  }

  function buildLetterGlyphChoices(
    target: ILetter,
    letterCase: 'upper' | 'lower',
    wrongLetterIds: number[],
  ): { choices: IExerciseChoice[]; correctChoiceKey: string } {
    const correctChoiceKey = randomChoiceKey()
    const glyph = letterCase === 'upper' ? target.letterU : target.letterL
    const choices: IExerciseChoice[] = [
      { key: correctChoiceKey, display: glyph },
    ]
    for (const id of wrongLetterIds) {
      const w = letters.value.find(l => l.id === id)
      if (w) {
        const g = letterCase === 'upper' ? w.letterU : w.letterL
        choices.push({ key: randomChoiceKey(), display: g })
      }
    }
    shuffleInPlace(choices)
    return { choices, correctChoiceKey }
  }

  function spawnExerciseForCurrentSlot() {
    const order = sessionOrder.value
    if (order.length === 0) {
      activeExercise.value = null
      return
    }
    const idx = sessionIndex.value % order.length
    const targetLetterId = order[idx]
    const target = letters.value.find(l => l.id === targetLetterId)
    if (!target) {
      activeExercise.value = null
      return
    }

    const usePicture = Math.random() < 0.5
    const visualMode = usePicture ? 'picture' : 'text'
    const promptKind: IActiveExercise['promptKind'] =
      Math.random() < 0.5 ? 'transcription_from_letter' : 'letter_from_transcription'
    const letterCase = randomCase()
    const wrongIds =
      promptKind === 'transcription_from_letter'
        ? pickDistractorLetterIds(target.id, 3)
        : pickDistractorLetterIdsForGlyph(target, letterCase, 3)

    let choices: IExerciseChoice[]
    let correctChoiceKey: string

    if (promptKind === 'transcription_from_letter') {
      const built = buildTranscriptionChoices(target, wrongIds)
      choices = built.choices
      correctChoiceKey = built.correctChoiceKey
    } else {
      const built = buildLetterGlyphChoices(target, letterCase, wrongIds)
      choices = built.choices
      correctChoiceKey = built.correctChoiceKey
    }

    activeExercise.value = {
      targetLetterId,
      promptKind,
      visualMode,
      letterCase,
      choices,
      correctChoiceKey,
    }
  }

  return { activeExercise, spawnExerciseForCurrentSlot }
}
