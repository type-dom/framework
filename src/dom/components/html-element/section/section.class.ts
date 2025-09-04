import { TypeSection } from '../../../../core/components/type-html/section/section.abstract';
import { TypeSectionProps } from '../../../../core/components/type-html/section/section.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  override isBasic = true;

  constructor(params: TypeSectionProps = {}) {
    super();
    this.className = 'Section';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
