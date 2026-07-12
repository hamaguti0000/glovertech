<script setup lang="ts">
import { reportSamplePage, siteMeta } from '~/data/site'

useHead({
  title: `${reportSamplePage.heading}｜${siteMeta.name}`,
  // TODO: レポートの中身を実データに差し替えたらnoindexを外す
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">{{ reportSamplePage.heading }}</h1>
        <p class="section-lead">{{ reportSamplePage.lead }}</p>

        <div class="mt-10 overflow-hidden rounded-lg border border-line bg-white">
          <div class="border-b border-line p-6 sm:p-8">
            <p class="text-sm text-body">{{ reportSamplePage.coverTitle }}</p>
            <h2 class="mt-2 text-2xl">{{ reportSamplePage.nameLabel }}</h2>
            <p class="mt-3 text-sm text-body">作成日: {{ reportSamplePage.dateLabel }}</p>
          </div>

          <div class="divide-y divide-line">
            <div v-for="chapter in reportSamplePage.chapters" :key="chapter.title" class="p-6 sm:p-8">
              <h3 class="text-lg">{{ chapter.title }}</h3>
              <p class="mt-1 text-xs" style="color: var(--gray-text)">{{ chapter.guide }}</p>
              <p class="mt-4 text-sm leading-[1.9] text-body">【後で記入】</p>
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
