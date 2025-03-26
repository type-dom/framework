import { effect, isRef, toRaw } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { AnyFn, isArray, isFunction } from '@type-dom/utils';
// import { IRouterView } from '@type-dom/router';
import { IJsonDataProp } from '../../interface';
// import { RouterView } from '../../router/router-view/router-view.class';
// import { IRouterView } from '../../router/router-view/router-view.interface';
import type {
  ISlotItem,
  ISlotRaw,
  TypeProps,
} from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { TextNode } from '../text-node/text-node.class';
import { currentInstance } from '../instance';
import { useResetFragment } from '../type-node/useResetFragment';
import { LifecycleHooks, NodeName } from '../enums';
import {
  TransitionElement,
  TransitionHooks,
} from '../type-transition/type-transition.interface';
import type { ElProp, IBoundBox, ITypeElement } from './type-element.interface';
import { useMount } from './useMount';
import { useRecurseRender } from './useRecurseRender';
import { useParams } from './useParams';
import { useUpdate } from './useUpdate';
import { getToDom, mountDom } from './mountDom';
import { useSlotChild } from './useSlotChild';
import { useSlotChildren } from './useSlotChildren';
import { useRender } from './useRender';

export const vHash = Math.round(Math.random() * 1000000);

export let componentId = 0;

/**
 * 虚拟元素Element的数据结构
 * 可以对应到虚拟dom树。 createDom(tag, attr, children)
 * 与对应的导出时的数据结构是不一样的。
 * 除了 TextNode 之外的其它类型的 Node 。
 */
// @StyleManager
export abstract class TypeElement extends TypeNode implements ITypeElement {
  abstract override dom?: HTMLElement | SVGElement | DocumentFragment; // 不会是Text；
  // 包括 fragment
  // abstract nodeName: NodeName.FRAGMENT | string; // 必然有； 且不为 #text
  childNodes: TypeNode[];
  routerView?: any;
  transition?: TransitionHooks<TransitionElement> | undefined;
  rendered: boolean;
  componentId: number;

  protected constructor() {
    super();
    this.componentId = componentId++;
    this.attributes = [];
    this.childNodes = [];
    this.rendered = false;
  }

  // 向上获取真实的 element ;
  get elementParent(): TypeElement | undefined {
    if (this.props.nodeName=== NodeName.FRAGMENT) {
      return this.parent?.elementParent;
    } else {
      return this;
    }
  }

  get id(): string {
    return this.attr?.get('id') as string;
  }

  // get value(): string | undefined {
  //   return this.attr.get('value') ? this.attr.get('value') as string : undefined;
  // }
  // set value(str: string | undefined) {
  //   if (str !== undefined) {
  //     this.attr.setObj({
  //       value: str,
  //     });
  //   } else {
  //     this.attr.remove('value');
  //   }
  // }

  get boundBox(): IBoundBox {
    if (this.dom === undefined || this.dom instanceof DocumentFragment) {
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
    }
    const { left, top, width, height } = this.dom.getBoundingClientRect();
    // console.log('left is ', left, 'top is ', top, 'width is ', width, 'height is ', height);
    return {
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    };
  }

  get(key: keyof TypeProps) {
    return this.props[key];
  }

  set(key: keyof TypeProps, value: IJsonDataProp) {
    const propValue = this.props[key];

  }

  // setTransitionProps(props: TransitionProps) {
  //   this.transitionProps = props;
  // }

  /**
   * 配置参数
   * 使用传入的参数，与节点结合
   * @param params
   */
  useParams<T extends TypeProps>(params = {} as T): T {
    return useParams(this, params);
  }

  get textNode(): TextNode | undefined {
    // 如果 textNode 已经存在，直接返回
    // 否则创建一个新的 TextNode 并返回
    return this.down<TextNode>('className', 'TextNode');
  }

  /**
   * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
   * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
   * @param slot 要添加或插入的子元素或子元素数组。
   */
  slotChildren(slot?: ISlotItem) {
    useSlotChildren(this, slot);
  }

  slotChild(slot?: ISlotRaw | ISlotRaw[] | ((arg?: any) => ISlotRaw | ISlotRaw[]), type: 'add' | 'unshift' = 'add') {
    if (slot === undefined) {
      return;
    }
    useSlotChild(this, slot);
  }

