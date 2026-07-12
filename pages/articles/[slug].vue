<script setup lang="ts">
import { articles } from '~/data/articles'
import { siteMeta } from '~/data/site'

const route = useRoute()
const article = articles.find((item) => item.slug === route.params.slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const canonical = `${siteMeta.url}/articles/${article.slug}`

useHead({
  title: `${article.title}｜${siteMeta.name}`,
  meta: [
    { name: 'description', content: article.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: article.title },
    { property: 'og:description', content: article.description },
    { property: 'og:url', content: canonical },
  ],
  link: [{ rel: 'canonical', href: canonical }],
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        author: { '@type': 'Person', name: 'グラバーテック' },
      }),
    },
  ],
})
</script>

<template>
  <main v-if="article">
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <span class="section-label">{{ article.category }}</span>
        <h1 class="section-title">{{ article.title }}</h1>
        <p class="mt-3 text-sm text-body">{{ article.publishedAt }}</p>

        <div class="mt-10 space-y-12">
          <div v-for="section in article.sections" :key="section.heading">
            <h2 class="text-2xl text-navy">{{ section.heading }}</h2>

            <ChatGptMechanismDiagram v-if="section.diagram === 'chatgpt-mechanism'" />
            <SubsidyLayersDiagram v-else-if="section.diagram === 'subsidy-layers'" />
            <ApplicationTimelineDiagram v-else-if="section.diagram === 'application-timeline'" />

            <p
              v-for="(paragraph, index) in section.body"
              :key="index"
              class="mt-4 max-w-2xl text-base leading-[1.9] text-body"
            >
              {{ paragraph }}
            </p>

            <ArticleSteps v-if="section.steps" :steps="section.steps" />

            <div v-if="section.note" class="mt-6 rounded-lg border border-line bg-surface-alt p-5">
              <p class="text-sm leading-[1.9] text-body">{{ section.note }}</p>
            </div>
          </div>
        </div>

        <div class="mt-14 border-t border-line pt-10">
          <a href="/#contact" class="btn-cta inline-flex">
            無料相談を申し込む
            <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <p class="mt-8 text-sm">
          <NuxtLink to="/articles" class="text-navy underline underline-offset-4">コラム一覧に戻る</NuxtLink>
        </p>
      </div>
    </section>
  </main>
</template>
