import { TypeHtml } from '../type-html.abstract';
import { ITypeDiv, DivProps } from './div.interface';

export abstract class TypeDiv<Props extends DivProps = DivProps> extends TypeHtml<Props> implements ITypeDiv {
  dom: HTMLDivElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('div');
  }
}
