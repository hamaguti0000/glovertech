<script setup lang="ts">
import { computed, ref, watch } from 'vue'

// 定数を変更すると図全体(タイトル・棒の幅・金額表示)が自動で追従する
const COST = 600000 // 導入費用（円）
const RATE_NUMERATOR = 2
const RATE_DENOMINATOR = 3
const RATE = RATE_NUMERATOR / RATE_DENOMINATOR // 補助率

const { costManYen, covered: subsidizedManYen, real: selfPayManYen } = calcRealCost(
  COST,
  RATE_NUMERATOR,
  RATE_DENOMINATOR,
)
const rateLabel = `${RATE_NUMERATOR}/${RATE_DENOMINATOR}`

const titleText = `例: 導入費用${costManYen}万円・補助率${rateLabel}の場合`
const totalCostText = `導入費用 ${costManYen}万円`
const subsidizedLabel = '補助金でまかなえる部分'
const selfPayLabel = '実質のご負担'

// viewBoxの幅は実際の描画コンテナ幅に近い値にし、
// SVG内のfont-sizeがほぼ実寸pxとして表示されるようにする
const VIEWBOX_WIDTH_DESKTOP = 580
const VIEWBOX_WIDTH_MOBILE = 320

const yellowWidthDesktop = computed(() => VIEWBOX_WIDTH_DESKTOP * RATE)
const orangeWidthDesktop = computed(() => VIEWBOX_WIDTH_DESKTOP * (1 - RATE))
const yellowCenterDesktop = computed(() => yellowWidthDesktop.value / 2)
const orangeCenterDesktop = computed(() => yellowWidthDesktop.value + orangeWidthDesktop.value / 2)

const yellowWidthMobile = computed(() => VIEWBOX_WIDTH_MOBILE * RATE)
const orangeWidthMobile = computed(() => VIEWBOX_WIDTH_MOBILE * (1 - RATE))
const yellowCenterMobile = computed(() => yellowWidthMobile.value / 2)
const orangeCenterMobile = computed(() => yellowWidthMobile.value + orangeWidthMobile.value / 2)

const ariaLabel = `${titleText}。うち補助金でまかなえる部分が${subsidizedManYen}万円、実質のご負担が${selfPayManYen}万円。`

const { targetEl, revealed, reduceMotion } = useRevealOnce(0.4)
const labelsVisible = ref(true)

watch(revealed, (value) => {
  if (!value) {
    labelsVisible.value = false
    return
  }
  if (reduceMotion) {
    labelsVisible.value = true
    return
  }
  window.setTimeout(() => {
    labelsVisible.value = true
  }, 600)
})
</script>

