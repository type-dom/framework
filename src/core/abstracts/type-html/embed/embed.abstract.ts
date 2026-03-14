import { TypeHtml } from '../type-html.abstract';
import { ITypeEmbed, EmbedProps } from './embed.interface';

export abstract class TypeEmbed<Props extends EmbedProps = EmbedProps> extends TypeHtml<Props> implements ITypeEmbed {
  dom: HTMLEmbedElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('embed');
  }
}
