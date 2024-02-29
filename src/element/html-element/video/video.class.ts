import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeVideo } from '../../../type-element/type-html/video/video.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IVideo } from './video.interface';
export class Video extends TypeVideo implements IVideo {
  className: 'Video';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Video';
  }
}
