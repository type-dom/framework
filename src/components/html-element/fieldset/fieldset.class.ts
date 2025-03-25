import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeFieldset } from '../../../core/type-html/fieldset/fieldset.abstract';
import type { IFieldset } from './fieldset.interface';

export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Fieldset';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
