import { TypeHtml } from '../type-html.abstract';
import { ITypeEmbed, ITypeEmbedConfig } from './embed.interface';

export abstract class TypeEmbed extends TypeHtml implements ITypeEmbed {
  props: ITypeEmbedConfig;
  dom?: HTMLEmbedElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'embed'
    })
  }
}
