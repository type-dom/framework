import { TypeHtml } from '../type-html.abstract';
import { ITypeCite, CiteProps } from './cite.interface';

export abstract class TypeCite<Props extends CiteProps = CiteProps> extends TypeHtml<Props> implements ITypeCite {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'cite'
    } as Props);
    this.dom = document.createElement('cite');
  }
}
