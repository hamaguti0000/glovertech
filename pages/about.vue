<script setup lang="ts">
import { aboutPage, siteMeta } from '~/data/site'

useHead({
  title: `${aboutPage.heading}｜${siteMeta.name}`,
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">{{ aboutPage.heading }}</h1>

        <dl class="mt-8 divide-y divide-line border-y border-line">
          <div
            v-for="item in aboutPage.items"
            :key="item.label"
            class="grid gap-1 py-4 sm:grid-cols-[8rem,1fr] sm:gap-4"
          >
            <dt class="text-sm font-bold text-navy">{{ item.label }}</dt>
            <dd class="text-sm leading-[1.9] text-body">{{ item.value }}</dd>
          </div>
        </dl>

        <div class="mt-10 rounded-lg border border-line bg-surface-alt p-6">
          <h2 class="text-lg text-navy">{{ aboutPage.relatedSite.heading }}</h2>
          <p class="mt-3 text-sm leading-[1.9] text-body">{{ aboutPage.relatedSite.body }}</p>
          <a
            :href="aboutPage.relatedSite.href"
            class="mt-3 inline-block text-sm font-bold text-navy underline underline-offset-4"
          >
            {{ aboutPage.relatedSite.name }}
          </a>
        </div>
      </div>
    </section>
  </main>
</template>
