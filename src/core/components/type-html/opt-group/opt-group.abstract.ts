import { TypeHtml } from '../type-html.abstract';
import { ITypeOptGroup, OptGroupProps } from './opt-group.interface';

export abstract class TypeOptGroup<Props extends OptGroupProps = OptGroupProps> extends TypeHtml<Props> implements ITypeOptGroup {
  dom: HTMLOptGroupElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'optgroup'
    } as Props);
    this.dom = document.createElement('optgroup');
  }
}
