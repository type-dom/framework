import { TextNode } from '../../../dom/components/text-node/text-node.class';
import { addAttrObj, SVGAttributes } from '../../../dom/modules/attribute';
import type { TypeProps } from '../../type-node/type-node.interface';
import { TypeElement, vHash } from '../../type-element/type-element.abstract';
import { transformSlot } from '../../helpers/transformSlot';
import type { ITypeSvg } from './type-svg.interface';

/**
 * TypeSvg类是TypeElement的抽象子类，实现了ITypeSvg接口，用于定义SVG类型元素的基本行为和属性。
 */
export abstract class TypeSvg<T extends SVGElement = SVGElement, A extends SVGAttributes = SVGAttributes> extends TypeElement<A> implements ITypeSvg {
  /**
   * DOM元素，需由子类覆盖提供具体的SVG DOM元素。
   */
  abstract override dom?: T;
  /**
   * 子节点数组，包含TypeSvg实例或TextNode实例。
   */
  override childNodes: (TypeSvg | TextNode)[];

  constructor()  {
    super();
    this.childNodes = []; // 初始化子节点数组为空
    addAttrObj(this, {
      ['data-v-' + vHash]: '',
    });
  }

  override useParams<T extends TypeProps>(params = {} as T): T {
    // 插槽默认替换子节点；
    if (params.slot) { // todo why
      // transformSlot(this, params.slot);
      transformSlot(this, params.slot);
    }
    super.useParams(params);
    return this.baseProps as T;
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
