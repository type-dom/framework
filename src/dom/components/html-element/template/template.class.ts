import { TypeTemplate } from '../../../../core/abstracts/type-html/template/template.abstract';
import { TemplateProps } from '../../../../core/abstracts/type-html/template/template.interface';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  constructor(params: TemplateProps = {}) {
    super(params);
    this.className = 'Template';
  }
}
