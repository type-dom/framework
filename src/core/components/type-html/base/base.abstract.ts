import { TypeHtml } from '../type-html.abstract';
import { ITypeBase, BaseProps } from './base.interface';

export abstract class TypeBase<Props extends BaseProps = BaseProps> extends TypeHtml<Props> implements ITypeBase {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'base'
    } as Props);
    this.dom = document.createElement('base');
  }
}
