import { TypeIFrame } from '../../../../core/components/type-html/iframe/iframe.abstract';
import { IFrameProps } from '../../../../core/components/type-html/iframe/iframe.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  override isBasic = true;

  constructor(params: IFrameProps = {}) {
    super(params);
    this.className = 'IFrame';
    transformSlot(this, params.slot);
  }
}
