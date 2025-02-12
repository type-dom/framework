import { camelToDash } from '@type-dom/utils';
import { Computed, isRef, Signal, unref, watch } from '@type-dom/signals';
import { IStyle } from '@type-dom/css-type';
import { AnyFn, IJsonDataProp } from '../../interface';
import { RouterView } from '../../router/router-view/router-view.class';
import { Parser } from '../../parser';
import type { ISlotConfig, ISlotNodes, ITypeConfig } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { TextNode } from '../text-node/text-node.class';
import { SlotNode } from '../slot-node/slot-node.class';
import { ITransitionConfig } from '../../components';
import { setCurrentInstance } from '../instance';
import { LifecycleHooks } from '../enums';
import { toValue } from '../../use';
import type { IBoundBox, ITypeElement } from './type-element.interface';

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
  // abstract nodeName: 'fragment' | string; // 必然有； 且不为 #text
  // nodeValue?: undefined;
  childNodes: TypeNode[];
  routerView?: RouterView; // 其实就是一个特殊的 SlotNode ;
  // textNode?: TextNode;
  transitionProps?: ITransitionConfig;
  // data?: IObData; // ITypeNode 中设置了
  // modelValue?: MaybeRef<IPrimitive>;
  rendered: boolean;
  slotNodes: ISlotNodes;
  componentId: number;

  protected constructor() {
    super();
    this.componentId = componentId++;
    // this.attr.addObj({
    //   ['data-v-' + vHash]: true,
    // });
    this.attributes = [];
    this.childNodes = [];

    this.slotNodes = {
      // default: new SlotNode('default'),
    };
    this.rendered = false;
  }

  // 向上获取真实的 element ;
  get elementParent(): TypeElement | undefined {
    if (this.props.nodeName=== 'fragment') {
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

  get(key: keyof ITypeConfig) {
    return this.props[key];
  }

  set(key: keyof ITypeConfig, value: IJsonDataProp) {
    const propValue = this.props[key];

  }

  setTransitionProps(props: ITransitionConfig) {
    this.transitionProps = props;
  }

  /**
   * 配置参数
   * 使用传入的参数，与节点结合
   * @param params
   */
  useParams<T extends ITypeConfig>(params = {} as T): T {
    if (params?.init) {
      params.init(this);
    }
    if (params?.name) {
      this.attr?.addName(params.name);
    }
    if (params?.class) {
      this.attr?.addClass(params.class);
    }
    this.params = params;
    if (params.parent) {
      this.parent = params.parent;
    }
    if (params?.html) {
      const parser = new Parser();
      const xElement = parser.parseFromString(params.html);
      this.addChild(xElement);
    }
    // if (params?.data) {
    //   // this.setDataObservable(params.data);
    //   this.data = reactive(params.data);
    //   // console.log('this.data$ is ', this.data$);
    // }
    // todo 是否要单独处理。因为 parent 链是依赖addChild的。
    // 组件库中的组件 是没有 params.childNodes 的；
    // if (params?.childNodes) {
    //   // 父元素为当前元素，子元素为params.childNodes
    //   params.childNodes.forEach((item) => {
    //     // item.parent = this; // addChild 会设置parent。
    //     this.addChild(item);
    //   });
    //   // this.childNodes = params.childNodes;
    //   // this.addChildren(...params.childNodes);
    // }
    // if (params.styleObj) {
    //   this.style.addObj(params.styleObj);
    // }
    // if (params.attrObj) {
    //   this.attr.addObj(params.attrObj);
    // }
    // if (params.events) {
    //   this.addEvents(params.events);
    // }
    this.assignProps(params);
    return this.props as T;
  }

  useStyle<T extends ITypeConfig>(params = {} as T): T {
    if (params.styleObj) {
      this.style?.addObj(params.styleObj);
    }
    return this.props as T;
  }

  useAttr<T extends ITypeConfig>(params = {} as T): T {
    if (params.attrObj) {
      this.attr?.addObj(params.attrObj);
    }
    return this.props as T;
  }

  // Prop
  addPropObj<T extends ITypeConfig>(config?: T) {
    for (const key in config) {
      if (key === 'attrObj' && config?.attrObj) {
        this.attr?.addObj(config.attrObj);
      } else if (key === 'styleObj' && config?.styleObj) {
        this.style?.addObj(config.styleObj);
      } else {
        this.addProp(key, config?.[key]);
        // this.props[key] = config?.[key];
      }
    }
    return this.getProps<T>() as T;
  }

  get textNode(): TextNode | undefined {
    // 如果 textNode 已经存在，直接返回
    // 否则创建一个新的 TextNode 并返回
    return this.down<TextNode>('className', 'TextNode');
  }

  isFragment() {
    return this.props.nodeName=== 'fragment' && this.dom === undefined;
  }

  /**
   * 确保slot存在，不存在则创建；
   * 要在useSlots之后调用
   * teleport.class.ts:2 Uncaught ReferenceError: Cannot access 'TypeFragment' before initialization
   * @param name
   */
  getSlotNode(name = 'default') {
    // return this.slotNodes[name];
    return this.slotNodes[name] = this.slotNodes[name] ?? new SlotNode(name);
  }

  // 要先执行
  useSlots(params?: ITypeConfig): ISlotNodes {
    if (params?.slot) {
      this.getSlotNode().resetSlot(params.slot);
    }
    params?.slots &&
    Object.keys(params.slots).forEach((key) => {
      this.getSlotNode(key).resetSlot(params.slots?.[key]);
    });
    return this.slotNodes;
  }

  /**
   * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
   * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
   * @param slot 要添加或插入的子元素或子元素数组。
   * @param type 操作类型，可选值为`add`（默认）或`unshift`，分别代表添加和前置插入子元素。
   */
  slotChild(
    slot?: ISlotConfig,
    type: 'add' | 'unshift' = 'add'
  ) {
    if (slot === undefined) {
      return;
    }
    if (type === 'unshift') {
      if (slot instanceof TypeNode) {
        this.unshiftChild(slot);
      } else if (typeof slot === 'string' || typeof slot === 'number') {
        this.unshiftChild(new TextNode(slot));
      } else if (slot instanceof Signal || slot instanceof Computed) {
        const val = toValue(slot);
        if (typeof val === 'string' || typeof val === 'number') {
          this.unshiftChild(new TextNode(slot));
        } else if (val instanceof TypeNode) {
          this.unshiftChild(val);
        }
      } else if(slot instanceof Array) {
        slot.forEach((item) => {
          if (item instanceof TypeNode) {
            this.unshiftChild(item);
          } else if (typeof item === 'string' || typeof item === 'number') {
            this.unshiftChild(new TextNode(item));
          } else if (item instanceof Signal || item instanceof Computed) {
            const val = toValue(item);
            if (typeof val === 'string' || typeof val === 'number') {
              this.unshiftChild(new TextNode(val));
            } else if (val instanceof TypeNode) {
              this.unshiftChild(val);
            }
          }
        });
      }
    } else {
      if (slot instanceof TypeNode) {
        this.addChild(slot);
      } else if (typeof slot === 'string' || typeof slot === 'number') {
        this.addChild(new TextNode(slot));
      }  else if (slot instanceof Signal || slot instanceof Computed) {
        const val = toValue(slot);
        if (typeof val === 'string' || typeof val === 'number') {
          this.addChild(new TextNode(slot));
        } else if (val instanceof TypeNode) {
          this.addChild(val);
        }
      } else if (slot instanceof Array) {
        slot.forEach((item) => {
          if (item instanceof TypeNode) {
            this.addChild(item);
          } else if (typeof item === 'string' || typeof item === 'number') {
            this.addChild(new TextNode(item));
          } else if (item instanceof Signal || item instanceof Computed) {
            const val = toValue(item);
            if (typeof val === 'string' || typeof val === 'number') {
              this.addChild(new TextNode(item));
            } else if (val instanceof TypeNode) {
              this.addChild(val);
            }
          } else {
            console.error('slotChild is not string or TypeNode . ');
          }
        });
      }
    }
    if (slot instanceof Computed) {
      watch(() => slot.get(), (slot) => {
        // console.warn('slotChild computed update . ');
        this.clearChildren();
        if (type === 'unshift') {
          if (slot instanceof TypeNode) {
            this.unshiftChild(slot);
          } else if (typeof slot === 'string' || typeof slot === 'number') {
            this.unshiftChild(new TextNode(slot));
          } else if (slot instanceof Signal || slot instanceof Computed) {
            const val = toValue(slot);
            if (typeof val === 'string' || typeof val === 'number') {
              this.unshiftChild(new TextNode(slot));
            } else if (val instanceof TypeNode) {
              this.unshiftChild(val);
            }
          } else if(slot instanceof Array) {
            slot.forEach((item) => {
              if (item instanceof TypeNode) {
                this.unshiftChild(item);
              } else if (typeof item === 'string' || typeof item === 'number') {
                this.unshiftChild(new TextNode(item));
              } else if (item instanceof Signal || item instanceof Computed) {
                const val = toValue(item);
                if (typeof val === 'string' || typeof val === 'number') {
                  this.unshiftChild(new TextNode(val));
                } else if (val instanceof TypeNode) {
                  this.unshiftChild(val);
                }
              }
            });
          }
        } else {
          if (slot instanceof TypeNode) {
            slot.update();
            this.appendChild(slot);
          } else if (typeof slot === 'string' || typeof slot === 'number') {
            this.appendChild(new TextNode(slot));
          } else if (slot instanceof Array) {
            slot.forEach((item) => {
              if (item instanceof TypeNode) {
                this.appendChild(item);
              } else if (typeof item === 'string' || typeof item === 'number') {
                this.appendChild(new TextNode(item));
              } else if (item instanceof Signal || item instanceof Computed) {
                const val = toValue(item);
                if (typeof val === 'string' || typeof val === 'number') {
                  this.appendChild(new TextNode(item));
                } else if (val instanceof TypeNode) {
                  this.appendChild(val);
                }
              } else {
                console.error('slotChild is not string or TypeNode . ');
              }
            });
          }
        }
      }, { immediate: true });
    }
  }

  /**
   * 在最后位置添加一个子节点，并渲染；
   * 如果newChild.parent存在，则可能需要执行newChild?.parent.removeChild(newChild)。需要根据业务逻辑判断。
   * 渲染到dom上
   * @param newChild
   */
  appendChild(newChild: TypeNode): void {
    newChild.appendParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。
    this.renderChild(newChild); // todo this.render() 现在这样可能不渲染；因为自身DOM可能没有创建；
    // this.dom.appendChild(newChild.render().dom);
  }

  appendChildren(...newChildren: Array<TypeNode>) {
    for (const child of newChildren) {
      this.appendChild(child);
    }
  }

  /**
   * 从前面添加子元素
   * @param newChild
   */
  unshiftChild(newChild: TypeNode): void {
    newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
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
    this.childNodes.push(newChild);
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: TypeNode[]): void {
    newChildren.forEach((child) => this.addChild(child));
  }

  /**
   * 通常与appendChild同时使用，但也有可能，分离开来使用
   * dom子节点会被重新渲染一遍。
   * WebPage是单独处理的。
   * todo Fragment需要单独处理。
   * @param newChild
   */
  renderChild(newChild: TypeNode): void {
    newChild.render();
    if (newChild.dom) {
      this.resetFragment();
      this.dom?.appendChild(newChild.dom);
    }
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
    // 如果下标位置已有dom节点。
    if (this.childNodes.length > index + 1) {
      this.resetFragment();
      if (newChild.dom !== undefined) {
        if (this.dom!.childNodes![index]) {
          this.dom?.insertBefore(newChild.dom, this.dom!.childNodes![index]);
        } else {
          this.dom?.appendChild(newChild.dom);
        }
      }
    } else {
      this.renderChild(newChild);
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
    this.resetFragment();
    for (let i = 0; i < length; i++) {
      if (this.childNodes[index + i].dom) {
        this.dom?.removeChild(this.childNodes[index + i].dom!);
        //   this.childNodes[index + i].dom?.remove();
      }
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
    if (this.dom instanceof DocumentFragment) {
      this.childNodes.forEach((child) => {
        child.removeDom();
      });
    } else {
      let first = this.dom?.firstElementChild;
      while (first) {
        first.remove();
        first = this.dom?.firstElementChild;
      }
    }
  }

  // 清理子节点
  clearChildNodes(): void {
    // this.childNodes.forEach(child => child.unmount());
    this.childNodes = [];
  }

  replaceChildren(slot: ISlotConfig) {
    this.clearChildren();
    if (slot) {
      this.slotChild(slot);
    }
  }

  /**
   *  替换指定的子元素
   */
  replaceChild(newNode: TypeElement, oldNode: TypeElement): void {
    const index = this.childNodes.indexOf(oldNode);
    if (index > -1) {
      // 替换操作
      this.childNodes.splice(index, 1, newNode);
      if (newNode.dom && oldNode.dom) {
        // fragment处理
        if (this.dom instanceof DocumentFragment && this.dom.childElementCount === 0) {
          this.dom.appendChild(newNode.dom);
        } else {
          this.dom?.replaceChild(newNode.dom, oldNode.dom);
        }
      }
      oldNode.parent = undefined;
      newNode.parent = this;
      return;
    }
    throw Error('node to be replaced is not a child of the current node . ');
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
   * 不要在setup中添加子节点；
   * 因为 mount会多次调用，导致子节点重复添加。
   * @param params
   */
  setup?(params?: ITypeConfig): void;

  recurseSetup() {
    // console.log('traverse . ');
    this.setup?.(this.params);
    this.childNodes.forEach((child) => {
      if (child instanceof TypeElement) {
        child.recurseSetup();
      }
    });
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
  mount<T extends TypeElement>(
    el?: string | HTMLElement | SVGElement | ShadowRoot
  ): T {
    // console.warn('mount .');
    // 如果不清理，再次挂载时，子节点会再添加一次。 2024/11/07 22:34
    // this.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加 ？？？？没有加载子节点。 useParams
    setCurrentInstance(this); // todo watch 优化 props.vIf的监听
    this.setup?.();
    if (Object.prototype.hasOwnProperty.call(this.props, 'vIf')) {
      // console.log('this.props has vIf');
      if (this.props.vIf !== undefined) {
        if (this.props.vIf instanceof Signal || this.props.vIf instanceof Computed) {
          // console.warn('this.props.vIf instanceof Signal || this.props.vIf instanceof Computed');
          // 添加 监听
          watch(this.props.vIf, (newValue, oldValue) => {
            // console.warn('this.attr.class is ', this.attr?.get('class') + ',  watch vIf , newVal is ', newValue);
            //   todo 优化 this.dom 分情况 HTMLElement | SVGElement | DocumentFragment
            if (newValue) {
              // this.update(); // 会死循环 todo
              //   如果自身不是Fragment, upRealElement 就是自身。
              const upEl = this.parent?.upRealElement;
              if (upEl instanceof TypeElement) {
                // upEl.appendChild(this);
                if (this.dom instanceof Element) {
                  upEl.dom?.appendChild(this.dom);
                } else if (this.dom instanceof DocumentFragment) {
                //   todo fragment
                }
              } else {
                console.error('upEl is undefined . ');
              }
            } else {
              if (this.dom instanceof DocumentFragment) {
                //   todo
              } else {
                // 原为 true 时
                oldValue && this.dom?.remove();
              }
              return;
            }
          });
        }
      }
    }

    if (Object.prototype.hasOwnProperty.call(this.props, 'vShow')) { // 首先要判断是否有这个属性
      if (this.props.vShow !== undefined) {
        if (unref(this.props.vShow) === false) {
          this.style?.addObj({
            display: 'none',
          });
        }
        if (this.props.vShow instanceof Signal || this.props.vShow instanceof Computed) {
          watch(this.props.vShow, (newValue, oldValue) => {
            // console.warn('watch vShow , newVal is ', newValue);
            if (newValue === false) {
              this.style?.setObj({
                display: 'none',
              });
            } else {
              this.style?.remove('display');
            }
          })
        }

      }
    }

    if (Object.prototype.hasOwnProperty.call(this.props, 'vModel')) {
      if (this.props.vModel !== undefined) {
        this.props.modelValue = this.props.vModel.get();
        this.addEmits({
          ['update:modelValue']: (newValue) => {
            // console.warn('this.className is ', this.className + ', update:modelValue emit , newVal is ', newValue);
            this.props.vModel?.set(newValue)
          },
          // change: (newValue) => {
          //   console.warn('change emit , newValue is ', newValue);
          //   // const isChecked  = evt.checked;
          //     this.props.vModel?.set(newValue)
          // },
          // input: (newValue) => {
          //   console.warn('input emit , evt is ', newValue);
          //   this.props.vModel?.set(newValue);
          // },
        });
        if (this.className === 'Input') { // todo
          if (this.params.attrObj?.type === 'checkbox' || this.params.attrObj?.type === 'radio') {
            this.addEvents({
              change: (evt) => {
                // console.warn('checkbox radio change emit , evt is ', evt);
                // const isChecked  = evt.checked;
                this.props.vModel?.set((evt?.target as HTMLInputElement).checked);
              },
            });
          } else {
            this.addEvents({
              input: (evt) => {
                // console.warn('text input event , evt is ', evt);
                const value = (evt?.target as HTMLInputElement)?.value;
                this.props.vModel?.set(value as any);
              },
            });
          }
        } else if (this.className === 'Textarea') {
          this.addEvents({
            input: (evt) => {
              // console.warn('textarea event , evt is ', evt);
              const value = (evt?.target as HTMLInputElement)?.value;
              this.props.vModel?.set(value as any);
            },
          });
        } else if (this.className === 'Select') {
          this.addEvents({
            change: (evt) => {
              // console.warn('select change , evt is ', evt);
              // const isChecked  = evt.checked;
              this.props.vModel?.set((evt?.target as HTMLSelectElement).value as any);
            },
          });
        }
        // todo 监听 vModel,vIf,vShow
        watch(this.props.vModel, (newValue: any)=> {
          // console.warn('this.className is ' + this.className + ', watch vModel change value , newValue is ', newValue);
          this.props.modelValue = newValue;
        }, { immediate: true });
      }
    }

    this.created?.();
    this.lifeCycles[LifecycleHooks.CREATED]?.forEach((cb) => cb());
    // this.recurseSetup(); // 挂载时，递归执行setup

    this.createDom();
    // 挂载时获取 dom，绑定到 ref 属性。
    if (this.props.ref instanceof Signal) {
      this.props.ref.set(this.dom);
    }
    let appEl: HTMLElement | SVGElement | ShadowRoot | DocumentFragment | null | undefined;
    if (
      el instanceof HTMLElement ||
      el instanceof SVGElement ||
      el instanceof ShadowRoot
    ) {
      appEl = el;
    } else if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    }
    // else {
    //   if (this.props.nodeName=== 'fragment') {
    //     appEl = this.parent?.elementParent?.dom;
    //   } else {
    //     appEl = this.dom;
    //   }
    // }
    this.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((cb) => cb());
    this.beforeMount?.();
    // fragment会创建dom；this.dom不会为空
    if (this.props.nodeName=== 'fragment') { // todo DocumentFragment 挂载到其他元素上，子节点要根据数组重新赋值。
      // todo 这段代码有问题 begin
      // this.resetFragment();
      // appEl = appEl || this.parent?.elementParent?.dom;
      // if (this.to) {
      //   this.to.appendChild(this.dom);
      // } else if(appEl) {
      //   appEl.appendChild(this.dom);
      // } else {
      //   throw Error('Can not find el . ');
      // }
      // todo end
      for (const child of this.children) {
        // fragment 的dom是DocumentFragment。
        child.dom && this.dom?.appendChild(child.dom); // todo 如何处理？？？
        // todo child 是 Transition时，这里的逻辑有问题
        // appEl = appEl || this.parent?.elementParent?.dom;
        if (this.to) {
          child.mount(this.to);
          // console.log('this.to is ', this.to);
        } else if (appEl) {
          child.mount(appEl);
        } else {
          throw Error('Can not find el . ');
        }
      }
    } else {
      this.render(); // setStyleObj, setAttrObj
      if (appEl && this.dom) {
        if (Object.hasOwnProperty.call(this.props, 'vIf')) {
          if (unref(this.props.vIf)) {
            //   todo
            appEl.appendChild(this.dom);
          }
        } else {
          appEl.appendChild(this.dom);
        }
      }
      // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
      for (const child of this.children) {
        // this.renderChild(child);
        child.mount(this.dom!);
      }
    }
    this.mounted?.();
    this.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((cb) => cb());
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    this.initEvents?.();
    this.listenEvents();

    return this as unknown as T;
  }

  // todo
  update(el?: string | HTMLElement | SVGElement | ShadowRoot | DocumentFragment): void  {
    // console.warn('this.className is ' + this.className + ' update . ');
    if (this.props.disabled) {
      return;
    }
    let appEl: HTMLElement | SVGElement | ShadowRoot | DocumentFragment | null | undefined;
    if (
      el instanceof HTMLElement ||
      el instanceof SVGElement ||
      el instanceof ShadowRoot
    ) {
      appEl = el;
    } else if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    }
    // this.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加。
    // this.recurseSetup(); // 挂载时，递归执行setup
    this.lifeCycles[LifecycleHooks.BEFORE_UPDATE]?.forEach((cb) => cb());
    this.beforeUpdate?.();
    this.createDom();
    if (Object.hasOwnProperty.call(this.props, 'vIf')) {
      if (unref(this.props.vIf) === false) {
        // console.log('this.props.vIf === false');
        // todo transition
        // this.deleteDom?.();
        // 只要不挂载就行了。
        if (this.dom instanceof Element) {
          this.dom.remove();
          // this.dom = undefined; // dom 不会删除，只是不再挂载
        }
        // return;
      } else if (unref(this.props.vIf) === true) {
        // this.createDom?.();
        // todo 应该时插入
        //   如果自身不是Fragment, upRealElement 就是自身。
        const upEl = this.parent?.upRealElement;
        if (upEl instanceof TypeElement) {
          // upEl.insertChildDom(this, this.index); // vIf 无法保证dom插入到原来的位置的。
          upEl.appendChild(this);
        } else {
          appEl?.appendChild(this.dom!);
          // console.error('upEl is undefined . ');
        }
      }
    }

    if (this.props.nodeName=== 'fragment') { // todo DocumentFragment 挂载到其他元素上，子节点要根据数组重新赋值。
      for (const child of this.children) {
        // fragment 的dom是DocumentFragment。
        child.dom && this.dom?.appendChild(child.dom); // todo 如何处理？？？
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
    } else {
      this.render(); // setStyleObj, setAttrObj
      if (appEl && this.dom) {
        appEl.appendChild(this.dom);
      }
      // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
      for (const child of this.children) {
        // this.renderChild(child);
        child.update(this.dom);
      }
    }
    this.updated?.();
    this.lifeCycles[LifecycleHooks.UPDATED]?.forEach((cb) => cb());
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    // todo 应该是有变化时才需要
    // this.initEvents?.();
    // this.listenEvents();
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
   * 初始化事件钩子
   * setConfig 时，dom可能还没有创建；
   */
  listenEvents(): void {
    // this.clearEvents(); // todo 为啥要移除
    if (!this.dom) {
      return;
    }
    if (this.observers) {
      // dom 监听事件要挂载到真实dom上。
      for (const key in this.observers) {
        const cloned =this.observers[key];
        cloned.forEach((observer) => {
          this.dom && this.dom.addEventListener(key as keyof GlobalEventHandlersEventMap, observer);
        });
      }
    }
  }

  initEvents?(): void;

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    this.preRender();
    // this.clearChildrenDom(); // todo 清理子节点的DOM
    if (this.props.nodeName!== 'fragment') {
      this.style?.renderObj();
      this.attr?.renderObj();
    } else {
      console.error('fragment should not render .');
    }
    // console.log('this.dom is ', this.dom);
    this.rendered = true;
  }
  // 原 destroy
  override unmount(root?: TypeElement) {
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
