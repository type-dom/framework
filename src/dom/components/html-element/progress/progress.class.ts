import { TypeProgress } from '../../../../core/components/type-html/progress/progress.abstract';
import { ProgressProps } from '../../../../core/components/type-html/progress/progress.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IProgress } from './progress.interface';

export class Progress extends TypeProgress implements IProgress {
  className: 'Progress';

  override isBasic = true;

  constructor(params: ProgressProps = {}) {
    super(params);
    this.className = 'Progress';
    transformSlot(this, params.slot);
  }
}
