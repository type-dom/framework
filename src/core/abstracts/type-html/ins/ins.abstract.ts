import { TypeHtml } from '../type-html.abstract';
import { ITypeIns, InsProps } from './ins.interface';

export abstract class TypeIns<Props extends InsProps = InsProps> extends TypeHtml<Props> implements ITypeIns {
  dom: HTMLModElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('ins');
  }
}
