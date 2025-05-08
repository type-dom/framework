import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
// import { nextTick, ref } from 'vue'
import { useColorMode } from '.'
// import { nextTwoTick } from '../../.test-dts'
import { usePreferredDark } from '../usePreferredDark'
import { signal } from '@type-dom/signals';
import { nextTwoTick } from '../.test';
import { nextTick } from '../../core/scheduler';

describe('useColorMode', () => {
  const storageKey = 'vueuse-color-scheme'
  const htmlEl = document.querySelector('html')

  vi.mock('../usePreferredDark', () => {
    const mockPreferredDark = signal(false)
    return {
      usePreferredDark: () => mockPreferredDark,
    }
  })

  beforeEach(() => {
    usePreferredDark().set(false)
    localStorage.clear()
    htmlEl!.className = ''
  })

  afterAll(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('should translate auto mode when prefer dark', async () => {
    const mode = useColorMode()
    mode.set('auto')
    usePreferredDark().set(true)
    await nextTwoTick()
    expect(mode.get()).toBe('dark')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/dark/)
  })

  it('should translate auto mode', () => {
    const mode = useColorMode()
    mode.set('auto')
    expect(mode.get()).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/light/)
  })

  it('should translate custom mode', async () => {
    const mode = useColorMode<'custom' | 'unknown'>({ modes: { custom: 'custom' }})
    mode.set('custom')

    await nextTwoTick()
    expect(mode.get()).toBe('custom')
    expect(localStorage.getItem(storageKey)).toBe('custom')
    expect(htmlEl?.className).toMatch(/custom/)

    mode.set('unknown')

    await nextTwoTick()
    expect(mode.get()).toBe('unknown')
    expect(localStorage.getItem(storageKey)).toBe('unknown')
    expect(htmlEl?.className).toBe('')
  })

  it('should include auto mode', () => {
    const mode = useColorMode({ emitAuto: true })
    mode.set('auto')
    expect(mode.get()).toBe('auto')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/light/)
  })

  it('should not persist mode into localStorage', () => {
    const mode = useColorMode({ storageKey: null })
    mode.set('auto')
    expect(mode.get()).toBe('light')
    expect(localStorage.getItem(storageKey)).toBeNull()
    expect(htmlEl?.className).toMatch(/light/)
  })

  it('should set html attribute to be mode', () => {
    const mode = useColorMode({ attribute: 'data-color-mode' })
    mode.set('auto')
    expect(mode.get()).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.getAttribute('data-color-mode')).toBe('light')
  })

  it('should not affect html when selector invalid', () => {
    const mode = useColorMode({ selector: 'unknown' })
    mode.set('auto')
    expect(mode.get()).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toBe('')
  })

  it('should call onChanged when mode changed', () => {
    let nextMode = null
    const onChanged = (mode: any, defaultOnChanged: any) => {
      nextMode = mode
      defaultOnChanged(mode)
    }
    const mode = useColorMode({ onChanged })
    mode.set('auto')
    expect(mode.get()).toBe('light')
    expect(nextMode).toBe('light')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/light/)
  })

  it('should only change html class when preferred dark changed', async () => {
    const mode = useColorMode({ emitAuto: true })
    usePreferredDark().set(true)

    await nextTwoTick()
    expect(mode.get()).toBe('auto')
    expect(localStorage.getItem(storageKey)).toBe('auto')
    expect(htmlEl?.className).toMatch(/dark/)
  })

  it('should be able access the store & system preference', () => {
    const mode = useColorMode()
    expect(mode.store.get()).toBe('auto')
    expect(mode.system.get()).toBe('light')
    expect(mode.state.get()).toBe('light')
  })

  it('should call classList.add/classList.remove only if mode changed', async () => {
    const target = document.createElement('div')

    const mode = useColorMode({ selector: target, initialValue: 'light' })

    await nextTick()

    const addClass = vi.spyOn(target.classList, 'add')
    const removeClass = vi.spyOn(target.classList, 'remove')

    mode.set('light')

    await nextTick()

    expect(addClass).not.toHaveBeenCalled()
    expect(removeClass).not.toHaveBeenCalled()

    mode.set('dark')

    await nextTick()

    expect(addClass).toHaveBeenCalled()
    expect(removeClass).toHaveBeenCalled()
  })

  it('should call setAttribute only if mode changed', async () => {
    const target = document.createElement('div')

    const mode = useColorMode({ selector: target, initialValue: 'light', attribute: 'data-color-mode' })

    await nextTick()

    const setAttr = vi.spyOn(target, 'setAttribute')

    mode.set('light')

    await nextTick()

    expect(setAttr).not.toHaveBeenCalled()

    mode.set('dark')

    await nextTick()

    expect(setAttr).toHaveBeenCalled()
  })
})
