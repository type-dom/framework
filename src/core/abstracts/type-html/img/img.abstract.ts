import { TypeHtml } from '../type-html.abstract';
import { ITypeImg, ImgProps } from './img.interface';

export abstract class TypeImg<Props extends ImgProps = ImgProps> extends TypeHtml<Props> implements ITypeImg {
  dom: HTMLImageElement;
  override childNodes: [];

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('img');
    this.childNodes = [];
  }
}
