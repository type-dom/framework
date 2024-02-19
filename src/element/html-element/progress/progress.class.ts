import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeProgress } from '../../../type-element/type-html/progress/progress.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IProgress } from './progress.interface';
export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Progress';
  }
}
