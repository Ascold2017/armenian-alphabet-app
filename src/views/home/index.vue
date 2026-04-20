<template>
    <div>
        <h1 class="text-2xl font-bold text-center">
            {{ t('homeTitle') }}
        </h1>

        <v-container fluid>
            <v-row gap="4">
                <v-col cols="3" v-for="letter in store.parsedLetters" :key="letter.id">
                    <v-card class="p-4 text-center" :color="letterColor(letter)" @click="store.playAudio(letter.id)">
                        <span class="text-sm font-bold">{{ letter.letterU }}</span>&nbsp;
                        <span class="text-sm font-bold">{{ letter.letterL }}</span><br>
                        <span class="text-sm">{{ letterTranscription(letter) }}</span><br>
                        <v-progress-linear class="mt-3" :model-value="letterProgress(letter)"></v-progress-linear>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { LetterStatus, type ParsedLetter } from '@/models';
import { useLearningStore } from '@/store/learning'
import { useSettingsStore } from '@/store/settings';
import { computed } from 'vue'
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n()
const store = useLearningStore()
const settings = useSettingsStore()

const letterColor = computed(() => (letter: ParsedLetter) => {

    if (letter.status === LetterStatus.LEARNING) return 'primary'
    if (letter.status === LetterStatus.LEARNED) return 'success'
    return 'secondary'
})

const letterTranscription = computed(() => (letter: ParsedLetter) => {
    if (locale.value === 'ru') return letter.transcriptionRu
    return letter.transcriptionEn
})
const letterProgress = computed(() => (letter: ParsedLetter) => {
    return (letter.score / settings.scoreToLearned) * 100
})
</script>