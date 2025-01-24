import { TypeHtml } from '../type-html.abstract';
import { ITypeI, ITypeIConfig } from './i.interface';

export abstract class TypeI extends TypeHtml implements ITypeI {
  props: ITypeIConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'i'
    })
  }
}
