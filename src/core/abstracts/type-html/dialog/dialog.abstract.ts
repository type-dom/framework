import { TypeHtml } from '../type-html.abstract';
import { ITypeDialog, DialogProps } from './dialog.interface';

export abstract class TypeDialog<Props extends DialogProps = DialogProps> extends TypeHtml<Props> implements ITypeDialog {
  dom: HTMLDialogElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('dialog');
  }
}
