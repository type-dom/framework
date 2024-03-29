import { TypeHtml } from '../type-html.abstract';
import type { ITypeBdi } from './bdi.interface';

export abstract class TypeBdi extends TypeHtml implements ITypeBdi {
  nodeName: 'bdi';
  dom: HTMLElement;

  protected constructor() {
    super();
    this.nodeName = 'bdi';
    this.dom = document.createElement(this.nodeName);
  }
}
