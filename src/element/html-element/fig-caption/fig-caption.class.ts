import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeFigCaption } from '../../../type-element/type-html/fig-caption/fig-caption.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IFigCaption } from './fig-caption.interface';
export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'FigCaption';
  }
}
