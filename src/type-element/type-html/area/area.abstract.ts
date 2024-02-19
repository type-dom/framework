import { TypeHtml } from '../type-html.abstract';
import type { ITypeArea } from './area.interface';
export abstract class TypeArea extends TypeHtml implements ITypeArea {
  nodeName: 'area';
  dom: HTMLAreaElement;
  protected constructor() {
    super();
    this.nodeName = 'area';
    this.dom = document.createElement(this.nodeName);
  }
}
