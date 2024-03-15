import { TypeImg } from '../../../type-element/type-html/img/img.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { IImg } from './img.interface';

export class Img extends TypeImg implements IImg {
  className: 'Img';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Img';
    this.setConfig(config);
  }
}
