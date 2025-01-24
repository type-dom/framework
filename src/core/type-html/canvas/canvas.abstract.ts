import { TypeHtml } from '../type-html.abstract';
import { ITypeCanvas, ITypeCanvasConfig } from './canvas.interface';

export abstract class TypeCanvas extends TypeHtml implements ITypeCanvas {
  props: ITypeCanvasConfig;
  dom?: HTMLCanvasElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'canvas'
    })
  }
}
