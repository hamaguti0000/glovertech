<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

defineProps<{
  label: string
  href: string
}>()

const heroCtaVisible = ref(true)
const contactVisible = ref(false)
let heroObserver: IntersectionObserver | null = null
let contactObserver: IntersectionObserver | null = null

onMounted(() => {
  const heroCta = document.getElementById('hero-cta')
  const contactSection = document.getElementById('contact')

  if (heroCta) {
    heroObserver = new IntersectionObserver(([entry]) => {
      heroCtaVisible.value = entry.isIntersecting
    })
    heroObserver.observe(heroCta)
  }

  if (contactSection) {
    contactObserver = new IntersectionObserver(([entry]) => {
      contactVisible.value = entry.isIntersecting
    })
    contactObserver.observe(contactSection)
  }
})

onUnmounted(() => {
  heroObserver?.disconnect()
  contactObserver?.disconnect()
})
</script>

<template>
  <Transition name="sticky-fade">
    <div
      v-if="!heroCtaVisible && !contactVisible"
      class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white p-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:border-none sm:bg-transparent sm:p-0"
    >
      <a :href="href" class="btn-cta w-full justify-center shadow-lg sm:w-auto">
        {{ label }}
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
    </div>
  </Transition>
</template>

<style scoped>
.sticky-fade-enter-active,
.sticky-fade-leave-active {
  transition: opacity 500ms cubic-bezier(0.22, 1, 0.36, 1);
}

.sticky-fade-enter-from,
.sticky-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .sticky-fade-enter-active,
  .sticky-fade-leave-active {
    transition: none;
  }
}
</style>
