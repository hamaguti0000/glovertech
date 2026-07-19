<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

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

const touched = reactive({ name: false, email: false, inquiryType: false })

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const errors = computed(() => ({
  name: name.value.trim() === '' ? 'お名前を入力してください。' : '',
  email:
    email.value.trim() === ''
      ? 'メールアドレスを入力してください。'
      : !emailPattern.test(email.value)
        ? 'メールアドレスの形式が正しくありません。'
        : '',
  inquiryType: inquiryType.value === '' ? '相談種別を選択してください。' : '',
}))

function markTouched(field: keyof typeof touched) {
  touched[field] = true
}

async function handleSubmit() {
  touched.name = true
  touched.email = true
  touched.inquiryType = true
  if (errors.value.name || errors.value.email || errors.value.inquiryType) return

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
    touched.name = false
    touched.email = false
    touched.inquiryType = false
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
            :aria-invalid="touched.name && !!errors.name"
            aria-describedby="name-error"
            class="field-input mt-2 disabled:opacity-50"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/10': touched.name && errors.name }"
            @blur="markTouched('name')"
          >
          <p v-if="touched.name && errors.name" id="name-error" class="mt-1.5 text-xs text-red-600">
            {{ errors.name }}
          </p>
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
            :aria-invalid="touched.email && !!errors.email"
            aria-describedby="email-error"
            class="field-input mt-2 disabled:opacity-50"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/10': touched.email && errors.email }"
            @blur="markTouched('email')"
          >
          <p v-if="touched.email && errors.email" id="email-error" class="mt-1.5 text-xs text-red-600">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label for="inquiryType" class="text-sm text-body">相談種別 <span class="text-navy">*</span></label>
          <select
            id="inquiryType"
            v-model="inquiryType"
            name="inquiryType"
            required
            :disabled="status === 'sending'"
            :aria-invalid="touched.inquiryType && !!errors.inquiryType"
            aria-describedby="inquiryType-error"
            class="field-input mt-2 disabled:opacity-50"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500/10': touched.inquiryType && errors.inquiryType }"
            @blur="markTouched('inquiryType')"
          >
            <option value="" disabled>相談種別を選択してください</option>
            <option value="無料相談を希望">無料相談を希望</option>
            <option value="Web制作・IT運用について相談">Web制作・IT運用について相談</option>
            <option value="その他のお問い合わせ">その他のお問い合わせ</option>
          </select>
          <p v-if="touched.inquiryType && errors.inquiryType" id="inquiryType-error" class="mt-1.5 text-xs text-red-600">
            {{ errors.inquiryType }}
          </p>
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
          <svg
            v-if="status === 'sending'"
            class="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-90" d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          </svg>
          {{ status === 'sending' ? '送信中…' : '送信する' }}
          <svg v-if="status !== 'sending'" class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
        <p v-if="status === 'error'" class="flex items-center gap-2 text-sm text-red-600">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
            <path d="M12 8v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
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
