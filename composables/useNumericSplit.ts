export interface TextSegment {
  text: string
  numeric: boolean
}

export function splitNumeric(value: string): TextSegment[] {
  const parts = value.match(/\d+|\D+/g) ?? [value]
  return parts.map((part) => ({ text: part, numeric: /^\d+$/.test(part) }))
}
