import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeProgress } from '../../type-html/progress/progress.abstract';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Progress';
    this.setParams(params);
  }
}
