import { TypeHtml } from '../type-html.abstract';
import { ITypeHeader, HeaderProps } from './header.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeHeader<Props extends HeaderProps = HeaderProps> extends TypeHtml<Props> implements ITypeHeader {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'header'
    } as Props));
    this.dom = document.createElement('header');
  }
}
