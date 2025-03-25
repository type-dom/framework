import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeFigCaption } from '../../../core/type-html/fig-caption/fig-caption.abstract';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'FigCaption';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
