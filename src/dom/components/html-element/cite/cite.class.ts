import { TypeCite } from '../../../../core/abstracts/type-html/cite/cite.abstract';
import { CiteProps } from '../../../../core/abstracts/type-html/cite/cite.interface';
import type { ICite } from './cite.interface';

export class Cite extends TypeCite implements ICite {
  className: 'Cite';
  constructor(params: CiteProps = {}) {
    super(params);
    this.className = 'Cite';
  }
}
