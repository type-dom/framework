import { TypeHtml } from '../type-html.abstract';
import { ITypeFigure, FigureProps } from './figure.interface';

export abstract class TypeFigure<Props extends FigureProps = FigureProps> extends TypeHtml<Props> implements ITypeFigure {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('figure');
  }
}
