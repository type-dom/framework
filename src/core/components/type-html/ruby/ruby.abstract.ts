import { TypeHtml } from '../type-html.abstract';
import { ITypeRuby, TypeRubyProps } from './ruby.interface';

export abstract class TypeRuby extends TypeHtml implements ITypeRuby {
  props: TypeRubyProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'ruby'
    })
  }
}
