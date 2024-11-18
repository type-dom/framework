import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { TextNode } from '../../core/text-node/text-node.class';
import { ISlotNodeConfig } from './slot-node.interface';

export class SlotNode extends TypeFragment {
  className: 'SlotNode';
  name: string;
  override props: ISlotNodeConfig;
  override childNodes: TypeNode[];

  constructor(name = 'default', slot?: string | TypeNode | (string | TypeNode)[]) {
    super();
    this.className = 'SlotNode';
    this.params = {
      name,
      slot,
    };
    this.name = name;
    this.childNodes = [];
    if (slot) {
      // this.resetSlot(slot);
      this.slotChild(slot);
    }
    this.props = this.assignProps({
      name,
      slot,
    });
  }

  // 往插槽中添加子节点 ， ToDo addSlot appendSlot insertSlot pushSlot
  addSlot(slot?: string | TypeNode | (string | TypeNode)[]) {
    if (!slot) {
      return;
    }
    this.props.slot = slot;
    this.slotChild(slot);
  }

  // todo 要避免修改 slot 的parent，
  //    避免和直接使用 slotChild 冲突
  resetSlot(slot?: string | TypeNode | (string | TypeNode)[]) {
    this.clearChildren(); // 要清空插槽
    // this.slotChild(slot);
    if (typeof slot === 'string') {
      this.childNodes = [new TextNode(slot)];
    } else if (slot instanceof TypeNode) {
      this.childNodes = [slot];
    } else if (Array.isArray(slot)) {
      for (const item of slot) {
        if (typeof item === 'string') {
          this.childNodes.push(new TextNode(item));
        } else if (item instanceof TypeNode) {
          this.childNodes.push(item);
        }
      }
    }
  }
}
