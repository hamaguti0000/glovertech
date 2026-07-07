<script setup lang="ts">
import type { Service } from '~/data/site'

defineProps<{
  services: Service[]
  label: string
}>()
</script>

<template>
  <section class="border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title max-w-xl">ご提供できること</h2>
      <p class="section-lead">
        相談だけで終わらせず、実際に手を動かすところまでお手伝いします。
      </p>

      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <article v-for="service in services" :key="service.title" class="card flex flex-col">
          <h3 class="text-lg text-navy">{{ service.title }}</h3>
          <p class="mt-3 text-base leading-[1.9] text-body">{{ service.description }}</p>

          <ul class="mt-4 space-y-2 border-t border-line pt-4">
            <li
              v-for="item in service.items"
              :key="item"
              class="flex items-baseline gap-2 text-sm text-body"
            >
              <span>・</span>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
