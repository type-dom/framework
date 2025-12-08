import { TypeHtml } from '../type-html.abstract';
import { ITypeEm, EmProps } from './em.interface';

export abstract class TypeEm<Props extends EmProps = EmProps> extends TypeHtml<Props> implements ITypeEm {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'em'
    } as Props);
    this.dom = document.createElement('em');
  }
}
