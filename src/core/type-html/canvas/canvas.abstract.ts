import { TypeHtml } from '../type-html.abstract';
import { ITypeCanvas, TypeCanvasProps } from './canvas.interface';

export abstract class TypeCanvas extends TypeHtml implements ITypeCanvas {
  props: TypeCanvasProps;
  dom?: HTMLCanvasElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'canvas'
    })
  }
}
