import { ITypeConfig } from '../../../config.interface';
import { TypeProgress } from '../../../type-element/type-html/progress/progress.abstract';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Progress';
    this.setConfig(config);
  }
}
