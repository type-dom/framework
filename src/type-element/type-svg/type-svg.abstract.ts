import { TextNode } from '../../text-node/text-node.class';
import { TypeElement } from '../type-element.abstract';
import type { ITypeSvg } from './type-svg.interface';
export abstract class TypeSvg extends TypeElement implements ITypeSvg {
  abstract override className: string;
  abstract override nodeName: string;
  abstract override dom: SVGElement;
  declare childNodes: (TypeSvg | TextNode)[];
  protected constructor() {
    super();
    this.childNodes = [];
  }

  /**
   * 填充规则转换 'nonzero' | 'evenodd' | 'inherit'
   * @param rule
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
