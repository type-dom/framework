import type {
  ITypeElement,
  ITypeProperty
} from '../../type-element/type-element.interface';
import type { ITypeNode } from '../../type-node/type-node.interface';
import type { ITextNode } from '../../text-node/text-node.interface';
import { XElement } from './x-element.class';

export interface IXElement extends ITypeElement {
  className: 'XElement';
  childNodes: (IXElement | ITextNode)[];
  propObj: ITypeProperty;
}

export interface IXElementOption extends ITypeNode {
  parent?: XElement;
}
