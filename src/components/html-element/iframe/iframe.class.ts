import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeIFrame } from '../../../core/type-html/iframe/iframe.abstract';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'IFrame';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
