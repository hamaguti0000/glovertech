<script setup lang="ts">
import type { Service } from '~/data/site'

defineProps<{
  services: Service[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <h2 class="section-title">ご提供できること</h2>
      <p class="section-lead">
        相談だけで終わらせず、実際に手を動かすところまでお手伝いします。
      </p>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <article
          v-for="(service, index) in services"
          :key="service.title"
          v-reveal
          class="panel flex flex-col"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <span class="font-mono text-sm text-lantern-500">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3 class="mt-3 text-xl text-paper-100">{{ service.title }}</h3>
          <p class="mt-3 leading-relaxed text-paper-300">{{ service.description }}</p>

          <ul class="mt-6 space-y-2 border-t border-harbor-600 pt-6">
            <li
              v-for="item in service.items"
              :key="item"
              class="flex items-baseline gap-2 text-sm text-paper-300"
            >
              <span class="text-lantern-500">・</span>
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
