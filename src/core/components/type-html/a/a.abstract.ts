import { TypeHtml } from '../type-html.abstract';
import type { ITypeA, AProps } from './a.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeA<Props extends AProps = AProps>
  extends TypeHtml<Props> implements ITypeA {
  dom: HTMLAnchorElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'a'
    } as Props));
    this.dom = document.createElement('a');
  }
}
