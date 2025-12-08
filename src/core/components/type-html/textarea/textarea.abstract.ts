import { defaultProps } from '../../../helpers/defaultProps';
import { TypeHtml } from '../type-html.abstract';
import type { ITypeTextarea, TextareaProps } from './textarea.interface';

export abstract class TypeTextarea<Props extends TextareaProps = TextareaProps> extends TypeHtml<Props> implements ITypeTextarea {
  dom: HTMLTextAreaElement;

  constructor(params: Props = {} as Props) {
    super(defaultProps(params, {
      nodeName: 'textarea',
    } as Props));
    this.dom = document.createElement('textarea');
  }
}
