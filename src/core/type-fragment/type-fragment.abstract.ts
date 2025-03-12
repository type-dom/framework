import { IStyle } from '@type-dom/css-type';
import { Computed, Signal } from '@type-dom/signals';
import { StyleValue } from '../../interface';
import { TypeProps } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeAttribute } from '../attribute/attribute.interface';
import { NodeName } from '../enums';
import { ITypeFragment, TypeFragmentProps } from './type-fragment.interface';

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

  addStyleObj(styleObj?: StyleValue | Signal<IStyle | undefined> | Computed<IStyle | undefined>) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.addStyleObj(styleObj);
      } else {
        child.style?.addObj(styleObj);
      }
    });
  }

  setStyleObj(styleObj?: StyleValue | Signal<IStyle> | Computed<IStyle>) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.setStyleObj(styleObj);
      } else {
        child.style?.setObj(styleObj);
      }
    });
  }

  addAttrObj(attrObj?: ITypeAttribute) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.addAttrObj(attrObj);
      } else {
        child.attr?.addObj(attrObj);
      }
    });
  }

  setAttrObj(attrObj?: ITypeAttribute) {
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
    super.useParams<Props>(params);
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.addStyleObj(params.styleObj);
        child.addAttrObj(params.attrObj);
      } else {
        child.style?.addObj(params.styleObj);
        child.attr?.addObj(params.attrObj);
      }
    });
    return this.props as Props;
  }
}
