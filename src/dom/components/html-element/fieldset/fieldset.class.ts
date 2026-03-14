import { TypeFieldset } from '../../../../core/abstracts/type-html/fieldset/fieldset.abstract';
import { FieldsetProps } from '../../../../core/abstracts/type-html/fieldset/fieldset.interface';
import type { IFieldset } from './fieldset.interface';

export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';
  constructor(params: FieldsetProps = {}) {
    super(params);
    this.className = 'Fieldset';
  }
}
