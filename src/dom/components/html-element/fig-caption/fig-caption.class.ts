import { TypeFigCaption } from '../../../../core/components/type-html/fig-caption/fig-caption.abstract';
import { FigCaptionProps } from '../../../../core/components/type-html/fig-caption/fig-caption.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';

  override isBasic = true;

  constructor(params: FigCaptionProps = {}) {
    super(params);
    this.className = 'FigCaption';
    transformSlot(this, params.slot);
  }
}
