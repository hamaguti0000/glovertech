<script setup lang="ts">
import type { WorkItem } from '~/data/site'

defineProps<{
  items: WorkItem[]
  totalCount: number
  label: string
  lead: string
}>()
</script>

<template>
  <section class="border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title max-w-xl">開発・運営してきたもの</h2>
      <p class="section-lead">{{ lead }}</p>

      <div class="mt-8 flex flex-wrap gap-10 border-y border-line py-6">
        <CountUpStat :value="3" suffix="県" label="展開エリア(補助金ナビ 長崎)" />
        <CountUpStat :value="totalCount" suffix="件" label="開発・運営したサービス" />
      </div>

      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          v-reveal
          v-tilt
          class="card flex flex-col"
          :style="{ '--reveal-delay': `${index * 100}ms` }"
        >
          <span class="section-label w-fit bg-surface-alt text-body">{{ item.category }}</span>
          <h3 class="mt-3 text-lg text-navy">{{ item.title }}</h3>
          <p class="mt-3 text-sm leading-[1.9] text-body">{{ item.summary }}</p>
        </article>
      </div>

      <p class="mt-8">
        <NuxtLink to="/works" class="text-sm font-bold text-navy underline underline-offset-4">
          実績一覧を見る →
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
