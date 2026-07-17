<script setup lang="ts">
import { privacyPage, siteMeta } from '~/data/site'

useHead({
  title: `${privacyPage.heading}｜${siteMeta.name}`,
  meta: [
    {
      name: 'description',
      content: 'グラバーテックのプライバシーポリシーです。お問い合わせフォームで取得する情報の取り扱い方針を掲載しています。',
    },
    { name: 'robots', content: 'noindex,follow' },
  ],
  link: [{ rel: 'canonical', href: `${siteMeta.url}/privacy` }],
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">{{ privacyPage.heading }}</h1>
        <p class="mt-2 text-sm text-body">最終更新日：{{ privacyPage.updatedAt }}</p>
        <p class="mt-4 text-sm leading-[1.9] text-body">
          {{ privacyPage.intro }}
        </p>

        <div class="mt-8 space-y-8">
          <div v-for="section in privacyPage.sections" :key="section.heading">
            <h2 class="text-xl">{{ section.heading }}</h2>
            <p class="mt-2 text-sm leading-[1.9] text-body">{{ section.body }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
