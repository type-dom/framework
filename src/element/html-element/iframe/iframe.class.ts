import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeIFrame } from '../../../type-element/type-html/iframe/iframe.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'IFrame';
  }
}
