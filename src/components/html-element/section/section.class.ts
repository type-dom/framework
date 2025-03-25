import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSection } from '../../../core/type-html/section/section.abstract';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Section';
    this.style.addObj({
      display: 'flex',
      justifyContent: 'space-between',
    });
    this.attr.addObj({
      name: 'section',
    });
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
