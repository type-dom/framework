import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeIFrame } from '../../type-html/iframe/iframe.abstract';
import type { IIFrame } from './iframe.interface';

export class IFrame extends TypeIFrame implements IIFrame {
  className: 'IFrame';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'IFrame';
    this.setProps(params);
  }
}
