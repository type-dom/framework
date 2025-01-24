import { TypeHtml } from '../type-html.abstract';
import { ITypeB, ITypeBConfig } from './b.interface';

export abstract class TypeB extends TypeHtml implements ITypeB {
  props: ITypeBConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'b',
    })
  }
}
