import { ITypeElement, ITypeProperty } from '../../type-element/type-element.interface';
import {TypeElement} from "../../type-element/type-element.abstract";
import {ITypeNode} from "../../type-node/type-node.interface";
export interface IXElement extends ITypeElement {
  className: 'XElement',
  propObj: ITypeProperty;
}

export interface IXElementOption extends ITypeNode{
  parent?: TypeElement
}
