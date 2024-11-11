import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeFragment } from './type-fragment.interface';
import { SlotNode } from '../../components';

export abstract class TypeFragment extends TypeElement implements ITypeFragment {
  override nodeName: 'fragment';
  override dom: DocumentFragment;
  style: undefined;
  attr: undefined;

  constructor() {
    super();
    this.nodeName = 'fragment';
    this.dom = document.createDocumentFragment();
  }

  /**
   * 确保slot存在，不存在则创建；
   * 要在useSlots之后调用
   * teleport.class.ts:2 Uncaught ReferenceError: Cannot access 'TypeFragment' before initialization
   * @param name
   */
  // getSlotNode(name = 'default') {
  //   // return this.slotNodes[name];
  //   return this.slotNodes[name] = this.slotNodes[name] ?? new SlotNode(name);
  // }
}
