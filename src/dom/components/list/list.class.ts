import { effect } from '@type-dom/signals';
import { isArray } from '@type-dom/utils';
import { isSignal, isComputed, toRaw, unref } from '../../../reactivity';
import { TypeFragment } from '../../../core/components/type-fragment/type-fragment.abstract';
import { getToDom, mountDom } from '../../../core/helpers/mountDom';
import { IList, ListProps } from './list.interface';
import { createDom } from '../../../core/helpers/createDom';
import { LifecycleHooks } from '../../../core';
// todo For 多层嵌套时，有问题；
//    TdSpace 下直接添加 For 组件，子元素没有添加。
export class List extends TypeFragment implements IList {
  className: 'List';
  override props: ListProps;

  constructor(params: ListProps = {}) {
    super();
    this.className = 'List';
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
            createDom(this);
          }
          this.childNodes.forEach((child) => {
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
            // const upDom = mountDom(child);
            // child.mount(upDom); // todo repeat loop .
            // element.appendChild(child); // what different between mount and appendChild ?
          });

          const upDom = mountDom(this);
          if (upDom) {
            // todo 是插入还是添加
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
          this.parent?.lifeCycles[LifecycleHooks.UPDATED]?.forEach((fn) => fn());
        });
      } else {
        this.slotRawData(props.data as any[]);
        // this.slotChildren(this.getRawSlot());
      }
    } else {
      console.error('props.data is undefined . ');
    }
  }

  // todo 方法本身没有渲染组件
  slotRawData(data: any[] | number | unknown) {
    // console.warn('slotRawData . ');
    const getter = this.props.getter;
    if (isArray(data)) {
      data.forEach((item, index) => {
        if (getter) {
          this.slotChild(getter(item, index));
        } else {
          this.slotChild(item); // todo item is Signal ??
        }
      });
    } else if (typeof data === 'number') {
      for (let i = 0; i < data; i++) {
        if (getter) {
          this.slotChild(getter(i));
        } else {
          this.slotChild(i);
        }
      }
    } else {
      throw new Error('raw data is not array or number');
    }
  }

  getRawSlot() {
    // console.warn('getRawSlot . this.props.data is ', this.props.data);
    if (isArray(this.props.data)) {
      return toRaw(this.props.data)?.map((item: any, index: number) => {
        // console.warn('getRawSlot . ', item, index);
        return this.props.getter ? this.props.getter(item, index) : item;
      });
    } else if (typeof this.props.data === 'number') {
      return Array.from({ length: this.props.data }, (_, index) => {
        return this.props.getter ? this.props.getter(index) : index;
      });
    } else {
      throw new Error('raw data is not array or number');
    }
  }

  //   todo isRef this.props.data
  add(item: any, index?: number) {
    const data = unref(this.props.data);
    if (isArray(data)) {
      if (index) {
        data.splice(index, 0, item);
      } else {
        data.push(item);
      }
      // this.props.data = data;
    } else if(typeof data === 'number') {
      if (index) {
        // data.splice(index, 0, item);
      } else {
        // data += 1;
      }
    } else {
      throw new Error('props.data is not array');
    }
  }

  delete(index: number) {
    const data = unref(this.props.data);
    if (isArray(data)) {
      data.splice(index, 1);
    }
    // this.props.data = data;
  }

  addList(data: any[]) {
    // todo
  }
}
