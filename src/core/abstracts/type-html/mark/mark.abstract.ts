import { TypeHtml } from '../type-html.abstract';
import { ITypeMark, MarkProps } from './mark.interface';

export abstract class TypeMark<Props extends MarkProps = MarkProps> extends TypeHtml<Props> implements ITypeMark {
  dom: HTMLElement;
  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('mark');
  }
}
