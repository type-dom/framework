import { describe, expect, it, vi } from 'vitest'
import { signal } from '@type-dom/signals';
// import { ref } from 'vue'
import { useTimeoutFn } from '.'
import { promiseTimeout } from '../utils'

describe('useTimeoutFn', () => {
  it('supports reactive intervals', async () => {
    const callback = vi.fn()
    const interval = signal(0)
    const { start } = useTimeoutFn(callback, interval)

    start()
    await promiseTimeout(1)
    expect(callback).toBeCalled()

    callback.mockReset()
    interval.set(50)

    start()
    await promiseTimeout(1)
    expect(callback).not.toBeCalled()
    await promiseTimeout(100)
    expect(callback).toBeCalled()
  })

  it('supports getting pending status', async () => {
    const callback = vi.fn()
    const { start, isPending } = useTimeoutFn(callback, 0, { immediate: false })

    expect(isPending.get()).toBe(false)
    expect(callback).not.toBeCalled()

    start()

    expect(isPending.get()).toBe(true)
    expect(callback).not.toBeCalled()

    await promiseTimeout(1)

    expect(isPending.get()).toBe(false)
    expect(callback).toBeCalled()
  })
})
