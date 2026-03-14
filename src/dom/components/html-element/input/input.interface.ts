// import { MaybeRef } from '../../../reactivity';
// import { TypeProps } from '../../../core/type-node/type-node.interface';
import { ITypeInput } from '../../../../core/abstracts/type-html/input/input.interface';
// import type { InputEnum } from './input.enum';
// import { InputHTMLAttributes } from '../../../core';

export interface IInput extends ITypeInput {
  className: 'Input';
  childNodes: [];
}

// export interface InputProps extends TypeProps {
//   id?: MaybeRef<string | undefined>;
//   trueValue?: string | number | boolean;
//   falseValue?: string | number | boolean;
//   value?: MaybeRef<string | number | boolean | object | undefined>;
//   maxlength?: string | number;
//   minlength?: string | number;
//   type?: keyof typeof InputEnum | 'textarea'; // 'text' button number
//
//   readonly?: boolean;
//
//   attrObj?: { [K in keyof InputHTMLAttributes]: MaybeRef<InputHTMLAttributes[K]> };
// }
