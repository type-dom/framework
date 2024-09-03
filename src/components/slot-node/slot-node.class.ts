import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { TextNode } from '../../core/text-node/text-node.class';
import { ISlotNodeConfig } from './slot-node.interface';

export class SlotNode extends TypeFragment {
  className: 'SlotNode';
  private name: string;
  override props: ISlotNodeConfig;
  constructor(name: string, slot?: string | TypeNode | (string | TypeNode)[]) {
    super();
    this.className = 'SlotNode';
    this.params = {
      name,
      slot
    };
    this.name = name;
    if (slot) {
      this.resetSlot(slot);
    }
    // this.props = this.setParams({
    //   name,
    //   slot
    // })
    this.props = this.mergeConfig({
      name,
      slot
    })
  }
  // 往插槽中添加子节点 ， ToDo addSlot appendSlot insertSlot pushSlot
  addSlot(slot?: string | TypeNode | (string | TypeNode)[]) {
    if (!slot) {
      return;
    }
    this.props.slot = slot;
    if (slot instanceof TypeNode) {
      this.addChild(slot);
    } else if ('string' === typeof slot) {
      this.addChild(new TextNode(slot));
    } else {
      slot.forEach(item => {
        if (item instanceof TypeNode) {
          this.addChild(item);
        } else if ('string' === typeof item) {
          this.addChild(new TextNode(item));
        }
      })
    }
  }
  resetSlot(slot?: string | TypeNode | (string | TypeNode)[]) {
    this.clearChildren(); // 要清空插槽
    this.addSlot(slot)
  }
}
