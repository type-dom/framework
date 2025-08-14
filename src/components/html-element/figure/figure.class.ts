import { TypeFigure } from '../../../core/type-html/figure/figure.abstract';
import { TypeFigureProps } from '../../../core/type-html/figure/figure.interface';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';

  override isBasic = true;

  constructor(params: TypeFigureProps = {}) {
    super();
    this.className = 'Figure';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
