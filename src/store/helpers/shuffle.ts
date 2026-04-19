export function shuffleInPlace<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function randomChoiceKey(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function randomCase(): 'upper' | 'lower' {
  return Math.random() < 0.5 ? 'upper' : 'lower'
}
