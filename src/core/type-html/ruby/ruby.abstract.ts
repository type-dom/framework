import { TypeHtml } from '../type-html.abstract';
import { ITypeRuby, ITypeRubyConfig } from './ruby.interface';

export abstract class TypeRuby extends TypeHtml implements ITypeRuby {
  props: ITypeRubyConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'ruby'
    })
  }
}
