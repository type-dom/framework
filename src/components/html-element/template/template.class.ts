import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeTemplate } from '../../type-html/template/template.abstract';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Template';
    this.setParams(params);
  }
}
