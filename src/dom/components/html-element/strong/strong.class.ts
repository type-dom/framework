import { TypeStrong } from '../../../../core/components/type-html/strong/strong.abstract';
import { TypeStrongProps } from '../../../../core/components/type-html/strong/strong.interface';
import type { IStrong } from './strong.interface';

export class Strong extends TypeStrong implements IStrong {
  className: 'Strong';

  override isBasic = true;

  constructor(params: TypeStrongProps = {}) {
    super();
    this.className = 'Strong';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
