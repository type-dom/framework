import { defaultProps } from '../../../helpers/defaultProps';
import { TypeHtml } from '../type-html.abstract';
import { ITypeMain, MainProps } from './main.interface';

export abstract class TypeMain<Props extends MainProps = MainProps> extends TypeHtml<Props> implements ITypeMain {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'main'
    } as Props));
    this.dom = document.createElement('main');
  }
}
