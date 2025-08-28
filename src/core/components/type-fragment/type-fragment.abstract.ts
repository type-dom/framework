import { Attributes } from '../../../dom/modules/attribute/attribute.interface';
import { addAttrObj, setAttrObj } from '../../../dom/modules/attribute/attribute';
import { StyleValue } from '../../../dom/modules/style/style.interface';
import { addStyleObj, setStyleObj } from '../../../dom/modules/style/style';
import { TypeProps } from '../../type-node/type-node.interface';
import { TypeElement } from '../../type-element/type-element.abstract';
import { NodeName } from '../../enums';
import { onBeforeMount } from '../../apiLifecycle';
import { assignProps } from '../../helpers/assignProps';
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
    // this.props = this.useParams({
    //   nodeName: NodeName.FRAGMENT,
    // })
    assignProps(this, {
      nodeName: NodeName.FRAGMENT,
    });
    this.props = this.baseProps as TypeFragmentProps;
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
    // todo mount 时， vIf为 false 时，要添加 this.anchor
    // if (this.className === undefined) {
    //   console.error('element.className === undefined , element is ', this);
    // }
    // if (this.uid === 50) {
    //   console.error('element.uid === 50 , element is ', this);
    // }
    // this.anchor = document.createComment('fragment-' + this.className);
    this.anchorStart = this.anchorStart ?? document.createComment('[--' + this.className + '' + this.uid);
    this.anchor = this.anchor ?? document.createComment(this.className + '' + this.uid + '--]');
    // 子元素可能是 setup中新增的，这时 this.childNodes可能没有或不全；
    //   todo 渲染时，判断一下，先添加parent.styleObj
    onBeforeMount(() => { // 还是有可能 childNodes 没有加全
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
