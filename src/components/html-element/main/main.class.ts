import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeMain } from '../../../core/type-html/main/main.abstract';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Main';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
