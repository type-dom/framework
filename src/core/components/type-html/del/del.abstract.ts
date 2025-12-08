import { TypeHtml } from '../type-html.abstract';
import { ITypeDel, DelProps } from './del.interface';

export abstract class TypeDel<Props extends DelProps = DelProps> extends TypeHtml<Props> implements ITypeDel {
  dom: HTMLModElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'del'
    } as Props);
    this.dom = document.createElement('del');
  }
}
