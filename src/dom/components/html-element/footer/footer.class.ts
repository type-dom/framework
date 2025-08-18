import { TypeFooter } from '../../../../core/components/type-html/footer/footer.abstract';
import { TypeFooterProps } from '../../../../core/components/type-html/footer/footer.interface';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';

  override isBasic = true;

  constructor(params: TypeFooterProps = {}) {
    super();
    this.className = 'Footer';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
