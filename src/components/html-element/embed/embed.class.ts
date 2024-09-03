import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeEmbed } from '../../type-html/embed/embed.abstract';
import type { IEmbed } from './embed.interface';

export class Embed extends TypeEmbed implements IEmbed {
  className: 'Embed';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Embed';
    this.setParams(params);
  }
}
