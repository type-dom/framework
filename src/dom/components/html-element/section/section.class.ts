import { TypeSection } from '../../../../core/components/type-html/section/section.abstract';
import { TypeSectionProps } from '../../../../core/components/type-html/section/section.interface';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  override isBasic = true;

  constructor(params: TypeSectionProps = {}) {
    super();
    this.className = 'Section';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
