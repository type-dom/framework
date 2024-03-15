import { ITypeConfig } from '../../../config.interface';
import { TypeSection } from '../../../type-element/type-html/section/section.abstract';
import { StyleDisplay } from '../../../style/style.enum';
import type { ISection } from './section.interface';

export class Section extends TypeSection implements ISection {
  className: 'Section';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Section';
    this.propObj = {
      styleObj: {
        display: StyleDisplay.flex,
        justifyContent: 'space-between'
      },
      attrObj: {
        name: 'section'
      }
    };
    this.setConfig(config);
  }
}
