import { WebDocument } from '../../../../core/document/web-document.class';
import { StylePosition } from '../../../../../type-dom/style/style.enum';
import { TypeDiv } from '../../../../../type-dom/type-element/type-html/div/div.abstract';
import { BodyWrapper } from '../body';

export class BodyMainContent extends TypeDiv {
  className: 'BodyMainContent';
  childNodes: (WebDocument)[];

  constructor(public parent: BodyWrapper) {
    super();
    this.className = 'BodyMainContent';
    this.propObj = {
      styleObj: {
        flex: '1',
        minWidth: '300px !important',
        backgroundColor: '#d0d0d0',
        boxSizing: 'border-box',
        // height: 'calc(100vh - 10px)',
        position: StylePosition.relative,
      },
      attrObj: {
        name: 'main-content'
        // id: 'contentView',
        // class: 'content'
      }
    };

    // FormEditor.curDoc = this.webDocument;
    // FormEditor.selector = this.selector;
    // console.log('parent.parent is ', parent.parent);
    parent.parent.webDocument.setParent(this);
    this.childNodes = [parent.parent.webDocument];
  }
}
