import { TypeHtml } from '../type-html.abstract';
import { ITypeFigure, TypeFigureProps } from './figure.interface';

export abstract class TypeFigure extends TypeHtml implements ITypeFigure {
  props: TypeFigureProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'figure'
    })
  }
}
