import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeFooter } from '../../../core/type-html/footer/footer.abstract';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Footer';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
