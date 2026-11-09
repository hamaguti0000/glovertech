<script setup lang="ts">
defineProps<{
  items: { name: string; url: string }[]
}>()

function toPath(url: string) {
  try {
    return new URL(url).pathname
  } catch {
    return url
  }
}
</script>

<template>
  <nav aria-label="パンくずリスト" class="border-b border-line bg-surface-alt">
    <div class="section !py-3">
      <ol class="flex flex-wrap items-center gap-1.5 text-xs text-body">
        <li v-for="(item, index) in items" :key="item.url" class="flex items-center gap-1.5">
          <NuxtLink
            v-if="index < items.length - 1"
            :to="toPath(item.url)"
            class="transition-colors hover:text-navy hover:underline"
          >
            {{ item.name }}
          </NuxtLink>
          <span v-else class="font-bold text-navy" aria-current="page">{{ item.name }}</span>
          <span v-if="index < items.length - 1" aria-hidden="true" class="text-line">/</span>
        </li>
      </ol>
    </div>
  </nav>
</template>
