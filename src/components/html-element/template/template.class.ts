import { TypeTemplate } from '../../../core/type-html/template/template.abstract';
import { TypeTemplateProps } from '../../../core/type-html/template/template.interface';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  override isBasic = true;

  constructor(params: TypeTemplateProps = {}) {
    super();
    this.className = 'Template';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
