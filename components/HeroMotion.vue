<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface Node {
  x: number
  y: number
  targetX: number
  targetY: number
  startX: number
  startY: number
  color: string
  radius: number
  phase: number
}

const canvasEl = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let nodes: Node[] = []
let rafId: number | null = null
let resizeObserver: ResizeObserver | null = null
let size = 0
let dpr = 1
let reduceMotion = false
let animationStart = 0

const COLORS = ['#223A70', '#223A70', '#223A70', '#FF7A1A', '#FFD338']
const DURATION = 1400
const LOOP_DURATION = 2600
const EASE = (t: number) => 1 - (1 - t) ** 3
const EASE_IN_OUT = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)

// 正規化座標(0〜1)によるチェックマークの経路。散らばった点がここへ収束する
const CHECK_PATH: [number, number][] = [
  [0.18, 0.52],
  [0.24, 0.58],
  [0.3, 0.64],
  [0.36, 0.7],
  [0.42, 0.76],
  [0.48, 0.7],
  [0.54, 0.6],
  [0.6, 0.5],
  [0.66, 0.4],
  [0.72, 0.3],
  [0.78, 0.22],
  [0.84, 0.16],
]

let pathPoints: { x: number; y: number }[] = []
let cumulativeLengths: number[] = []
let totalLength = 0

function buildPath() {
  pathPoints = CHECK_PATH.map(([nx, ny]) => ({ x: nx * size, y: ny * size }))
  cumulativeLengths = [0]
  totalLength = 0
  for (let i = 1; i < pathPoints.length; i++) {
    const dx = pathPoints[i].x - pathPoints[i - 1].x
    const dy = pathPoints[i].y - pathPoints[i - 1].y
    totalLength += Math.hypot(dx, dy)
    cumulativeLengths.push(totalLength)
  }
}

// t(0〜1)に応じて経路上の座標を線形補間で返す
function pointOnPath(t: number) {
  const target = t * totalLength
  for (let i = 1; i < pathPoints.length; i++) {
    if (target <= cumulativeLengths[i]) {
      const segLength = cumulativeLengths[i] - cumulativeLengths[i - 1]
      const segT = segLength === 0 ? 0 : (target - cumulativeLengths[i - 1]) / segLength
      const a = pathPoints[i - 1]
      const b = pathPoints[i]
      return { x: a.x + (b.x - a.x) * segT, y: a.y + (b.y - a.y) * segT }
    }
  }
  return pathPoints[pathPoints.length - 1]
}

function buildNodes() {
  nodes = CHECK_PATH.map(([nx, ny], i) => {
    const targetX = nx * size
    const targetY = ny * size
    const angle = Math.random() * Math.PI * 2
    const distance = size * (0.35 + Math.random() * 0.25)
    return {
      x: targetX,
      y: targetY,
      targetX,
      targetY,
      startX: targetX + Math.cos(angle) * distance,
      startY: targetY + Math.sin(angle) * distance,
      color: COLORS[i % COLORS.length],
      radius: 3 + Math.random() * 2.5,
      phase: Math.random() * Math.PI * 2,
    }
  })
}

function draw(elapsed: number, reduceMotion: boolean) {
  if (!ctx) return
  ctx.clearRect(0, 0, size, size)

  const t = reduceMotion ? 1 : Math.min(elapsed / DURATION, 1)
  const eased = EASE(t)

  ctx.strokeStyle = 'rgba(34, 58, 112, 0.15)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  nodes.forEach((node, i) => {
    const x = node.startX + (node.targetX - node.startX) * eased
    const y = node.startY + (node.targetY - node.startY) * eased
    if (i === 0) ctx!.moveTo(x, y)
    else ctx!.lineTo(x, y)
  })
  ctx.stroke()

  nodes.forEach((node) => {
    const x = node.startX + (node.targetX - node.startX) * eased
    const idleY = t >= 1 && !reduceMotion ? Math.sin(elapsed / 700 + node.phase) * 1.5 : 0
    const y = node.startY + (node.targetY - node.startY) * eased + idleY
    ctx!.beginPath()
    ctx!.fillStyle = node.color
    ctx!.arc(x, y, node.radius, 0, Math.PI * 2)
    ctx!.fill()
  })

  if (t >= 1 && !reduceMotion && totalLength > 0) drawTravelingDot(elapsed - DURATION)
}

// 収束後、チェックの線の上を光る点が行き来し続ける演出
function drawTravelingDot(loopElapsed: number) {
  const cycle = loopElapsed % (LOOP_DURATION * 2)
  const rawT = cycle <= LOOP_DURATION ? cycle / LOOP_DURATION : 2 - cycle / LOOP_DURATION
  const pathT = EASE_IN_OUT(Math.min(Math.max(rawT, 0), 1))

  for (let echo = 3; echo >= 0; echo--) {
    const echoT = Math.min(Math.max(pathT - echo * 0.025, 0), 1)
    const { x, y } = pointOnPath(echoT)
    ctx!.beginPath()
    ctx!.fillStyle = echo === 0 ? '#FF7A1A' : `rgba(255, 122, 26, ${0.28 - echo * 0.07})`
    ctx!.arc(x, y, echo === 0 ? 5 : 5 - echo, 0, Math.PI * 2)
    ctx!.fill()
  }
}

function resize() {
  const canvas = canvasEl.value
  if (!canvas) return
  size = canvas.clientWidth
  dpr = window.devicePixelRatio || 1
  canvas.width = size * dpr
  canvas.height = size * dpr
  ctx = canvas.getContext('2d')
  ctx?.scale(dpr, dpr)
  buildPath()
  buildNodes()

  // canvasの幅/高さを設定するとビットマップと変形行列がリセットされるため、
  // rAFループのないreduced-motion時はここで明示的に再描画しないと空白のままになる
  if (reduceMotion) draw(DURATION, true)
}

onMounted(() => {
  const canvas = canvasEl.value
  if (!canvas) return

  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize()

  resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(canvas)

  if (reduceMotion) return

  animationStart = performance.now()
  function tick(now: number) {
    draw(now - animationStart, false)
    rafId = requestAnimationFrame(tick)
  }
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
})
</script>

<template>
  <canvas ref="canvasEl" class="aspect-square w-full" aria-hidden="true" />
</template>
