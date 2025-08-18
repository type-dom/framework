import { TypeFigCaption } from '../../../../core/components/type-html/fig-caption/fig-caption.abstract';
import { TypeFigCaptionProps } from '../../../../core/components/type-html/fig-caption/fig-caption.interface';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';

  override isBasic = true;

  constructor(params: TypeFigCaptionProps = {}) {
    super();
    this.className = 'FigCaption';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
