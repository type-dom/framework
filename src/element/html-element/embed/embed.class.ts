import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeEmbed } from '../../../type-element/type-html/embed/embed.abstract';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Embed';
  }
}
