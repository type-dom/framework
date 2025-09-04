import { TypeIFrame } from '../../../../core/components/type-html/iframe/iframe.abstract';
import { TypeIFrameProps } from '../../../../core/components/type-html/iframe/iframe.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  override isBasic = true;

  constructor(params: TypeIFrameProps = {}) {
    super();
    this.className = 'IFrame';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
