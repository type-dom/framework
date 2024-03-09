import { ITypeConfig } from '../../../config.interface';
import { TypeCanvas } from '../../../type-element/type-html/canvas/canvas.abstract';
import type { ICanvas } from './canvas.interface';

export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Canvas';
    this.setConfig(config);
  }
}
