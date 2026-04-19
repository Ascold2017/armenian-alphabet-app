
export function useLetterAudio() {
  async function playLetterAudio(letterId: number) {
   
    const url = `/audio/letters/${letterId}.mp3`
    const audio = new Audio(url)
    try {
      await audio.play()
    } catch {
      ///
    }
  }

  return { playLetterAudio }
}
