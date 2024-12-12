import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSection } from '../../../core/type-html/section/section.abstract';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Section';
    this.style.addObj({
      display: 'flex',
      justifyContent: 'space-between'
    });
    this.attr.addObj({
      name: 'section'
    });
    this.useParams(params);
  }
}
