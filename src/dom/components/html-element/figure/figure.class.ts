import { TypeFigure } from '../../../../core/components/type-html/figure/figure.abstract';
import { FigureProps } from '../../../../core/components/type-html/figure/figure.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';

  override isBasic = true;

  constructor(params: FigureProps = {}) {
    super(params);
    this.className = 'Figure';
    transformSlot(this, params.slot);
  }
}
