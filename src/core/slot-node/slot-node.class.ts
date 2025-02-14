import { Computed, Signal } from '@type-dom/signals';
import { Parser } from '../../parser';
import { TypeNode } from '../type-node/type-node.abstract';
import { ISlotConfig, ITypeConfig } from '../type-node/type-node.interface';
import { TextNode } from '../text-node/text-node.class';
import { TypeElement } from '../type-element/type-element.abstract';
import { ISlotNodeConfig } from './slot-node.interface';

export class SlotNode extends TypeNode {
  className: 'SlotNode';
  nodeName: 'fragment';
  nodeValue: undefined;
  rendered: boolean;
  dom: DocumentFragment;
  style: undefined;
  attr: undefined;
  name: 'default' | string;
  textNode?: TextNode;
  override props: ISlotNodeConfig;
  override childNodes: TypeNode[];

  constructor(
    name = 'default',
    slot?: ISlotConfig
  ) {
    super();
    this.className = 'SlotNode';
    this.nodeName = 'fragment';
    this.dom = document.createDocumentFragment();
    this.rendered = false;
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
    this.props = this.useParams({
      name,
      slot,
    });
  }

  get elementParent(): TypeElement | undefined {
    return this.parent?.elementParent;
  }

  useParams<T extends ITypeConfig>(params = {} as T): T {
    this.params = params;
    if (params?.init) {
      params.init(this);
    }
    if (params.parent) {
      this.parent = params.parent;
    }
    if (params?.html) {
      const parser = new Parser();
      const xElement = parser.parseFromString(params.html);
      this.addChild(xElement);
    }
    // 组件库中的组件 是没有 params.childNodes 的；
    // if (params?.childNodes) {
    //   // 父元素为当前元素，子元素为params.childNodes
    //   params.childNodes.forEach((item) => {
    //     // item.parent = this; // addChild 会设置parent。
    //     this.addChild(item);
    //   });
    // }
    this.assignProps(params);
    return this.props as T;
  }

  // 往插槽中添加子节点 ， ToDo addSlot appendSlot insertSlot pushSlot
  slotChild(slot?: ISlotConfig) {
    if (!slot) {
      return;
    }
    this.props.slot = slot;
    // this.slotChild(slot);
    if (slot instanceof TypeNode) {
      slot.setParent(this);
      this.childNodes.push(slot);
    } else if (typeof slot === 'string' || slot instanceof Signal || slot instanceof Computed) {
      this.childNodes.push(new TextNode(slot));
    } else if (slot instanceof Array) {
      slot.forEach((item) => {
        if (item instanceof TypeNode) {
          this.childNodes.push(item);
        } else if (typeof item === 'string') {
          this.childNodes.push(new TextNode(item));
        } else {
          console.error('slotChild is not string or TypeNode . ');
        }
      });
    }
  }

  /**
   * 后面添加子元素
   * new 时，也就是创建时，可以不设置parent；但是addChild时，需要设置parent。
   * @param newChild
   */
  addChild(newChild: TypeNode): void {
    // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
    newChild.setParent(this);
    this.childNodes.push(newChild);
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: TypeNode[]): void {
    newChildren.forEach((child) => this.addChild(child));
  }

  // todo 要避免修改 slot 的parent，
  //    避免和直接使用 slotChild 冲突
  //    mount时，没有问题，但是 update时，挂载的真实Element如何清空是个问题
  resetSlot(slot?: ISlotConfig) {
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

  /**
   * 挂载到真实DOM；
   * 需要手动挂载组件时使用，一般是挂载到框架外的DOM元素时。
   * 框架内的对象直接addChild就可以了。
   * 子元素是伪元素时，dom是undefined，要递归向下挂载。
   * mount(el) 类似与 main() 是框架的入口。
   * ToDo 使用fragment要优化
   * @param el
   */
  override mount<T extends TypeElement>(
    el?: string | HTMLElement | SVGElement | ShadowRoot
  ): T {
    // console.warn('mount .');
    // this.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加。
    this.created?.();

    let appEl:
      | HTMLElement
      | SVGElement
      | ShadowRoot
      | DocumentFragment
      | null
      | undefined;
    if (
      el instanceof HTMLElement ||
      el instanceof SVGElement ||
      el instanceof ShadowRoot
    ) {
      appEl = el;
    } else if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    }
    this.beforeMount?.();
    // fragment会创建dom；this.dom不会为空
    // todo end
    for (const child of this.children) {
      // fragment 的dom是DocumentFragment。
      child.dom && this.dom.appendChild(child.dom); // todo 如何处理？？？
      // todo child 是 Transition时，这里的逻辑有问题
      if (appEl) {
        child.mount(appEl);
      } else {
        throw Error('Can not find el . ');
      }
    }
    this.mounted?.();
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    return this as unknown as T;
  }

  // todo 钩子函数
  render(): void {
    this.rendered = true;
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
    this.childNodes.forEach((child) => {
      child.removeDom();
    });
  }

  // 清理子节点
  clearChildNodes(): void {
    // this.childNodes.forEach(child => child.unmount());
    this.childNodes = [];
  }

  update(
    el?: string | HTMLElement | SVGElement | ShadowRoot | DocumentFragment
  ) {
    console.warn('update . ');
    if (this.props.disabled) {
      return;
    }
    let appEl:
      | HTMLElement
      | SVGElement
      | ShadowRoot
      | DocumentFragment
      | null
      | undefined;
    if (
      el instanceof HTMLElement ||
      el instanceof SVGElement ||
      el instanceof ShadowRoot
    ) {
      appEl = el;
    } else if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    }
    this.clearChildrenDom();
    // this.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加。
    // this.recurseSetup(); // 挂载时，递归执行setup
    // this.lifeCycles.beforeUpdate?.forEach((cb) => cb());
    this.beforeUpdate?.();
    // todo DocumentFragment 挂载到其他元素上，子节点要根据数组重新赋值。
    for (const child of this.children) {
      // fragment 的dom是DocumentFragment。
      // child.dom && this.dom?.appendChild(child.dom); // todo 如何处理？？？
      // todo child 是 Transition时，这里的逻辑有问题
      // appEl = appEl || this.parent?.elementParent?.dom;
      if (this.to) {
        child.update(this.to);
        // console.log('this.to is ', this.to);
      } else if (appEl) {
        child.update(appEl);
      } else {
        // throw Error('Can not find el . ');
        if (child.className === 'Teleport') {
          child.update();
        } else {
          child.update(this.elementParent?.dom);
        }
      }
    }
    this.updated?.();
  }
}
