<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

defineProps<{
  name: string
  tagline: string
  ctaLabel: string
  ctaHref: string
}>()

const scrolled = ref(false)
const menuOpen = ref(false)
const route = useRoute()

function handleScroll() {
  scrolled.value = window.scrollY > 4
}

function closeMenu() {
  menuOpen.value = false
}

watch(() => route.fullPath, closeMenu)

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
    class="site-header sticky top-0 z-50 transition-shadow duration-300"
    :class="scrolled ? 'site-header--scrolled shadow-md' : 'bg-white shadow-none'"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <NuxtLink to="/" class="flex items-center gap-2.5 leading-tight" @click="closeMenu">
        <img src="/images/logo-mark.svg" alt="" width="36" height="36" class="h-9 w-9 shrink-0" />
        <span>
          <span class="block text-lg font-bold text-navy">{{ name }}</span>
          <span class="block text-xs text-body">{{ tagline }}</span>
        </span>
      </NuxtLink>

      <div class="flex shrink-0 items-center gap-3 sm:gap-5">
        <NuxtLink to="/services" class="hidden text-sm font-bold text-navy hover:underline sm:inline-block">
          サービス
        </NuxtLink>

        <NuxtLink to="/works" class="hidden text-sm font-bold text-navy hover:underline sm:inline-block">
          実績
        </NuxtLink>

        <NuxtLink to="/articles" class="hidden text-sm font-bold text-navy hover:underline sm:inline-block">
          コラム
        </NuxtLink>

        <a
          :href="ctaHref"
          class="hidden items-center gap-1 rounded-lg bg-cta px-5 py-2.5 text-sm font-bold text-white transition-colors duration-500 ease-reveal hover:bg-cta-dark sm:inline-flex"
        >
          {{ ctaLabel }}
        </a>

        <button
          type="button"
          class="menu-toggle relative flex h-9 w-9 shrink-0 items-center justify-center sm:hidden"
          :aria-expanded="menuOpen"
          aria-label="メニューを開閉する"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-bar" :class="{ 'menu-bar--open': menuOpen }" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="menu-panel">
      <div v-if="menuOpen" class="menu-panel sm:hidden">
        <nav class="flex flex-col gap-1 px-6 py-4">
          <NuxtLink to="/services" class="menu-link">サービス</NuxtLink>
          <NuxtLink to="/works" class="menu-link">実績</NuxtLink>
          <NuxtLink to="/articles" class="menu-link">コラム</NuxtLink>
          <a :href="ctaHref" class="btn-cta mt-3 justify-center">{{ ctaLabel }}</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
/* スクロール時は半透明マテリアルとしてコンテンツの上に浮かせる(Apple Design: Materials) */
.site-header--scrolled {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}

.menu-bar,
.menu-bar::before,
.menu-bar::after {
  position: absolute;
  left: 50%;
  width: 20px;
  height: 2px;
  background: var(--navy);
  transform: translateX(-50%);
  transition:
    transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
    top 350ms cubic-bezier(0.34, 1.56, 0.64, 1),
    background 200ms;
}

.menu-bar {
  top: 50%;
}

.menu-bar::before,
.menu-bar::after {
  content: '';
  top: -6px;
}

.menu-bar::after {
  top: 6px;
}

.menu-bar--open {
  background: transparent;
}

.menu-bar--open::before {
  top: 0;
  transform: translateX(-50%) rotate(45deg);
}

.menu-bar--open::after {
  top: 0;
  transform: translateX(-50%) rotate(-45deg);
}

.menu-panel {
  border-top: 1px solid var(--gray-line);
  border-bottom: 1px solid var(--gray-line);
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
}

.menu-link {
  border-radius: 8px;
  padding: 0.75rem 0.75rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--navy);
  transition: background-color 200ms;
}

.menu-link:hover,
.menu-link:active {
  background: #f5f2ea;
}

.menu-panel-enter-active,
.menu-panel-leave-active {
  transition:
    opacity 300ms cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.menu-panel-enter-from,
.menu-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .site-header--scrolled {
    transition: none;
  }

  .menu-bar,
  .menu-bar::before,
  .menu-bar::after {
    transition: none;
  }

  .menu-panel-enter-active,
  .menu-panel-leave-active {
    transition: opacity 150ms ease;
  }

  .menu-panel-enter-from,
  .menu-panel-leave-to {
    transform: none;
  }
}

@media (prefers-reduced-transparency: reduce) {
  .site-header--scrolled,
  .menu-panel {
    background: #ffffff;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }
}
</style>
