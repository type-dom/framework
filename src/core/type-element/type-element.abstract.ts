import { Dayjs } from 'dayjs';
import { isString, isNumber } from '@type-dom/utils';
import { TextNode } from '../../dom/components/text-node/text-node.class';
import {
  addAttrProp,
  Attributes,
  renderAttrObj,
  resetAttrObj,
} from '../../dom/modules/attribute';
import { renderStyleObj, resetStyleObj } from '../../dom/modules/style/style';
import { removeDom } from '../helpers/removeDom';
import {createDom} from "../helpers/createDom";
import { findDown } from '../helpers/findDown';
import { mountElement } from '../helpers/mountElement';
import { useRecurseRender } from '../helpers/useRecurseRender';
import { useParams } from '../helpers/useParams';
import { transformSlot } from '../helpers/transformSlot';
import type { ISlotItem, ISlotRaw, TypeProps, } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { currentInstance } from '../component';
import { NodeName } from '../enums';
import type { IBoundBox, ITypeElement, TypeEl } from './type-element.interface';

// export let uid = 0;
// export let componentId = 0;
export const vHash = Math.round(Math.random() * 1000000);

/**
 * 虚拟元素Element的数据结构
 * 可以对应到虚拟dom树。 createDom(tag, attr, children)
 * 与对应的导出时的数据结构是不一样的。
 * 除了 TextNode 之外的其它类型的 Node 。
 */
export abstract class TypeElement<A extends Attributes = Attributes> extends TypeNode<A> implements ITypeElement {
  abstract override dom?: HTMLElement | SVGElement | DocumentFragment; // 不会是Text；
  // 包括 fragment
  // abstract nodeName: NodeName.FRAGMENT | string; // 必然有； 且不为 #text
  childNodes: TypeNode[];
  // routerView?: any;
  rendered: boolean;
  // componentId: number;

  constructor() {
    super();
    // this.componentId = componentId++;
    this.attributes = [];
    this.childNodes = [];
    this.rendered = false;
  }

  // 向上获取真实的 element ;
  get elementParent(): TypeElement | undefined {
    if (this.baseProps.nodeName=== NodeName.FRAGMENT) {
      return this.parent?.elementParent;
    } else {
      return this;
    }
  }

