import { TypeHtml } from '../type-html.abstract';
import { ITypeHeader, ITypeHeaderConfig } from './header.interface';

export abstract class TypeHeader extends TypeHtml implements ITypeHeader {
  props: ITypeHeaderConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'header'
    })
  }
}
