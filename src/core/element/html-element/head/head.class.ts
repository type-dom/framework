import { TypeHead } from '../../../type-element/type-html/head/head.abstract';
import type { IHead, IHeadConfig } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';

  constructor(config?: Partial<IHeadConfig>) {
    super(config?.nodeName);
    this.className = 'Head';
    this.setConfig(config);
  }
}
