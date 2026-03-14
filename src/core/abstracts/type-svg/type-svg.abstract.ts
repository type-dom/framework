// import { TypeElement } from '../../../core';
import { TextNode } from '../../../dom/components/text-node/text-node.class';
import { SVGAttributes } from '../../../dom/modules/attribute';
import { TypeElement } from '../type-element/type-element.abstract';
import type { ITypeSvg, SvgProps } from './type-svg.interface';

/**
 * TypeSvg类是TypeElement的抽象子类，实现了ITypeSvg接口，用于定义SVG类型元素的基本行为和属性。
 */
export abstract class TypeSvg<
  Props extends SvgProps = SvgProps,
  Attrs extends SVGAttributes = SVGAttributes,
  D extends SVGElement = SVGElement>
  extends TypeElement<Props, Attrs> implements ITypeSvg {

  /**
   * DOM元素，需由子类覆盖提供具体的SVG DOM元素。
   */
  abstract override dom: D;
  /**
   * 子节点数组，包含TypeSvg实例或TextNode实例。
   */
  override childNodes: (TypeSvg | TextNode)[];

  constructor(params: Props)  {
    super(params);
    this.childNodes = []; // 初始化子节点数组为空
    // addAttrObj(this, {
    //   ['data-v-' + vHash]: '',
    // });
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
