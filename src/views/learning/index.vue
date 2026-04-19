<template>
  <v-container class="learning-page pb-16" fluid>
    <div class="d-flex align-center justify-space-between mb-4">
      <v-btn variant="text" :to="{ name: 'home' }" prepend-icon="mdi-arrow-left">
        Назад
      </v-btn>
      <div class="text-caption text-medium-emphasis">
        Пул: {{ learningPoolIds.length }} / {{ learningConfig.poolSize }}
      </div>
    </div>

    <Excercise v-if="activeExercise" :active-excercise="activeExercise" :submit-choice="submitChoice" />

    <template v-else>
      <v-card class="pa-6 text-center">
        <v-icon size="64" color="success" class="mb-4">mdi-trophy</v-icon>
        <h2 class="text-h6 mb-2">Все буквы выучены</h2>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Поздравляем. Можно сбросить прогресс в настройках, если нужно начать заново.
        </p>
        <v-btn color="primary" :to="{ name: 'home' }">На главную</v-btn>
      </v-card>
    </template>
  </v-container>
</template>

<script lang="ts" setup>
import { useLearningStore } from '@/store/learning'
import { storeToRefs } from 'pinia'

import Excercise from '@/components/Excercise/index.vue'

const store = useLearningStore()
const { submitChoice } = store

const { activeExercise, learningPoolIds, learningConfig } = storeToRefs(store)
</script>


