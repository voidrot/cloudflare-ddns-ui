import tailwindcss from '@tailwindcss/vite'

const DDNS_UPDATE_CRON_SCHEDULE = process.env.DDNS_UPDATE_CRON_SCHEDULE || '*/5 * * * *'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/scripts',
    '@nuxt/test-utils'
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  css: ['./app/tailwind.css'],

  nitro: {
    experimental: {
      tasks: true
    },
    scheduledTasks: {
      [DDNS_UPDATE_CRON_SCHEDULE]: ['update-ddns']
    },
  },
})
