import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeDialog } from '../../../core/type-html/dialog/dialog.abstract';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Dialog';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
