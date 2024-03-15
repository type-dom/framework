import { ITypeConfig } from '../../../config.interface';
import { TypeBdi } from '../../../type-element/type-html/bdi/bdi.abstract';
import type { IBdi } from './bdi.interface';

export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Bdi';
    this.setConfig(config);
  }
}
