import { isString, isNumber, isBoolean } from '@type-dom/utils';
import { Dayjs } from 'dayjs';
import { TextNode } from '../../../dom/components/text-node/text-node.class';
import { emptyAppContext, } from '../../../dom/components/app/createAppContext';
import {
  Attributes,
  addAttrProp,
  renderAttrObj,
  resetAttrObj,
  addAttrObj,
  setAttrObj,
} from '../../../dom/modules/attribute';
import { renderStyleObj, resetStyleObj, addStyleObj, setStyleObj
} from '../../../dom/modules/style/style';
import { StyleValue } from '../../../dom/modules/style/style.interface';
import { isRef, Ref, unref } from '../../../reactivity';
import { findDown } from '../../helpers/findDown';
import { useRecurseRender } from '../../helpers/useRecurseRender';
import { transformSlot } from '../../transforms/transformSlot';
import { RendererElement } from '../../renderer/renderer';
import { renderElement } from '../../renderer/renderElement';
import { removeBetween } from '../../renderer/removeBetween';
import { currentInstance, SetupContext } from '../../component';
import { NodeName } from '../../enums';
// import { nextTick } from '../../scheduler';
import { TypeNode } from '../type-node/type-node.abstract';
import type { ISlotItem, IChild, TypeProps, } from '../type-node/type-node.interface';
import { mountElement } from './mountElement';
import type { IBoundBox, ITypeElement } from './type-element.interface';

// export let uid = 0;
// export let componentId = 0;
export const vHash = Math.round(Math.random() * 1000000);

/**
 * 虚拟元素Element的数据结构
 * 可以对应到虚拟dom树。 createDom(tag, attr, children)
 * 与对应的导出时的数据结构是不一样的。
 * 除了 TextNode 之外的其它类型的 Node 。
 */
export abstract class TypeElement<
  Props extends TypeProps = TypeProps,
  Attrs extends Attributes = Attributes
