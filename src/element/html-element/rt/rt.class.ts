import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeRt } from '../../../type-element/type-html/rt/rt.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Rt';
  }
}
