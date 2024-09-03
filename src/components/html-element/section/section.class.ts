import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSection } from '../../type-html/section/section.abstract';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Section';
    this.ctrl.addStyleObj({
      display: 'flex',
      justifyContent: 'space-between',
    });
    this.ctrl.addAttrObj({
      name: 'section',
    });
    this.setParams(params);
  }
}
