import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeFieldset } from '../../../type-element/type-html/fieldset/fieldset.abstract';
import type { IFieldset } from './fieldset.interface';

export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Fieldset';
    this.setConfig(config);
  }
}
