import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSection } from '../../../type-element/type-html/section/section.abstract';
import { XElement } from '../../x-element/x-element.class';
import { Display } from '../../../style/style.enum';
import { ISection } from './section.interface';
export class Section extends TypeSection implements ISection {
  className: 'Section';
  constructor(public parent: TypeHtml | XElement) {
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
