<script setup lang="ts">
import { ref } from 'vue'

type SubmitStatus = 'idle' | 'sending' | 'sent' | 'error'

const props = defineProps<{
  heading: string
  description: string
  formspreeEndpoint: string
}>()

const name = ref('')
const company = ref('')
const email = ref('')
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
        message: message.value,
      }),
    })

    if (!response.ok) throw new Error('submit failed')

    status.value = 'sent'
    name.value = ''
    company.value = ''
    email.value = ''
    message.value = ''
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="border-b border-harbor-700">
    <div class="section max-w-2xl">
      <h2 class="section-title">{{ heading }}</h2>
      <p class="section-lead">{{ description }}</p>

      <form class="mt-10 space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="name" class="text-sm text-paper-300">お名前 <span class="text-lantern-500">*</span></label>
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            required
            :disabled="status === 'sending'"
            class="mt-2 w-full rounded-sm border border-harbor-600 bg-harbor-800/60 px-4 py-3 text-paper-100 outline-none transition-colors focus:border-lantern-500 disabled:opacity-50"
          >
        </div>

        <div>
          <label for="company" class="text-sm text-paper-300">会社名</label>
          <input
            id="company"
            v-model="company"
            type="text"
            name="company"
            :disabled="status === 'sending'"
            class="mt-2 w-full rounded-sm border border-harbor-600 bg-harbor-800/60 px-4 py-3 text-paper-100 outline-none transition-colors focus:border-lantern-500 disabled:opacity-50"
          >
        </div>

        <div>
          <label for="email" class="text-sm text-paper-300">メールアドレス <span class="text-lantern-500">*</span></label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            required
            :disabled="status === 'sending'"
            class="mt-2 w-full rounded-sm border border-harbor-600 bg-harbor-800/60 px-4 py-3 text-paper-100 outline-none transition-colors focus:border-lantern-500 disabled:opacity-50"
          >
        </div>

        <div>
          <label for="message" class="text-sm text-paper-300">相談内容</label>
          <textarea
            id="message"
            v-model="message"
            name="message"
            rows="5"
            :disabled="status === 'sending'"
            class="mt-2 w-full rounded-sm border border-harbor-600 bg-harbor-800/60 px-4 py-3 text-paper-100 outline-none transition-colors focus:border-lantern-500 disabled:opacity-50"
          />
        </div>

        <button type="submit" class="btn-primary w-full sm:w-auto" :disabled="status === 'sending'">
          {{ status === 'sending' ? '送信中…' : '無料相談を申し込む' }}
        </button>

        <p v-if="status === 'sent'" class="text-sm text-lantern-500">
          お問い合わせありがとうございます。内容を確認のうえ、ご連絡いたします。
        </p>
        <p v-if="status === 'error'" class="text-sm text-red-400">
          送信に失敗しました。お手数ですが、時間をおいて再度お試しください。
        </p>
      </form>
    </div>
  </section>
</template>
