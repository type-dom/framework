import { TypeHtml } from '../type-html.abstract';
import { ITypeBr, BrProps } from './br.interface';

export abstract class TypeBr<Props extends BrProps = BrProps> extends TypeHtml<Props> implements ITypeBr {
  dom: HTMLBRElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('br');
  }
}
