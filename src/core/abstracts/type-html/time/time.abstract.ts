import { TypeHtml } from '../type-html.abstract';
import { ITypeTime, TimeProps } from './time.interface';

export abstract class TypeTime<Props extends TimeProps = TimeProps> extends TypeHtml<Props> implements ITypeTime {
  dom: HTMLTimeElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('time');
  }
}
