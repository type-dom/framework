import { TypeHtml } from '../type-html.abstract';
import { ITypeIFrame, TypeIFrameProps } from './iframe.interface';

export abstract class TypeIFrame extends TypeHtml implements ITypeIFrame {
  props: TypeIFrameProps;
  dom?: HTMLIFrameElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'iframe'
    })
  }
}
