import { TypeImg } from '../../../type-html/img/img.abstract';
import type { ITypeConfig } from '../../../type-node/type-node.interface';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';

  constructor(config?: ITypeConfig) {
    super();
    this.className = 'Img';
    this.setConfig(config);
  }
}
