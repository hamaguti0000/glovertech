<script setup lang="ts">
import { tokushohoPage, siteMeta } from '~/data/site'

useHead({
  title: `${tokushohoPage.heading}｜${siteMeta.name}`,
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">{{ tokushohoPage.heading }}</h1>

        <dl class="mt-8 divide-y divide-line border-y border-line">
          <div
            v-for="item in tokushohoPage.items"
            :key="item.label"
            class="grid gap-1 py-4 sm:grid-cols-[10rem,1fr] sm:gap-4"
          >
            <dt class="text-sm font-bold text-navy">{{ item.label }}</dt>
            <dd class="text-sm leading-[1.9] text-body">{{ item.value }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </main>
</template>
