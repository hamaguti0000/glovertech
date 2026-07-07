<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

interface Subsidy {
  id: string
  name: string
  org: string
  target: string
  rate: string
  max: number | null
  status: 'open' | 'upcoming' | 'closed'
  aiUse: string
  url: string
  updatedAt: string
}

const subsidies = ref<Subsidy[]>([])

const statusLabel: Record<Subsidy['status'], string> = {
  open: '公募中',
  upcoming: '公募前',
  closed: '終了',
}

const statusClass: Record<Subsidy['status'], string> = {
  open: 'bg-cta text-white',
  upcoming: 'bg-navy text-white',
  closed: 'bg-line text-body',
}

const latestUpdatedAt = computed(() => {
  if (subsidies.value.length === 0) return ''
  return subsidies.value.reduce(
    (latest, item) => (item.updatedAt > latest ? item.updatedAt : latest),
    subsidies.value[0].updatedAt,
  )
})

function formatMax(max: number | null) {
  if (max === null) return '【後で記入】'
  return `${max.toLocaleString('ja-JP')}円`
}

onMounted(async () => {
  const response = await fetch('/subsidies.json')
  subsidies.value = await response.json()
})
</script>

<template>
  <div>
    <div class="mt-5 grid gap-6 sm:grid-cols-3">
      <article
        v-for="item in subsidies"
        :key="item.id"
        class="card flex flex-col"
        :class="item.status === 'closed' ? 'opacity-50' : ''"
      >
        <span
          class="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold"
          :class="statusClass[item.status]"
        >
          {{ statusLabel[item.status] }}
        </span>

        <h3 class="mt-3 text-lg">{{ item.name }}</h3>
        <p class="mt-1 text-sm text-body">{{ item.org }}</p>
        <p class="mt-2 text-sm text-body">{{ item.target }}</p>

        <div class="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p class="text-2xl">
            <span
              v-for="(part, i) in splitNumeric(item.rate)"
              :key="i"
              :class="part.numeric ? 'font-barlow font-bold' : ''"
            >{{ part.text }}</span>
          </p>
          <p class="text-2xl">
            <span
              v-for="(part, i) in splitNumeric(formatMax(item.max))"
              :key="i"
              :class="part.numeric ? 'font-barlow font-bold' : ''"
            >{{ part.text }}</span>
          </p>
        </div>

        <p class="mt-3 flex-1 text-sm leading-[1.9] text-body">{{ item.aiUse }}</p>

        <a
          :href="item.url"
          target="_blank"
          rel="noopener"
          class="mt-4 text-sm font-bold text-navy underline underline-offset-4"
        >
          公式ページ
        </a>
      </article>
    </div>

    <p v-if="latestUpdatedAt" class="mt-6 text-sm text-body">最終更新日: {{ latestUpdatedAt }}</p>
  </div>
</template>
