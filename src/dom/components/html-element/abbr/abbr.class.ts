import { TypeAbbr } from '../../../../core/components/type-html/abbr/abbr.abstract';
import { TypeAbbrProps } from '../../../../core/components/type-html/abbr/abbr.interface';
import type { IAbbr } from './abbr.interface';

export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';
  override isBasic = true;

  constructor(params: TypeAbbrProps = {}) {
    super();
    this.className = 'Abbr';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
