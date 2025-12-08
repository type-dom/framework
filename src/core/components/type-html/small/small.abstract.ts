import { TypeHtml } from '../type-html.abstract';
import { ITypeSmall, SmallProps } from './small.interface';

export abstract class TypeSmall<Props extends SmallProps = SmallProps> extends TypeHtml<Props> implements ITypeSmall {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'small'
    } as Props);
    this.dom = document.createElement('small');
  }
}
