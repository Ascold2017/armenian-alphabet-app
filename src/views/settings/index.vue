<template>
  <v-container fluid class="pb-16">
    <h1 class="text-h6 mb-4">Настройки обучения</h1>

    <v-card class="px-4 py-3 mb-4">
      <div class="text-subtitle-2 mb-4">Параметры пула и засчитывания</div>

      <v-slider
        v-model="learningPoolSize"
        :min="1"
        :max="maxLetters"
        :step="1"
        show-ticks="always"
        tick-size="4"
        color="primary"
        label="Букв в пуле"
        thumb-label
        class="mb-6"
      />

      <v-slider
        v-model="scoreToLearned"
        :min="1"
        :max="30"
        :step="1"
        show-ticks="always"
        tick-size="4"
        color="primary"
        label="Очков до «выучено»"
        thumb-label
      />
    </v-card>

    <v-card class="px-4 py-3">
      <div class="text-subtitle-2 mb-2">Данные</div>
      <p class="text-body-2 text-medium-emphasis mb-4">
        Сброс прогресса удаляет сохранённые очки по всем буквам. Пул будет пересобран.
      </p>
      <v-btn color="error" variant="tonal" @click="confirmReset = true">
        Сбросить прогресс
      </v-btn>
    </v-card>

    <v-dialog v-model="confirmReset" max-width="400">
      <v-card>
        <v-card-title>Сброс прогресса?</v-card-title>
        <v-card-text>Это действие нельзя отменить.</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="confirmReset = false">Отмена</v-btn>
          <v-btn color="error" variant="flat" @click="resetProgress">Сбросить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useLearningStore } from '@/store/learning'
import { useSettingsStore } from '@/store/settings'

const settings = useSettingsStore()
const { learningPoolSize, scoreToLearned } = storeToRefs(settings)
const learning = useLearningStore()

const confirmReset = ref(false)

const maxLetters = computed(() => Math.max(1, learning.letters.length))

watch([learningPoolSize, scoreToLearned], () => {
  settings.saveConfig()
})

function resetProgress() {
  learning.resetAllProgress()
  confirmReset.value = false
}
</script>
