import { Computed, MaybeRef, Ref, Signal } from '@type-dom/signals';
import { IPrimitive } from '@type-dom/utils';
import { Arrayable } from '../../interface';

/**
 * class: active
 * class: { active: isActive, 'text-danger': hasError }
 * class: [activeClass, errorClass]
 * class: [{ active: isActive }, errorClass]
 */

export type RawClass =
  | undefined
  | boolean
  | string
  | Record<string, MaybeRef<boolean | string | unknown>>;

export type ClassValue = RawClass | Signal<ClassValue> | Computed<ClassValue> | ClassValue[];

// export type IClass =
//   | MaybeRef<string | undefined | Record<string, MaybeRef<boolean | unknown>>>
//   // | MaybeRef<string | boolean | undefined>[]
//   | (MaybeRef<string | undefined | Record<string, MaybeRef<boolean | unknown>>> | MaybeRef<(string | undefined)[]>)[];

export interface ITypeAttribute {
  id?: MaybeRef<string | undefined>;
  class?: ClassValue;
  name?: MaybeRef<string>;
  type?: MaybeRef<string>;
  fill?: string; // rgb(0,0,255) blue
  strokeWidth?: number | string;
  stroke?: MaybeRef<string>; // rgb(0,0,0) pink
  x?: number;
  y?: number;
  rx?: number;
  ry?: number;
  width?: number | string;
  height?: number | string; // px
  d?: string;

  [key: string]: MaybeRef<IPrimitive | IPrimitive[] | object>;
}
