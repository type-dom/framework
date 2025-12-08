import { TypeCanvas } from '../../../../core/components/type-html/canvas/canvas.abstract';
import { CanvasProps } from '../../../../core/components/type-html/canvas/canvas.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ICanvas } from './canvas.interface';

export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';

  override isBasic = true;

  constructor(params: CanvasProps = {}) {
    super(params);
    this.className = 'Canvas';
    transformSlot(this, params.slot);
  }
}
