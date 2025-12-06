import { TypeProps } from '../../type-node/type-node.interface';
import { TypeElement } from '../../type-element/type-element.abstract';
import { NodeName } from '../../enums';
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

  // addStyleObj(styleObj?: StyleValue) {
  //   onBeforeMount(() => {
  //     this.childNodes.forEach(child => {
  //       if (child instanceof TypeFragment) {
  //         child.addStyleObj(styleObj);
  //       } else {
  //         addStyleObj(child, styleObj);
  //       }
  //     });
  //   })
  // }
  //
  // setStyleObj(styleObj?: StyleValue) {
  //   this.childNodes.forEach(child => {
  //       setStyleObj(child, styleObj);
  //   });
  // }
  // addAttrObj(attrObj?: Attributes) {
  //   onBeforeMount(() => {
  //     this.childNodes.forEach(child => {
  //       // child.attr?.addObj(attrObj);
  //       addAttrObj(child, attrObj)
  //     });
  //   }, this);
  // }
  // setAttrObj(attrObj?: Attributes) {
  //   this.childNodes.forEach(child => {
  //     if (child instanceof TypeFragment) {
  //       child.setAttrObj(attrObj);
  //     } else {
  //       // child.attr?.setObj(attrObj);
  //       setAttrObj(child, attrObj);
  //     }
  //   });
  // }

  // 向下传递 styleObj attrObj;
  override useParams<Props extends TypeProps>(params = {} as Props): Props {
    this.anchorStart = this.anchorStart ?? document.createComment('[' + this.className + '' + this.uid);
    this.anchor = this.anchor ?? document.createComment(this.className + '' + this.uid + ']');
    super.useParams(params);
    // todo mount 时， vIf为 false 时，要添加 this.anchor
    // if (this.className === undefined) {
    //   console.error('element.className === undefined , element is ', this);
    // }
    // if (this.uid === 50) {
    //   console.error('element.uid === 50 , element is ', this);
    // }
    // this.anchor = document.createComment('fragment-' + this.className);
    // 子元素可能是 setup中新增的，这时 this.childNodes可能没有或不全；
    //   todo 渲染时，判断一下，先添加parent.styleObj
    // onBeforeMount(() => { // 还是有可能 childNodes 没有加全
    //   this.childNodes.forEach(child => {
    //     if (child instanceof TypeFragment) {
    //       // addStyleObj(child, params.styleObj);
    //       addAttrObj(child, params.attrObj);
    //     } else {
    //       // addStyleObj(child, params.styleObj);
    //       addAttrObj(child, params.attrObj)
    //     }
    //   });
    // })
    return this.baseProps as Props;
  }
}
