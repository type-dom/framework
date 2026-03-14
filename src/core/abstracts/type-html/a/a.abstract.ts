import { TypeHtml } from '../type-html.abstract';
import type { ITypeA, AProps } from './a.interface';

export abstract class TypeA<Props extends AProps = AProps>
  extends TypeHtml<Props> implements ITypeA {
  dom: HTMLAnchorElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('a');
  }
}
