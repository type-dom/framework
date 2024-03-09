import { ITypeConfig } from '../../../config.interface';
import { TypeFigure } from '../../../type-element/type-html/figure/figure.abstract';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Figure';
    this.setConfig(config);
  }
}
