import { describe, expect, it, vi } from 'vitest'
// import { nextTick, ref } from 'vue'
import { signal } from '@type-dom/signals'
import { pausableWatch, watchPausable } from './index'
import { nextTick } from '../../../../src/core/scheduler';

describe('watchPausable', () => {
  it('should export module', () => {
    expect(watchPausable).toBeDefined()
    expect(pausableWatch).toBeDefined()
  })

  it('should work', async () => {
    const num = signal(0)
    const cb = vi.fn()
    const { stop, pause, resume, isActive } = watchPausable(num, cb)

    num.set(1);
    await nextTick()
    expect(isActive.value).toBeTruthy()
    expect(cb).toHaveBeenCalledWith(1, 0, expect.anything())

    pause()
    num.set(2)
    await nextTick()
    expect(isActive.value).toBeFalsy()
    expect(cb).toHaveBeenCalledTimes(1)

    resume()
    num.set(3)
    await nextTick()
    expect(isActive.value).toBeTruthy()
    expect(cb).toHaveBeenCalledWith(3, 2, expect.anything())

    stop?.()
    num.set(4)
    await nextTick()
    expect(isActive.value).toBeTruthy()
    expect(cb).toHaveBeenCalledTimes(2)
  })
})
