import { TypeHtml } from '../type-html.abstract';
import { ITypeImg } from './img.interface';
export abstract class TypeImg extends TypeHtml implements ITypeImg {
  nodeName: 'img';
  dom: HTMLImageElement;
  protected constructor() {
    super();
    this.nodeName = 'img';
    this.dom = document.createElement(this.nodeName);
  }
}
