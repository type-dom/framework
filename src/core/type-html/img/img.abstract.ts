import { TypeHtml } from '../type-html.abstract';
import { ITypeImg, ITypeImgConfig } from './img.interface';

export abstract class TypeImg extends TypeHtml implements ITypeImg {
  props: ITypeImgConfig;
  dom?: HTMLImageElement;
  override childNodes: [];

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'img'
    });
    this.childNodes = [];
  }
}
