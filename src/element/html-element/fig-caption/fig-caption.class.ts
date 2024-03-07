import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFigCaption } from '../../../type-element/type-html/fig-caption/fig-caption.abstract';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'FigCaption';
  }
}
