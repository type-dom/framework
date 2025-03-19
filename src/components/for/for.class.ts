import { effect, isRef, toRaw, unref } from '@type-dom/signals';
import { ISlotRaw } from '../../core/type-node/type-node.interface';
import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { IFor, ForProps } from './for.interface';
import { useRecurseRender } from '../../core/type-element/useRecurseRender';
// todo For 多层嵌套时，有问题；
//    TdSpace 下直接添加 For 组件，子元素没有添加。
export class For extends TypeFragment implements IFor {
  className: 'For';
  override props: ForProps;

  constructor(params: ForProps = {}) {
    super();
    this.className = 'For';
    this.props = this.useParams(params);
  }

  override setup() {
    const props = this.props;
    if (props.data) {
      if (isRef(props.data)) {
        // todo 如何替换子对象
        effect(() => {
          const newData = unref(props.data);
          console.warn('effect newData', newData);
          this.clearChildren();
          if (newData) {
            this.slotRawData(newData);
          }
          useRecurseRender(this);
        })
      } else {
        this.slotRawData(props.data);
      }
    } else {
      console.error('props.data is undefined . ');
    }
  }

  // todo 方法本身没有渲染组件
  slotRawData(data: ISlotRaw[]) {
    const getter = this.props.getter;
    data.forEach((item, index) => {
      if (getter) {
        this.slotChild(getter(item, index));
      } else {
        this.slotChild(item);
      }
    });
  }
}
