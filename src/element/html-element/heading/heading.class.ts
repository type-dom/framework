import { TextNode } from '../../../text-node/text-node.class';
import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHead } from '../../../type-element/type-html/head/head.abstract';
import { IHeading } from './heading.interface';
import { XElement } from '../../x-element/x-element.class';

// h1,h2,h3,h4,h5
export class Heading extends TypeHead implements IHeading {
  declare nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  declare dom: HTMLHeadingElement;
  className: 'Heading';
  declare childNodes: TextNode[];
  constructor(public parent: TypeHtml | XElement, nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') {
    super(nodeName);
    this.nodeName = nodeName;
    this.dom = document.createElement(this.nodeName);
    this.className = 'Heading';
    this.childNodes = [];
  }
}
