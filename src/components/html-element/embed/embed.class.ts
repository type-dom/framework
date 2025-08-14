import { TypeEmbed } from '../../../core/type-html/embed/embed.abstract';
import { TypeEmbedProps } from '../../../core/type-html/embed/embed.interface';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  override isBasic = true;

  constructor(params: TypeEmbedProps = {}) {
    super();
    this.className = 'Embed';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
