import { TypeHtml } from '../type-html.abstract';
import type { ITypeVideo, VideoProps } from './video.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeVideo<Props extends VideoProps = VideoProps> extends TypeHtml<Props> implements ITypeVideo {
  dom: HTMLVideoElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'video'
    } as Props));
    this.dom = document.createElement('video');
  }
}
