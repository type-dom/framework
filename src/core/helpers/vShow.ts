// import type { ObjectDirective } from '@vue/runtime-core'

import { onBeforeMount, onBeforeUnmount, onMounted, onUpdated } from '../apiLifecycle';
import { TypeNode } from '../type-node/type-node.abstract';

export const vShowOriginalDisplay: unique symbol = Symbol('_vod')
export const vShowHidden: unique symbol = Symbol('_vsh')

export interface VShowElement extends HTMLElement {
  // _vod = vue original display
  [vShowOriginalDisplay]: string
  [vShowHidden]: boolean
}

export function vShow(node: TypeNode, value: any, oldValue?: any) {
  // console.warn('v-show  ')

  onBeforeMount(()=> {
    const el = node?.dom as VShowElement;
    const transition = node?.transition;
    el[vShowOriginalDisplay] =
      el.style.display === 'none' ? '' : el.style.display
    if (transition && value) {
      transition.beforeEnter(el)
    } else {
      setDisplay(el, value)
    }
  }, node)
  onMounted(() => {
    const el = node?.dom as VShowElement;
    const transition = node?.transition;
    if (transition && value) {
      transition.enter(el)
    }
  }, node)
  onUpdated(() => {
    const el = node?.dom as VShowElement;
    const transition = node?.transition;
    if (!value === !oldValue) return
    if (transition) {
      if (value) {
        transition.beforeEnter(el)
        setDisplay(el, true)
        transition.enter(el)
      } else {
        transition.leave(el, () => {
          setDisplay(el, false)
        })
      }
    } else {
      setDisplay(el, value)
    }
  })
  onBeforeUnmount(()=> {
    const el = node?.dom as VShowElement;
    setDisplay(el, value)
  }, node)
}

// if (__DEV__) {
//   vShow.name = 'show'
// }

export function setDisplay(el: VShowElement, value: unknown): void {
  el.style.display = value ? el[vShowOriginalDisplay] : 'none'
  el[vShowHidden] = !value
}

// SSR vnode transforms, only used when user includes client-oriented render
// function in SSR
// export function initVShowForSSR(): void {
//   vShow.getSSRProps = ({ value }) => {
//     if (!value) {
//       return { style: { display: 'none' } }
//     }
//   }
// }
