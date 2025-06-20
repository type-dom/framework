import { effect, isSignal, isComputed, toRaw } from '@type-dom/signals';
import { TypeFragment } from '../../core/type-fragment/type-fragment.abstract';
import { getToDom, mountDom } from '../../core/type-element/mountDom';
import { IFor, ForProps } from './for.interface';
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
      // const slot = computed(() => this.getRawSlot());
      // this.slotChildren(slot); // slotChildren 循环  TdImage
      if (isSignal(props.data) || isComputed(props.data)) {
        // todo 如何替换子对象
        effect(() => {
          const newData = toRaw(props.data);
          console.warn('effect newData', newData);
          this.clearChildren();
          if (newData) {
            this.slotRawData(newData);
          }
          if (!this.dom) {
            this.createDom();
          }
          this.childNodes.forEach(child => {
            // console.warn('child then mount, it is ', child);
            // let up;
            // const to = unref(element.to);
            // if (isString(to)) {
            //   up = document.querySelector(to) as HTMLElement;
            // } else if (to !== undefined) {
            //   up = to;
            // }
            const to = getToDom(child);
            // element.dom is Fragment, child.dom not mount to;
            child.mount(to ?? this.dom); // 如果注释了，统计倒计时不显示。
            // child.mount(upDom); // todo repeat loop .
            // element.appendChild(child); // what different between mount and appendChild ?
          })

          const upDom = mountDom(this);
          if (upDom) { // todo 是插入还是添加
            // console.log('upDom is ', upDom)
            // console.log('this.index is ', this.index);
            // todo 插入位置，有哪些不同的情况 ？？？
            if (this.index !== -1 && upDom.childNodes[this.index]) {
              // upDom.insertBefore(this.dom!, upDom.firstChild);
              upDom.insertBefore(this.dom!, upDom.childNodes[this.index]);
            } else {
              upDom.appendChild(this.dom!);
            }
          }
          // this.slotChildren(this.getRawSlot());
        })
      } else {
        this.slotRawData(props.data as any[]);
        // this.slotChildren(this.getRawSlot());
      }
    } else {
      console.error('props.data is undefined . ');
    }
  }

  // todo 方法本身没有渲染组件
  slotRawData(data: any[]) {
    // console.warn('slotRawData . ');
    const getter = this.props.getter;
    data.forEach((item, index) => {
      if (getter) {
        this.slotChild(getter(item, index));
      } else {
        this.slotChild(item);
      }
    });
  }

  getRawSlot() {
    // console.warn('getRawSlot . this.props.data is ', this.props.data);
    return toRaw(this.props.data)?.map((item: any, index: number) => {
      // console.warn('getRawSlot . ', item, index);
      return this.props.getter ? this.props.getter(item, index) : item;
    })
  }
}
