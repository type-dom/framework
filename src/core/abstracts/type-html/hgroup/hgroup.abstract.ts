import { TypeHtml } from '../type-html.abstract';
import { ITypeHGroup, HGroupProps } from './hgroup.interface';

/**
 * <hgroup> HTML 元素代表文档标题和与标题相关联的内容，它将一个 <h1>–<h6> 元素与一个或多个 <p> 元素组合在一起。
 */
export abstract class TypeHGroup<Props extends HGroupProps = HGroupProps> extends TypeHtml<Props> implements ITypeHGroup {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('hgroup');
  }
}
