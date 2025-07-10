// import type { ComputedRef, ShallowRef } from 'vue'
// import { shallowRef, toRaw } from 'vue'
import { signal, Signal, Computed } from '@type-dom/signals';
import { toRaw } from '../../reactivity';
import type { ConfigurableNavigator } from '../_configurable'
// import { createSingletonPromise } from '@vueuse/shared'

import { defaultNavigator } from '../_configurable'
import { useEventListener } from '../useEventListener'
import { useSupported } from '../useSupported'
import { createSingletonPromise } from '../utils';

type DescriptorNamePolyfill =
  'accelerometer' |
  'accessibility-events' |
  'ambient-light-sensor' |
  'background-sync' |
  'camera' |
  'clipboard-read' |
  'clipboard-write' |
  'gyroscope' |
  'magnetometer' |
  'microphone' |
  'notifications' |
  'payment-handler' |
  'persistent-storage' |
  'push' |
  'speaker' |
  'local-fonts'

export type GeneralPermissionDescriptor =
  | PermissionDescriptor
  | { name: DescriptorNamePolyfill }

export interface UsePermissionOptions<Controls extends boolean> extends ConfigurableNavigator {
  /**
   * Expose more controls
   *
   * @default false
   */
  controls?: Controls
}

export type UsePermissionReturn = Readonly<Signal<PermissionState | undefined>>
export interface UsePermissionReturnWithControls {
  state: UsePermissionReturn
  isSupported: Computed<boolean>
  query: () => Promise<PermissionStatus | undefined>
}

/**
 * Reactive Permissions API.
 *
 * @see https://vueuse.org/usePermission
 */
export function usePermission(
  permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor['name'],
  options?: UsePermissionOptions<false>
): UsePermissionReturn
export function usePermission(
  permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor['name'],
  options: UsePermissionOptions<true>,
): UsePermissionReturnWithControls
export function usePermission(
  permissionDesc: GeneralPermissionDescriptor | GeneralPermissionDescriptor['name'],
  options: UsePermissionOptions<boolean> = {},
): UsePermissionReturn | UsePermissionReturnWithControls {
  const {
    controls = false,
    navigator = defaultNavigator,
  } = options

  const isSupported = useSupported(() => navigator && 'permissions' in navigator)
  const permissionStatus = signal<PermissionStatus | undefined>()

  const desc = typeof permissionDesc === 'string'
    ? { name: permissionDesc } as PermissionDescriptor
    : permissionDesc as PermissionDescriptor
  const state = signal<PermissionState | undefined>()

  const update = () => {
    state.set(permissionStatus.get()?.state ?? 'prompt')
  }

  useEventListener(permissionStatus, 'change', update, { passive: true })

  const query = createSingletonPromise(async () => {
    if (!isSupported.get())
      return

    if (!permissionStatus.get()) {
      try {
        permissionStatus.set(await navigator!.permissions.query(desc))
      }
      catch {
        permissionStatus.set(undefined);
      }
      finally {
        update()
      }
    }

    if (controls) return toRaw(permissionStatus.get())
    return;
  })

  query()

  if (controls) {
    return {
      state: state as UsePermissionReturn,
      isSupported,
      query,
    }
  }
  else {
    return state as UsePermissionReturn
  }
}
