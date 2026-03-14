import { TypeHtml } from '../type-html.abstract';
import { ITypeNav, NavProps } from './nav.interface';

export abstract class TypeNav<Props extends NavProps = NavProps> extends TypeHtml<Props> implements ITypeNav {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('nav');
  }
}
