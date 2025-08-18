import { TypeIns } from '../../../../core/components/type-html/ins/ins.abstract';
import { TypeInsProps } from '../../../../core/components/type-html/ins/ins.interface';
import type { IIns } from './ins.interface';

export class Ins extends TypeIns implements IIns {
  className: 'Ins';

  override isBasic = true;

  constructor(params: TypeInsProps = {}) {
    super();
    this.className = 'Ins';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
