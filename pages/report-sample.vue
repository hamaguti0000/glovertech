<script setup lang="ts">
import { reportSamplePage, siteMeta } from '~/data/site'

useHead({
  title: `${reportSamplePage.heading}｜${siteMeta.name}`,
  // 実在企業の診断結果ではない架空のサンプルのため、検索結果には表示しない
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">{{ reportSamplePage.heading }}</h1>
        <p class="section-lead">{{ reportSamplePage.lead }}</p>

        <div class="mt-6 rounded-lg border border-line bg-surface-alt p-5 text-sm leading-[1.9] text-body">
          {{ reportSamplePage.disclaimer }}
        </div>

        <div class="mt-10 overflow-hidden rounded-lg border border-line bg-white">
          <div class="border-b border-line p-6 sm:p-8">
            <p class="text-sm text-body">{{ reportSamplePage.coverTitle }}</p>
            <p class="mt-4 text-xs font-bold text-navy">対象事業者</p>
            <h2 class="text-2xl">{{ reportSamplePage.targetLabel }}</h2>
            <div class="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-body">
              <p>作成者：{{ reportSamplePage.authorLabel }}</p>
              <p>作成日：{{ reportSamplePage.dateLabel }}</p>
            </div>
          </div>

          <div class="divide-y divide-line">
            <div v-for="chapter in reportSamplePage.chapters" :key="chapter.title" class="p-6 sm:p-8">
              <h3 class="text-lg">{{ chapter.title }}</h3>
              <p class="mt-1 text-xs" style="color: var(--gray-text)">{{ chapter.guide }}</p>
              <p class="mt-4 text-sm leading-[1.9] text-body">{{ chapter.sample }}</p>
            </div>
          </div>
        </div>

        <div class="mt-10">
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
      </div>
    </section>
  </main>
</template>
