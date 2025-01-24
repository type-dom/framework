import { TypeHtml } from '../type-html.abstract';
import { ITypePicture, ITypePictureConfig } from './picture.interface';

export abstract class TypePicture extends TypeHtml implements ITypePicture {
  props: ITypePictureConfig;
  dom?: HTMLPictureElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'picture'
    })
  }
}
