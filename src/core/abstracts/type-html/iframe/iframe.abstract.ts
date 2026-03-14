import { TypeHtml } from '../type-html.abstract';
import { ITypeIFrame, IFrameProps } from './iframe.interface';

export abstract class TypeIFrame<Props extends IFrameProps = IFrameProps> extends TypeHtml<Props> implements ITypeIFrame {
  dom: HTMLIFrameElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('iframe');
  }
}
