<template>
    <div>
        <h1 class="text-2xl font-bold text-center">
            Your current progress
        </h1>

        <v-container fluid>
            <v-row gap="4" class="mb-4">
                <v-btn to="/learning" block color="primary">Continue learning</v-btn>
            </v-row>
            <v-row gap="4">
                <v-col cols="3" v-for="letter in store.parsedLetters" :key="letter.id">
                    <v-card class="p-4 text-center" :color="letterColor(letter)">
                        <span class="text-sm font-bold">{{ letter.letterU }}</span>&nbsp;
                        <span class="text-sm font-bold">{{ letter.letterL }}</span><br>
                        <span class="text-sm">{{ letter.transcription }}</span>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts" setup>
import { LetterStatus, type ParsedLetter } from '@/models';
import { useLearningStore } from '@/store/learning'
import { computed } from 'vue'

const store = useLearningStore()

const letterColor = computed(() => (letter: ParsedLetter) => {
    
    if (letter.status === LetterStatus.LEARNING) return 'primary'
    if (letter.status === LetterStatus.LEARNED) return 'success'
    return 'secondary'
})
</script>