import { TypeImg } from '../../type-html/img/img.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Img';
    this.setProps(params);
  }
}