  // get id(): string {
  //   return this.attr?.get('id') as string;
  // }

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
    if (this.dom === undefined || this.dom instanceof DocumentFragment || this.dom instanceof Comment) {
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

  get(key: string) {
    return this.baseProps[key as keyof TypeProps];
  }

  set(key: string, value: any) {
    // const propValue = this.baseProps[key];
    this.baseProps[key as keyof TypeProps] = value;
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
    // console.warn('type-element useParams . ');
    // todo TdTimeline example custom-node.ts  属性是undefined的属性，应该被过滤掉的，但是目前没有过滤。
    //    这样会把默认值给重置为undefined，与设计不符。
    //    又没有场景就是给props的属性赋值 undefined ?????
    //    TdInput 会多出前后缀， 有冲突。
    // const param = removeUndefinedProps(params as any) as unknown as T;
    // console.log('param is ', param);
    // this.uid = uid++;
    for (const key of Object.keys(params)) {
      // 如果已经配置了默认值，则使用默认值
      (params as any)[key] ??= (this.baseProps as any)?.[key];
    }
    return useParams(this, params);
  }

  get textNode(): TextNode | undefined {
    // 如果 textNode 已经存在，直接返回
    // 否则创建一个新的 TextNode 并返回
    return findDown<TextNode>('className', 'TextNode', this);
  }

  /**
   * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
   * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
   * @param slot 要添加或插入的子元素或子元素数组。
   */
  // slotChildren(slot?: ISlotItem) {
  //   transformSlot(this, slot);
  // }

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
  unshiftChild(newChild: string | number | boolean | undefined | Dayjs | TypeNode): void {
    if (newChild instanceof TypeNode) {
      newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
      if (this.scopedId) {
        this.scopedId = this.scopedId ?? this.parent?.scopedId;
        newChild.scopedId = newChild.scopedId ?? this.scopedId;
        addAttrProp(newChild, newChild.scopedId, '');
      }
      if (currentInstance === this) {
        newChild.createdIn = 'setup';
        this.createdIn = 'setup';
      }
      this.childNodes.unshift(newChild);
    } else if (isNumber(newChild) || isString(newChild)) {
      const text = new TextNode(newChild);
      text.setParent(this);
      this.childNodes.unshift(text);
    } else {
      console.error('newChild is ', newChild);
    }
  }

  unshiftChildren(...newChildren: TypeNode[]) {
    this.childNodes.unshift(...newChildren);
  }

  /**
   * 后面添加子元素
   * new 时，也就是创建时，可以不设置parent；但是addChild时，需要设置parent。
   * todo List 动态添加子元素时，新元素的scopedId会丢失。
   * @param newChild
   */
  addChild(newChild: string | number | boolean | undefined | Dayjs | TypeNode): void {
    if (newChild instanceof TypeNode) {
      // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
      newChild.setParent(this);
      this.scopedId = this.scopedId ?? this.parent?.scopedId;
      if (this.scopedId) {
        newChild.scopedId = newChild.scopedId ?? this.scopedId;
        addAttrProp(newChild, newChild.scopedId, '');
      }
      if (currentInstance === this) {
        newChild.createdIn = 'setup'; // todo why ???
        this.createdIn = 'setup';
      }
      this.childNodes.push(newChild);
    } else if (isNumber(newChild) || isString(newChild)) {
      const text = new TextNode(newChild);
      text.setParent(this);
      this.childNodes.push(text);
    } else {
      console.error('newChild  is ', newChild);
    }
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
  insertChild(child: ISlotRaw, index: number): void {
    // console.log('insertChild . ');
    if (child instanceof TypeNode) {
      this.childNodes.splice(index, 0, child);
      child.setParent(this);
    } else {
      // if (isBoolean(child)) child = String(child);
      const text = new TextNode(String(child));
      text.setParent(this);
      this.childNodes.splice(index, 0, text);
    }
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
    // useResetFragment(this);
    for (let i = 0; i < length; i++) {
      if (this.childNodes[index + i].dom) {
        // todo 好像应该是 index
        // this.dom?.removeChild(this.childNodes[index + i].dom!); //    有问题。 dom 是 DocumentFragment时， 其childNodes 是空的。
        //   this.childNodes[index + i].dom?.remove();
        removeDom(this.childNodes[index + i]);
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
    console.warn('clearSetupChildDom . ');
    // if (this.dom instanceof DocumentFragment) {
    //   this.childNodes.forEach((child) => {
    //     if (child?.createdIn === 'setup') {
    //       // this.clearEvents(); // fix drawer with footer, button events emit thirdly
    //       removeDom(child);
    //     }
    //   });
    // } else {
      // let first = this.dom?.firstElementChild;
      // while (first) {
      //   first.remove();
      //   first = this.dom?.firstElementChild;
      // }
      this.childNodes.forEach(child => {
        if (child?.createdIn === 'setup') {
          // this.clearEvents(); // fix drawer with footer, button events emit thirdly
          removeDom(child);
        }
      })
    // }
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
        removeDom(child);
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
    // transformSlot(this, slot);
    transformSlot(this, slot);
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
          if (this.dom instanceof DocumentFragment && this.dom.childNodes.length === 0) {
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

  // setPropValue(key: keyof this, value: IJsonDataProp) {
  //   // const propValue = this[key];
  //   // if (propValue instanceof XProxy) {
  //   //   propValue.setValue(value);
  //   //   if (key === 'modelValue') {
  //   //     // debugger;
  //   //     console.log('propValue is ', propValue);
  //   //     (this as any)?.setModelValue(value);
  //   //   }
  //   // }
  // }


  /**
   * 挂载到真实DOM；
   * 需要手动挂载组件时使用，一般是挂载到框架外的DOM元素时。
   * 框架内的对象直接addChild就可以了。
   * 子元素是伪元素时，dom是undefined，要递归向下挂载。
   * mount(el) 类似与 main() 是框架的入口。
   * 使用fragment要优化
   * @param el 是DocumentFragment时，和HTMLElement一样处理。层层 appendChild
   */
  mount(el?: TypeEl) {
    return mountElement(this, el);
  }

  // todo
  // update(el?: TypeEl): void  {
  //   // console.warn('then update this.className is ' + this.className);
  //   useUpdate(this, el);
  // }

  /**
   * 默认初始化方法
   * 清理多余的对象。
   * TODO 应该叫 preCreateInstance
   * @param literal
   */
  createInstance(literal: ITypeElement): void {
    resetAttrObj(this, literal.params?.attrObj)
    resetStyleObj(this, literal.params?.styleObj);
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
    createDom(this);
  }

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    this.preRender();
    if (this.baseProps.nodeName !== NodeName.FRAGMENT) {
      renderStyleObj(this);
      renderAttrObj(this);
    } else {
      // console.log('fragment render .'); // todo
    }
    // console.log('this.dom is ', this.dom);
    this.rendered = true;
  }
}
