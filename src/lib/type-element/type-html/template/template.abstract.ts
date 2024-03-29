import { TypeHtml } from '../type-html.abstract';
import type { ITypeTemplate } from './template.interface';

export abstract class TypeTemplate extends TypeHtml implements ITypeTemplate {
  nodeName: 'template';
  dom: HTMLTemplateElement;

  protected constructor() {
    super();
    this.nodeName = 'template';
    this.dom = document.createElement(this.nodeName);
  }
}
