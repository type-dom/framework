import { TypeHtml } from '../type-html.abstract';
import { ITypeAudio, TypeAudioProps } from './audio.interface';

export abstract class TypeAudio extends TypeHtml implements ITypeAudio {
  props: TypeAudioProps;
  dom?: HTMLAudioElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'audio'
    })
  }
}
