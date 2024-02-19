import { TypeHtml } from '../type-html.abstract';
import type { ITypeEmbed } from './embed.interface';
export abstract class TypeEmbed extends TypeHtml implements ITypeEmbed {
  nodeName: 'embed';
  dom: HTMLEmbedElement;
  protected constructor() {
    super();
    this.nodeName = 'embed';
    this.dom = document.createElement(this.nodeName);
  }
}