  /**
   * 在最后位置添加一个子节点，并渲染；
   * 如果newChild.parent存在，则可能需要执行newChild?.parent.removeChild(newChild)。需要根据业务逻辑判断。
   * 渲染到dom上
   * @param newChild
   */
  appendChild(newChild: TypeNode): void {
    newChild.appendParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。
    if (newChild instanceof TypeElement) {
      useRecurseRender(newChild)
    } else {
      newChild.render();
    }
  }

  /**
   * 从前面添加子元素
   * @param newChild
   */
  unshiftChild(newChild: TypeNode): void {
    newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
    if (currentInstance === this) {
      newChild.createdIn = 'setup';
    }
    this.childNodes.unshift(newChild);
  }

  unshiftChildren(...newChildren: TypeNode[]) {
    this.childNodes.unshift(...newChildren);
  }

  /**
   * 后面添加子元素
   * new 时，也就是创建时，可以不设置parent；但是addChild时，需要设置parent。
   * @param newChild
   */
  addChild(newChild: TypeNode): void {
    // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
    newChild.setParent(this);
    if (currentInstance === this) {
      newChild.createdIn = 'setup';
    }
    this.childNodes.push(newChild);
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: (TypeNode | undefined)[]): void {
    newChildren.forEach((child) => child && this.addChild(child));
  }

  /**
   * 在指定下标插入新的文本或节点。
   * @param child
   * @param index 要插入的目标位置
   */
  insertChild(child: TypeNode, index: number): void {
    // console.log('insertChild . ');
    this.childNodes.splice(index, 0, child);
    child.setParent(this);
  }

  /**
   * 在子元素指定下标位置插入Dom节点
   * 不再与数据层操作直接绑定了。
   * 另外，页面中插入需要单独实现。
   * @param newChild
   * @param index 数组下标
   */
  insertChildDom(newChild: TypeElement | TextNode, index: number): void {
    // 判断newChild是否已经插入到数据层中。默认应该先插入数据层，再插入dom树。
    // if (!this.parent) {
    //   console.error('newChild has no parent . ');
    //   return
    // }
    // todo 如果this.dom is DocumentFragment，则需要先把子节点插入到dom树中。然后将this.dom挂载到上级真实dom；
    // 如果下标位置已有dom节点。
    if (this.childNodes.length > index + 1) {
      // this.resetFragment();
      if (newChild.dom !== undefined) {
        if (this.dom!.childNodes![index]) {
          this.dom?.insertBefore(newChild.dom, this.dom!.childNodes![index]);
        } else {
          this.dom?.appendChild(newChild.dom);
        }
      }
    } else {
      // todo
      // this.renderChild(newChild);
    }
  }

  // insertChildren(children: Array<TypeElement | WebText>, index: number) {
  //   this.childNodes.splice(index, 0, ...children);
  //   children.map(child => child.appendParent(this));
  //   return children;
  // }

  /**
   * 移除指定下标的子元素。
   * @param index 从0开始。
   * @param length
   */
  removeChildAtIndex(index: number, length = 1): void {
    this.removeChildDomAtIndex(index, length); // 先移除对应的DOM
    this.childNodes.splice(index, length);
  }

  /**
   * 移除指定下标的dom子节点。
   * WebPage的removeChildDom相对特殊，要单独处理。
   * 注： 要在removeChild前执行。
   * @param index
   * @param length 移除的个数
   */
  removeChildDomAtIndex(index: number, length = 1): void {
    useResetFragment(this);
    for (let i = 0; i < length; i++) {
      if (this.childNodes[index + i].dom) {
        this.dom?.removeChild(this.childNodes[index + i].dom!);
        //   this.childNodes[index + i].dom?.remove();
      }
    }
  }

  clearSetupChildren(): void {
    this.clearSetupChildrenDom();
    this.clearSetupChildNodes();
  }
  clearSetupChildNodes(): void {
    // this.childNodes.forEach(child => child.unmount());
    this.childNodes = this.childNodes.filter(child => child.createdIn !== 'setup');
  }

  clearSetupChildrenDom(): void {
    if (this.dom instanceof DocumentFragment) {
      this.childNodes.forEach((child) => {
        if (child?.createdIn === 'setup') {
          child.removeDom();
        }
      });
    } else {
      // let first = this.dom?.firstElementChild;
      // while (first) {
      //   first.remove();
      //   first = this.dom?.firstElementChild;
      // }
      this.childNodes.forEach(child => {
        if (child?.createdIn === 'setup') {
          child.removeDom();
        }
      })
    }
  }

