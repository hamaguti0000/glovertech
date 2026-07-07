<script setup lang="ts">
defineProps<{
  name: string
  description: string
  address: string
  links: { label: string; href: string }[]
  relatedSite: { label: string; name: string; href: string }
}>()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-navy text-white">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-10 sm:grid-cols-3">
        <div>
          <p class="text-lg font-bold">{{ name }}</p>
          <p class="mt-3 text-sm leading-[1.9] text-white/80">{{ description }}</p>
          <p class="mt-3 text-sm text-white/80">{{ address }}</p>
        </div>

        <div>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.href">
              <NuxtLink :to="link.href" class="text-sm text-white/80 hover:text-white">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <p class="text-sm text-white/60">{{ relatedSite.label }}</p>
          <a
            :href="relatedSite.href"
            class="mt-2 inline-block text-sm text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            {{ relatedSite.name }}
          </a>
        </div>
      </div>

      <p class="mt-12 border-t border-white/15 pt-6 text-xs text-white/60">
        © {{ year }} {{ name }}
      </p>
    </div>
  </footer>
</template>
