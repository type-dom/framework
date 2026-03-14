import { TypeIFrame } from '../../../../core/abstracts/type-html/iframe/iframe.abstract';
import { IFrameProps } from '../../../../core/abstracts/type-html/iframe/iframe.interface';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';
  constructor(params: IFrameProps = {}) {
    super(params);
    this.className = 'IFrame';
  }
}
