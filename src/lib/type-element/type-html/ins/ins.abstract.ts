import { TypeHtml } from '../type-html.abstract';
import type { ITypeIns } from './ins.interface';

export abstract class TypeIns extends TypeHtml implements ITypeIns {
  nodeName: 'ins';
  dom: HTMLModElement;

  protected constructor() {
    super();
    this.nodeName = 'ins';
    this.dom = document.createElement(this.nodeName);
  }
}
