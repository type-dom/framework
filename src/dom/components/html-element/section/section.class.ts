import { TypeSection } from '../../../../core/components/type-html/section/section.abstract';
import { SectionProps } from '../../../../core/components/type-html/section/section.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  override isBasic = true;

  constructor(params: SectionProps = {}) {
    super(params);
    this.className = 'Section';
    transformSlot(this, params.slot);
  }
}
