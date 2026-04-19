import { ref } from 'vue'
import { shuffleInPlace } from './shuffle'

export function useLearningSession() {
  const sessionOrder = ref<number[]>([])
  const sessionIndex = ref(0)

  function reshuffleSessionOrder(poolIds: number[]) {
    const order = [...poolIds]
    shuffleInPlace(order)
    sessionOrder.value = order
    sessionIndex.value = 0
  }

  function advanceSessionAfterAnswer() {
    if (sessionOrder.value.length === 0) return
    sessionIndex.value = (sessionIndex.value + 1) % sessionOrder.value.length
  }

  return { sessionOrder, sessionIndex, reshuffleSessionOrder, advanceSessionAfterAnswer }
}
