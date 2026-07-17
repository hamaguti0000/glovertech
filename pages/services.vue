<script setup lang="ts">
import { faqItems, sectionLabels, siteMeta } from '~/data/site'
import {
  aiCompanyVision,
  articlesCrossLink,
  diagnosis,
  freeConsultation,
  operation,
  overview,
  pilot,
  roleSplit,
  securityPrinciples,
  servicesHero,
  servicesPageMeta,
  summaryCta,
  worksCrossLink,
} from '~/data/services'

const canonical = `${siteMeta.url}/services`

useHead({
  title: servicesPageMeta.title,
  meta: [{ name: 'description', content: servicesPageMeta.description }],
  link: [{ rel: 'canonical', href: canonical }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'AI業務診断・1業務パイロット',
        description: servicesPageMeta.description,
        serviceType: 'AI導入支援',
        provider: {
          '@type': 'ProfessionalService',
          name: siteMeta.name,
          url: siteMeta.url,
        },
        areaServed: '長崎県',
        url: canonical,
      }),
    },
  ],
})

useSocialMeta({
  title: servicesPageMeta.title,
  description: servicesPageMeta.description,
  url: canonical,
  type: 'website',
})
</script>

<template>
  <main>
    <!-- 1. 問題提起 -->
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <span class="section-label">{{ servicesHero.label }}</span>
        <h1 v-reveal class="section-title">{{ servicesHero.title }}</h1>
        <p class="section-lead">{{ servicesHero.lead }}</p>
      </div>
    </section>

    <!-- 2. 全体像 -->
    <section class="section-alt border-b border-line">
      <div class="section">
        <span class="section-label">全体像</span>
        <h2 v-reveal class="section-title max-w-xl">{{ overview.heading }}</h2>
        <p class="section-lead">{{ overview.lead }}</p>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(step, index) in overview.steps" :key="step.title" class="card">
            <span class="text-xs font-bold text-navy">STEP {{ index + 1 }}</span>
            <h3 class="mt-2 text-lg">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-[1.9] text-body">{{ step.description }}</p>
          </div>
        </div>

        <div class="mt-8 max-w-2xl rounded-lg border border-line bg-white p-6">
          <p class="text-sm font-bold text-navy">効果測定のあと、進み方は3通りです</p>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
            <li v-for="branch in overview.branches" :key="branch">{{ branch }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 3. 無料相談 -->
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <span class="section-label">{{ freeConsultation.eyebrow }}</span>
        <h2 v-reveal class="section-title">{{ freeConsultation.title }}</h2>
        <p class="mt-4 text-2xl text-navy">
          <span
            v-for="(part, i) in splitNumeric(freeConsultation.price)"
            :key="i"
            :class="part.numeric ? 'font-barlow font-bold' : ''"
          >{{ part.text }}</span>
          <span class="ml-2 text-base text-body">・{{ freeConsultation.duration }}</span>
        </p>

        <ul class="mt-6 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
          <li v-for="item in freeConsultation.bullets" :key="item">{{ item }}</li>
        </ul>

        <p class="mt-6 rounded-lg border border-line bg-surface-alt p-5 text-sm leading-[1.9] text-body">
          {{ freeConsultation.note }}
        </p>
      </div>
    </section>

    <!-- 4. AI業務診断 -->
    <section id="diagnosis" class="section-alt border-b border-line scroll-mt-24">
      <div class="section max-w-2xl">
        <span class="section-label">{{ diagnosis.eyebrow }}</span>
        <h2 v-reveal class="section-title">{{ diagnosis.title }}</h2>
        <p class="mt-4 text-2xl text-navy">
          <span
            v-for="(part, i) in splitNumeric(diagnosis.price)"
            :key="i"
            :class="part.numeric ? 'font-barlow font-bold' : ''"
          >{{ part.text }}</span>
        </p>

        <p class="mt-4 text-base leading-[1.9] text-body">{{ diagnosis.intro }}</p>

        <div class="mt-8">
          <h3 class="text-lg">標準範囲</h3>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
            <li v-for="item in diagnosis.scope" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="mt-8">
          <h3 class="text-lg">ヒアリング項目</h3>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li
              v-for="item in diagnosis.hearingItems"
              :key="item"
              class="rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-bold text-navy"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="mt-8">
          <h3 class="text-lg">成果物</h3>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
            <li v-for="item in diagnosis.deliverables" :key="item">{{ item }}</li>
          </ul>
        </div>

        <p class="mt-6 rounded-lg border border-line bg-white p-5 text-sm leading-[1.9] text-body">
          {{ diagnosis.note }}
        </p>

        <NuxtLink
          :to="diagnosis.sampleHref"
          class="mt-4 inline-block text-sm font-bold text-navy underline underline-offset-4"
        >
          {{ diagnosis.sampleLabel }} →
        </NuxtLink>

        <p class="mt-6 text-sm leading-[1.9] text-body">
          {{ articlesCrossLink.text }}
          <NuxtLink :to="articlesCrossLink.href" class="font-bold text-navy underline underline-offset-4">
            {{ articlesCrossLink.label }} →
          </NuxtLink>
        </p>
      </div>
    </section>

    <!-- 5. 1業務パイロット -->
    <section id="pilot" class="border-b border-line scroll-mt-24">
      <div class="section max-w-2xl">
        <span class="section-label">{{ pilot.eyebrow }}</span>
        <h2 v-reveal class="section-title">{{ pilot.title }}</h2>
        <p class="mt-4 text-2xl text-navy">
          <span
            v-for="(part, i) in splitNumeric(pilot.price)"
            :key="i"
            :class="part.numeric ? 'font-barlow font-bold' : ''"
          >{{ part.text }}</span>
          <span class="ml-2 text-base text-body">・{{ pilot.duration }}</span>
        </p>

        <div class="mt-8">
          <h3 class="text-lg">基本条件</h3>
          <ul class="mt-3 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
            <li v-for="item in pilot.conditions" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="mt-8">
          <h3 class="text-lg">試す業務の例</h3>
          <ul class="mt-3 grid gap-2 sm:grid-cols-2">
            <li
              v-for="example in pilot.examples"
              :key="example"
              class="rounded-lg border border-line bg-surface-alt px-4 py-2 text-sm text-body"
            >
              {{ example }}
            </li>
          </ul>
        </div>

        <p class="mt-6 rounded-lg border border-line bg-surface-alt p-5 text-sm leading-[1.9] text-body">
          {{ pilot.note }}
        </p>

        <p class="mt-6 text-sm leading-[1.9] text-body">
          {{ worksCrossLink.text }}
          <NuxtLink :to="worksCrossLink.href" class="font-bold text-navy underline underline-offset-4">
            {{ worksCrossLink.label }} →
          </NuxtLink>
        </p>
      </div>
    </section>

    <!-- 6. 運用・改善 -->
    <section id="support" class="section-alt border-b border-line scroll-mt-24">
      <div class="section max-w-2xl">
        <span class="section-label">{{ operation.eyebrow }}</span>
        <h2 v-reveal class="section-title">{{ operation.title }}</h2>
        <p class="mt-4 text-2xl text-navy">
          <span
            v-for="(part, i) in splitNumeric(operation.price)"
            :key="i"
            :class="part.numeric ? 'font-barlow font-bold' : ''"
          >{{ part.text }}</span>
        </p>

        <ul class="mt-6 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
          <li v-for="item in operation.bullets" :key="item">{{ item }}</li>
        </ul>

        <p class="mt-6 rounded-lg border border-line bg-white p-5 text-sm leading-[1.9] text-body">
          {{ operation.note }}
        </p>
      </div>
    </section>

    <!-- 7. サービス全体のまとめ + CTA(1か所目) -->
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h2 v-reveal class="section-title">{{ summaryCta.heading }}</h2>
        <p class="section-lead">{{ summaryCta.body }}</p>

        <NuxtLink to="/contact" class="btn-cta mt-8 inline-flex">
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
        </NuxtLink>
      </div>
    </section>

    <!-- 8. AI秘書・AIカンパニーのビジョン -->
    <section class="section-alt border-b border-line">
      <div class="section max-w-2xl">
        <span class="section-label">{{ aiCompanyVision.eyebrow }}</span>
        <h2 v-reveal class="section-title">{{ aiCompanyVision.title }}</h2>

        <p v-for="paragraph in aiCompanyVision.body" :key="paragraph" class="mt-4 text-base leading-[1.9] text-body">
          {{ paragraph }}
        </p>

        <ul class="mt-6 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
          <li v-for="item in aiCompanyVision.principles" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- 9. 人とAIの役割分担 -->
    <section class="border-b border-line">
      <div class="section">
        <h2 v-reveal class="section-title max-w-xl">{{ roleSplit.heading }}</h2>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <div class="card">
            <h3 class="text-lg">{{ roleSplit.ai.title }}</h3>
            <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
              <li v-for="item in roleSplit.ai.items" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="card">
            <h3 class="text-lg">{{ roleSplit.human.title }}</h3>
            <ul class="mt-4 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
              <li v-for="item in roleSplit.human.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 10. セキュリティ原則 -->
    <section class="section-alt border-b border-line">
      <div class="section max-w-2xl">
        <h2 v-reveal class="section-title">{{ securityPrinciples.heading }}</h2>
        <ul class="mt-6 list-disc space-y-2 pl-5 text-sm leading-[1.9] text-body">
          <li v-for="item in securityPrinciples.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <!-- 11. FAQ -->
    <FaqSection :items="faqItems" :label="sectionLabels.faq" />

    <!-- 12. 最終CTA -->
    <section class="border-b border-line">
      <div class="section max-w-2xl text-center">
        <h2 v-reveal class="section-title">まずは無料相談から</h2>
        <p class="section-lead mx-auto">
          無料相談だけで終了いただいても構いません。ご納得いただいた場合のみ、次の段階へ進みます。
        </p>

        <NuxtLink to="/contact" class="btn-cta mt-8 inline-flex">
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
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
