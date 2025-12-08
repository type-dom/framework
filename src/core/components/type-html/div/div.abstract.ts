import { TypeHtml } from '../type-html.abstract';
import { ITypeDiv, DivProps } from './div.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeDiv<Props extends DivProps = DivProps> extends TypeHtml<Props> implements ITypeDiv {
  dom: HTMLDivElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'div'
    } as Props));
    this.dom = document.createElement('div');
  }
}
