import { TypeHtml } from '../type-html.abstract';
import { ITypeDfn, DfnProps } from './dfn.interface';

export abstract class TypeDfn<Props extends DfnProps = DfnProps> extends TypeHtml<Props> implements ITypeDfn {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'dfn'
    } as Props);
    this.dom = document.createElement('dfn');
  }
}
