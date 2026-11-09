export interface RealCostResult {
  costManYen: number
  covered: number
  real: number
}

/**
 * covered(補助分)を先に万円単位(小数1桁)で丸め、
 * real(実質負担) = costManYen - covered で導出する。
 * これによりどんな入力でも covered + real === costManYen が常に一致する。
 */
export function calcRealCost(cost: number, rateNum: number, rateDen: number): RealCostResult {
  const costManYen = cost / 10000
  const rate = rateNum / rateDen
  const covered = Math.round(costManYen * rate * 10) / 10
  const real = Math.round((costManYen - covered) * 10) / 10
  return { costManYen, covered, real }
}

/**
 * 整数(万円)であれば「40万円」、端数があれば「約16.7万円」のように表示する。
 */
export function formatManYen(value: number): string {
  const rounded = Math.round(value * 10) / 10
  return Number.isInteger(rounded) ? `${rounded}万円` : `約${rounded.toFixed(1)}万円`
}
