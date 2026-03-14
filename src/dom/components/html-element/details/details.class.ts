import { TypeDetails } from '../../../../core/abstracts/type-html/details/details.abstract';
import { DetailsProps } from '../../../../core/abstracts/type-html/details/details.interface';
import type { IDetails } from './details.interface';

export class Details extends TypeDetails implements IDetails {
  className: 'Details';
  constructor(params: DetailsProps = {}) {
    super(params);
    this.className = 'Details';
  }
}
