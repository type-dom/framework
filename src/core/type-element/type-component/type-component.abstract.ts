import { TypeHtml } from '../type-html/type-html.abstract';
import type { ITypeComponent } from './type-component.interface';

/**
 * 组件基类
 */
export abstract class TypeComponent extends TypeHtml implements ITypeComponent {
  abstract override parent?: TypeHtml;
  nodeName: string;
  dom: HTMLElement;
  // childNodes: TypeNode[];
  // abstract setConfig(config: any): void
  protected constructor(nodeName = 'div') {
    super();
    this.nodeName = nodeName;
    this.dom = document.createElement(nodeName);
    this.childNodes = [];
  }
}
