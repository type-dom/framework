import { TypeOutput } from '../../../../core/components/type-html/output/output.abstract';
import { OutputProps } from '../../../../core/components/type-html/output/output.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';

  override isBasic = true;

  constructor(params: OutputProps = {}) {
    super(params);
    this.className = 'Output';
    transformSlot(this, params.slot);
  }
}
