import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeFigure } from '../../../core/type-html/figure/figure.abstract';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Figure';
    this.useParams(params);
  }
}
