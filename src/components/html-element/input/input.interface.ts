import type {
  ITypeAttribute,
  ITypeElement,
} from '../../../core/type-element/type-element.interface';
import type { InputEnum } from './input.enum';

export interface IInputAttribute extends ITypeAttribute {
  type: keyof typeof InputEnum;
}

export interface IInput extends ITypeElement {
  nodeName: 'input';
  className: 'Input';
  childNodes: [];
}
