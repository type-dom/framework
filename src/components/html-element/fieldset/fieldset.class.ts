import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeFieldset } from '../../../core/type-html/fieldset/fieldset.abstract';
import type { IFieldset } from './fieldset.interface';

export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Fieldset';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
