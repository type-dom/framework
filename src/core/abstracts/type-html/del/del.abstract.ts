import { TypeHtml } from '../type-html.abstract';
import { ITypeDel, DelProps } from './del.interface';

export abstract class TypeDel<Props extends DelProps = DelProps> extends TypeHtml<Props> implements ITypeDel {
  dom: HTMLModElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('del');
  }
}
