import { TypeMain } from '../../../../core/components/type-html/main/main.abstract';
import { MainProps } from '../../../../core/components/type-html/main/main.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';

  override isBasic = true;

  constructor(params: MainProps = {}) {
    super(params);
    this.className = 'Main';
    transformSlot(this, params.slot);
  }
}
