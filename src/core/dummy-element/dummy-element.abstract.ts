import { TypeElement } from '../type-element/type-element.abstract';
import { TypeNode } from '../type-node/type-node.abstract';
import { IDummyElement } from './dummy-element.interface';

export abstract class DummyElement extends TypeNode implements IDummyElement {
  nodeName: undefined;
  nodeValue: undefined;
  childNodes: TypeNode[];
  dom: undefined;
  parent?: TypeElement | DummyElement;
  abstract slot?: TypeElement | TypeElement[];
  beforeRender?: (el: TypeElement) => void;
  afterRender?: (el: TypeElement) => void;

  constructor() {
    super();
    this.childNodes = [];
  }

  /**
   * 从前面添加子元素
   * @param newChild
   */
  unshiftChild(newChild: TypeNode): void {
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
    newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
    this.childNodes.push(newChild);
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: TypeNode[]): void {
    newChildren.forEach((child) => child.appendParent(this));
  }

  setSlot(slot: TypeElement | TypeElement[]) {
    this.slot = slot;
  }

  render() {
    if (!this.slot) {
      throw Error('slot is not exist . ');
    }
    // todo 是否需要清理 parent 的dom子元素？？？
    if (this.slot instanceof TypeElement) {
      this.slot.dom && this.beforeRender && this.beforeRender(this.slot);
      this.slot.render();
      this.afterRender && this.afterRender(this.slot);
      if (!this.slot.dom) {
        throw Error('this.slot.dom is not exist . ');
      }
      this.elementParent?.dom?.appendChild(this.slot.dom);
    } else if (this.slot instanceof Array) {
      this.slot?.forEach((child) => {
        this.beforeRender && this.beforeRender(child);
        child.render();
        if (!child.dom) {
          throw Error('child.dom is not exist . ');
        }
        this.elementParent?.dom?.append(child.dom);
        this.afterRender && this.afterRender(child);
      });
    } else {
      throw Error('this.slot is not exist . ');
    }
  }
}
