import { TypeHtml } from '../type-html.abstract';
import { ITypeHeader, TypeHeaderProps } from './header.interface';

export abstract class TypeHeader extends TypeHtml implements ITypeHeader {
  props: TypeHeaderProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'header'
    })
  }
}
