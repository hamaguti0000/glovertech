<script setup lang="ts">
withDefaults(defineProps<{ size?: number }>(), { size: 80 })
</script>

<template>
  <div class="relative inline-flex shrink-0 items-center justify-center" :style="{ width: `${size}px`, height: `${size}px` }">
    <span class="pulse-ring pulse-ring--navy absolute inset-0 rounded-full" aria-hidden="true" />
    <span class="pulse-ring pulse-ring--gold absolute inset-0 rounded-full" aria-hidden="true" />
    <div
      class="relative flex h-full w-full items-center justify-center rounded-full border border-gold/25 bg-white/95 shadow-[0_24px_60px_-18px_rgba(20,33,61,0.5),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm"
    >
      <img src="/images/logo-mark.svg" alt="" class="h-1/2 w-1/2" />
    </div>
  </div>
</template>

<style scoped>
.pulse-ring {
  animation: pulse-ring 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.pulse-ring--navy {
  border: 2px solid rgba(20, 33, 61, 0.35);
}

.pulse-ring--gold {
  border: 2px solid rgba(192, 138, 46, 0.6);
  animation-delay: 1.3s;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.92);
    opacity: 0.7;
  }
  100% {
    transform: scale(1.45);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pulse-ring {
    animation: none;
    opacity: 0;
  }
}
</style>
