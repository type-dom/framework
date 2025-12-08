import { TypeHtml } from '../type-html.abstract';
import { ITypeTime, TimeProps } from './time.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeTime<Props extends TimeProps = TimeProps> extends TypeHtml<Props> implements ITypeTime {
  dom: HTMLTimeElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'time'
    } as Props));
    this.dom = document.createElement('time');
  }
}
