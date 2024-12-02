import { TextNode } from '../text-node/text-node.class';
import type { ITypeConfig } from '../type-node/type-node.interface';
import { Style } from '../style/style.class';
import { Attribute } from '../attribute/attribute.class';
import { TypeElement } from '../type-element/type-element.abstract';
import type { ITypeSvg } from './type-svg.interface';

/**
 * TypeSvg类是TypeElement的抽象子类，实现了ITypeSvg接口，用于定义SVG类型元素的基本行为和属性。
 */
export abstract class TypeSvg<T extends SVGElement = SVGElement> extends TypeElement implements ITypeSvg {
  /**
   * 节点名，需由子类覆盖提供具体的节点名。
   */
  abstract override nodeName: string;
  /**
   * DOM元素，需由子类覆盖提供具体的SVG DOM元素。
   */
  abstract override dom: T;
  /**
   * 子节点数组，包含TypeSvg实例或TextNode实例。
   */
  override childNodes: (TypeSvg | TextNode)[];

  style: Style;
  attr: Attribute;

  protected constructor() {
    super();
    this.style = new Style(this);
    this.attr = new Attribute(this);
    this.childNodes = []; // 初始化子节点数组为空
  }

  override useParams<T extends ITypeConfig>(params = {} as T): T {
    // 插槽默认替换子节点；
    if (params.slot) {
      this.slotChild(params.slot);
    }
    super.useParams(params);
    return this.props as T;
  }

  /**
   * 填充规则转换 'nonzero' | 'evenodd' | 'inherit'
   * 将填充规则字符串转换为SVG可用的'nonzero'或'evenodd'。如果传入的规则无效，则返回undefined。
   * @param rule 可选的填充规则字符串，有效值为'Non-Zero'和'Even-Odd'。
   * @returns 转换后的填充规则字符串或undefined。
   */
  transRule(rule?: string) {
    switch (rule) {
      case 'Even-Odd':
        return 'evenodd';
      case 'Non-Zero':
        return 'nonzero'; // ofd中默认为 'Non-Zero'，与svg中一致；
      default:
        return undefined;
    }
  }
}
