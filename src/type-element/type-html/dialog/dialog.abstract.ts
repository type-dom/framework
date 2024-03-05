import { TypeHtml } from '../type-html.abstract';
import type { ITypeDialog } from './dialog.interface';

export abstract class TypeDialog extends TypeHtml implements ITypeDialog {
  nodeName: 'dialog';
  dom: HTMLDialogElement;

  protected constructor() {
    super();
    this.nodeName = 'dialog';
    this.dom = document.createElement(this.nodeName);
  }
}
