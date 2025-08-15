import { TypeHtml } from '../type-html.abstract';
import { ITypeImg, TypeImgProps } from './img.interface';

export abstract class TypeImg extends TypeHtml implements ITypeImg {
  props: TypeImgProps;
  dom?: HTMLImageElement;
  override childNodes: [];

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'img'
    });
    this.childNodes = [];
  }
}
