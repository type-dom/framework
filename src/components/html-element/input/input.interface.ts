import { MaybeRef } from '@type-dom/signals';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { ITypeAttribute, } from '../../../core/type-element/type-element.interface';
import { ITypeInput } from '../../../core/type-html/input/input.interface';
import type { InputEnum } from './input.enum';

export interface IInputAttribute extends ITypeAttribute {
  type: keyof typeof InputEnum;
}

export interface IInput extends ITypeInput {
  className: 'Input';
  childNodes: [];
}

export interface IInputConfig extends ITypeConfig {
  id?: MaybeRef<string | undefined>,
  trueValue?: string | number | boolean,
  falseValue?: string | number | boolean,
  value?: MaybeRef<string | number | boolean | object | undefined>,
  maxlength?: string | number;
  minlength?: string | number;
  type?: keyof typeof InputEnum | 'textarea'; // 'text' button number

  readonly?: boolean;
}
