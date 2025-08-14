import { TypeAside } from '../../../core/type-html/aside/aside.abstract';
import { TypeAsideProps } from '../../../core/type-html/aside/aside.interface';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';

  override isBasic = true;

  constructor(params: TypeAsideProps = {}) {
    super();
    this.className = 'Aside';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
