import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeAbbr } from '../../../core/type-html/abbr/abbr.abstract';
import type { IAbbr } from './abbr.interface';

export class Abbr extends TypeAbbr implements IAbbr {
  className: 'Abbr';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Abbr';
    this.useParams(params);
  }
}
