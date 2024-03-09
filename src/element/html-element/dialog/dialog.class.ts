import { ITypeConfig } from '../../../config.interface';
import { TypeDialog } from '../../../type-element/type-html/dialog/dialog.abstract';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Dialog';
    this.setConfig(config);
  }
}
