import { TypeHtml } from '../type-html.abstract';
import { ITypeFigure, ITypeFigureConfig } from './figure.interface';

export abstract class TypeFigure extends TypeHtml implements ITypeFigure {
  props: ITypeFigureConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'figure'
    })
  }
}
