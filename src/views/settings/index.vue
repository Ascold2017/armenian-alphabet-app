<template>
  <v-container fluid class="pb-16">
    <h1 class="text-h6 mb-4">{{ t('settingsTitle') }}</h1>

    <v-card class="px-4 py-3 mb-4">
      <div class="text-subtitle-2 mb-4">{{ t('poolParamsTitle') }}</div>

      <span class="text-body-small">{{ t('poolSize') }}: {{ learningPoolSize }}</span>
      <v-slider v-model="learningPoolSize" :min="1" :max="maxLetters" :step="1" tick-size="4"
        color="primary" class="mb-6" />

        <span class="text-body-small">{{ t('scoreToLearn') }}: {{  scoreToLearned }}</span>
      <v-slider v-model="scoreToLearned" :min="1" :max="30" :step="1" tick-size="4" color="primary" />
    </v-card>

    <v-card class="px-4 py-3 mb-4">
      <div class="text-subtitle-2 mb-4">{{ t('language') }}</div>
      <v-select v-model="vLocale"  item-title="text" item-value="value" :items="[
        {
          text: 'English',
          value: 'en'
        },
        {
          text: 'Русский',
          value: 'ru'
        }
      ]" />
    </v-card>

    <v-card class="px-4 py-3">
      <div class="text-subtitle-2 mb-2">{{ t('progressTitle') }}</div>
      <p class="text-body-2 text-medium-emphasis mb-4">
        {{ t('progressResetDescription') }}
      </p>
      <v-btn color="error" variant="tonal" @click="confirmReset = true">
        {{ t('resetProgressButton') }}
      </v-btn>
    </v-card>

    <v-dialog v-model="confirmReset" max-width="400">
      <v-card>
        <v-card-title>{{ t('resetProgressButton') }}</v-card-title>
        <v-card-text>{{ t('confirmDescription') }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="confirmReset = false">{{ t('cancel') }}</v-btn>
          <v-btn color="error" variant="flat" @click="resetProgress">{{ t('resetConfirm') }}</v-btn>
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
import { useI18n } from 'vue-i18n'
import { changeLocale } from '@/i18n'

const settings = useSettingsStore()
const { learningPoolSize, scoreToLearned } = storeToRefs(settings)
const learning = useLearningStore()
const { locale, t } = useI18n()

const confirmReset = ref(false)

const maxLetters = computed(() => Math.max(1, learning.letters.length))

const vLocale = computed({
  get() {
    return locale.value || 'en'
  },
  set(v: 'en' | 'ru') {
    changeLocale(v)
  }
})
watch([learningPoolSize, scoreToLearned], () => {
  settings.saveConfig()
})

function resetProgress() {
  learning.resetAllProgress()
  confirmReset.value = false
}
</script>
