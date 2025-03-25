import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeAbbr } from '../../../core/type-html/abbr/abbr.abstract';
import type { IAbbr } from './abbr.interface';

export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';
  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Abbr';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
