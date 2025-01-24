import { TypeHtml } from '../type-html.abstract';
import { ITypeDialog, ITypeDialogConfig } from './dialog.interface';

export abstract class TypeDialog extends TypeHtml implements ITypeDialog {
  props: ITypeDialogConfig;
  dom?: HTMLDialogElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'dialog'
    })
  }
}
