import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeOutput } from '../../../core/type-html/output/output.abstract';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Output';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
