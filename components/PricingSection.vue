<script setup lang="ts">
import type { Plan } from '~/data/site'

defineProps<{
  plans: Plan[]
}>()
</script>

<template>
  <section class="border-b border-line">
    <div class="section">
      <h2 v-reveal class="section-title">料金表</h2>
      <p class="section-lead">まずは無料相談から。ご納得いただいた範囲でのみ、次のステップに進みます。</p>

      <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="plan in plans" :key="plan.name" class="card flex flex-col">
          <h3 class="text-base text-heading">{{ plan.name }}</h3>
          <p class="mt-3 text-2xl text-heading">{{ plan.price }}</p>
          <p class="mt-3 flex-1 text-sm leading-[1.9] text-body">{{ plan.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
