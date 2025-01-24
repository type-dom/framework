import { TypeHtml } from '../type-html.abstract';
import { ITypeTrack, ITypeTrackConfig } from './track.interface';

export abstract class TypeTrack extends TypeHtml implements ITypeTrack {
  props: ITypeTrackConfig;
  dom?: HTMLTrackElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'track'
    })
  }
}
