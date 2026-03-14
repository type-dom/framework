import { TypeFigure } from '../../../../core/abstracts/type-html/figure/figure.abstract';
import { FigureProps } from '../../../../core/abstracts/type-html/figure/figure.interface';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';
  constructor(params: FigureProps = {}) {
    super(params);
    this.className = 'Figure';
  }
}
