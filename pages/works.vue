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

useBreadcrumbJsonLd([
  { name: 'ホーム', url: siteMeta.url },
  { name: worksPage.heading, url: canonical },
])
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section">
        <h1 class="section-title">{{ worksPage.heading }}</h1>
        <p class="section-lead">{{ worksPage.lead }}</p>

        <div class="mt-8 flex flex-wrap gap-10 border-y border-line py-6">
          <CountUpStat :value="3" suffix="県" label="展開エリア(補助金ナビ 長崎)" />
          <CountUpStat :value="worksPage.items.length" suffix="件" label="開発・運営したサービス" />
        </div>

        <div class="mt-10">
          <h2 class="text-sm font-bold tracking-wide text-gold">自社サービス</h2>

          <article
            v-for="(item, index) in selfItems"
            :key="item.title"
            v-reveal
            v-tilt
            class="card mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
            :style="{ '--reveal-delay': `${index * 100}ms` }"
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
              class="btn-cta shrink-0 px-5 py-2.5 text-sm"
            >
              {{ item.hrefLabel }}
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
          </article>
        </div>

        <div class="mt-12">
          <h2 class="text-sm font-bold tracking-wide text-gold">クライアント案件</h2>

          <div class="mt-4 grid gap-6 sm:grid-cols-3">
            <article
              v-for="(item, index) in clientItems"
              :key="item.title"
              v-reveal
              v-tilt
              class="card flex flex-col"
              :style="{ '--reveal-delay': `${index * 100}ms` }"
            >
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
