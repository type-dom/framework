import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeIns } from '../../../type-element/type-html/ins/ins.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IIns } from './ins.interface';
export class Ins extends TypeIns implements IIns {
  className: 'Ins';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Ins';
  }
}
