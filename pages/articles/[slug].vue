<script setup lang="ts">
import { articles } from '~/data/articles'
import { siteMeta } from '~/data/site'

const route = useRoute()
const article = articles.find((item) => item.slug === route.params.slug)

if (!article) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

const relatedArticles = articles
  .filter((item) => item.category === article.category && item.slug !== article.slug)
  .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
  .slice(0, 3)

const canonical = `${siteMeta.url}/articles/${article.slug}`
const ogImageUrl = `${siteMeta.url}${siteMeta.ogImage}`
const pageTitle = article.seoTitle ?? article.title

useHead({
  title: `${pageTitle}｜${siteMeta.name}`,
  meta: [
    { name: 'description', content: article.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: article.description },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: ogImageUrl },
    { property: 'og:site_name', content: siteMeta.name },
    { property: 'og:locale', content: 'ja_JP' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: article.description },
    { name: 'twitter:image', content: ogImageUrl },
  ],
  link: [{ rel: 'canonical', href: canonical }],
})

const breadcrumbItems = [
  { name: 'ホーム', url: siteMeta.url },
  { name: 'コラム', url: `${siteMeta.url}/articles` },
  { name: pageTitle, url: canonical },
]
useBreadcrumbJsonLd(breadcrumbItems)

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
    <Breadcrumb :items="breadcrumbItems" />

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

        <p v-if="article.showServicesLink" class="mt-10 text-sm leading-[1.9] text-body">
          <NuxtLink to="/services" class="font-bold text-navy underline underline-offset-4">
            AI業務診断と1業務パイロットの内容を見る →
          </NuxtLink>
        </p>

        <div v-if="relatedArticles.length" class="mt-14 border-t border-line pt-10">
          <h2 class="text-lg text-navy">関連記事</h2>
          <ul class="mt-4 divide-y divide-line border-y border-line">
            <li v-for="related in relatedArticles" :key="related.slug" class="py-4">
              <NuxtLink :to="`/articles/${related.slug}`" class="group block">
                <span class="section-label">{{ related.category }}</span>
                <h3 class="mt-1 text-base text-navy group-hover:underline">{{ related.title }}</h3>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="mt-14 border-t border-line pt-10">
          <NuxtLink to="/contact" class="btn-cta inline-flex">
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
          </NuxtLink>
        </div>

        <p class="mt-8 text-sm">
          <NuxtLink to="/articles" class="text-navy underline underline-offset-4">コラム一覧に戻る</NuxtLink>
        </p>
      </div>
    </section>
  </main>
</template>
