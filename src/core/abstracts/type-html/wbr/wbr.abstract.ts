import { TypeHtml } from '../type-html.abstract';
import { ITypeWbr, WbrProps } from './wbr.interface';

export abstract class TypeWbr<Props extends WbrProps = WbrProps> extends TypeHtml<Props> implements ITypeWbr {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('wbr');
  }
}
