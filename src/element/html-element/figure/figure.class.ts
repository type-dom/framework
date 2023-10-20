import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFigure } from '../../../type-element/type-html/figure/figure.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IFigure } from './figure.interface';
export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Figure';
  }
}
