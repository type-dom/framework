import { TypeDialog } from '../../../../core/abstracts/type-html/dialog/dialog.abstract';
import { DialogProps } from '../../../../core/abstracts/type-html/dialog/dialog.interface';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';
  constructor(params: DialogProps = {}) {
    super(params);
    this.className = 'Dialog';
  }
}
