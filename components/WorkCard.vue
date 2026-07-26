<script setup lang="ts">
import { NuxtLink } from '#components'
import type { WorkItem } from '~/data/site'

defineProps<{
  item: WorkItem
  /** 概要までを見せる一覧向けの表示。カード全体が実績ページへのリンクになる */
  compact?: boolean
  /** 主役として大きく見せるカード。sm以上で画像と本文を横並びにする */
  featured?: boolean
}>()
</script>

<template>
  <component
    :is="compact ? NuxtLink : 'article'"
    :to="compact ? '/works' : undefined"
    class="card card-flush flex flex-col"
    :class="featured && 'sm:flex-row'"
  >
    <!-- スマホでは画像を横幅いっぱいに、sm以上の主役カードでは台紙に載せて見せる -->
    <div
      class="shrink-0 border-b border-line bg-surface-alt"
      :class="featured && 'sm:flex sm:w-[44%] sm:items-center sm:border-b-0 sm:border-r sm:p-6'"
    >
      <img
        :src="item.image.src"
        :alt="item.image.alt"
        :width="item.image.width"
        :height="item.image.height"
        loading="lazy"
        decoding="async"
        class="aspect-[16/10] w-full object-cover object-top"
        :class="featured && 'sm:rounded-lg sm:shadow-[0_10px_24px_-14px_rgba(20,33,61,0.5)]'"
      />
    </div>

    <div class="flex flex-1 flex-col p-6 sm:p-7">
      <!-- 実績ページでは見出しが種別を示すため、種別を持たない一覧向け表示だけに出す -->
      <span v-if="compact" class="section-label w-fit">{{ item.category }}</span>
      <h3 class="text-xl leading-snug text-navy sm:text-2xl" :class="compact && 'mt-3'">
        {{ item.title }}
      </h3>
      <p class="mt-3 text-sm leading-[1.9] text-body">{{ item.summary }}</p>

      <template v-if="!compact">
        <ul class="mt-5 flex flex-wrap gap-2">
          <li
            v-for="tech in item.stack"
            :key="tech"
            class="rounded-lg border border-line bg-surface-alt px-2.5 py-1 text-xs font-bold text-navy"
          >
            {{ tech }}
          </li>
        </ul>

        <ul class="mt-5 space-y-2 border-t border-line pt-5 text-sm leading-[1.9] text-body">
          <li v-for="point in item.points" :key="point" class="flex gap-2.5">
            <span class="mt-[0.8em] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
            <span>{{ point }}</span>
          </li>
        </ul>

        <a
          v-if="item.href"
          :href="item.href"
          target="_blank"
          rel="noopener"
          class="btn-cta mt-6 w-full justify-center px-5 py-3 text-sm sm:mt-auto sm:w-fit"
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
      </template>
    </div>
  </component>
</template>
