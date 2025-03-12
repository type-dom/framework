import { TypeHtml } from '../type-html.abstract';
import type { ITypeA, TypeAProps } from './a.interface';

export abstract class TypeA extends TypeHtml implements ITypeA {
  dom?: HTMLAnchorElement;
  override props: TypeAProps;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'a',
    })
  }
}
