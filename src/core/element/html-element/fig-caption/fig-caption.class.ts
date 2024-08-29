import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeFigCaption } from '../../../type-html/fig-caption/fig-caption.abstract';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'FigCaption';
    this.setConfig(config);
  }
}
