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
</script>
