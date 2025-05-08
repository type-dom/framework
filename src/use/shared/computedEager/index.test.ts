import { describe, expect, it, vi } from 'vitest'
// import { computed, ref, watch } from 'vue'
import { computedEager } from '.'
import { computed, signal, watch } from '@type-dom/signals';
import { nextTwoTick } from '../../.test';

describe('computedEager', () => {
  it('should be defined', () => {
    expect(computedEager).toBeDefined()
  })

  it('should work', async () => {
    const foo = signal(0)

    const plusOneComputed = computed(() => {
      return foo.get() + 1
    })
    const plusOneEagerComputed = computedEager(() => {
      return foo.get() + 1
    })

    const plusOneComputedSpy = vi.fn()
    const plusOneComputedRefSpy = vi.fn()
    watch(() => plusOneComputed.get(), plusOneComputedSpy)
    watch(() => plusOneEagerComputed.get(), plusOneComputedRefSpy)

    expect(plusOneComputed.get()).toBe(1)
    expect(plusOneEagerComputed.get()).toBe(1)
    expect(plusOneComputedSpy).toBeCalledTimes(0)
    expect(plusOneComputedRefSpy).toBeCalledTimes(0)

    foo.set(foo.get() + 1)
    await nextTwoTick()

    expect(plusOneComputed.get()).toBe(2)
    expect(plusOneEagerComputed.get()).toBe(2)
    expect(plusOneComputedSpy).toBeCalledTimes(1)
    expect(plusOneComputedRefSpy).toBeCalledTimes(1)

    foo.set(foo.get() - 1);
    await nextTwoTick()

    expect(plusOneComputed.get()).toBe(1)
    expect(plusOneEagerComputed.get()).toBe(1)
    expect(plusOneComputedSpy).toBeCalledTimes(2)
    expect(plusOneComputedRefSpy).toBeCalledTimes(2)
  })

  it('should not trigger collect change if result is not changed', async () => {
    const foo = signal(1)

    const isOddComputed = computed(() => {
      return foo.get() % 2 === 0
    })
    const isOddEagerComputed = computedEager(() => {
      return foo.get() % 2 === 0
    })

    const isOddComputedSpy = vi.fn()
    const isOddComputedRefSpy = vi.fn()
    const isOddComputedCollectSpy = vi.fn()
    const isOddComputedRefCollectSpy = vi.fn()

    watch(() => {
      isOddComputedCollectSpy()
      return isOddComputed.get()
    }, isOddComputedSpy)
    watch(() => {
      isOddComputedRefCollectSpy()
      return isOddEagerComputed.get()
    }, isOddComputedRefSpy)

    expect(isOddComputed.get()).toBe(false)
    expect(isOddEagerComputed.get()).toBe(false)
    expect(isOddComputedSpy).toBeCalledTimes(0)
    expect(isOddComputedRefSpy).toBeCalledTimes(0)
    expect(isOddComputedCollectSpy).toBeCalledTimes(1)
    expect(isOddComputedRefCollectSpy).toBeCalledTimes(1)

    foo.set(foo.get() + 1)
    await nextTwoTick()

    expect(isOddComputed.get()).toBe(true)
    expect(isOddEagerComputed.get()).toBe(true)
    expect(isOddComputedSpy).toBeCalledTimes(1)
    expect(isOddComputedRefSpy).toBeCalledTimes(1)
    expect(isOddComputedCollectSpy).toBeCalledTimes(2)
    expect(isOddComputedRefCollectSpy).toBeCalledTimes(2)

    foo.set(foo.get() + 2)
    await nextTwoTick()

    expect(isOddComputed.get()).toBe(true)
    expect(isOddEagerComputed.get()).toBe(true)
    expect(isOddComputedSpy).toBeCalledTimes(1)
    expect(isOddComputedRefSpy).toBeCalledTimes(1)
    // Since Vue 3.4, computed will not trigger collect change if result is not changed
    // refer: https://github.com/vuejs/core/pull/5912
    expect(isOddComputedCollectSpy).toBeCalledTimes(2)
    expect(isOddComputedRefCollectSpy).toBeCalledTimes(2)
  })
})
