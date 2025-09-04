import { TypeCode } from '../../../../core/components/type-html/code/code.abstract';
import { TypeCodeProps } from '../../../../core/components/type-html/code/code.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ICode } from './code.interface';

export class Code extends TypeCode implements ICode {
  className: 'Code';

  override isBasic = true;

  constructor(params: TypeCodeProps = {}) {
    super();
    this.className = 'Code';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
