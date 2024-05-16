<template>
  <div>
    <p>{{ $route.params.slug }}</p>
    <h1>{{ pageTitle }}</h1>
    <p>{{ supervisor }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types'

const route = useRoute()

const { data } = await useAsyncData('articles', () => queryContent<Article>(route.path).findOne())

const pageTitle = computed(() => {
  if (!data.value) return ''

  const { articleNo, title } = data.value
  return `${articleNo} ${title}`
})

const supervisor = computed(() => {
  return data.value?.supervisor ?? null
})

// NOTE: title や description などの一般的な SEO 対策の meta 設定には useSeoMeta で簡潔に書ける
//       https://nuxt.com/docs/getting-started/seo-meta#useseometa
useSeoMeta({
  title: `${pageTitle.value}`,
  description: data.value ? data.value.lead : ''
})
</script>
