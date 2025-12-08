import { shouldUpdateComponent } from '../componentRenderUtils';
import { TypeNode } from '../type-node/type-node.abstract';
// import { popWarningContext, pushWarningContext } from '../warning';

export const updateComponent = (n1: TypeNode, n2: TypeNode, optimized: boolean) => {
  // const instance = (n2 = n1)!
  if (shouldUpdateComponent(n1, n2, optimized)) {
    // if (
    //   // __FEATURE_SUSPENSE__ &&
    //   instance.asyncDep &&
    //   !instance.asyncResolved
    // ) {
    //   // async & still pending - just update props and slots
    //   // since the component's reactive effect for render isn't set-up yet
    //   // if (__DEV__) {
    //   //   pushWarningContext(n2)
    //   // }
    //   // updateComponentPreRender(instance, n2, optimized)
    //   // if (__DEV__) {
    //   //   popWarningContext()
    //   // }
    //   return
    // } else {
    //   // normal update
    //   instance.next = n2
    //   // instance.update is the reactive effect.
    //   instance.update()
    // }
  } else {
    // no update needed. just copy over properties
    n2.dom = n1.dom
    // instance.vnode = n2
  }
}
