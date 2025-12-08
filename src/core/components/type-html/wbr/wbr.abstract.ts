import { TypeHtml } from '../type-html.abstract';
import { ITypeWbr, WbrProps } from './wbr.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeWbr<Props extends WbrProps = WbrProps> extends TypeHtml<Props> implements ITypeWbr {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'wbr'
    } as Props));
    this.dom = document.createElement('wbr');
  }
}