  /**
   * 清理子节点
   * 包括字节点和子节点的DOM
   */
  clearChildren(): void {
    this.clearChildrenDom();
    this.clearChildNodes();
  }
  /**
   * 清除dom所有子节点
   * render时使用
   * todo 如果是DocumentFragment,渲染后其dom子节点会被移动到挂载的节点上。
   *    本身的子节点就空了。
   */
  clearChildrenDom(): void {
    // todo optimize
    if (this.dom instanceof DocumentFragment) {
      // if this is Fragment, this.childNodes is empty, and child dom up to parent real element;
      //   this parent dom 's childNodes has this child dom;
      //   todo if this child dom be removed , then repalce new Child how to get original position .
      //    so should remove dom after replaeced .
      this.childNodes.forEach((child) => {
        child.removeDom();
      });
    } else {
      // child is Text, can not delete , write like this;
      let first = this.dom?.firstChild;
      while (first && first.parentNode && first.parentNode.contains(first)) {
        first.remove();
        first = this.dom?.firstChild;
      }
      // this.childNodes.forEach((child) => {
      //   child.removeDom();
      // });
    }
  }
  // 清理子节点
  clearChildNodes(): void {
    // this.childNodes.forEach(child => child.unmount());
    this.childNodes = [];
  }

  replaceChildren(slot: ISlotItem) {
    this.clearChildren();
    this.slotChildren(slot);
  }

  /**
   *  替换指定的子元素
   */
  replaceChild(newNode: TypeNode, oldNode?: TypeNode): void {
    // console.warn('replaceChild newNode is ', newNode, '  oldNode is ', oldNode);
    if (oldNode === undefined) {
      // console.error('oldNode is undefined . ');
      this.appendChild(newNode);
    } else {
      const index = this.childNodes.indexOf(oldNode);
      if (index > -1) {
        // 替换操作
        this.childNodes.splice(index, 1, newNode);
        if (newNode.dom && oldNode?.dom) {
          // fragment处理
          if (this.dom instanceof DocumentFragment && this.dom.childElementCount === 0) {
            this.dom.appendChild(newNode.dom);
          } else {
            this.dom?.replaceChild(newNode.dom, oldNode.dom);
          }
        }
        // if (oldNode) {
        //   oldNode.parent = undefined;
        // }
        newNode.parent = this;
        return;
      } else {
        this.appendChild(newNode);
      }
      // throw Error('node to be replaced is not a child of the current node . ');
    }
  }

  /**
   * 替换指定位置的子元素
   * @param newNode
   * @param index
   */
  replaceChildIndex(newNode: TypeElement, index: number): void {
    // 替换操作
    this.childNodes.splice(index, 1, newNode);
    newNode.parent = this;
  }

  findChildAtIndex(index: number): TypeNode | null {
    return this.childNodes[index] ?? null;
  }

  setPropValue(key: keyof this, value: IJsonDataProp) {
    const propValue = this[key];
    // if (propValue instanceof XProxy) {
    //   propValue.setValue(value);
    //   if (key === 'modelValue') {
    //     // debugger;
    //     console.log('propValue is ', propValue);
    //     (this as any)?.setModelValue(value);
    //   }
    // }
  }

  /**
   *
   */
  setup?(): void;

  /**
   * 挂载到真实DOM；
   * 需要手动挂载组件时使用，一般是挂载到框架外的DOM元素时。
   * 框架内的对象直接addChild就可以了。
   * 子元素是伪元素时，dom是undefined，要递归向下挂载。
   * mount(el) 类似与 main() 是框架的入口。
   * 使用fragment要优化
   * @param el 是DocumentFragment时，和HTMLElement一样处理。层层 appendChild
   */
  mount<T extends TypeElement>(el?: ElProp): T {
    return useMount(this as unknown as T, el);
  }

  // todo
  update(el?: ElProp): void  {
    // console.warn('then update this.className is ' + this.className);
    useUpdate(this, el);
  }

  /**
   * 默认初始化方法
   * 清理多余的对象。
   * TODO 应该叫 preCreateInstance
   * @param literal
   */
  createInstance(literal: ITypeElement): void {
    this.attr?.resetObj(literal.params?.attrObj);
    this.style?.resetObj(literal.params?.styleObj as IStyle);
    const length = literal.childNodes.length;
    if (length < this.length) {
      for (let i = 0; i < this.length; i++) {
        // this.childNodes的对象和literal.childNodes的字面量要对应。
        //    如果不一致，应该清除原有的对象，根据字面量的值创建相应的对象。
        if (i > length - 1) {
          if (this.childNodes[i].dom) {
            this.dom?.removeChild(this.childNodes[i].dom!);
          }
          // this.childNodes[i].dom?.remove();
        }
      }
      this.childNodes.length = length;
    }
  }

