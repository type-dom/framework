import { TypeHtml } from '../type-html.abstract';
import type { ITypeUL, ULProps } from './ul.interface';

export abstract class TypeUL<Props extends ULProps = ULProps> extends TypeHtml<Props> implements ITypeUL {
  dom: HTMLUListElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('ul');
  }
}
