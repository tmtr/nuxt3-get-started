import crypto from 'crypto'
import { resolve } from 'path'
import fs from 'fs'

const routes = fs.readdirSync(resolve(__dirname, 'content/articles'))
  .filter(file => file !== '.gitkeep')
  .map((article) => {
    return `/articles/${article.replace(/.\w+$/, '')}`
  })

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    // Ref: https://nuxt.com/docs/getting-started/seo-meta#defaults
    //      https://nuxt.com/docs/api/nuxt-config#head
    head: {
      title: 'Nuxt3 への移行テスト',
      htmlAttrs: {
        lang: 'ja'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;700&display=swap' }
      ]
    }
  },

  devtools: {
    enabled: true
  },

  generate: {
    // NOTE: 各記事へのリンク一覧がなく、Nuxt が自動でクロールしてルートを生成することができないため、
    //       明示的に各記事のルートを設定しておく必要がある
    routes
  },

  nitro: {
    routeRules: {
      // NOTE: build 時に `/` をレンダリングしない
      //       https://github.com/nuxt/nuxt/issues/24228#issuecomment-1931309360
      '/': { prerender: false }
    }
  },

  typescript: {
    typeCheck: true
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/stylelint-module',
    '@nuxt/content'
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
