import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTrack } from '../../../type-element/type-html/track/track.abstract';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Track';
  }
}
