import { TypeHtml } from '../type-html.abstract';
import { ITypeB, BProps } from './b.interface';

export abstract class TypeB<Props extends BProps = BProps> extends TypeHtml<Props> implements ITypeB {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'b',
    } as Props);
    this.dom = document.createElement('b');
  }
}
