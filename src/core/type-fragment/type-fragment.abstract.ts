import { IStyle } from '@type-dom/css-type';
import { ITypeConfig } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeAttribute } from '../type-element/type-element.interface';
import { ITypeFragment } from './type-fragment.interface';

export abstract class TypeFragment extends TypeElement implements ITypeFragment {
  override nodeName: 'fragment';
  override dom: DocumentFragment;
  // abstract content: TypeElement;
  style: undefined;
  attr: undefined;

  constructor() {
    super();
    this.nodeName = 'fragment';
    this.dom = document.createDocumentFragment();
  }

  addStyleObj(styleObj?: IStyle) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.addStyleObj(styleObj);
      } else {
        child.style?.addObj(styleObj);
      }
    });
  }

  setStyleObj(styleObj?: IStyle) {
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

  override useParams<C extends ITypeConfig>(params = {} as C): C {
    this.useSlots(params); // todo 会改变 slot的parent指向
    // this.nodeName = params.tag || 'div';
    // if (this.nodeName === 'fragment') {
    //   this.dom = undefined as T;
    // } else {
    //   this.dom = document.createElement(this.nodeName.trim()) as T;
    // }
    super.useParams<C>(params);
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.addStyleObj(params.styleObj);
        child.addAttrObj(params.attrObj);
      } else {
        child.style?.addObj(params.styleObj);
        child.attr?.addObj(params.attrObj);
      }
    });
    return this.props as C;
  }
}
