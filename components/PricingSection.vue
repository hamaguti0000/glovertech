<script setup lang="ts">
import type { Plan } from '~/data/site'

defineProps<{
  plans: Plan[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">料金</p>
      <h2 class="section-title">料金表</h2>
      <p class="section-lead">まずは無料相談から。ご納得いただいた範囲でのみ、次のステップに進みます。</p>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(plan, index) in plans"
          :key="plan.name"
          v-reveal
          class="panel flex flex-col"
          :class="index === 0 ? 'border-lantern-700' : ''"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <h3 class="text-lg text-paper-100">{{ plan.name }}</h3>
          <p class="mt-4 font-mono text-2xl text-lantern-500">{{ plan.price }}</p>
          <p class="mt-4 flex-1 text-sm leading-relaxed text-paper-300">{{ plan.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
