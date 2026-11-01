import fs from 'node:fs'
import { bench } from 'vitest'
import { __unstable__loadDesignSystem } from '.'

const theme = fs.readFileSync(new URL('../theme.css', import.meta.url), 'utf8')
const css = `${theme}\n@tailwind utilities;`

// A fresh design system and the complete default theme keep cold indexing in the measurement.
for (let collapse of [false, true]) {
  bench(
    `canonicalizeCandidates (cold, full theme, collapse: ${collapse})`,
    async () => {
      let design = await __unstable__loadDesignSystem(css)
      design.canonicalizeCandidates(['px-2', 'py-2', 'text-sm', 'leading-5'], {
        collapse,
        logicalToPhysical: true,
        rem: 16,
      })
    },
    { iterations: 3, time: 0, warmupIterations: 0, warmupTime: 0 },
  )
}
