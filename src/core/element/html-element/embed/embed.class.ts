import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeEmbed } from '../../../type-html/embed/embed.abstract';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Embed';
    this.setConfig(config);
  }
}
