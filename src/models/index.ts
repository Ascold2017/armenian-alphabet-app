export interface ILetter {
    id: number;
    letterU: string;
    letterL: string;
    transcriptionEn: string
    transcriptionRu: string
}

export interface ILearningConfig {
    poolSize: number
    scoreToLearned: number
}

export enum LetterStatus {
    NEW = 'new',
    LEARNING = 'learning',
    LEARNED = 'learned',
}

export interface ILearningProgress {
    letterId: number;
    status: LetterStatus;
    score: number;
    lastStudied: number
}

export interface ParsedLetter extends ILetter {
    status: LetterStatus;
    score: number;
    lastStudied: number
}

export type ExercisePromptKind =
  | 'transcription_from_letter'
  | 'letter_from_transcription'

export type ExerciseVisualMode = 'text' | 'picture'

export interface IExerciseChoice {
    key: string
    display: string
}

export interface IActiveExercise {
    targetLetterId: number
    promptKind: ExercisePromptKind
    visualMode: ExerciseVisualMode
    letterCase: 'upper' | 'lower'
    choices: IExerciseChoice[]
    correctChoiceKey: string
}