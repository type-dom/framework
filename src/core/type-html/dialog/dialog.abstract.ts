import { TypeHtml } from '../type-html.abstract';
import { ITypeDialog, TypeDialogProps } from './dialog.interface';

export abstract class TypeDialog extends TypeHtml implements ITypeDialog {
  props: TypeDialogProps;
  dom?: HTMLDialogElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'dialog'
    })
  }
}
