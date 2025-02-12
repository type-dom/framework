import { IStyle } from '@type-dom/css-type';
import { ITypeConfig } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeAttribute } from '../type-element/type-element.interface';
import { ITypeFragment, ITypeFragmentConfig } from './type-fragment.interface';
import { Computed, MaybeRef, Signal } from '@type-dom/signals';

export abstract class TypeFragment extends TypeElement implements ITypeFragment {
  override props: ITypeFragmentConfig;
  override dom?: DocumentFragment;
  // abstract content: TypeElement;
  style: undefined;
  attr: undefined;

  constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'fragment',
    })
  }

  addStyleObj(styleObj?: IStyle | Signal<IStyle | undefined> | Computed<IStyle | undefined>) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.addStyleObj(styleObj);
      } else {
        child.style?.addObj(styleObj);
      }
    });
  }

  setStyleObj(styleObj?: IStyle | Signal<IStyle> | Computed<IStyle>) {
    this.childNodes.forEach(child => {
      if (child instanceof TypeFragment) {
        child.setStyleObj(styleObj);
      } else {
        child.style?.setObj(styleObj);
      }
    });
  }

  addAttrObj(attrObj?: MaybeRef<ITypeAttribute>) {
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
