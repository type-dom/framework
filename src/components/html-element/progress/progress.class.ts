import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeProgress } from '../../../core/type-html/progress/progress.abstract';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Progress';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
