import { isString } from '@type-dom/utils';
import { warn } from '../../../core/warning';
import { RawDom } from '../../../core/renderer/renderer';
import { unref } from '../../../reactivity/ref';
import { TeleportProps } from './teleport.interface';
import { Teleport } from './teleport.class';

const isTeleportDisabled = (props: TeleportProps): boolean =>
  props && (unref(props.disabled) || unref(props.disabled) != undefined)

// export const resolveTarget = <T = RendererElement>(
//   props: TeleportProps,
//   // select: RendererOptions['querySelector'],
// ): T | null => {
//   const targetSelector = props && unref(props.to)
//   if (isString(targetSelector)) {
//     // if (!select) {
//     //   // __DEV__ &&
//     //   warn(
//     //     `Current renderer does not support string target for Teleports. ` +
//     //     `(missing querySelector renderer option)`,
//     //   )
//     //   return null
//     // } else {
//     //   const target = select(targetSelector)
//     const target = document.querySelector(targetSelector);
//       if (// __DEV__ &&
//         !target && !isTeleportDisabled(props)) {
//         warn(
//           `Failed to locate Teleport target with selector "${targetSelector}". ` +
//           `Note the target element must exist before the component is mounted - ` +
//           `i.e. the target cannot be rendered by the component itself, and ` +
//           `ideally should be outside of the entire Vue component tree.`,
//         )
//       }
//       return target as T;
//     // }
//   } else {
//     if (// __DEV__ &&
//       !targetSelector && !isTeleportDisabled(props)) {
//       warn(`Invalid Teleport target: ${targetSelector}`)
//     }
//     return targetSelector as T
//   }
// }

export function resolveTarget(element: Teleport): RawDom | undefined {
  // const to = unref(element.to);
  const props = element.props;
  const targetSelector = props && unref(props.to)
  // console.warn('to is ', to);
  if (isString(targetSelector)) {
    const target = document.querySelector(targetSelector);
      if (!target && !isTeleportDisabled(props)) {
        warn(
          `Failed to locate Teleport target with selector "${targetSelector}". ` +
          `Note the target element must exist before the component is mounted - ` +
          `i.e. the target cannot be rendered by the component itself, and ` +
          `ideally should be outside of the entire Vue component tree.`,
        )
      }
      return target as RawDom;
  // } else if (targetSelector instanceof TypeNode) {
  //   const target = targetSelector.dom;
  //   if (!target) {
  //     warn(`target is TypeNode, but dom not created . targetSelector is : ${targetSelector}`)
  //   }
  //   return target as RawDom | undefined;
  } else {
    if (!targetSelector && !isTeleportDisabled(props)) {
      warn(`Invalid Teleport target: ${targetSelector}`)
    }
    return targetSelector as RawDom | undefined;
  }
}
