import { TypeHtml } from '../type-html.abstract';
import { ITypePicture, PictureProps } from './picture.interface';

export abstract class TypePicture<Props extends PictureProps = PictureProps> extends TypeHtml<Props> implements ITypePicture {
  dom: HTMLPictureElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'picture'
    } as Props);
    this.dom = document.createElement('picture');
  }
}
