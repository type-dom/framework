import { TypeHtml } from '../type-html.abstract';
import { ITypeTrack, TrackProps } from './track.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeTrack<Props extends TrackProps = TrackProps> extends TypeHtml<Props> implements ITypeTrack {
  dom: HTMLTrackElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'track'
    } as Props));
    this.dom = document.createElement('track');
  }
}
