import { TypeCanvas } from '../../../../core/abstracts/type-html/canvas/canvas.abstract';
import { CanvasProps } from '../../../../core/abstracts/type-html/canvas/canvas.interface';
import type { ICanvas } from './canvas.interface';

export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';
  constructor(params: CanvasProps = {}) {
    super(params);
    this.className = 'Canvas';
  }
}
