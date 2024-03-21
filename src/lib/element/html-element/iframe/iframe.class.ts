import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeIFrame } from '../../../type-element/type-html/iframe/iframe.abstract';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'IFrame';
    this.setConfig(config);
  }
}
