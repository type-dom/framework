import { TypeHtml } from '../type-html.abstract';
import type { ITypeVideo } from './video.interface';

export abstract class TypeVideo extends TypeHtml implements ITypeVideo {
  props: ITypeVideo['props'];
  dom?: HTMLVideoElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'video'
    })
  }
}
