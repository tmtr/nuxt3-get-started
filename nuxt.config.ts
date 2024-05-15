import crypto from 'crypto'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },

  typescript: {
    typeCheck: true
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module'
  ],

  eslint: {
    config: {
      stylistic: true
    }
  },

  stylelint: {
    cache: false
  },

  vite: {
    css: {
      modules: {
        // NOTE: CSS module のクラス名をカスタマイズして、"[コンポーネント名]-[ローカルクラス名]--[ハッシュ]" に設定する
        //       https://stackoverflow.com/a/77075108
        generateScopedName: (name, filename, css) => {
          const componentName = filename
            .replace(/\.vue.+$/, '')
            .split('/')
            .pop()

          const hash = crypto
            .createHash('md5')
            .update(css)
            .digest('base64')
            .substring(0, 5)

          return `${componentName}-${name}--${hash}`
        }
      },
      preprocessorOptions: {
        scss: {
          // NOTE: グローバルに定義した scss 変数や mixin を *.vue 内で使用したい場合には、ここに scss ファイルのパスを追加する
          additionalData: '@import "~/assets/stylesheets/_foundations.scss";'
        }
      }
    }
  }
})
