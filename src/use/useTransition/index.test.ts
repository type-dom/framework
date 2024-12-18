// import { promiseTimeout } from '@vueuse/shared'
// import { describe, expect, it, vi } from 'vitest'
// import { ref } from 'vue'
import { Computed, signal as ref } from '@type-dom/signals';
import { promiseTimeout } from '../utils';
import { executeTransition, useTransition } from '.'

function expectBetween(val: number, floor: number, ceiling: number) {
  expect(val).toBeGreaterThan(floor)
  expect(val).toBeLessThan(ceiling)
}

describe('executeTransition', () => {
  it('transitions between numbers', async () => {
    const source = ref(0)

    const trans = executeTransition(source, 0, 1, { duration: 50 })

    await promiseTimeout(25)

    expectBetween(source.get(), 0.25, 0.75)

    await trans

    expect(source.get()).toBe(1)
  })

  it('transitions between vectors', async () => {
    const source = ref([0, 0, 0])

    const trans = executeTransition(source, [0, 1, 2], [1, 2, 3], { duration: 50 })

    await promiseTimeout(25)

    expectBetween(source.get()[0], 0, 1)
    expectBetween(source.get()[1], 1, 2)
    expectBetween(source.get()[2], 2, 3)

    await trans

    expect(source.get()[0]).toBe(1)
    expect(source.get()[1]).toBe(2)
    expect(source.get()[2]).toBe(3)
  })

  it('transitions can be aborted', async () => {
    let abort = false

    const source = ref(0)

    const trans = executeTransition(source, 0, 1, {
      abort: () => abort,
      duration: 50,
    })

    await promiseTimeout(25)

    abort = true

    await trans

    expectBetween(source.get(), 0, 1)
  })
})

