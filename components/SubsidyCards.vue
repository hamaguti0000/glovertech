<script setup lang="ts">
import { computed } from 'vue'

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

const { data: subsidies, error } = await useFetch<Subsidy[]>('/api/subsidies', {
  default: () => [] as Subsidy[],
})

const statusLabel: Record<Subsidy['status'], string> = {
  open: '公募中',
  upcoming: '公募前',
  closed: '終了',
}

const statusClass: Record<Subsidy['status'], string> = {
  open: 'bg-gold text-white',
  upcoming: 'border border-navy/30 bg-white text-navy',
  closed: 'bg-line text-body',
}

const latestUpdatedAt = computed(() => {
  const list = subsidies.value ?? []
  if (list.length === 0) return ''
  return list.reduce((latest, item) => (item.updatedAt > latest ? item.updatedAt : latest), list[0].updatedAt)
})

function formatMax(max: number) {
  return `${max.toLocaleString('ja-JP')}円`
}
</script>

<template>
  <div>
    <p v-if="error" class="mt-5 rounded-lg border border-line bg-white p-5 text-sm text-body">
      補助金情報は現在準備中です。最新情報は補助金ナビ 長崎をご覧ください
    </p>

    <template v-else>
      <div class="mt-5 grid gap-6 sm:grid-cols-3">
        <article
          v-for="item in subsidies"
          :key="item.id"
          v-tilt
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
            <p v-if="item.max !== null" class="text-2xl">
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
    </template>
  </div>
</template>
