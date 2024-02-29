import { TypeHtml } from '../type-html.abstract';
import type { ITypeDataList } from './data-list.interface';
export abstract class TypeDataList extends TypeHtml implements ITypeDataList {
  nodeName: 'datalist';
  dom: HTMLDataListElement;
  protected constructor() {
    super();
    this.nodeName = 'datalist';
    this.dom = document.createElement(this.nodeName);
  }
}
