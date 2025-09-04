import { TypeCanvas } from '../../../../core/components/type-html/canvas/canvas.abstract';
import { TypeCanvasProps } from '../../../../core/components/type-html/canvas/canvas.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ICanvas } from './canvas.interface';

export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';

  override isBasic = true;

  constructor(params: TypeCanvasProps = {}) {
    super();
    this.className = 'Canvas';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
