<script setup lang="ts">
import { articles } from '~/data/articles'
import { siteMeta } from '~/data/site'

useHead({
  title: `コラム｜${siteMeta.name}`,
  meta: [
    {
      name: 'description',
      content: 'AI活用や補助金について、長崎の中小企業・個人事業主向けに分かりやすく解説するコラムです。',
    },
  ],
  link: [{ rel: 'canonical', href: `${siteMeta.url}/articles` }],
})
</script>

<template>
  <main>
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
