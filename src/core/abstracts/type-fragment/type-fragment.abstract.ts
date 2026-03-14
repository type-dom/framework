import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeFragment, FragmentProps } from './type-fragment.interface';
import { RendererElement } from '../../renderer/renderer';
import { mountFragment } from './mountFragment';

/**
 * 要注意继承TypeFragment的类，不要直接获取 .dom 属性。因为  Fragment 创建的dom元素是 DocumentFragment。
 */
export abstract class TypeFragment<Props extends FragmentProps = FragmentProps> extends TypeElement<Props> implements ITypeFragment {
  dom: DocumentFragment;
  style: undefined;
  attr: undefined;

  constructor(params: Props = {} as Props) {
    super(params);
    this.dom = document.createDocumentFragment();
  }

  override mount(container: RendererElement) {
    return mountFragment(this, container);
  }
}
