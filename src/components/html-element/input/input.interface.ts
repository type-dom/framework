import { MaybeRef } from '@type-dom/signals';
import { TypeProps } from '../../../core/type-node/type-node.interface';
import { ITypeAttribute } from '../../../core/attribute/attribute.interface';
import { ITypeInput } from '../../../core/type-html/input/input.interface';
import type { InputEnum } from './input.enum';

export interface IInputAttribute extends ITypeAttribute {
  type: keyof typeof InputEnum;
}

export interface IInput extends ITypeInput {
  className: 'Input';
  childNodes: [];
}

export interface InputProps extends TypeProps {
  id?: MaybeRef<string | undefined>;
  trueValue?: string | number | boolean;
  falseValue?: string | number | boolean;
  value?: MaybeRef<string | number | boolean | object | undefined>;
  maxlength?: string | number;
  minlength?: string | number;
  type?: keyof typeof InputEnum | 'textarea'; // 'text' button number

  readonly?: boolean;
}
