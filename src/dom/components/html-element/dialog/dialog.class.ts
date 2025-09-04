import { TypeDialog } from '../../../../core/components/type-html/dialog/dialog.abstract';
import { TypeDialogProps } from '../../../../core/components/type-html/dialog/dialog.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  override isBasic = true;

  constructor(params: TypeDialogProps = {}) {
    super();
    this.className = 'Dialog';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
