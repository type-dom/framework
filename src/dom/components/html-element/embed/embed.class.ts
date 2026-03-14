import { TypeEmbed } from '../../../../core/abstracts/type-html/embed/embed.abstract';
import { EmbedProps } from '../../../../core/abstracts/type-html/embed/embed.interface';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';
  constructor(params: EmbedProps = {}) {
    super(params);
    this.className = 'Embed';
  }
}
