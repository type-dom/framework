import { TypeHtml } from '../type-html.abstract';
import { ITypeBdi, BdiProps } from './bdi.interface';

export abstract class TypeBdi<Props extends BdiProps = BdiProps> extends TypeHtml<Props> implements ITypeBdi {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('bdi');
  }
}
