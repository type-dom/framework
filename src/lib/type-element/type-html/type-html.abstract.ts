/**
 * HTML标签
 */
import { TypeElement } from '../type-element.abstract';
import type { ITypeHtml } from './type-html.interface';

export abstract class TypeHtml extends TypeElement implements ITypeHtml {
  override parent?: TypeHtml;
  abstract override dom: HTMLElement;
}
