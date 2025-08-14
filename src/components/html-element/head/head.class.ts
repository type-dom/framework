import { TypeHead } from '../../../core/type-html/head/head.abstract';
import { TypeHeadProps } from '../../../core/type-html/head/head.interface';
import type { IHead } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';

  override isBasic = true;

  constructor(params: TypeHeadProps = {}) {
    super(params?.nodeName);
    this.className = 'Head';
    this.slotChildren(params?.slot);
    this.props = this.useParams(params);
  }
}
