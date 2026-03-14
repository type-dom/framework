import { TypeHtml } from '../type-html.abstract';
import { ITypeCanvas, CanvasProps } from './canvas.interface';

export abstract class TypeCanvas<Props extends CanvasProps = CanvasProps> extends TypeHtml<Props> implements ITypeCanvas {
  dom: HTMLCanvasElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('canvas');
  }
}
