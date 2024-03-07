import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeAudio } from '../../../type-element/type-html/audio/audio.abstract';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Audio';
  }
}
