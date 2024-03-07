import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTemplate } from '../../../type-element/type-html/template/template.abstract';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Template';
  }
}
