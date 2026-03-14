import { TypeBdo } from '../../../../core/abstracts/type-html/bdo/bdo.abstract';
import { BdoProps } from '../../../../core/abstracts/type-html/bdo/bdo.interface';
import type { IBdo } from './bdo.interface';

export class Bdo extends TypeBdo implements IBdo {
  className: 'Bdo';
  constructor(params: BdoProps = {}) {
    super(params);
    this.className = 'Bdo';
  }
}
