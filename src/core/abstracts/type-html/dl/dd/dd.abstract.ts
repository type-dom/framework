import { TypeHtml } from '../../type-html.abstract';
import { ITypeDD, DDProps } from './dd.interface';

/**
 * 定义描述（definition description）
 * <dd> 元素（HTML 描述元素）用来指明一个描述列表 (<dl>) 元素中一个术语的描述。这个元素只能作为描述列表元素的子元素出现，并且必须跟着一个 <dt> 元素。
 */
export abstract class TypeDD<Props extends DDProps = DDProps> extends TypeHtml<Props> implements ITypeDD {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('dd');
  }
}