>
  extends TypeNode<Props, Attrs>
  implements ITypeElement
{
  abstract override dom: HTMLElement | SVGElement | DocumentFragment; // 不会是Text；
  // 包括 fragment
  // abstract nodeName: NodeName.FRAGMENT | string; // 必然有； 且不为 #text
  childNodes: TypeNode[];
  // routerView?: any;
  // isRendered: boolean;
  // componentId: number;

  constructor(params: Props) {
    super(params);
    // this.componentId = componentId++;
    this.attributes = [];
    this.childNodes = [];
    this.isRendered = false;

    // console.warn('this is ', this);
    // nextTick(() => {
    //   console.warn('then setup . ')
    //   setCurrentInstance(this);
    //   params.setup?.bind(this)(this.props); // todo 与 this.setup 的执行顺序 ？？
    //   this.setup?.(this.props);
    // })
  }

  setup(props: Props, ctx?: SetupContext) {
    transformSlot(this, props.slot ?? props.slots?.default);
  };

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
    if (
      this.dom === undefined ||
      this.dom instanceof DocumentFragment ||
      this.dom instanceof Comment
    ) {
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    }
    const { left, top, width, height } = this.dom.getBoundingClientRect();
    // console.log('left is ', left, 'top is ', top, 'width is ', width, 'height is ', height);
    return {
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px',
    };
  }

  get(key: string) {
    return this.props[key as keyof Props];
  }

  set(key: string, value: any) {
    // const propValue = this.props[key];
    this.props[key as keyof Props] = value;
  }

  // setTransitionProps(props: TransitionProps) {
  //   this.transitionProps = props;
  // }

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
    this.addChild(newChild);
    // newChild.appendParent(this as unknown as TypeElement); // 如果不是子类，是其它地方的对象加过来，要重设其父类。
    if (newChild instanceof TypeElement) {
      useRecurseRender(newChild, this.dom as RendererElement);
    } else {
      newChild.render();
    }
  }

  /**
   * 从前面添加子元素
   * @param newChild
   */
  unshiftChild(newChild: IChild): void {
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

  /**
   * 后面添加子元素
   * new 时，也就是创建时，可以不设置parent；但是addChild时，需要设置parent。
   * 注： 如果多次添加同一个元素，则会复制这个元素，而不是直接添加到子节点上。
   * todo List 动态添加子元素时，新元素的scopedId会丢失。
   * @param newChild
   */
  addChild(newChild: IChild | Ref<string | number | Dayjs | undefined>): void {
    if (newChild instanceof TypeNode) {
      // if (newChild.className === 'TdMenuItem') {
      //   console.error('newChild is TdMenuItem');
      // }
      // if (newChild.className === 'UL') {
      //   console.error('newChild is UL . this is ', this);
      // }
      // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
      // 如果两个不同的组件的添加了newChild 会被加载两次，parent会被重置。如 vIf vElse 时，props.slot会在两个不同的分支组件中加载；
      //   todo newChild 是否要改为 类 本身， 然后 new Constructor(params).  ----> 无法解决 vIf,vElse
      if (newChild.parent) {
        // add by me 2025/09/02 11:11
        // console.warn('newChild has been added . ');
        newChild = new (newChild.constructor as any)(
          newChild.params
        ) as TypeNode; // todo newChild是否会被做其它处理 ？？？？
      }
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
      // todo appContext.app 在createApp创建的项目中，应该是 App而不是null
      // inherit parent app context - or - if root, adopt from root vnode
      // const parent = this.parent;
      const appContext =
        newChild.appContext ?? this.appContext ?? emptyAppContext;
      if (appContext.app == null) {
        // console.error('addChild appContext.app is ', appContext.app);
      } else {
        newChild.appContext = appContext;
        newChild.provides = newChild.provides ?? this.provides
        // ?? Object.create(appContext.provides);
      }

      this.childNodes.push(newChild);
    } else if (isNumber(newChild) || isString(newChild) || isBoolean(newChild) || isRef(newChild)) {
      if (isRef(newChild)) {
        const raw = newChild.get();
        // && raw !== undefined  td-rate append text show need .
        if (!isNumber(raw) && !isString(raw) && !isBoolean(raw) && raw !== undefined) {
          console.error(`newChild is not Ref<string | number>`);
          return;
        }
      }
      const text = new TextNode(newChild, this);
      // text.setParent(this);
      this.childNodes.push(text);
    } else { // null or undefined , create CommentNode;
      console.error('newChild  is ', newChild);
      // const comment = new CommentNode(''); // error
      // this.childNodes.push(comment);
    }
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: IChild[]): void {
    newChildren.forEach((child) => child && this.addChild(child));
  }

  /**
   * 在指定下标插入新的文本或节点。
   * @param child
   * @param index 要插入的目标位置
   */
  insertChild(child: IChild, index: number): void {
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
    for (let i = 0; i < length; i++) {
      if (this.childNodes[index + i].dom) {
        // todo 好像应该是 index
        // this.dom?.removeChild(this.childNodes[index + i].dom!); //    有问题。 dom 是 DocumentFragment时， 其childNodes 是空的。
        //   this.childNodes[index + i].dom?.remove();
        renderElement(this.childNodes[index + i], this.dom, false);
      }
    }
  }

  clearSetupChildren(): void {
    this.clearSetupChildrenDom();
    this.clearSetupChildNodes();
  }
  clearSetupChildNodes(): void {
    // this.childNodes.forEach(child => child.unmount());
    this.childNodes = this.childNodes.filter(
      (child) => child.createdIn !== 'setup'
    );
  }

  clearSetupChildrenDom(): void {
    // console.warn('clearSetupChildDom . ');
    this.childNodes.forEach((child) => {
      if (child?.createdIn === 'setup') {
        // this.clearEvents(); // fix drawer with footer, button events emit thirdly
        renderElement(child, this.dom, false);
      }
    });
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
      // console.warn('clearChildrenDom . then renderFragment . ');
      // children move to fragment.dom
      // renderFragment(this, this.dom,false);
      if (this.anchorStart && this.anchor) {
        removeBetween(this.anchorStart, this.anchor);
      } else if (this.dom.childNodes.length > 0) {
        //   todo
      }
      if (this.targetStart && this.targetAnchor) {
        removeBetween(this.targetStart, this.targetAnchor);
        this.anchorStart?.remove();
        this.anchor?.remove();
        this.targetStart.remove();
        this.targetAnchor.remove();
      }
      //   teleport targetAnchor and targetStart
      const teleports = this.findDownNodes('Teleport');
      teleports.forEach(teleport => {
        if (teleport.targetStart && teleport.targetAnchor) {
          removeBetween(teleport.targetStart, teleport.targetAnchor);
          teleport.anchorStart?.remove();
          teleport.anchor?.remove();
          teleport.targetStart.remove();
          teleport.targetAnchor.remove();
        }
      })
    } else {
      // child is Text, can not delete , write like this;
      let first = this.dom?.firstChild;
      while (first && first.parentNode && first.parentNode.contains(first)) {
        first.remove();
        first = this.dom?.firstChild;
      }
    }
  }
  // 清理子节点
  clearChildNodes(): void {
    // console.warn('clearChildNodes . ');
    // this.childNodes.forEach(child => child.unmount());
    this.childNodes = [];
  }

  replaceChildren(slot: ISlotItem) {
    this.clearChildren();
    transformSlot(this, slot);
  }

  /**
   * 挂载到真实DOM；
   * 需要手动挂载组件时使用，一般是挂载到框架外的DOM元素时。
   * 框架内的对象直接addChild就可以了。
   * 子元素是伪元素时，dom是undefined，要递归向下挂载。
   * mount(el) 类似与 main() 是框架的入口。
   * 使用fragment要优化
   * @param container 是DocumentFragment时，和HTMLElement一样处理。层层 appendChild
   */
  mount(container: RendererElement) {
    return mountElement(this, container);
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
    resetAttrObj(this, unref(literal.params?.attrObj));
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
  }

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    this.preRender();
    if (this.dom?.nodeName !== NodeName.FRAGMENT) {
      renderStyleObj(this);
      renderAttrObj(this);
    } else {
      // console.log('fragment render .'); // todo
    }
    // console.log('this.dom is ', this.dom);
    this.isRendered = true;
  }
  addAttrObj(attrObj?: Attrs) {
    addAttrObj(this, attrObj);
  }

  setAttrObj(attrs?: Attrs) {
    setAttrObj(this,  attrs)
  }

  addStyleObj(styleObj?: StyleValue) {
    addStyleObj(this, styleObj);
  }

  setStyleObj(styleObj?: StyleValue) {
    setStyleObj(this, styleObj);
  }
}
// const emptyAppContext = createAppContext()
