import { TypeHtml } from '../type-html.abstract';
import type { ITypeA, TypeAProps } from './a.interface';

export abstract class TypeA extends TypeHtml implements ITypeA {
  dom?: HTMLAnchorElement;
  override props: TypeAProps;

  constructor(params: TypeAProps = {})  {
    super(params);
    this.props = this.useParams({
      nodeName: 'a',
    })
  }
}
