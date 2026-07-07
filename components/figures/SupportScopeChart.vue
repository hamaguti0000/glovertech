<script setup lang="ts">
import { computed } from 'vue'

interface Stage {
  title: string
  descLines: string[]
}

// 文言は指定のまま。descLinesは表示上の改行位置のみを分割したもの
// (連結すると元の文言と完全に一致する)
const stages: Stage[] = [
  { title: '相談', descLines: ['現状の困りごとを', '整理'] },
  { title: '補助金の確認', descLines: ['使えそうな制度を', '一緒に確認'] },
  { title: '導入', descLines: ['ツール設定・', '自動化の実装'] },
  { title: '定着', descLines: ['使い続けられるまで', '運用をサポート'] },
]

const scopeLabel = '相談から定着まで、私が伴走する範囲'

const ariaLabel = `支援の流れ: ${stages.map((s) => s.title).join('→')}。${scopeLabel}を示す図。`

function segmentPoints(index: number, total: number, segWidth: number, height: number, notch: number) {
  const x0 = index * segWidth
  const x1 = x0 + segWidth
  const isFirst = index === 0
  const isLast = index === total - 1

  const points: string[] = [`${x0},0`, `${x1},0`]
  if (!isLast) points.push(`${x1 + notch},${height / 2}`)
  points.push(`${x1},${height}`, `${x0},${height}`)
  if (!isFirst) points.push(`${x0 + notch},${height / 2}`)
  return points.join(' ')
}

// viewBoxの幅は実際の描画コンテナ幅に近い値にし、
// SVG内のfont-sizeがほぼ実寸pxとして表示されるようにする
const DESKTOP_VIEWBOX_WIDTH = 580
const desktopSegW = DESKTOP_VIEWBOX_WIDTH / 4
const desktopHeight = 90
const desktopNotch = 20

const desktopSegments = computed(() =>
  stages.map((stage, index) => ({
    stage,
    center: index * desktopSegW + desktopSegW / 2,
    points: segmentPoints(index, stages.length, desktopSegW, desktopHeight, desktopNotch),
  })),
)

const desktopLineLength = DESKTOP_VIEWBOX_WIDTH
const DESKTOP_VIEWBOX_HEIGHT = 104

const MOBILE_VIEWBOX_WIDTH = 320
const mobileLineX = 20
const mobileLineTop = 15
const mobileEntrySpacing = 50
const mobileEntryStartY = 30
const mobileLineBottom = mobileEntryStartY + (stages.length - 1) * mobileEntrySpacing + 15
const mobileLineLength = mobileLineBottom - mobileLineTop
const MOBILE_VIEWBOX_HEIGHT = mobileLineBottom + 15

const mobileEntries = computed(() =>
  stages.map((stage, index) => ({
    stage,
    y: mobileEntryStartY + index * mobileEntrySpacing,
  })),
)

const { targetEl, revealed } = useRevealOnce(0.4)
</script>

<template>
  <div ref="targetEl" class="w-full">
    <p class="text-sm font-bold" style="color: var(--navy)">{{ scopeLabel }}</p>

    <div class="relative mt-3 aspect-[320/210] w-full sm:aspect-[580/104]">
      <!-- デスクトップ: 4区間を横一列のシェブロン帯で表示 -->
      <svg
        class="absolute inset-0 hidden h-full w-full sm:block"
        :viewBox="`0 0 ${DESKTOP_VIEWBOX_WIDTH} ${DESKTOP_VIEWBOX_HEIGHT}`"
        role="img"
        :aria-label="ariaLabel"
      >
        <g v-for="item in desktopSegments" :key="item.stage.title">
          <polygon :points="item.points" fill="#ffffff" stroke="var(--gray-line)" stroke-width="1" />
          <text :x="item.center" y="38" text-anchor="middle" font-size="16" font-weight="700" fill="var(--navy)">
            {{ item.stage.title }}
          </text>
          <text :x="item.center" y="62" text-anchor="middle" font-size="13" fill="var(--gray-text)">
            <tspan :x="item.center" dy="0">{{ item.stage.descLines[0] }}</tspan>
            <tspan :x="item.center" dy="16">{{ item.stage.descLines[1] }}</tspan>
          </text>
        </g>

        <line
          x1="0"
          y1="98"
          :x2="desktopLineLength"
          y2="98"
          stroke="var(--navy)"
          stroke-width="3"
          stroke-linecap="round"
          :stroke-dasharray="desktopLineLength"
          :style="{ strokeDashoffset: revealed ? 0 : desktopLineLength }"
          class="scope-line"
        />
      </svg>

      <!-- モバイル: 縦積みのタイムライン表示 -->
      <svg
        class="absolute inset-0 block h-full w-full sm:hidden"
        :viewBox="`0 0 ${MOBILE_VIEWBOX_WIDTH} ${MOBILE_VIEWBOX_HEIGHT}`"
        role="img"
        :aria-label="ariaLabel"
      >
        <line
          :x1="mobileLineX"
          :y1="mobileLineTop"
          :x2="mobileLineX"
          :y2="mobileLineBottom"
          stroke="var(--navy)"
          stroke-width="3"
          stroke-linecap="round"
          :stroke-dasharray="mobileLineLength"
          :style="{ strokeDashoffset: revealed ? 0 : mobileLineLength }"
          class="scope-line"
        />

        <g v-for="item in mobileEntries" :key="item.stage.title">
          <circle :cx="mobileLineX" :cy="item.y" r="6" fill="#ffffff" stroke="var(--navy)" stroke-width="3" />
          <text x="40" :y="item.y - 4" font-size="16" font-weight="700" fill="var(--navy)">{{ item.stage.title }}</text>
          <text x="40" :y="item.y + 16" font-size="13" fill="var(--gray-text)">
            {{ item.stage.descLines.join('') }}
          </text>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.scope-line {
  transition: stroke-dashoffset 800ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .scope-line {
    transition: none;
  }
}
</style>
