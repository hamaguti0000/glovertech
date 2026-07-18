<script setup lang="ts">
import { articles } from '~/data/articles'

withDefaults(defineProps<{ alt?: boolean }>(), { alt: false })
</script>

<template>
  <section class="relative overflow-hidden border-b border-line" :class="{ 'section-alt': alt }">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-gold/[0.16] blur-3xl" />
    </div>
    <div class="section relative">
      <span class="section-label">コラム</span>
      <h2 v-reveal class="section-title">AI活用・補助金のお役立ち情報</h2>

      <ul class="mt-10 grid gap-6 sm:grid-cols-3">
        <li
          v-for="(article, index) in articles"
          :key="article.slug"
          v-reveal
          :style="{ '--reveal-delay': `${index * 100}ms` }"
        >
          <NuxtLink :to="`/articles/${article.slug}`" v-tilt class="card group block h-full">
            <span class="text-xs font-bold text-navy">{{ article.category }}</span>
            <h3 class="mt-2 text-base leading-snug text-navy group-hover:underline">
              {{ article.title }}
            </h3>
            <p class="mt-2 text-sm leading-[1.8] text-body line-clamp-3">{{ article.description }}</p>
          </NuxtLink>
        </li>
      </ul>

      <p class="mt-8">
        <NuxtLink to="/articles" class="text-sm font-bold text-navy underline underline-offset-4">
          コラム一覧を見る →
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
