<script setup lang="ts">
import type { Problem } from '~/data/site'

defineProps<{
  problems: Problem[]
  label: string
}>()

const illustrations = [
  { src: '/images/problem-manual-work.png', alt: '書類の山とパソコンを前に困っている人のイラスト' },
  { src: '/images/problem-inquiries.png', alt: '電話とメールの対応に追われ困っている人のイラスト' },
  { src: '/images/problem-ai-confusion.png', alt: 'AI活用について悩んでいる人のイラスト' },
]
</script>

<template>
  <section class="section-alt border-b border-line">
    <div class="section">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title max-w-xl">日々の業務で、こんなことが起きていませんか</h2>

      <div class="mt-10 grid gap-6 sm:grid-cols-3">
        <article
          v-for="(problem, index) in problems"
          :key="problem.title"
          v-reveal
          class="card"
          :style="{ '--reveal-delay': `${index * 100}ms` }"
        >
          <div class="illustration-slot mb-4">
            <img
              :src="illustrations[index].src"
              :alt="illustrations[index].alt"
              width="1254"
              height="1254"
              loading="lazy"
              class="h-full w-full object-contain"
            />
          </div>
          <h3 class="text-xl">{{ problem.title }}</h3>
          <p class="mt-3 text-base leading-[1.9] text-body">{{ problem.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
