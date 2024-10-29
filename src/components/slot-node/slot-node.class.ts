import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
// import { TypeComponent } from '../../core/type-component/type-component.abstract';
import { TypeNode } from '../../core/type-node/type-node.abstract';
import { ISlotNodeConfig } from './slot-node.interface';

export class SlotNode extends TypeFragment {
  className: 'SlotNode';
  name: string;
  override props: ISlotNodeConfig;

  constructor(name: string, slot?: string | TypeNode | (string | TypeNode)[]) {
    super();
    this.className = 'SlotNode';
    this.params = {
      name,
      slot,
    };
    this.name = name;
    if (slot) {
      // this.resetSlot(slot);
      this.slotChild(slot);
    }
    this.props = this.buildProps({
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

  resetSlot(slot?: string | TypeNode | (string | TypeNode)[]) {
    this.clearChildren(); // 要清空插槽
    this.slotChild(slot);
  }
}
