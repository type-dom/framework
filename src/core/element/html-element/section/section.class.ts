import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeSection } from '../../../type-html/section/section.abstract';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Section';
    this.styleObj = {
      display: 'flex',
      justifyContent: 'space-between',
    };
    this.attrObj = {
      name: 'section',
    };
    this.setConfig(config);
  }
}
