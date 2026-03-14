import { TypeFigCaption } from '../../../../core/abstracts/type-html/fig-caption/fig-caption.abstract';
import { FigCaptionProps } from '../../../../core/abstracts/type-html/fig-caption/fig-caption.interface';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';
  constructor(params: FigCaptionProps = {}) {
    super(params);
    this.className = 'FigCaption';
  }
}
