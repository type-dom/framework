import { TypeProgress } from '../../../../core/abstracts/type-html/progress/progress.abstract';
import { ProgressProps } from '../../../../core/abstracts/type-html/progress/progress.interface';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';
  constructor(params: ProgressProps = {}) {
    super(params);
    this.className = 'Progress';
  }
}
