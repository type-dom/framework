import { TypeHtml } from '../type-html.abstract';
import type { ITypeTextarea, ITypeTextareaConfig } from './textarea.interface';

export abstract class TypeTextarea extends TypeHtml implements ITypeTextarea {
  props: ITypeTextareaConfig;
  dom?: HTMLTextAreaElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'textarea',
    })
  }
}
