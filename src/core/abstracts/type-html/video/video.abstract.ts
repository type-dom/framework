import { TypeHtml } from '../type-html.abstract';
import type { ITypeVideo, VideoProps } from './video.interface';

export abstract class TypeVideo<Props extends VideoProps = VideoProps> extends TypeHtml<Props> implements ITypeVideo {
  dom: HTMLVideoElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('video');
  }
}
