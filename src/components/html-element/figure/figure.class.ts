import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeFigure } from '../../../core/type-html/figure/figure.abstract';
import type { IFigure } from './figure.interface';

export class Figure extends TypeFigure implements IFigure {
  className: 'Figure';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Figure';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
