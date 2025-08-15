import { Attributes } from '../../../dom/modules/attribute/attribute.interface';
import { addAttrObj, setAttrObj } from '../../../dom/modules/attribute/attribute';
import { StyleValue } from '../../../dom/modules/style/style.interface';
import { addStyleObj, setStyleObj } from '../../../dom/modules/style/style';
import { TypeProps } from '../../type-node/type-node.interface';
import { TypeElement } from '../../type-element/type-element.abstract';
import { NodeName } from '../../enums';
import { onBeforeMount } from '../../apiLifecycle';
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
          addStyleObj(child, styleObj);
        }
      });
    })
  }

  setStyleObj(styleObj?: StyleValue) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.setStyleObj(styleObj);
      } else {
        setStyleObj(child, styleObj);
      }
    });
  }

  addAttrObj(attrObj?: Attributes) {
    onBeforeMount(() => {
      this.childNodes.forEach(child => {
        if (child instanceof TypeFragment) {
          child.addAttrObj(attrObj);
        } else {
          // child.attr?.addObj(attrObj);
          addAttrObj(child, attrObj)
        }
      });
    })
  }

  setAttrObj(attrObj?: Attributes) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.setAttrObj(attrObj);
      } else {
        // child.attr?.setObj(attrObj);
        setAttrObj(child, attrObj);
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
          addStyleObj(child, params.styleObj);
          addAttrObj(child, params.attrObj)
        }
      });
    })
    return this.baseProps as Props;
  }
}
