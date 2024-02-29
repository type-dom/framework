import { TypeElement } from '../type-element.abstract';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeDiv } from '../type-html/div/div.abstract';
import type { ITypeContainer } from './type-container.interface';
/**
 * 组件基类
 * 子节点是 TypeElement, 不包括 TextNode
 */
export abstract class TypeContainer extends TypeDiv implements ITypeContainer {
  abstract declare parent: TypeHtml;
  declare childNodes: TypeElement[];  // 没有TextNode
  protected constructor() {
    super();
    this.childNodes = [];
  }

  override get firstChild(): TypeElement {
    return this.childNodes[0];
  }

  override get lastChild(): TypeElement {
    return this.childNodes[this.length - 1];
  }

  override findChildAtIndex(index: number): TypeElement | null {
    return this.childNodes[index] || null;
  }

  override findChildIndex(child: TypeElement): number {
    return this.childNodes.findIndex(item => item === child);
  }
}
