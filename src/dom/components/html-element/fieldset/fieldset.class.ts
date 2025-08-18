import { TypeFieldset } from '../../../../core/components/type-html/fieldset/fieldset.abstract';
import { TypeFieldsetProps } from '../../../../core/components/type-html/fieldset/fieldset.interface';
import type { IFieldset } from './fieldset.interface';

export class Fieldset extends TypeFieldset implements IFieldset {
  className: 'Fieldset';

  override isBasic = true;

  constructor(params: TypeFieldsetProps = {}) {
    super();
    this.className = 'Fieldset';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
