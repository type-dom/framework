import { TypeHtml } from '../type-html.abstract';
import type { ITypeSub, SubProps } from './sub.interface';

export abstract class TypeSub<Props extends SubProps = SubProps> extends TypeHtml<Props> implements ITypeSub {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'sub',
    } as Props);
    this.dom = document.createElement('sub');
  }
}
