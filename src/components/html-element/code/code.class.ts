import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeCode } from '../../../core/type-html/code/code.abstract';
import type { ICode } from './code.interface';

export class Code extends TypeCode implements ICode {
  className: 'Code';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Code';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
