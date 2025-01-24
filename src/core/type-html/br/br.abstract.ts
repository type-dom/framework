import { TypeHtml } from '../type-html.abstract';
import { ITypeBr, ITypeBrConfig } from './br.interface';

export abstract class TypeBr extends TypeHtml implements ITypeBr {
  props: ITypeBrConfig;
  dom?: HTMLBRElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'br'
    })
  }
}
