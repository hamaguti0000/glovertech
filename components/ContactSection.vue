<script setup lang="ts">
import { ref } from 'vue'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const props = defineProps<{
  heading: string
  description: string
  formspreeEndpoint: string
  label: string
}>()

const name = ref('')
const company = ref('')
const email = ref('')
const inquiryType = ref('')
const message = ref('')
const status = ref<SubmitStatus>('idle')

async function handleSubmit() {
  status.value = 'sending'

  try {
    const response = await fetch(props.formspreeEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        company: company.value,
        email: email.value,
        inquiryType: inquiryType.value,
        message: message.value,
      }),
    })

    if (!response.ok) throw new Error('submit failed')

    status.value = 'sent'
    name.value = ''
    company.value = ''
    email.value = ''
    inquiryType.value = ''
    message.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="border-b border-line">
    <div class="section max-w-2xl">
      <span class="section-label">{{ label }}</span>
      <h2 v-reveal class="section-title">{{ heading }}</h2>
      <p class="section-lead">{{ description }}</p>

      <form class="mt-10 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="text-sm text-body">お名前 <span class="text-navy">*</span></label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            required
            :disabled="status === 'sending'"
            class="field-input mt-2 disabled:opacity-50"
          >
        </div>

        <div>
          <label for="company" class="text-sm text-body">会社名</label>
          <input
            id="company"
            v-model="company"
            type="text"
            name="company"
            :disabled="status === 'sending'"
            class="field-input mt-2 disabled:opacity-50"
          >
        </div>

        <div>
          <label for="email" class="text-sm text-body">メールアドレス <span class="text-navy">*</span></label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            required
            :disabled="status === 'sending'"
            class="field-input mt-2 disabled:opacity-50"
          >
        </div>

        <div>
          <label for="inquiryType" class="text-sm text-body">相談種別 <span class="text-navy">*</span></label>
          <select
            id="inquiryType"
            v-model="inquiryType"
            name="inquiryType"
            required
            :disabled="status === 'sending'"
            class="field-input mt-2 disabled:opacity-50"
          >
            <option value="" disabled>相談種別を選択してください</option>
            <option value="無料相談を希望">無料相談を希望</option>
            <option value="Web制作・IT運用について相談">Web制作・IT運用について相談</option>
            <option value="その他のお問い合わせ">その他のお問い合わせ</option>
          </select>
        </div>

        <div>
          <label for="message" class="text-sm text-body">相談内容</label>
          <textarea
            id="message"
            v-model="message"
            name="message"
            rows="5"
            :disabled="status === 'sending'"
            class="field-input mt-2 disabled:opacity-50"
          />
        </div>

        <button type="submit" class="btn-cta w-full sm:w-auto" :disabled="status === 'sending'">
          {{ status === 'sending' ? '送信中…' : '送信する' }}
          <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <p v-if="status === 'sent'" class="flex items-center gap-2 text-sm text-navy">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M7 12l3 3 7-7"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-dasharray="14"
              stroke-dashoffset="0"
              style="animation: draw-check 500ms cubic-bezier(0.22, 1, 0.36, 1)"
            />
          </svg>
          お問い合わせありがとうございます。内容を確認のうえ、ご連絡いたします。
        </p>
        <p v-if="status === 'error'" class="text-sm text-navy">
          送信に失敗しました。お手数ですが、時間をおいて再度お試しください。
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped>
@keyframes draw-check {
  from {
    stroke-dashoffset: 14;
  }
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  svg path[style] {
    animation: none !important;
  }
}
</style>
