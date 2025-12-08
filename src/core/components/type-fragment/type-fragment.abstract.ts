import { TypeElement } from '../../type-element/type-element.abstract';
import { defaultProps } from '../../helpers/defaultProps';
import { onBeforeCreate } from '../../apiLifecycle';
import { NodeName } from '../../enums';
import { ITypeFragment, FragmentProps } from './type-fragment.interface';

/**
 * 要注意继承TypeFragment的类，不要直接获取 .dom 属性。因为  Fragment 创建的dom元素是 DocumentFragment。
 */
export abstract class TypeFragment<Props extends FragmentProps = FragmentProps> extends TypeElement<Props> implements ITypeFragment {
  dom: DocumentFragment;
  style: undefined;
  attr: undefined;

  constructor(params: Props = {} as Props) {
    super(defaultProps(params, {
      nodeName: NodeName.FRAGMENT,
    } as Props));
    this.dom = document.createDocumentFragment();
    onBeforeCreate(() => {
      this.anchorStart = document.createComment('[' + this.className);
      this.anchor = document.createComment(this.className + ']');
    })
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
}
