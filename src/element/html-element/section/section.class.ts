import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSection } from '../../../type-element/type-html/section/section.abstract';
import { XElement } from '../../x-element/x-element.class';
import { StyleDisplay } from '../../../style/style.enum';
import type { ISection } from './section.interface';
export class Section extends TypeSection implements ISection {
  className: 'Section';
  constructor(public parent?: TypeHtml | XElement) {
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
  }
}
