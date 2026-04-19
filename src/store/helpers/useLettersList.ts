import { computed, type Ref } from 'vue'

import alphabet from '@/assets/alphabet.json'
import { LetterStatus, type ParsedLetter, type ILearningProgress, type ILetter } from '@/models'

interface UseLettersListOptions {
  learningProgressMapRef: Ref<Map<number, ILearningProgress>>
}

export function useLettersList({ learningProgressMapRef }: UseLettersListOptions) {
  const letters = alphabet as unknown as ILetter[]

  const parsedLetters = computed<ParsedLetter[]>(() =>
    letters.map((letter) => {
      const progress = learningProgressMapRef.value.get(letter.id)
      return {
        ...letter,
        status: progress?.status || LetterStatus.NEW,
        score: progress?.score || 0,
        lastStudied: progress?.lastStudied || 0,
      }
    }),
  )

  return { parsedLetters }
}