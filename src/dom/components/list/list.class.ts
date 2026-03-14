import { isArray, isNumber } from '@type-dom/utils';
import { isSignal, isComputed, toRaw, unref, watch } from '../../../reactivity';
import { IChild } from '../../../core/abstracts/type-node/type-node.interface';
import { TypeFragment } from '../../../core/abstracts/type-fragment/type-fragment.abstract';
import { getNodeContainer } from '../../../core/helpers/getNodeContainer';
import { createAnchor } from '../../../core/renderer/anchor';
import { removeBetween } from '../../../core/renderer/removeBetween';
import { RendererNode } from '../../../core/renderer/renderer';
import { setAttrProp } from '../../modules/attribute';
import { IList, ListProps } from './list.interface';
import { compareMixedArrays } from './compareArrays';

// todo  多层嵌套时，有问题；
//    TdSpace 下直接添加该组件，子元素没有添加。
/**
 *
 * 只需要观察 data 的变化，而不需要考虑其它的复杂的情况
 */
export class List<Props extends ListProps = ListProps> extends TypeFragment<Props> implements IList {
  className: 'List';
  override anchor: Comment | Text;

  constructor(params: Props = {} as Props) {
    super(params);
    this.className = 'List';
    this.anchorStart = createAnchor('[List - ' + this.uid)
    this.anchor = createAnchor('List - ' + this.uid + ']')
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
          // console.warn('watch newData', newData);
          // console.warn('watch oldData', oldData);
          // this.clearChildren();
          // 确定scopedId
          if (this.parent?.scopedId) this.scopedId = this.scopedId ?? this.parent.scopedId;
          // todo 判断数据变化
          // const start = performance.now();
          if (newData) {
            this.slotRawData(newData, oldData);
          }
          const container = getNodeContainer(this);
          if (container && oldData !== undefined) {
            // todo 是插入还是添加
            // console.log('list container is ', container);

            // todo 这一步有问题，新增/删除时，没有变化的子元素也会被执行。
            // renderAnchor(this, container);
            container.insertBefore(this.dom, this.anchor);
          }
          // transformSlot(this, this.getRawSlot());
          this.parent?.updated();
        }, {
          immediate: true,
          deep: true,
        });
      } else {
        this.slotRawData(props.data as any[]);
      }
    } else {
      // console.error('props.data is undefined . ');
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
              this.addChild(getter(item, index));
            } else {
              this.addChild( item);
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
            this.addChild(getter(i));
          } else {
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
              child = getter(i);
              // this.addChild(getter(i) as TypeNode);
            } else {
              // this.addChild(new TextNode(i));
              child = i;
            }
            // useSlotChild(this, child);
            this.addChild(child);
            // todo when child is number or string , how to do ?
            // if (child instanceof TypeNode) child?.mount(this.dom);
            this.childNodes[i].mount(this.dom);
          }
        } else {
          // for (let i = data; i < oldData; i++) {
          //   // this.childNodes.splice(i, 1);
          //   // this.removeChild(i);
          //   // this.childNodes[i].mount(this.dom);
          //   removeNodeDom(this.childNodes[i]); // 移除 删除的子元素 dom
          // }
          removeBetween(this.childNodes[data - 1].dom as RendererNode, this.anchor!);
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

  // addList(data: any[]) {
  //   // todo
  // }
}
