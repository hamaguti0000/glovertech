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

const breadcrumbItems = [
  { name: 'ホーム', url: siteMeta.url },
  { name: worksPage.heading, url: canonical },
]
useBreadcrumbJsonLd(breadcrumbItems)
</script>

<template>
  <main>
    <Breadcrumb :items="breadcrumbItems" />

    <section class="border-b border-line">
      <div class="section">
        <h1 class="section-title">{{ worksPage.heading }}</h1>
        <p class="section-lead">{{ worksPage.lead }}</p>

        <div class="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6 sm:flex sm:gap-12">
          <CountUpStat :value="3" suffix="県" label="展開エリア(補助金ナビ 長崎)" />
          <CountUpStat :value="worksPage.items.length" suffix="件" label="開発・運営したサービス" />
        </div>
      </div>
    </section>

    <section class="section-alt border-b border-line">
      <div class="section">
        <span class="section-label">{{ worksPage.selfHeading }}</span>
        <p class="section-lead">{{ worksPage.selfLead }}</p>

        <WorkCard
          v-for="item in selfItems"
          :key="item.title"
          v-reveal
          v-tilt
          :item="item"
          featured
          class="mt-8"
        />
      </div>
    </section>

    <section>
      <div class="section">
        <span class="section-label">{{ worksPage.clientHeading }}</span>
        <p class="section-lead">{{ worksPage.clientLead }}</p>

        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <WorkCard
            v-for="(item, index) in clientItems"
            :key="item.title"
            v-reveal
            v-tilt
            :item="item"
            :style="{ '--reveal-delay': `${index * 100}ms` }"
          />
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
