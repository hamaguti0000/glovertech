<script setup lang="ts">
const timelineSteps = [
  { label: '公募要領確認', icon: 'search' as const },
  { label: '書類準備', icon: 'notes' as const },
  { label: '申請', icon: 'send' as const },
  { label: '審査・交付決定', icon: 'clock' as const },
  { label: '事業実施', icon: 'check' as const },
  { label: '実績報告', icon: 'receipt' as const },
]
</script>

<template>
  <div class="my-8 rounded-lg border border-line bg-surface-alt p-6 sm:p-8">
    <!-- モバイル: 縦並び -->
    <ol class="space-y-4 sm:hidden">
      <li v-for="(step, index) in timelineSteps" :key="step.label" class="flex items-center gap-3">
        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-white">
          <ArticleIcon :name="step.icon" />
        </span>
        <p class="text-sm font-bold text-navy">{{ index + 1 }}. {{ step.label }}</p>
      </li>
    </ol>

    <!-- sm以上: 横並び -->
    <div class="hidden items-start justify-between sm:flex">
      <template v-for="(step, index) in timelineSteps" :key="step.label">
        <div class="flex flex-1 flex-col items-center text-center">
          <span class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-navy bg-white">
            <ArticleIcon :name="step.icon" />
          </span>
          <p class="mt-2 text-xs font-bold leading-snug text-navy">{{ step.label }}</p>
        </div>
        <div v-if="index < timelineSteps.length - 1" class="mt-5 h-0.5 flex-1 bg-line" aria-hidden="true" />
      </template>
    </div>

    <p class="mt-6 text-xs leading-relaxed text-body">
      ※ 交付決定の通知が届くまでは、対象の取り組みに着手できない制度が多いので注意してください。
    </p>
  </div>
</template>
