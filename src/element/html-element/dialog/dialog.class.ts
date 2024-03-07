import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDialog } from '../../../type-element/type-html/dialog/dialog.abstract';
import type { IDialog } from './dialog.interface';

export class Dialog extends TypeDialog implements IDialog {
  className: 'Dialog';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Dialog';
  }
}
