import { ITypeConfig } from '../../../config.interface';
import { TypeEmbed } from '../../../type-element/type-html/embed/embed.abstract';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Embed';
    this.setConfig(config);
  }
}
