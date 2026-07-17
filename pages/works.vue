<script setup lang="ts">
import { worksPage, siteMeta } from '~/data/site'

const canonical = `${siteMeta.url}/works`

useHead({
  title: `${worksPage.heading}｜${siteMeta.name}`,
  meta: [
    {
      name: 'description',
      content: worksPage.lead,
    },
  ],
  link: [{ rel: 'canonical', href: canonical }],
})

useSocialMeta({
  title: `${worksPage.heading}｜${siteMeta.name}`,
  description: worksPage.lead,
  url: canonical,
  type: 'website',
})

const selfItems = worksPage.items.filter((item) => item.type === 'self')
const clientItems = worksPage.items.filter((item) => item.type === 'client')
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section">
        <h1 class="section-title">{{ worksPage.heading }}</h1>
        <p class="section-lead">{{ worksPage.lead }}</p>

        <div class="mt-10">
          <h2 class="text-sm font-bold text-body">自社サービス</h2>

          <article
            v-for="item in selfItems"
            :key="item.title"
            class="card mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
          >
            <div>
              <span class="section-label">{{ item.category }}</span>
              <h3 class="mt-3 text-2xl text-navy">{{ item.title }}</h3>
              <p class="mt-3 max-w-2xl text-sm leading-[1.9] text-body">{{ item.summary }}</p>

              <ul class="mt-4 flex flex-wrap gap-2">
                <li
                  v-for="tech in item.stack"
                  :key="tech"
                  class="rounded-lg border border-line bg-surface-alt px-2.5 py-1 text-xs font-bold text-navy"
                >
                  {{ tech }}
                </li>
              </ul>

              <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-body">
                <li v-for="point in item.points" :key="point">{{ point }}</li>
              </ul>
            </div>

            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="inline-flex shrink-0 items-center gap-1 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-white transition-colors duration-500 ease-reveal hover:bg-cta-dark"
            >
              {{ item.hrefLabel }}
            </a>
          </article>
        </div>

        <div class="mt-12">
          <h2 class="text-sm font-bold text-body">クライアント案件</h2>

          <div class="mt-4 grid gap-6 sm:grid-cols-3">
            <article v-for="item in clientItems" :key="item.title" class="card flex flex-col">
              <span class="section-label w-fit bg-surface-alt text-body">{{ item.category }}</span>
              <h3 class="mt-3 text-lg text-navy">{{ item.title }}</h3>
              <p class="mt-3 text-sm leading-[1.9] text-body">{{ item.summary }}</p>

              <ul class="mt-4 flex flex-wrap gap-2">
                <li
                  v-for="tech in item.stack"
                  :key="tech"
                  class="rounded-lg border border-line bg-surface-alt px-2.5 py-1 text-xs font-bold text-navy"
                >
                  {{ tech }}
                </li>
              </ul>

              <ul class="mt-4 list-disc space-y-2 border-t border-line pl-5 pt-4 text-sm text-body">
                <li v-for="point in item.points" :key="point">{{ point }}</li>
              </ul>
            </article>
          </div>
        </div>

        <p class="mt-12 text-sm leading-[1.9] text-body">
          ここでご紹介した開発実績とは別に、AI導入支援サービスも行っています。
          <NuxtLink to="/services" class="font-bold text-navy underline underline-offset-4">
            グラバーテックのAI導入支援サービスを見る →
          </NuxtLink>
        </p>
      </div>
    </section>
  </main>
</template>
