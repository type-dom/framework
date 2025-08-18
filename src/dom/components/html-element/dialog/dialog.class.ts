import { TypeDialog } from '../../../../core/components/type-html/dialog/dialog.abstract';
import { TypeDialogProps } from '../../../../core/components/type-html/dialog/dialog.interface';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  override isBasic = true;

  constructor(params: TypeDialogProps = {}) {
    super();
    this.className = 'Dialog';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
