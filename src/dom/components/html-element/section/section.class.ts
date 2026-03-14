import { TypeSection } from '../../../../core/abstracts/type-html/section/section.abstract';
import { SectionProps } from '../../../../core/abstracts/type-html/section/section.interface';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  constructor(params: SectionProps = {}) {
    super(params);
    this.className = 'Section';
  }
}
