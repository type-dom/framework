import { TypeEmbed } from '../../../../core/components/type-html/embed/embed.abstract';
import { EmbedProps } from '../../../../core/components/type-html/embed/embed.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  override isBasic = true;

  constructor(params: EmbedProps = {}) {
    super(params);
    this.className = 'Embed';
    transformSlot(this, params.slot);
  }
}
