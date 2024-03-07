import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFigure } from '../../../type-element/type-html/figure/figure.abstract';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Figure';
  }
}
