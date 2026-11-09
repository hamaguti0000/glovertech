<script setup lang="ts">
import { articles } from '~/data/articles'
import { siteMeta } from '~/data/site'

const articlesTitle = `コラム｜${siteMeta.name}`
const articlesDescription =
  'ChatGPTの使い方から補助金の探し方まで。長崎の中小企業・個人事業主が今日から使えるAI活用のヒントを分かりやすく解説するコラムです。'
const canonical = `${siteMeta.url}/articles`

useHead({
  title: articlesTitle,
  meta: [{ name: 'description', content: articlesDescription }],
  link: [{ rel: 'canonical', href: canonical }],
})

useSocialMeta({
  title: articlesTitle,
  description: articlesDescription,
  url: canonical,
  type: 'website',
})

const breadcrumbItems = [
  { name: 'ホーム', url: siteMeta.url },
  { name: 'コラム', url: canonical },
]
useBreadcrumbJsonLd(breadcrumbItems)
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />

    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">コラム</h1>
        <p class="section-lead">
          AI活用や補助金について、長崎の中小企業・個人事業主向けに分かりやすく解説しています。
        </p>

        <ul class="mt-10 divide-y divide-line border-y border-line">
          <li v-for="article in articles" :key="article.slug" class="py-6">
            <NuxtLink :to="`/articles/${article.slug}`" class="group block">
              <span class="section-label">{{ article.category }}</span>
              <span
                v-if="article.level === 'advanced'"
                class="section-label ml-2 border-navy/20 bg-navy text-white"
              >
                上級者向け
              </span>
              <h2 class="mt-3 text-xl text-navy group-hover:underline">{{ article.title }}</h2>
              <p class="mt-2 max-w-2xl text-sm leading-[1.9] text-body">{{ article.description }}</p>
              <p class="mt-2 text-xs text-body">{{ article.publishedAt }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>
