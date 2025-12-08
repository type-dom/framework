import { TypeHtml } from '../type-html.abstract';
import { ITypeU, UProps } from './u.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeU<Props extends UProps = UProps> extends TypeHtml<Props> implements ITypeU {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'u'
    } as Props));
    this.dom = document.createElement('u');
  }
}
