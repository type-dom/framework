import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFieldset } from '../../../type-element/type-html/fieldset/fieldset.abstract';
import type { IFieldset } from './fieldset.interface';

export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Fieldset';
  }
}
