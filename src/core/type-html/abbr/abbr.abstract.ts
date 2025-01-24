import { TypeHtml } from '../type-html.abstract';
import type { ITypeAbbr, ITypeAbbrConfig } from './abbr.interface';

export abstract class TypeAbbr extends TypeHtml implements ITypeAbbr {
  dom?: HTMLElement;
  props: ITypeAbbrConfig;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'abbr',
    })
  }
}
