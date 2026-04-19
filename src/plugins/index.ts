/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Types
import type { App } from 'vue'

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import { createPinia } from 'pinia'
import { i18n } from '@/i18n'

export function registerPlugins (app: App) {
  app.use(vuetify)
  app.use(router)
  app.use(createPinia())
  app.use(i18n)
}
