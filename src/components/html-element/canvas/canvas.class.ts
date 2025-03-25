import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeCanvas } from '../../../core/type-html/canvas/canvas.abstract';
import type { ICanvas } from './canvas.interface';

export class Canvas extends TypeCanvas implements ICanvas {
  className: 'Canvas';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Canvas';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
