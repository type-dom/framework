import { TypeEmbed } from '../../../../core/components/type-html/embed/embed.abstract';
import { TypeEmbedProps } from '../../../../core/components/type-html/embed/embed.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  override isBasic = true;

  constructor(params: TypeEmbedProps = {}) {
    super();
    this.className = 'Embed';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
