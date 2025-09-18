// import { effect } from '@type-dom/signals';
import { isArray, isNumber } from '@type-dom/utils';
import { isSignal, isComputed, toRaw, unref, watch } from '../../../reactivity';
import { removeDom } from '../../../core/helpers/removeDom';
import { IChild } from '../../../core/type-node/type-node.interface';
import { TypeFragment } from '../../../core/components/type-fragment/type-fragment.abstract';
import { mountDom } from '../../../core/helpers/mountDom';
import { createDom } from '../../../core/helpers/createDom';
import { LifecycleHooks } from '../../../core/enums';
import { setAttrProp } from '../../modules/attribute';
import { IList, ListProps } from './list.interface';
import { compareMixedArrays } from './compareArrays';

// todo  多层嵌套时，有问题；
//    TdSpace 下直接添加该组件，子元素没有添加。
/**
 *
 * 只需要观察 data 的变化，而不需要考虑其它的复杂的情况
 */
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
      // transformSlot(this, slot); // 循环  TdImage
      if (isSignal(props.data) || isComputed(props.data)) {
        // todo 如何替换子对象
        watch(props.data, (newData, oldData) => {
          // const newData = toRaw(props.data);
          // console.warn('effect newData', newData);
          // console.warn('effect oldData', oldData);
          // this.clearChildren();
          // 确定scopedId
          if (this.parent?.scopedId) this.scopedId = this.scopedId ?? this.parent.scopedId;
          // todo 判断数据变化
          // const start = performance.now();
          if (newData) {
            this.slotRawData(newData, oldData);
          }
          const upDom = mountDom(this);
          if (upDom && oldData !== undefined) {
            // todo 是插入还是添加
            // console.log('list upDom is ', upDom);
            if (!this.dom) {
              createDom(this);
            }
            // todo 这一步有问题，新增/删除时，没有变化的子元素也会被执行。
            // this.childNodes.forEach((child) => {
            //   // console.warn('child then mount, it is ', child);
            //   // let up;
            //   // const to = unref(element.to);
            //   // if (isString(to)) {
            //   //   up = document.querySelector(to) as HTMLElement;
            //   // } else if (to !== undefined) {
            //   //   up = to;
            //   // }
            //   child.mount(this.dom);
            //   // const to = getToDom(child);
            //   // element.dom is Fragment, child.dom not mount to;
            //   // child.mount(to ?? this.dom); // 如果注释了，统计倒计时不显示。
            //   // const upDom = mountDom(child);
            //   // child.mount(upDom); // todo repeat loop .
            //   // element.appendChild(child); // what different between mount and appendChild ?
            // });

            this.anchor = this.anchor ?? document.createComment(this.uid + '--]');
            // 应该将新增的元素放入 this.dom (DocumentFragment), 然后插入。
            upDom.insertBefore(this.dom!, this.anchor);

            // const end = performance.now();
            // console.warn(`异步耗时: ${end - start} 毫秒`);
            // console.log('this.index is ', this.index);
            // todo 插入位置，有哪些不同的情况 ？？？
            // if (this.index !== -1 && upDom.childNodes[this.index]) {
            //   // upDom.insertBefore(this.dom!, upDom.firstChild);
            //   upDom.insertBefore(this.dom!, upDom.childNodes[this.index]);
            // } else {
            //   upDom.appendChild(this.dom!);
            // }
          }
          // transformSlot(this, this.getRawSlot());
          this.parent?.lifeCycles[LifecycleHooks.UPDATED]?.forEach((fn) => fn());
        }, {
          immediate: true,
          deep: true,
        });
      } else {
        this.slotRawData(props.data as any[]);
        // transformSlot(this, this.getRawSlot());
      }
    } else {
      console.error('props.data is undefined . ');
    }
  }

  // todo 方法本身没有渲染组件
  /**
   * todo 增加数据，删减数据，替换数据，清空数据
   * @param data
   * @param oldData
   */
  slotRawData(data: any[] | number, oldData?: typeof data) {
    // console.warn('slotRawData . ');
    const getter = this.props.getter;
    if (isArray(data)) {
      // console.warn('data is array , and is ', data);
      if (oldData === undefined) {
        data.forEach((item, index) => {
          if (getter) {
            // useSlotChild(this, getter(item, index));
            this.addChild(getter(item, index));
          } else {
            // useSlotChild(this, item); // todo item is Signal ??
            this.addChild(item)
          }
        });
      } else {
        // console.warn('data is ', data, ' oldData is ', oldData);
        // console.warn('this.childNodes is ', this.childNodes);
        // const children = data.map((item, index) => {
        //   if (getter) {
        //     return getter(item, index);
        //   } else {
        //     return item;
        //   }
        // })
        const result = compareMixedArrays(oldData as any[], data);
        // console.warn('result is ', result);
        // 新增
        if (result.added.length > 0 && result.modified.length === 0 && result.removed.length === 0) {
          result.added.forEach((child) => {
            if (getter) {
              this.insertChild(getter(child.item, child.index), child.index); // 可以直接用slotChild
            } else {
              this.insertChild(child.item, child.index);
            }
            this.childNodes[child.index].mount(this.dom);
          })
        } else if (result.added.length === 0 && result.modified.length === 0 && result.removed.length > 0) { // 删减
          const length = result.removed.length;
          for (let i = length; i > 0; i--) {
            const child = result.removed[i - 1];
            this.removeChildAtIndex(child.index);
          }
        } else {
          // todo Calendar 中日期变化
          this.clearChildren();
          data.forEach((item, index) => {
            if (getter) {
              this.addChild(getter(item, index))
              // useSlotChild(this, getter(item, index));
            } else {
              // useSlotChild(this, item);
              this.addChild( item)
            }
          });
          this.childNodes.forEach((child) => {
            child.mount(this.dom);
          })
        }
      }
    } else if (typeof data === 'number') {
      if (oldData === undefined) {
        for (let i = 0; i < data; i++) {
          if (getter) {
            // useSlotChild(this, getter(i));
            this.addChild(getter(i));
          } else {
            // useSlotChild(this, i);
            this.addChild(i);
          }
        }
      } else if (isNumber(oldData)) {
        // console.warn('oldData is number . ');
        const diff = data - oldData;
        // console.warn('diff is ', diff);
        if (diff > 0) {
          for (let i = oldData; i < data; i++) {
            let child: IChild;
            if (getter) {
              child = getter(i)
              // this.addChild(getter(i) as TypeNode);
            } else {
              // this.addChild(new TextNode(i));
              child = i;
            }
            // useSlotChild(this, child);
            this.addChild(child)
            // todo when child is number or string , how to do ?
            // if (child instanceof TypeNode) child?.mount(this.dom);
            this.childNodes[i].mount(this.dom);
          }
        } else {
          for (let i = data; i < oldData; i++) {
            // this.childNodes.splice(i, 1);
            // this.removeChild(i);
            // this.childNodes[i].mount(this.dom);
            removeDom(this.childNodes[i]); // 移除 删除的子元素 dom
          }
          this.childNodes.splice(data, oldData - data);
        }
      }
      this.childNodes.forEach((child) => {
        if (child.scopedId) setAttrProp(child, child.scopedId, '');
      })
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
