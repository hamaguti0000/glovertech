<script setup lang="ts">
import type { Problem } from '~/data/site'

defineProps<{
  problems: Problem[]
}>()
</script>

<template>
  <section class="border-b border-harbor-700">
    <div class="section">
      <p class="section-eyebrow">こんな困りごと、ありませんか</p>
      <h2 class="section-title">日々の業務で、こんなことが起きていませんか</h2>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <article
          v-for="(problem, index) in problems"
          :key="problem.title"
          v-reveal
          class="panel"
          :style="{ '--reveal-delay': `${index * 90}ms` }"
        >
          <h3 class="text-xl text-paper-100">{{ problem.title }}</h3>
          <p class="mt-3 leading-relaxed text-paper-300">{{ problem.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
