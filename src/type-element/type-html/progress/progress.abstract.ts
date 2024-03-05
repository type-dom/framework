import { TypeHtml } from '../type-html.abstract';
import type { ITypeProgress } from './progress.interface';

export abstract class TypeProgress extends TypeHtml implements ITypeProgress {
  nodeName: 'progress';
  dom: HTMLProgressElement;

  protected constructor() {
    super();
    this.nodeName = 'progress';
    this.dom = document.createElement(this.nodeName);
  }
}
