/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com
 */

import { createVuetify } from 'vuetify'
import type { ThemeDefinition } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '../styles/layers.css'
import 'vuetify/styles'

/** Тема от флага Армении: синий — primary, красный — error, оранжевый — warning; secondary — сине-серый; success — бирюза к синей полосе. */
const palette = {
  light: {
    primary: '#0033A0',
    secondary: '#5C667A',
    success: '#0F766E',
    warning: '#C77800',
    error: '#C40018',
  },
  dark: {
    primary: '#6BA3F5',
    secondary: '#94A3B8',
    success: '#2DD4BF',
    warning: '#F5B73A',
    error: '#FF7A7A',
  },
} as const

const lightTheme: ThemeDefinition = {
  dark: false,
  colors: { ...palette.light },
}

const darkTheme: ThemeDefinition = {
  dark: true,
  colors: { ...palette.dark },
}

export default createVuetify({
  theme: {
    defaultTheme: 'system',
    utilities: false,
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 840,
      lg: 1145,
      xl: 1545,
      xxl: 2138,
    },
  },
})
