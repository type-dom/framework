import { TypeHtml } from '../type-html.abstract';
import { ITypeAudio, ITypeAudioConfig } from './audio.interface';

export abstract class TypeAudio extends TypeHtml implements ITypeAudio {
  props: ITypeAudioConfig;
  dom?: HTMLAudioElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'audio'
    })
  }
}
