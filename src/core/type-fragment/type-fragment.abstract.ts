import { TypeProps } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { Attributes } from '../attribute/attribute.interface';
import { NodeName } from '../enums';
import { onBeforeMount } from '../apiLifecycle';
import { StyleValue } from '../style/style.interface';
import { ITypeFragment, TypeFragmentProps } from './type-fragment.interface';

/**
 * 要注意继承TypeFragment的类，不要直接获取 .dom 属性。因为  Fragment 创建的dom元素是 DocumentFragment。
 */
export abstract class TypeFragment extends TypeElement implements ITypeFragment {
  override props: TypeFragmentProps;
  override dom?: DocumentFragment;
  // abstract content: TypeElement;
  style: undefined;
  attr: undefined;

  constructor() {
    super();
    this.props = this.useParams({
      nodeName: NodeName.FRAGMENT,
    })
  }

  addStyleObj(styleObj?: StyleValue) {
    onBeforeMount(() => {
      this.childNodes.forEach(child => {
        if (child instanceof TypeFragment) {
          child.addStyleObj(styleObj);
        } else {
          child.style?.addObj(styleObj);
        }
      });
    })
  }

  setStyleObj(styleObj?: StyleValue) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.setStyleObj(styleObj);
      } else {
        child.style?.setObj(styleObj);
      }
    });
  }

  addAttrObj(attrObj?: Attributes) {
    onBeforeMount(() => {
      this.childNodes.forEach(child => {
        if (child instanceof TypeFragment) {
          child.addAttrObj(attrObj);
        } else {
          child.attr?.addObj(attrObj);
        }
      });
    })
  }

  setAttrObj(attrObj?: Attributes) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.setAttrObj(attrObj);
      } else {
        child.attr?.setObj(attrObj);
      }
    });
  }

  // 向下传递 styleObj attrObj;
  override useParams<Props extends TypeProps>(params = {} as Props): Props {
    super.useParams(params);
    // 子元素可能是 setup中新增的，这时 this.childNodes可能没有或不全；
    onBeforeMount(() => {
      this.anchor = document.createComment('fragment-' + this.className);
      this.childNodes.forEach(child => {
        if (child instanceof TypeFragment) {
          child.addStyleObj(params.styleObj);
          child.addAttrObj(params.attrObj);
        } else {
          child.style?.addObj(params.styleObj);
          child.attr?.addObj(params.attrObj);
        }
      });
    })
    return this.props as Props;
  }
}
