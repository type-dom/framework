import { TypeHtml } from '../type-html.abstract';
import type { ITypeSup, SupProps } from './sup.interface';

export abstract class TypeSup<Props extends SupProps = SupProps> extends TypeHtml<Props> implements ITypeSup {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'sup'
    } as Props);
    this.dom = document.createElement('sup');
  }
}
