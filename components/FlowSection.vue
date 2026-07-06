<script setup lang="ts">
import type { FlowStep } from '~/data/site'

defineProps<{
  steps: FlowStep[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">進め方</p>
      <h2 class="section-title">3つのステップで進めます</h2>
      <p class="section-lead">
        無料相談とレポートまでは費用がかかりません。ご納得いただけない場合は、そこで終了して構いません。
      </p>

      <ol class="mt-14 space-y-10 border-l border-harbor-600 pl-8">
        <li
          v-for="(step, index) in steps"
          :key="step.step"
          v-reveal
          class="relative"
          :style="{ '--reveal-delay': `${index * 100}ms` }"
        >
          <span
            class="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full border border-lantern-700 bg-harbor-900 font-mono text-sm text-lantern-500"
          >
            {{ step.step }}
          </span>
          <h3 class="text-xl text-paper-100">{{ step.title }}</h3>
          <p class="mt-2 max-w-xl leading-relaxed text-paper-300">{{ step.description }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
