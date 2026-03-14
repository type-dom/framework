import { bench } from 'vitest'
import { signal, effect } from '@type-dom/signals';
import { nextTick, watch } from '../src'

bench('create watcher', () => {
  const v = signal(100)
  watch(v, v => {/**/})
})

{
  const v = signal(100)
  watch(v, v => {/**/})
  let i = 0
  bench('update signal to trigger watcher (scheduled but not executed)', () => {
    v.set(i++)
  })
}

{
  const v = signal(100)
  watch(v, v => {/**/})
  let i = 0
  bench('update signal to trigger watcher (executed)', async () => {
    v.set(i++)
    return nextTick()
  })
}

{
  bench('create effect', () => {
    effect(() => {/**/})
  })
}

{
  const v = signal(100)
  effect(() => {
    v.get()
  })
  let i = 0
  bench(
    'update signal to trigger watchEffect (scheduled but not executed)',
    () => {
      v.set(i++)
    },
  )
}

{
  const v = signal(100)
  effect(() => {
    v.get()
  })
  let i = 0
  bench('update signal to trigger watchEffect (executed)', async () => {
    v.set(i++)
    await nextTick()
  })
}
