import { TypeBdi } from '../../../../core/abstracts/type-html/bdi/bdi.abstract';
import { BdiProps } from '../../../../core/abstracts/type-html/bdi/bdi.interface';
import type { IBdi } from './bdi.interface';

export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';
  constructor(params: BdiProps = {}) {
    super(params);
    this.className = 'Bdi';
  }
}
