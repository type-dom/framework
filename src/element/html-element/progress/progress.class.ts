import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeProgress } from '../../../type-element/type-html/progress/progress.abstract';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Progress';
  }
}
