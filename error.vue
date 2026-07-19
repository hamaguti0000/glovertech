<script setup lang="ts">
import { footer, header, siteMeta } from '~/data/site'

const props = defineProps<{
  error: { statusCode: number; statusMessage?: string; message?: string }
}>()

useHead({
  title: `${props.error.statusCode === 404 ? 'ページが見つかりません' : 'エラーが発生しました'}｜${siteMeta.name}`,
  meta: [{ name: 'robots', content: 'noindex' }],
})

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div>
    <SiteHeader
      :name="header.name"
      :tagline="header.tagline"
      :cta-label="header.ctaLabel"
      :cta-href="header.ctaHref"
    />
    <main>
      <section class="border-b border-line">
        <div class="section max-w-2xl text-center">
          <p class="font-barlow text-6xl font-bold text-navy sm:text-7xl">
            {{ error.statusCode }}
          </p>
          <h1 class="section-title text-center">
            {{ error.statusCode === 404 ? 'お探しのページが見つかりません' : 'エラーが発生しました' }}
          </h1>
          <p class="section-lead mx-auto text-center">
            {{
              error.statusCode === 404
                ? 'URLが間違っているか、ページが移動または削除された可能性があります。'
                : '予期しないエラーが発生しました。お手数ですが、時間をおいて再度お試しください。'
            }}
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="/" class="btn-cta" @click.prevent="goHome">
              トップページへ戻る
              <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
            <NuxtLink to="/contact" class="text-sm font-bold text-navy underline underline-offset-4">
              お問い合わせはこちら →
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter
      :name="footer.name"
      :description="footer.description"
      :address="footer.address"
      :links="footer.links"
      :related-site="footer.relatedSite"
    />
  </div>
</template>
