import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeIFrame } from '../../../type-element/type-html/iframe/iframe.abstract';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'IFrame';
  }
}
