import { TypeTemplate } from '../../../../core/components/type-html/template/template.abstract';
import { TypeTemplateProps } from '../../../../core/components/type-html/template/template.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  override isBasic = true;

  constructor(params: TypeTemplateProps = {}) {
    super();
    this.className = 'Template';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
