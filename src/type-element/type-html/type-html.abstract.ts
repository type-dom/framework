/**
 * HTML标签
 */
import { TypeElement } from '../type-element.abstract';
import type { ITypeHtml } from './type-html.interface';

export abstract class TypeHtml extends TypeElement implements ITypeHtml {
  // abstract nodeName: string;
  // abstract className: string;
  // abstract parent: TypeElement;
  abstract override dom: HTMLElement;
}
