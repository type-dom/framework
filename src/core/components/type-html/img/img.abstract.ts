import { TypeHtml } from '../type-html.abstract';
import { ITypeImg, ImgProps } from './img.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeImg<Props extends ImgProps = ImgProps> extends TypeHtml<Props> implements ITypeImg {
  dom: HTMLImageElement;
  override childNodes: [];

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'img'
    } as Props));
    this.dom = document.createElement('img');
    this.childNodes = [];
  }
}
