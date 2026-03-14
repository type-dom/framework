import { TypeHtml } from '../type-html.abstract';
import { ITypeU, UProps } from './u.interface';

export abstract class TypeU<Props extends UProps = UProps> extends TypeHtml<Props> implements ITypeU {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('u');
  }
}
