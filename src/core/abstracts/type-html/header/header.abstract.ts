import { TypeHtml } from '../type-html.abstract';
import { ITypeHeader, HeaderProps } from './header.interface';

export abstract class TypeHeader<Props extends HeaderProps = HeaderProps> extends TypeHtml<Props> implements ITypeHeader {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('header');
  }
}
