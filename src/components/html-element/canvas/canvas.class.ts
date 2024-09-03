import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeCanvas } from '../../type-html/canvas/canvas.abstract';
import type { ICanvas } from './canvas.interface';

export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Canvas';
    this.setParams(params);
  }
}
