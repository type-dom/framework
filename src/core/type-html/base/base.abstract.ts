import { TypeHtml } from '../type-html.abstract';
import { ITypeBase, ITypeBaseConfig } from './base.interface';

export abstract class TypeBase extends TypeHtml implements ITypeBase {
  props: ITypeBaseConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'base'
    });
  }
}
