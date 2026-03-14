import { TypeHtml } from '../type-html.abstract';
import type { ITypeVar, VarProps } from './var.interface';

export abstract class TypeVar<Props extends VarProps = VarProps> extends TypeHtml<Props> implements ITypeVar {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('var');
  }
}
