import { TypeHtml } from '../type-html.abstract';
import type { ITypeAbbr, TypeAbbrProps } from './abbr.interface';

export abstract class TypeAbbr extends TypeHtml implements ITypeAbbr {
  dom?: HTMLElement;
  props: TypeAbbrProps;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'abbr',
    })
  }
}
