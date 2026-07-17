<script setup lang="ts">
defineProps<{
  label: string
  body: string[]
  linkLabel: string
  linkHref: string
}>()
</script>

<template>
  <section class="border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>

      <div class="mt-8 grid gap-10 sm:grid-cols-[auto,1fr]">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-surface-alt"
          aria-hidden="true"
        >
          <img src="/images/logo-mark.svg" alt="" width="40" height="40" class="h-10 w-10" />
        </div>

        <div class="max-w-2xl">
          <h2 v-reveal class="text-3xl">グラバーテックについて</h2>

          <p v-for="paragraph in body" :key="paragraph" class="mt-3 text-base leading-[1.9] text-body">
            {{ paragraph }}
          </p>

          <NuxtLink :to="linkHref" class="mt-4 inline-block text-sm font-bold text-navy underline underline-offset-4">
            {{ linkLabel }} →
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
