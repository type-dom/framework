// import { useCloned } from '@vueuse/core'
import { describe, expect, it } from 'vitest'
import { useCloned } from '.';
import { signal } from '@type-dom/signals';
import { nextTick } from '../../core/scheduler';
// import { nextTick, ref } from 'vue'

describe('useCloned', () => {
  it('works with simple objects', () => {
    const data = { test: 'test' }

    const { cloned, sync } = useCloned(data)

    expect(cloned.get()).toEqual(data)

    cloned.set({ test: 'failed' })

      sync()

    expect(cloned.get()).toEqual(data)
  })

  it('works with refs', async () => {
    const data = signal({ test: 'test' })

    const { cloned } = useCloned(data)

    data.get().test = 'success'

    await nextTick()

    expect(cloned.get()).toEqual(data.get())
  })

  it('works with getter function', async () => {
    const data = signal({ test: 'test' })

    const { cloned } = useCloned(() => data.get())

    data.get().test = 'success'

    await nextTick()

    expect(cloned.get()).toEqual(data.get())
  })

  it('works with refs and manual sync', async () => {
    const data = signal({ test: 'test' })

    const { cloned, sync } = useCloned(data, { manual: true })

    data.get().test = 'success'

    expect(cloned.get()).not.toEqual(data.get())

    sync()

    expect(cloned.get()).toEqual(data.get())
  })

  it('works with custom clone function', async () => {
    const data = signal<Record<string, any>>({ test: 'test' })

    const { cloned } = useCloned(data, {
      clone: source => ({ ...source, proxyTest: true }),
    })

    data.get().test = 'partial'

    await nextTick()

    expect(cloned.get().test).toBe('partial')
    expect(cloned.get().proxyTest).toBe(true)
  })

  it('works with watch options', async () => {
    const data = signal({ test: 'test' })

    const { cloned } = useCloned(data, { immediate: false, deep: false })

    await nextTick()

    // test-dts immediate: false
    expect(cloned.get()).toEqual({})

    data.get().test = 'not valid'

    await nextTick()

    // test-dts deep: false
    expect(cloned.get()).toEqual({})

    data.set({ test: 'valid' })

      await nextTick()

    expect(cloned.get()).toEqual(data.get())
  })

  it('works with use isModified', async () => {
    const data = signal({ test: 'test' })

    const { cloned, isModified, sync } = useCloned(data)

    expect(isModified.get()).toEqual(false)

    cloned.get().test = 'vitest'

    expect(isModified.get()).toEqual(true)

    sync()

    expect(isModified.get()).toEqual(false)
  })
})
