import { TypeMain } from '../../../../core/components/type-html/main/main.abstract';
import { TypeMainProps } from '../../../../core/components/type-html/main/main.interface';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';

  override isBasic = true;

  constructor(params: TypeMainProps = {}) {
    super();
    this.className = 'Main';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
