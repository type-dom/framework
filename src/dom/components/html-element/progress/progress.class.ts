import { TypeProgress } from '../../../../core/components/type-html/progress/progress.abstract';
import { TypeProgressProps } from '../../../../core/components/type-html/progress/progress.interface';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';

  override isBasic = true;

  constructor(params: TypeProgressProps = {}) {
    super();
    this.className = 'Progress';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
