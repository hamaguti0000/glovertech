<script setup lang="ts">
defineProps<{
  name:
    | 'mail'
    | 'notes'
    | 'faq'
    | 'megaphone'
    | 'browser'
    | 'chat'
    | 'edit'
    | 'refresh'
    | 'lock'
    | 'eye'
    | 'search'
    | 'layers'
    | 'calendar'
    | 'checklist'
    | 'send'
    | 'clock'
    | 'check'
    | 'warning'
    | 'receipt'
}>()
</script>

<template>
  <svg class="h-5 w-5 text-navy" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <template v-if="name === 'mail'">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'notes'">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'faq'">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
      <path
        d="M9.5 9.5a2.5 2.5 0 1 1 3.7 2.2c-.7.4-1.2.9-1.2 1.8"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </template>
    <template v-else-if="name === 'megaphone'">
      <path
        d="M3 10v4a1 1 0 0 0 1 1h2l9 4V5L6 9H4a1 1 0 0 0-1 1Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path d="M18 9a4 4 0 0 1 0 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'browser'">
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="M3 8.5h18" stroke="currentColor" stroke-width="1.6" />
      <circle cx="6" cy="6.2" r="0.6" fill="currentColor" />
      <circle cx="8" cy="6.2" r="0.6" fill="currentColor" />
    </template>
    <template v-else-if="name === 'chat'">
      <path
        d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
    </template>
    <template v-else-if="name === 'edit'">
      <path
        d="M4 20h4l10.5-10.5a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L4 16v4Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path d="M13 6.5 17.5 11" stroke="currentColor" stroke-width="1.6" />
    </template>
    <template v-else-if="name === 'refresh'">
      <path
        d="M4 12a8 8 0 0 1 13.66-5.66M20 12a8 8 0 0 1-13.66 5.66"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linecap="round"
      />
      <path d="M17 4v3.5h-3.5M7 20v-3.5h3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'lock'">
      <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'eye'">
      <path
        d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" stroke-width="1.6" />
    </template>
    <template v-else-if="name === 'search'">
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="1.6" />
      <path d="m19 19-3.8-3.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'layers'">
      <path d="m12 3 9 5-9 5-9-5 9-5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
      <path d="m3 13 9 5 9-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="m3 18 9 5 9-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" opacity="0.5" />
    </template>
    <template v-else-if="name === 'calendar'">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'checklist'">
      <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" stroke-width="1.6" />
      <path d="m8 9 1.5 1.5L12 8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14 9h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <path d="m8 15 1.5 1.5L12 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14 15h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'send'">
      <path d="M4 12 20 4l-7 16-2.5-6.5L4 12Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
      <path d="M20 4 10.5 13.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'clock'">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
      <path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'check'">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6" />
      <path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </template>
    <template v-else-if="name === 'warning'">
      <path
        d="M12 4 22 20H2L12 4Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path d="M12 10.5v4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      <circle cx="12" cy="17" r="0.9" fill="currentColor" />
    </template>
    <template v-else-if="name === 'receipt'">
      <path
        d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3Z"
        stroke="currentColor"
        stroke-width="1.6"
        stroke-linejoin="round"
      />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
    </template>
  </svg>
</template>
