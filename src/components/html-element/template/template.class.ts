import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeTemplate } from '../../../core/type-html/template/template.abstract';
import type { ITemplate } from './template.interface';

export class Template extends TypeTemplate implements ITemplate {
  className: 'Template';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Template';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