<template>
  <div ref="targetEl" class="w-full">
    <p class="text-sm" style="color: var(--gray-text)">{{ titleText }}</p>

    <div class="relative mt-4 aspect-[320/230] w-full sm:aspect-[580/100]">
      <!-- デスクトップ: セグメント内にラベルを表示 -->
      <svg
        class="absolute inset-0 hidden h-full w-full sm:block"
        viewBox="0 0 580 100"
        role="img"
        :aria-label="ariaLabel"
      >
        <defs>
          <clipPath id="real-cost-bar-clip-desktop">
            <rect x="0" y="6" width="580" height="48" rx="8" />
          </clipPath>
        </defs>

        <g
          class="bar-scale"
          :style="{ transform: revealed ? 'scaleX(1)' : 'scaleX(0)' }"
        >
          <g clip-path="url(#real-cost-bar-clip-desktop)">
            <rect x="0" y="6" :width="yellowWidthDesktop" height="48" fill="var(--yellow)" />
            <rect :x="yellowWidthDesktop" y="6" :width="orangeWidthDesktop" height="48" fill="var(--orange)" />
          </g>
          <rect :x="yellowWidthDesktop - 1" y="6" width="2" height="48" fill="#ffffff" />
        </g>

        <g class="labels-fade" :class="{ 'labels-fade--visible': labelsVisible }">
          <g class="labels-fade--left">
            <text :x="yellowCenterDesktop" y="24" text-anchor="middle" font-size="14" fill="var(--navy)">{{ subsidizedLabel }}</text>
            <text
              :x="yellowCenterDesktop"
              y="46"
              text-anchor="middle"
              font-size="18"
              font-weight="700"
              font-family="'Barlow Condensed', sans-serif"
              fill="var(--navy)"
            >{{ subsidizedManYen }}万円</text>
          </g>
          <g class="labels-fade--right">
            <text :x="orangeCenterDesktop" y="24" text-anchor="middle" font-size="14" fill="#ffffff">{{ selfPayLabel }}</text>
            <text
              :x="orangeCenterDesktop"
              y="48"
              text-anchor="middle"
              font-size="22"
              font-weight="700"
              font-family="'Barlow Condensed', sans-serif"
              fill="#ffffff"
            >{{ selfPayManYen }}万円</text>
          </g>
        </g>

        <line x1="6" y1="66" x2="6" y2="72" stroke="var(--gray-line)" stroke-width="2" />
        <line x1="574" y1="66" x2="574" y2="72" stroke="var(--gray-line)" stroke-width="2" />
        <line x1="6" y1="72" x2="574" y2="72" stroke="var(--gray-line)" stroke-width="2" />
        <text x="290" y="92" text-anchor="middle" font-size="14" fill="var(--gray-text)">{{ totalCostText }}</text>
      </svg>

      <!-- モバイル: セグメントの下にラベルを引き出し線付きで表示 -->
      <svg
        class="absolute inset-0 block h-full w-full sm:hidden"
        viewBox="0 0 320 230"
        role="img"
        :aria-label="ariaLabel"
      >
        <defs>
          <clipPath id="real-cost-bar-clip-mobile">
            <rect x="0" y="6" width="320" height="40" rx="8" />
          </clipPath>
        </defs>

        <g
          class="bar-scale"
          :style="{ transform: revealed ? 'scaleX(1)' : 'scaleX(0)' }"
        >
          <g clip-path="url(#real-cost-bar-clip-mobile)">
            <rect x="0" y="6" :width="yellowWidthMobile" height="40" fill="var(--yellow)" />
            <rect :x="yellowWidthMobile" y="6" :width="orangeWidthMobile" height="40" fill="var(--orange)" />
          </g>
          <rect :x="yellowWidthMobile - 1" y="6" width="2" height="40" fill="#ffffff" />
        </g>

        <g class="labels-fade" :class="{ 'labels-fade--visible': labelsVisible }">
          <g class="labels-fade--left">
            <line :x1="yellowCenterMobile" y1="46" :x2="yellowCenterMobile" y2="60" stroke="var(--gray-line)" stroke-width="2" />
            <text :x="yellowCenterMobile" y="80" text-anchor="middle" font-size="14" fill="var(--navy)">{{ subsidizedLabel }}</text>
            <text
              :x="yellowCenterMobile"
              y="106"
              text-anchor="middle"
              font-size="20"
              font-weight="700"
              font-family="'Barlow Condensed', sans-serif"
              fill="var(--navy)"
            >{{ subsidizedManYen }}万円</text>
          </g>
          <g class="labels-fade--right">
            <line :x1="orangeCenterMobile" y1="46" :x2="orangeCenterMobile" y2="60" stroke="var(--gray-line)" stroke-width="2" />
            <text :x="orangeCenterMobile" y="80" text-anchor="middle" font-size="14" fill="var(--orange)">{{ selfPayLabel }}</text>
            <text
              :x="orangeCenterMobile"
              y="106"
              text-anchor="middle"
              font-size="22"
              font-weight="700"
              font-family="'Barlow Condensed', sans-serif"
              fill="var(--orange)"
            >{{ selfPayManYen }}万円</text>
          </g>
        </g>

        <line x1="3" y1="140" x2="3" y2="146" stroke="var(--gray-line)" stroke-width="2" />
        <line x1="317" y1="140" x2="317" y2="146" stroke="var(--gray-line)" stroke-width="2" />
        <line x1="3" y1="146" x2="317" y2="146" stroke="var(--gray-line)" stroke-width="2" />
        <text x="160" y="168" text-anchor="middle" font-size="14" fill="var(--gray-text)">{{ totalCostText }}</text>
      </svg>
    </div>

    <p class="mt-3 text-xs" style="color: var(--gray-text)">
      ※金額は一例です。制度・要件・審査により異なります。
    </p>
  </div>
</template>

<style scoped>
.bar-scale {
  transform-box: fill-box;
  transform-origin: left center;
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}

.labels-fade {
  opacity: 0;
}

.labels-fade--visible {
  opacity: 1;
}

.labels-fade--left,
.labels-fade--right {
  transition: opacity 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.labels-fade--visible .labels-fade--left {
  transition-delay: 0ms;
}

.labels-fade--visible .labels-fade--right {
  transition-delay: 100ms;
}

@media (prefers-reduced-motion: reduce) {
  .bar-scale {
    transition: none;
  }

  .labels-fade--left,
  .labels-fade--right {
    transition: none;
  }
}
</style>
