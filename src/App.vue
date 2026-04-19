<template>
  <v-app>
    <v-main>
      <router-view />
      <v-bottom-navigation>
        <v-btn :to="{ name: 'home' }">
          <v-icon>mdi-home</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'learning' }">
          <v-icon>mdi-school</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'settings' }">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useLearningStore } from './store/learning';
import { useSettingsStore } from './store/settings';

onMounted(() => {
  useSettingsStore()
  useLearningStore()
})

</script>
