import { FormEditor } from '../../../src/form-editor';
import { Overlay } from '../overlay/overlay.abstract';
export class WebDialog extends Overlay {
  className: 'WebDialog';
  constructor(public parent: FormEditor) {
    super();
    this.className = 'WebDialog';
    this.addAttrObj({
      name: 'editor-dialog',
    });
  }
}
