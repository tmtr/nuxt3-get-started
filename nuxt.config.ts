// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  typescript: {
    typeCheck: true
  },

  modules: [
    '@nuxt/eslint'
  ],

  eslint: {
    config: {
      stylistic: true
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // NOTE: グローバルに定義した scss 変数や mixin を *.vue 内で使用したい場合には、ここに scss ファイルのパスを追加する
          additionalData: '@import "~/assets/stylesheets/_foundations.scss";'
        }
      }
    }
  }
})
