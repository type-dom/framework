import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeOutput } from '../../../type-element/type-html/output/output.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';

  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Output';
  }
}
