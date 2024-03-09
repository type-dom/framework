import { ITypeConfig } from '../../../config.interface';
import { TypeTemplate } from '../../../type-element/type-html/template/template.abstract';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Template';
    this.setConfig(config);
  }
}
