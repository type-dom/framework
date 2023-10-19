import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCaption } from './caption.interface';
export abstract class TypeTableCaption extends TypeHtml implements ITypeTableCaption {
  nodeName: 'caption';
  dom: HTMLTableCaptionElement;
  protected constructor() {
    super();
    this.nodeName = 'caption';
    this.dom = document.createElement(this.nodeName);
  }
}
