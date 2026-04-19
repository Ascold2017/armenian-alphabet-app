# Armenian alphabet app

Application for learning armenian alphabet


## Features

Start learn alphabet by just click Continue learning

It will start repeating of first of 5 letters (configurable on settings screen)

Then you should correct answer exercises - correct transcription of letter, or correct letter by transcription

If you answer correct - you will get 1 score point for this letter, if wrong - you lose 1 point

When you obtain 10 score points of letter (configurable on settings screen) - this letter will be learned and not be repeatable after

Then you will repeat next and next letters, 5 letters simultaneosly, till the last.

If you paused usage of application - after 6 hours all not learned letters lose 1 score point, after 12 hours - 2 points, and after 24 hours - 3 points

On settings screen you can change settings:
- reset all progress
- change language (russian and english available)
- change count of letters that you will learn in single time (default - 5)
- change count of score points to make letter learned

## 🧱 Stack

- Framework: Vue 3 + Vite
- UI Library: Vuetify
- Language: TypeScript
- Package manager: npm


## 💿 Install

Use your selected package manager (npm) to install dependencies:

```bash
npm install
```

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 🏗️ Build

```bash
npm run build

npx cap sync android

npx cap open android
```

Then build and run app via Android Studio

