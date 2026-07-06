<script setup lang="ts">
defineProps<{
  name: string
  role: string
  description: string
  meetingHours: string
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">運営者プロフィール</p>

      <div v-reveal class="mt-8 grid gap-10 sm:grid-cols-[auto,1fr]">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full border border-lantern-700 font-display text-2xl text-lantern-500"
          aria-hidden="true"
        >
          長崎
        </div>

        <div>
          <h2 class="text-2xl text-paper-100">{{ name }}</h2>
          <p class="mt-1 text-sm text-paper-300">{{ role }}</p>
          <p class="mt-5 max-w-2xl leading-relaxed text-paper-300">{{ description }}</p>
          <p class="mt-5 inline-block rounded-sm border border-harbor-600 px-4 py-2 font-mono text-xs text-paper-300">
            {{ meetingHours }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
