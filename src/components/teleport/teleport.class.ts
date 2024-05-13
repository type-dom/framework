import { TypeElement } from '../../core/type-element/type-element.abstract';

export class Teleport extends TypeElement {
  className: 'Teleport';
  dom?: HTMLElement;
  nodeName: 'div';
  constructor() {
    super();
    this.className = 'Teleport';
    this.nodeName = 'div';
    this.addAttrName('teleport');
  }
}
