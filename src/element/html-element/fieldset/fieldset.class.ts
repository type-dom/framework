import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFieldset } from '../../../type-element/type-html/fieldset/fieldset.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IFieldset } from './fieldset.interface';
export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Fieldset';
  }
}
