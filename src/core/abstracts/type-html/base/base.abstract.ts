import { TypeHtml } from '../type-html.abstract';
import { ITypeBase, BaseProps } from './base.interface';

export abstract class TypeBase<Props extends BaseProps = BaseProps> extends TypeHtml<Props> implements ITypeBase {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('base');
  }
}
