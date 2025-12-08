import { TypeHtml } from '../type-html.abstract';
import { ITypeAudio, AudioProps } from './audio.interface';

export abstract class TypeAudio<Props extends AudioProps = AudioProps> extends TypeHtml<Props> implements ITypeAudio {
  dom: HTMLAudioElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'audio'
    } as Props);
    this.dom = document.createElement('audio');
  }
}
