import { TypeHtml } from '../type-html.abstract';
import { ITypeTrack, TypeTrackProps } from './track.interface';

export abstract class TypeTrack extends TypeHtml implements ITypeTrack {
  props: TypeTrackProps;
  dom?: HTMLTrackElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'track'
    })
  }
}
