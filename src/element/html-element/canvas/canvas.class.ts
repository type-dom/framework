import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeCanvas } from '../../../type-element/type-html/canvas/canvas.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { ICanvas } from './canvas.interface';
export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Canvas';
  }
}
