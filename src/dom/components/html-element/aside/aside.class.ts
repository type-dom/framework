import { TypeAside } from '../../../../core/components/type-html/aside/aside.abstract';
import { TypeAsideProps } from '../../../../core/components/type-html/aside/aside.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';

  override isBasic = true;

  constructor(params: TypeAsideProps = {}) {
    super();
    this.className = 'Aside';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
