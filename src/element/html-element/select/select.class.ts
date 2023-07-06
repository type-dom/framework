import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { Option } from '../option/option.class';
import { ISelect } from './select.interface';

export class Select extends TypeHtml implements ISelect {
  nodeName: 'select';
  dom: HTMLSelectElement;
  className: 'Select';
  childNodes: Option[];
  value?: string | number | boolean;
  constructor(public parent: TypeHtml) {
    super('select');
    this.nodeName = 'select';
    this.dom = document.createElement(this.nodeName);
    this.className = 'Select';
    this.propObj.attrObj = {
      name: 'select'
    };
    this.childNodes = [];
  }
}
