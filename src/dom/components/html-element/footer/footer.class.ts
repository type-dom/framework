import { TypeFooter } from '../../../../core/components/type-html/footer/footer.abstract';
import { TypeFooterProps } from '../../../../core/components/type-html/footer/footer.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';

  override isBasic = true;

  constructor(params: TypeFooterProps = {}) {
    super();
    this.className = 'Footer';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