describe('useTransition', () => {
  it('transitions between numbers', async () => {
    const source = ref(0)
    const transition = useTransition(source, { duration: 100 })

    expect(transition.get()).toBe(0)

    source.set(1)

    await promiseTimeout(50)
    expectBetween(transition.get() as number, 0, 1)

    await promiseTimeout(100)
    expect(transition.get()).toBe(1)
  })

  it('transitions between vectors', async () => {
    const source = ref([0, 0])
    const transition = useTransition(source, { duration: 100 }) as Computed<number[]>

    expect(transition.get()).toEqual([0, 0])

    source.set([1, 1])

    await promiseTimeout(50)
    expectBetween(transition.get()[0], 0, 1)
    expectBetween(transition.get()[1], 0, 1)

    await promiseTimeout(100)
    expect(transition.get()[0]).toBe(1)
    expect(transition.get()[1]).toBe(1)
  })

  it('transitions between refs', async () => {
    const source1 = ref(0)
    const source2 = ref(0)
    const transition = useTransition([source1, source2], { duration: 100 })

    expect(transition.get()).toEqual([0, 0])

    source1.set(1)
    source2.set(1)

    await promiseTimeout(50)
    expectBetween(transition.get()[0], 0, 1)
    expectBetween(transition.get()[1], 0, 1)

    await promiseTimeout(100)
    expect(transition.get()[0]).toBe(1)
    expect(transition.get()[1]).toBe(1)
  })

  it('supports cubic bezier curves', async () => {
    const source = ref(0)

    // https://cubic-bezier.com/#0,2,0,1
    const easeOutBack = useTransition(source, {
      duration: 100,
      transition: [0, 2, 0, 1],
    })

    // https://cubic-bezier.com/#1,0,1,-1
    const easeInBack = useTransition(source, {
      duration: 100,
      transition: [1, 0, 1, -1],
    })

    source.set(1)

    await promiseTimeout(50)
    expectBetween(easeOutBack.get(), 1, 2)
    expectBetween(easeInBack.get(), -1, 0)

    await promiseTimeout(100)
    expect(easeOutBack.get()).toBe(1)
    expect(easeInBack.get()).toBe(1)
  })

  it('supports custom easing functions', async () => {
    const source = ref(0)
    const linear = jest.fn(n => n)
    const transition = useTransition(source, {
      duration: 100,
      transition: linear,
    })

    expect(linear).not.toBeCalled()

    source.set(1)

    await promiseTimeout(50)
    expect(linear).toBeCalled()
    expectBetween(transition.get(), 0, 1)

    await promiseTimeout(100)
    expect(transition.get()).toBe(1)
  })

  it('supports non-linear custom easing functions', async () => {
    const source = ref(0)
    const easeInQuad = jest.fn(n => n * n)
    const transition: Computed<number> = useTransition(source, {
      duration: 100,
      transition: easeInQuad,
    })

    expect(easeInQuad).not.toBeCalled()

    source.set(1)

    await promiseTimeout(50)
    expect(easeInQuad).toBeCalled()
    expectBetween(transition.get(), 0, 1)

    await promiseTimeout(100)
    expect(transition.get()).toBe(1)
  })

  it('supports delayed transitions', async () => {
    const source = ref(0)

    const transition = useTransition(source, {
      delay: 100,
      duration: 100,
    })

    source.set(1)

    await promiseTimeout(50)
    expect(transition.get()).toBe(0)

    await promiseTimeout(100)
    expectBetween(transition.get(), 0, 1)
  })

  it('supports dynamic transitions', async () => {
    const source = ref(0)
    const first = jest.fn(n => n)
    const second = jest.fn(n => n)
    const easingFn = ref(first)

    useTransition(source, {
      duration: 100,
      transition: easingFn,
    })

    expect(first).not.toBeCalled()
    expect(second).not.toBeCalled()

    source.set(1)

    await promiseTimeout(50)
    expect(first).toBeCalled()
    expect(second).not.toBeCalled()

    first.mockReset()
    second.mockReset()

    easingFn.set(second);
    source.set(2)

    await promiseTimeout(100)
    expect(first).not.toBeCalled()
    expect(second).toBeCalled()
  })

  it('supports dynamic durations', async () => {
    const source = ref(0)
    const duration = ref(100)
    const transition = useTransition(source, { duration })

    source.set(1)

    await promiseTimeout(50)
    expectBetween(transition.get() as number, 0, 1)

    await promiseTimeout(100)
    expect(transition.get()).toBe(1)

    duration.set(200)
    source.set(2)

    await promiseTimeout(150)
    expectBetween(transition.get(), 1, 2)

    await promiseTimeout(100)
    expect(transition.get()).toBe(2)
  })

  it('fires onStarted and onFinished callbacks', async () => {
    const source = ref(0)
    const onStarted = jest.fn()
    const onFinished = jest.fn()

    useTransition(source, {
      duration: 100,
      onStarted,
      onFinished,
    })

    expect(onStarted).not.toBeCalled()
    expect(onFinished).not.toBeCalled()

    source.set(1)

    await promiseTimeout(50)
    expect(onStarted).toBeCalled()
    expect(onFinished).not.toBeCalled()

    onStarted.mockReset()
    onFinished.mockReset()

    await promiseTimeout(100)
    expect(onStarted).not.toBeCalled()
    expect(onFinished).toBeCalled()
  })

  it('clears pending transitions before starting a new one', async () => {
    const source = ref(0)
    const onStarted = jest.fn()
    const onFinished = jest.fn()

    useTransition(source, {
      delay: 100,
      duration: 100,
      onFinished,
      onStarted,
    })

    await promiseTimeout(150)
    expect(onStarted).not.toBeCalled()
    source.set(1)
    await promiseTimeout(50)
    source.set(2)
    await promiseTimeout(250)
    expect(onStarted).toBeCalledTimes(1)
    expect(onFinished).toBeCalledTimes(1)
  })

  it('can be disabled for sychronous changes', async () => {
    const onStarted = jest.fn()
    const disabled = ref(false)
    const source = ref(0)

    const transition = useTransition(source, {
      disabled,
      duration: 100,
      onStarted,
    })

    disabled.set(true);
    source.set(1)

    expect(transition.get()).toBe(1)
    await promiseTimeout(150)
    expect(onStarted).not.toBeCalled()
    disabled.set(false);
    expect(transition.get()).toBe(1)
  })

  it('begins transition from where previous transition was interrupted', async () => {
    const source = ref(0)

    const transition = useTransition(source, {
      duration: 100,
    })

    source.set(1)

    await promiseTimeout(50)

    source.set(0);

    await promiseTimeout(25)

    expectBetween(transition.get() as number, 0, 0.5)
  })
})
