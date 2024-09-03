import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeFigCaption } from '../../type-html/fig-caption/fig-caption.abstract';
import type { IFigCaption } from './fig-caption.interface';

export class FigCaption extends TypeFigCaption implements IFigCaption {
  className: 'FigCaption';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'FigCaption';
    this.setParams(params);
  }
}
