import { TypeElement } from '../../../type-element/type-element.abstract';
import { TypeSection } from '../../../type-element/type-html/section/section.abstract';
import { Display } from '../../../style/style.enum';
import { ISection } from './section.interface';
export class Section extends TypeSection implements ISection {
  className: 'Section';
  constructor(public parent: TypeElement) {
    super();
    this.className = 'Section';
    this.propObj = {
      styleObj: {
        display: Display.flex,
        justifyContent: 'space-between'
      },
      attrObj: {
        name: 'section'
      }
    };
  }
}
