<template>
  <v-card class="px-4 py-4 mb-4">

    <div v-if="activeExcercise.promptKind === 'transcription_from_letter'" :class="promptBoxClass"
      class="d-flex align-center justify-center mb-6">
      <span :class="letterTextClass">{{ letterPrompt }}</span>
    </div>

    <div v-else class="mb-6">
      <div :class="promptBoxClass" class="d-flex flex-column align-center justify-center ga-2">
        <span :class="transcriptionTextClass">{{ transcription }}</span>
        <v-chip size="small" color="primary" variant="tonal">
          {{ activeExcercise.letterCase === 'upper' ? t('uppercase') : t('lowercase') }}
        </v-chip>
      </div>
    </div>


    <v-row>
      <v-col v-for="ch in activeExcercise.choices" :key="ch.key" cols="12" sm="6">
        <v-btn block size="large" variant="tonal" class="choice-btn text-none" :class="choiceButtonClass"
          @click="onPick(ch.key)">
          {{ ch.display }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>

  <v-snackbar v-model="showSnackbar" :color="snackbarColor" timeout="1600" location="bottom">
    {{ snackbarText }}
  </v-snackbar>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'
import type { IActiveExercise } from '@/models'
import { useLearningStore } from '@/store/learning'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const learning = useLearningStore()
const showSnackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref<'success' | 'error'>('success')

const props = defineProps<{
  activeExcercise: IActiveExercise
  submitChoice: (key: string) => boolean | null
}>()

const emit = defineEmits<{
  (e: 'pick', key: string): void
}>()
const targetLetter = computed(() => {
  if (props.activeExcercise) return learning.letters.find(l => l.id === props.activeExcercise.targetLetterId)
  return null
})

const letterPrompt = computed(() => {
  const ex = props.activeExcercise
  const L = targetLetter.value
  if (!ex || !L) return ''
  return ex.letterCase === 'upper' ? L.letterU : L.letterL
})



const promptBoxClass = computed(() => {
  const pic = props.activeExcercise?.visualMode === 'picture'
  return pic ? 'learning-prompt learning-prompt--picture' : 'learning-prompt learning-prompt--text'
})

const letterTextClass = computed(() =>
  props.activeExcercise?.visualMode === 'picture' ? 'text-h2' : 'text-h4',
)

const transcriptionTextClass = computed(() =>
  props.activeExcercise?.visualMode === 'picture' ? 'text-h5' : 'text-h6',
)

const transcription = computed(() => {
  if (locale.value === 'ru') return targetLetter.value?.transcriptionRu
  return targetLetter.value?.transcriptionEn
})

const choiceButtonClass = computed(() =>
  props.activeExcercise?.promptKind === 'letter_from_transcription' ? 'text-h6' : 'text-body-1',
)

function onPick(key: string) {
  const ok = props.submitChoice(key)
  if (ok === null) return
  snackbarText.value = ok ? t('correct') : t('wrong')
  snackbarColor.value = ok ? 'success' : 'error'
  showSnackbar.value = true
}

</script>

<style scoped>
.learning-prompt {
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  min-height: 120px;
  padding: 16px;
}

.learning-prompt--picture {
  min-height: 180px;
  background: rgba(var(--v-theme-primary), 0.06);
  border-width: 2px;
}

.learning-prompt--text {
  min-height: 100px;
}

.choice-btn {
  min-height: 52px;
}
</style>