  /**
   * 渲染前拦截，预处理
   */
  preRender(): void {
    // console.log('this.className is ' + this.className + ', preRender . ');
    this.createDom();
  }

  /**
   * 废弃
    */
  initEvents?(): void;

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    useRender(this);
  }
  // 原 destroy
  override unmount(root?: TypeElement) {
    // console.warn('then unmount this.className is ' + this.className);
    // TypeElement 需要单独清理事件
    this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT]?.forEach((fn) => fn());
    this.clearEvents();
    super.unmount(root);
    this.lifeCycles[LifecycleHooks.UNMOUNTED]?.forEach((fn) => fn());
  }

  onCreated(fn: AnyFn): void {
    if (!this.lifeCycles[LifecycleHooks.CREATED]) {
      this.lifeCycles[LifecycleHooks.CREATED] = [];
    }
    this.lifeCycles[LifecycleHooks.CREATED].push(fn);
  }

  onMounted(fn: AnyFn): void {
    if (!this.lifeCycles[LifecycleHooks.MOUNTED]) {
      this.lifeCycles[LifecycleHooks.MOUNTED] = [];
    }
    this.lifeCycles[LifecycleHooks.MOUNTED].push(fn);
  }

  onBeforeUpdate(fn: AnyFn): void {
    if (!this.lifeCycles[LifecycleHooks.BEFORE_UPDATE]) {
      this.lifeCycles[LifecycleHooks.BEFORE_UPDATE] = [];
    }
    this.lifeCycles[LifecycleHooks.BEFORE_UPDATE].push(fn);
  }

  onUpdated(fn: AnyFn): void {
    if (!this.lifeCycles[LifecycleHooks.UPDATED]) {
      this.lifeCycles[LifecycleHooks.UPDATED] = [];
    }
    this.lifeCycles[LifecycleHooks.UPDATED].push(fn);
  }

  onBeforeUnmount(fn: AnyFn): void {
    if (!this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT]) {
      this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT] = [];
    }
    this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT].push(fn);
  }

  onUnmounted(fn: AnyFn): void {
    if (!this.lifeCycles[LifecycleHooks.UNMOUNTED]) {
      this.lifeCycles[LifecycleHooks.UNMOUNTED] = [];
    }
    this.lifeCycles[LifecycleHooks.UNMOUNTED].push(fn);
  }

  setDom(dom: HTMLElement) {
    this.dom = dom;
  }

  // showDom(enterClass: string = 'enter', enterActiveClass: string = 'enter-active'): void {
  //   if (this.dom instanceof HTMLElement) {
  //     this.dom.classList.add(enterClass);
  //     this.dom.offsetHeight; // 触发重绘
  //     this.dom.classList.remove(enterClass);
  //     this.dom.classList.add(enterActiveClass);
  //   }
  // }
  //
  // hideDom(leaveClass: string = 'leave', leaveActiveClass: string = 'leave-active'): void {
  //   if (this.dom instanceof HTMLElement) {
  //     this.dom.classList.add(leaveClass);
  //     this.dom.offsetHeight; // 触发重绘
  //     this.dom.classList.remove(leaveClass);
  //     this.dom.classList.add(leaveActiveClass);
  //     this.dom.addEventListener('transitionend', () => {
  //       // this.dom?.classList.remove(leaveActiveClass);
  //       //
  //     }, { once: true });
  //   }
  // }
  //
  deleteDom?(
    // leaveClass: string = 'leave', leaveActiveClass: string = 'leave-active'
  ): void; // {
    // if (this.dom instanceof HTMLElement) {
    //   this.dom.classList.add(leaveClass);
    //   this.dom.offsetHeight; // 触发重绘
    //   this.dom.classList.remove(leaveClass);
    //   this.dom.classList.add(leaveActiveClass);
    //   this.dom.addEventListener('transitionend', () => {
    //     // if (this.dom.parentNode === this.container) {
    //     //   this.container.removeChild(this.element);
    //     (this.dom as HTMLElement)?.remove();
    //     this.dom = undefined;
    //     // }
    //   }, { once: true });
    // }
  // }
}
