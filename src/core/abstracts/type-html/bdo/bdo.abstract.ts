import { TypeHtml } from '../type-html.abstract';
import type { ITypeBdo, BdoProps } from './bdo.interface';

export abstract class TypeBdo<Props extends BdoProps = BdoProps> extends TypeHtml<Props> implements ITypeBdo {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('bdo');
  }
}
