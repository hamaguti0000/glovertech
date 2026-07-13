<script setup lang="ts">
import { worksPage, siteMeta } from '~/data/site'

useHead({
  title: `${worksPage.heading}｜${siteMeta.name}`,
  meta: [
    {
      name: 'description',
      content: worksPage.lead,
    },
  ],
  link: [{ rel: 'canonical', href: `${siteMeta.url}/works` }],
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section">
        <h1 class="section-title">{{ worksPage.heading }}</h1>
        <p class="section-lead">{{ worksPage.lead }}</p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <article v-for="item in worksPage.items" :key="item.title" class="card flex flex-col">
            <span class="section-label w-fit">{{ item.category }}</span>
            <h2 class="mt-3 text-xl text-navy">{{ item.title }}</h2>
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

            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener"
              class="mt-4 inline-block text-sm font-bold text-navy underline underline-offset-4"
            >
              {{ item.hrefLabel }}
            </a>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>
