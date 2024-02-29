import { TypeHtml } from '../type-html.abstract';
import type { ITypeAudio } from './audio.interface';
export abstract class TypeAudio extends TypeHtml implements ITypeAudio {
  nodeName: 'audio';
  dom: HTMLAudioElement;
  protected constructor() {
    super();
    this.nodeName = 'audio';
    this.dom = document.createElement(this.nodeName);
  }
}
