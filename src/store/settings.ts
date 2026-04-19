import type { ILearningConfig } from '@/models'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const CONFIG_KEY = 'learningConfig'

function clampInt(v: number, min: number, max: number, fallback: number): number {
  const n = Math.floor(Number(v))
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, n))
}

export const useSettingsStore = defineStore('settings', () => {
  const learningPoolSize = ref(5)
  const scoreToLearned = ref(10)

  function loadConfig() {
    const raw = localStorage.getItem(CONFIG_KEY)
    if (!raw) return
    try {
      const config = JSON.parse(raw) as Partial<ILearningConfig>
      if (config.poolSize != null) {
        learningPoolSize.value = clampInt(config.poolSize, 1, 99, 5)
      }
      if (config.scoreToLearned != null) {
        scoreToLearned.value = clampInt(config.scoreToLearned, 1, 999, 10)
      }
    } catch {
      /* ignore */
    }
  }

  function saveConfig() {
    const payload: ILearningConfig = {
      poolSize: learningPoolSize.value,
      scoreToLearned: scoreToLearned.value,
    }
    localStorage.setItem(CONFIG_KEY, JSON.stringify(payload))
  }

  loadConfig()

  return {
    learningPoolSize,
    scoreToLearned,
    loadConfig,
    saveConfig,
  }
})
