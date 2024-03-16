import type {
  ITypeElement,
  ITypeProperty
} from '../../type-element/type-element.interface';
import type { ITextNode } from '../../text-node/text-node.interface';

export interface IXElement extends ITypeElement {
  className: 'XElement';
  childNodes: (IXElement | ITextNode)[];
  propObj: ITypeProperty;
}
