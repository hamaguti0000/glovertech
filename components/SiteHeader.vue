<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  name: string
  tagline: string
  ctaLabel: string
  ctaHref: string
}>()

const scrolled = ref(false)

function handleScroll() {
  scrolled.value = window.scrollY > 4
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-white transition-shadow duration-300"
    :class="scrolled ? 'shadow-md' : 'shadow-none'"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <NuxtLink to="/" class="flex items-center gap-2.5 leading-tight">
        <img src="/images/logo-mark.svg" alt="" width="36" height="36" class="h-9 w-9 shrink-0" />
        <span>
          <span class="block text-lg font-bold text-navy">{{ name }}</span>
          <span class="block text-xs text-body">{{ tagline }}</span>
        </span>
      </NuxtLink>

      <div class="flex shrink-0 items-center gap-5">
        <NuxtLink
          to="/works"
          class="hidden text-sm font-bold text-navy hover:underline sm:inline-block"
        >
          実績
        </NuxtLink>

        <NuxtLink
          to="/articles"
          class="hidden text-sm font-bold text-navy hover:underline sm:inline-block"
        >
          コラム
        </NuxtLink>

        <a
          :href="ctaHref"
          class="inline-flex items-center gap-1 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-white transition-colors duration-500 ease-reveal hover:bg-cta-dark"
        >
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </header>
</template>
