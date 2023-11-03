import { TextNode } from '../../text-node/text-node.class';
import { TypeElement } from '../type-element.abstract';
import { ITypeSvg } from './type-svg.interface';
export abstract class TypeSvg extends TypeElement implements ITypeSvg {
  abstract override className: string;
  abstract override nodeName: string;
  abstract override dom: SVGElement;
  declare childNodes: (TypeSvg | TextNode)[];
  protected constructor(nodeName: string) {
    super();
    this.childNodes = [];
  }
}
