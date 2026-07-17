<script setup lang="ts">
import { contact, contactPage, siteMeta } from '~/data/site'

const canonical = `${siteMeta.url}/contact`

useHead({
  title: contactPage.title,
  meta: [{ name: 'description', content: contactPage.description }],
  link: [{ rel: 'canonical', href: canonical }],
})

useSocialMeta({
  title: contactPage.title,
  description: contactPage.description,
  url: canonical,
  type: 'website',
})
</script>

<template>
  <main>
    <section class="border-b border-line">
      <div class="section max-w-2xl">
        <h1 class="section-title">{{ contactPage.heading }}</h1>
        <p class="section-lead">{{ contactPage.lead }}</p>

        <div class="mt-6 rounded-lg border border-line bg-surface-alt p-5 text-sm leading-[1.9] text-body">
          {{ contactPage.consultationNote }}
        </div>
      </div>
    </section>

    <ContactSection
      :heading="contactPage.formHeading"
      :description="contactPage.formLead"
      :formspree-endpoint="contact.formspreeEndpoint"
      :label="contactPage.formLabel"
    />

    <section>
      <div class="section max-w-2xl">
        <div class="space-y-4 text-sm leading-[1.9] text-body">
          <p>{{ contactPage.usageNote }}</p>
          <p>
            <NuxtLink to="/privacy" class="font-bold text-navy underline underline-offset-4">
              プライバシーポリシーを見る →
            </NuxtLink>
          </p>
          <p>{{ contactPage.replyNote }}</p>
          <p>{{ contactPage.salesNote }}</p>
        </div>
      </div>
    </section>
  </main>
</template>
