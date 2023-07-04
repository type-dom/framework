import { TextNode } from '../../../../type-dom/text-node/text-node.class';
import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { WebForm } from '../form';
export class FormHeader extends TypeDiv {
  nodeName: 'div';
  className: 'FormHeader';
  childNodes: [TextNode];
  dom: HTMLDivElement;
  constructor(public parent: WebForm) {
    super();
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
    this.className = 'FormHeader';
    this.propObj = {
      styleObj: {
        padding: '20px',
        paddingBottom: '10px',
        boxSizing: 'border-box',
        textAlign: 'center',
        fontSize: '27px',
        fontWeight: 'bold',
      },
      attrObj: {
        name: 'form-header',
      }
    };

    const textNode = new TextNode(this, parent.title);
    this.childNodes = [textNode];
  }
}
