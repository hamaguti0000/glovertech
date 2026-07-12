<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const COST_MIN = 100000
const COST_MAX = 1000000
const COST_STEP = 100000
const COST_DEFAULT = 600000

const RATE_OPTIONS = [
  { numerator: 1, denominator: 2, label: '1/2' },
  { numerator: 2, denominator: 3, label: '2/3' },
] as const

const cost = ref(COST_DEFAULT)
const selectedRateIndex = ref(1)
const rateButtonRefs = ref<HTMLButtonElement[]>([])

const selectedRate = computed(() => RATE_OPTIONS[selectedRateIndex.value])
const costManYen = computed(() => cost.value / 10000)
const costLabel = computed(() => formatManYen(costManYen.value))

const result = computed(() => calcRealCost(cost.value, selectedRate.value.numerator, selectedRate.value.denominator))
const coveredLabel = computed(() => formatManYen(result.value.covered))

const displayedReal = ref(result.value.real)
const displayedRealLabel = computed(() => formatManYen(displayedReal.value))

let reduceMotion = false
let rafId: number | null = null

function animateRealTo(target: number) {
  if (rafId !== null) cancelAnimationFrame(rafId)
  const start = displayedReal.value
  const duration = 300
  const startTime = performance.now()

  function tick(now: number) {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    const eased = 1 - (1 - t) ** 3
    displayedReal.value = Math.round((start + (target - start) * eased) * 10) / 10
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    } else {
      displayedReal.value = target
      rafId = null
    }
  }
  rafId = requestAnimationFrame(tick)
}

watch(
  () => result.value.real,
  (newValue) => {
    if (reduceMotion) {
      displayedReal.value = newValue
    } else {
      animateRealTo(newValue)
    }
  },
)

onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})

function selectRate(index: number) {
  selectedRateIndex.value = index
}

function focusRateButton(index: number) {
  rateButtonRefs.value[index]?.focus()
}

function onRateKeydown(event: KeyboardEvent, index: number) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    event.preventDefault()
    const next = (index + 1) % RATE_OPTIONS.length
    selectRate(next)
    focusRateButton(next)
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    event.preventDefault()
    const prev = (index - 1 + RATE_OPTIONS.length) % RATE_OPTIONS.length
    selectRate(prev)
    focusRateButton(prev)
  }
}

function scrollToContact() {
  const contactEl = document.getElementById('contact')
  if (!contactEl) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  contactEl.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <div class="rounded-lg border border-line bg-white p-5">
    <h3 class="text-lg">実質負担をためしに計算してみる</h3>

    <div class="mt-5">
      <label for="cost-range" class="text-sm text-body">導入にかけられる費用</label>
      <p class="mt-1 text-[28px] font-bold" style="color: var(--navy)">
        <span
          v-for="(part, i) in splitNumeric(costLabel)"
          :key="i"
          :class="part.numeric ? 'font-barlow' : ''"
        >{{ part.text }}</span>
      </p>

      <input
        id="cost-range"
        v-model.number="cost"
        type="range"
        :min="COST_MIN"
        :max="COST_MAX"
        :step="COST_STEP"
        class="range-input mt-3 w-full"
        aria-label="導入にかけられる費用"
        :aria-valuetext="costLabel"
      />
      <div class="mt-1 flex justify-between text-xs" style="color: var(--gray-text)">
        <span>10万</span>
        <span>50万</span>
        <span>100万</span>
      </div>
    </div>

    <div class="mt-6">
      <span class="text-sm text-body">補助率</span>
      <div role="radiogroup" aria-label="補助率" class="mt-2 inline-flex overflow-hidden rounded-lg border border-line">
        <button
          v-for="(option, index) in RATE_OPTIONS"
          :key="option.label"
          ref="rateButtonRefs"
          type="button"
          role="radio"
          :aria-checked="selectedRateIndex === index"
          :tabindex="selectedRateIndex === index ? 0 : -1"
          class="px-6 py-2 text-sm font-bold transition-colors duration-500 ease-reveal"
          :class="[
            selectedRateIndex === index ? 'bg-navy text-white' : 'bg-white text-navy',
            index > 0 ? 'border-l border-line' : '',
          ]"
          @click="selectRate(index)"
          @keydown="onRateKeydown($event, index)"
        >
          {{ option.label }}
        </button>
      </div>
    </div>

    <div class="mt-6">
      <p class="text-sm text-body">実質負担の目安</p>
      <p aria-live="polite" class="mt-1 text-[32px] font-bold" style="color: var(--orange)">
        <span class="inline-block min-w-[7ch]">
          <span
            v-for="(part, i) in splitNumeric(displayedRealLabel)"
            :key="i"
            :class="part.numeric ? 'font-barlow' : ''"
          >{{ part.text }}</span>
        </span>
      </p>
      <p class="mt-1 text-xs text-body">補助金でまかなえる部分: {{ coveredLabel }}</p>
    </div>

    <p class="mt-4 text-xs" style="color: var(--gray-text)">
      ※あくまで目安です。対象になるか・補助率は制度と審査によって決まります。詳しくは無料相談でご確認ください。
    </p>

    <a href="#contact" class="btn-cta mt-4 inline-flex" @click.prevent="scrollToContact">
      無料相談で確認する
      <svg class="btn-arrow h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.range-input {
  height: 44px;
  background: transparent;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
}

.range-input::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 10px;
  background: var(--gray-line);
}

.range-input::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  margin-top: -11px;
  border-radius: 50%;
  background: var(--navy);
  cursor: pointer;
}

.range-input::-moz-range-track {
  height: 6px;
  border-radius: 10px;
  background: var(--gray-line);
}

.range-input::-moz-range-thumb {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: var(--navy);
  cursor: pointer;
}
</style>
