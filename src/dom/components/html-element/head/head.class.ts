import { TypeHead } from '../../../../core/components/type-html/head/head.abstract';
import { TypeHeadProps } from '../../../../core/components/type-html/head/head.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IHead } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';

  override isBasic = true;

  constructor(params: TypeHeadProps = {}) {
    super(params?.nodeName);
    this.className = 'Head';
    transformSlot(this, params?.slot);
    this.props = this.useParams(params);
  }
}
