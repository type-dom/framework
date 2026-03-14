import { TypeHtml } from '../type-html.abstract';
import { ITypeTrack, TrackProps } from './track.interface';

export abstract class TypeTrack<Props extends TrackProps = TrackProps> extends TypeHtml<Props> implements ITypeTrack {
  dom: HTMLTrackElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('track');
  }
}
