export type { CSSProperties } from '@type-dom/css-type';
import { Computed, Signal } from '@type-dom/signals';
import { CSSProperties } from '@type-dom/css-type';
import {MaybeRef, ToMaybeRefs} from '../../../reactivity';

// export interface CSSProperties
//   extends CSS.Properties<string | number>,
//     CSS.PropertiesHyphen<string | number> {
//   /**
//    * The index signature was removed to enable closed typing for style
//    * using CSSType. You're able to use type assertion or module augmentation
//    * to add properties or an index signature of your own.
//    *
//    * For examples and more information, visit:
//    * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
//    */
//   [v: `--${string}`]: string | number | undefined
// }

// Vue's style normalization supports nested arrays
export type RawStyleValue =
  | false
  | null
  | undefined
  | string
  | CSSProperties
  | Array<RawStyleValue>

// Vue's style normalization supports nested arrays
// export type StyleValue = string | undefined | CSSProperties | Array<StyleValue | undefined>

/**
 * Record<string, MaybeRef<string | number>>
 *   例如：
 * {
 *    '--td-switch-on-color': '#13ce66',
 *    '--td-switch-off-color': '#ff4949',
 *  }
 */
// export type RawStyle = CSSProperties | Record<string, MaybeRef<string | number | undefined>>
// export type RawStyle = Record<keyof CSSProperties, MaybeRef<CSSProperties[keyof CSSProperties]>>;
export type RawStyle = ToMaybeRefs<CSSProperties>;
//   {
//   [K in keyof CSSProperties]?: MaybeRef<CSSProperties[K]>;
// }
export type StyleValue = MaybeRef<RawStyle> | Signal<StyleValue | undefined> | Computed<StyleValue | undefined> | (StyleValue | undefined)[];
