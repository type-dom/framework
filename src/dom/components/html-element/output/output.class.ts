import { TypeOutput } from '../../../../core/components/type-html/output/output.abstract';
import { TypeOutputProps } from '../../../../core/components/type-html/output/output.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';

  override isBasic = true;

  constructor(params: TypeOutputProps = {}) {
    super();
    this.className = 'Output';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
