import { readFileSync } from 'node:fs'
import { join } from 'node:path'

export default defineEventHandler(() => {
  const filePath = join(process.cwd(), 'public/subsidies.json')
  const content = readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
})
