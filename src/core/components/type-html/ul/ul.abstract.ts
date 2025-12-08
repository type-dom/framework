import { TypeHtml } from '../type-html.abstract';
import type { ITypeUL, ULProps } from './ul.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeUL<Props extends ULProps = ULProps> extends TypeHtml<Props> implements ITypeUL {
  dom: HTMLUListElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'ul',
    } as Props));
    this.dom = document.createElement('ul');
  }
}
