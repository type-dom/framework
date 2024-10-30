import { SlotNode } from '../../components/slot-node/slot-node.class';
import { ITypeConfig, ISlotNodes } from '../type-node/type-node.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { ITypeComponent } from './type-component.interface';

export let componentId = 0;

export abstract class TypeComponent<T extends HTMLElement | SVGElement | undefined = HTMLElement>
  extends TypeElement
  implements ITypeComponent
{
  // nodeName: 'fragment' | string;
  // dom: T; // 默认 HTMLElement; fragment时 undefined
  componentId: number;

  // 手动的方式设置 fragment; 实现类似 TypeFragment 类
  protected constructor() {
    super();
    this.componentId = componentId++;
    this.attr.addObj({
      componentId: this.componentId,
    });
  }

  override useParams<C extends ITypeConfig>(params = {} as C): C  {
    this.useSlots(params);
    // this.nodeName = params.tag || 'div';
    // if (this.nodeName === 'fragment') {
    //   this.dom = undefined as T;
    // } else {
    //   this.dom = document.createElement(this.nodeName.trim()) as T;
    // }
    return super.useParams<C>(params);
  }

  /**
   * 确保slot存在，不存在则创建；
   * 要在useSlots之后调用
   *
   * @param name
   */
  getSlotNode(name = 'default') {
    const slotNode = this.slotNodes[name] ?? new SlotNode(name);
    slotNode.setParent(this);
    this.slotNodes[name] = slotNode;
    return slotNode;
  }

  useSlots(params?: ITypeConfig): ISlotNodes {
    if (params?.slot) {
      this.getSlotNode().resetSlot(params.slot);
    }
    params?.slots &&
    Object.keys(params.slots).forEach((key) => {
      this.getSlotNode(key).resetSlot(params.slots?.[key]);
    });
    return this.slotNodes;
  }
}
