import { TypeIFrame } from '../../../../core/components/type-html/iframe/iframe.abstract';
import { TypeIFrameProps } from '../../../../core/components/type-html/iframe/iframe.interface';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  override isBasic = true;

  constructor(params: TypeIFrameProps = {}) {
    super();
    this.className = 'IFrame';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
