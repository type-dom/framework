import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeDialog } from '../../../core/type-html/dialog/dialog.abstract';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Dialog';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
