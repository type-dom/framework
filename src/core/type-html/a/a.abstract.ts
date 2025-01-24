import { TypeHtml } from '../type-html.abstract';
import type { ITypeA, ITypeAConfig } from './a.interface';

export abstract class TypeA extends TypeHtml implements ITypeA {
  dom?: HTMLAnchorElement;
  override props: ITypeAConfig;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'a',
    })
  }
}
