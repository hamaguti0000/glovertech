// 複数のコンポーネント/ディレクティブが同時にマウントされても、gsapの動的importが
// 一度きりになるよう、モジュールレベルでPromiseをキャッシュする。
let gsapPromise: Promise<typeof import('gsap')> | null = null

export function loadGsap() {
  if (!gsapPromise) gsapPromise = import('gsap')
  return gsapPromise
}

let scrollTriggerPromise: Promise<typeof import('gsap/ScrollTrigger')> | null = null

export function loadScrollTrigger() {
  if (!scrollTriggerPromise) scrollTriggerPromise = import('gsap/ScrollTrigger')
  return scrollTriggerPromise
}
