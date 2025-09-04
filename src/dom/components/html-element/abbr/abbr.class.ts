import { TypeAbbr } from '../../../../core/components/type-html/abbr/abbr.abstract';
import { TypeAbbrProps } from '../../../../core/components/type-html/abbr/abbr.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IAbbr } from './abbr.interface';

export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';
  override isBasic = true;

  constructor(params: TypeAbbrProps = {}) {
    super();
    this.className = 'Abbr';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
