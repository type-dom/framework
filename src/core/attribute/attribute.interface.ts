import { MaybeRef, Ref } from '@type-dom/signals';
import { IPrimitive } from '@type-dom/utils';
import { Arrayable } from '../../interface';

// export type IBaseClass =  MaybeRef<string> | MaybeRef<string>[];
// export type IClass = IBaseClass | IBaseClass[] | Record<string, IBaseClass | IBaseClass[]>;

export type IRawClass =
  | string
  | boolean
  // | string[]
  | Record<string, boolean | unknown>
  | (string | boolean | (string | boolean)[] | Record<string, boolean | unknown>)[];

export type ITypeClassName = Arrayable<Record<string, boolean> | string>;
export type IClass =
  | MaybeRef<string | boolean | undefined>
  // | MaybeRef<string | boolean | undefined>[]
  | Record<string, MaybeRef<boolean | unknown>>
  | (MaybeRef<string | boolean | undefined> | MaybeRef<string | boolean | undefined>[] | Record<string, MaybeRef<boolean | unknown>>)[];

export interface ITypeAttribute {
  id?: string | Ref<string>;
  class?: IClass;
  name?: MaybeRef<string>;
  type?: MaybeRef<string>;
  fill?: string; // rgb(0,0,255) blue
  strokeWidth?: number | string;
  stroke?: string; // rgb(0,0,0) pink
  x?: number;
  y?: number;
  rx?: number;
  ry?: number;
  width?: number | string;
  height?: number | string; // px
  d?: string;

  [key: string]: MaybeRef<IPrimitive | object | IPrimitive[]> | IClass;
}
