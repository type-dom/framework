import { TypeHtml } from '../type-html.abstract';
import { ITypeIFrame, ITypeIFrameConfig } from './iframe.interface';

export abstract class TypeIFrame extends TypeHtml implements ITypeIFrame {
  props: ITypeIFrameConfig;
  dom?: HTMLIFrameElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'iframe'
    })
  }
}
