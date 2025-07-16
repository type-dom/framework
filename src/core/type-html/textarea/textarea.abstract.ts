import { TypeHtml } from '../type-html.abstract';
import type { ITypeTextarea, TypeTextareaProps } from './textarea.interface';

export abstract class TypeTextarea extends TypeHtml implements ITypeTextarea {
  props: TypeTextareaProps;
  dom?: HTMLTextAreaElement;

  constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'textarea',
    })
  }
}
