import { TypeDialog } from '../../../../core/components/type-html/dialog/dialog.abstract';
import { DialogProps } from '../../../../core/components/type-html/dialog/dialog.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  override isBasic = true;

  constructor(params: DialogProps = {}) {
    super(params);
    this.className = 'Dialog';
    transformSlot(this, params.slot);
  }
}
