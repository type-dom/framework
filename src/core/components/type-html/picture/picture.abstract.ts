import { TypeHtml } from '../type-html.abstract';
import { ITypePicture, TypePictureProps } from './picture.interface';

export abstract class TypePicture extends TypeHtml implements ITypePicture {
  props: TypePictureProps;
  dom?: HTMLPictureElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'picture'
    })
  }
}
