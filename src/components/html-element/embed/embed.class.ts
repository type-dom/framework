import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeEmbed } from '../../../core/type-html/embed/embed.abstract';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Embed';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
