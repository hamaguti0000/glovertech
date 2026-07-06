<script setup lang="ts">
import type { Service } from '~/data/site'

defineProps<{
  services: Service[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <h2 class="section-title max-w-xl">ご提供できること</h2>
      <p class="section-lead">
        相談だけで終わらせず、実際に手を動かすところまでお手伝いします。
      </p>

      <div v-if="services.length" class="mt-12 grid gap-6 lg:grid-cols-3">
        <article
          v-reveal
          class="panel flex flex-col justify-between border-lantern-700 lg:col-span-2 lg:p-10"
        >
          <div>
            <h3 class="text-2xl text-paper-100 sm:text-3xl">{{ services[0].title }}</h3>
            <p class="mt-4 max-w-md leading-relaxed text-paper-300">{{ services[0].description }}</p>
          </div>

          <ul class="mt-10 flex flex-wrap gap-3 border-t border-harbor-600 pt-6">
            <li
              v-for="item in services[0].items"
              :key="item"
              class="rounded-sm border border-harbor-600 px-3 py-1.5 text-sm text-paper-300"
            >
              {{ item }}
            </li>
          </ul>
        </article>

        <div class="flex flex-col gap-6">
          <article
            v-for="(service, index) in services.slice(1)"
            :key="service.title"
            v-reveal
            class="panel flex flex-1 flex-col"
            :style="{ '--reveal-delay': `${(index + 1) * 90}ms` }"
          >
            <h3 class="text-xl text-paper-100">{{ service.title }}</h3>
            <p class="mt-3 leading-relaxed text-paper-300">{{ service.description }}</p>

            <ul class="mt-4 space-y-2 border-t border-harbor-600 pt-4">
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
    </div>
  </section>
</template>
