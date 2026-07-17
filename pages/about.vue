<script setup lang="ts">
import { aboutPage, siteMeta } from '~/data/site'

const aboutTitle = `${aboutPage.heading}｜${siteMeta.name}`
const aboutDescription = 'グラバーテックの運営者情報です。屋号・運営者名・所在地・運営サイトなどを掲載しています。'
const canonical = `${siteMeta.url}/about`

useHead({
  title: aboutTitle,
  meta: [
    { name: 'description', content: aboutDescription },
    // TODO: 運営者情報(連絡先・事業内容)の入力が完了し次第、noindexを解除する
    { name: 'robots', content: 'noindex,follow' },
  ],
  link: [{ rel: 'canonical', href: canonical }],
})

useSocialMeta({
  title: aboutTitle,
  description: aboutDescription,
  url: canonical,
  type: 'website',
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
          <h2 class="text-xl">{{ aboutPage.relatedSite.heading }}</h2>
          <p class="mt-3 text-sm leading-[1.9] text-body">{{ aboutPage.relatedSite.body }}</p>
          <a
            :href="aboutPage.relatedSite.href"
            class="mt-3 inline-block text-sm font-bold text-navy underline underline-offset-4"
          >
            {{ aboutPage.relatedSite.name }}
          </a>
        </div>

        <p class="mt-10 text-sm leading-[1.9] text-body">
          <NuxtLink to="/services" class="font-bold text-navy underline underline-offset-4">
            AI導入支援サービスの内容はこちら →
          </NuxtLink>
        </p>
      </div>
    </section>
  </main>
</template>
