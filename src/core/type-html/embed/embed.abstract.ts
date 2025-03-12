import { TypeHtml } from '../type-html.abstract';
import { ITypeEmbed, TypeEmbedProps } from './embed.interface';

export abstract class TypeEmbed extends TypeHtml implements ITypeEmbed {
  props: TypeEmbedProps;
  dom?: HTMLEmbedElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'embed'
    })
  }
}
