import { TypeSection } from '../../../../type-dom/type-element/type-html/section/section.abstract';
import { Display } from '../../../../type-dom/style/style.enum';
import { FormEditor } from '../../../form-editor';
import { LayoutWrapper } from '../layout';
import { BodyLeft } from './left/left';
import { BodyRight } from './right/right';
import { BodyMainContent } from './main-content/main-content';
export class BodyWrapper extends TypeSection {
  className: 'BodyWrapper';
  childNodes: [BodyLeft, BodyMainContent, BodyRight];
  left: BodyLeft;
  content: BodyMainContent;
  right: BodyRight;
  constructor(public parent: LayoutWrapper) {
    super();
    this.className = 'BodyWrapper';
    console.log('this.editor.el.clientHeight is ', FormEditor.el.clientHeight);
    this.addStyleObj({
      display: Display.flex,
      height: 'calc(' + FormEditor.el.clientHeight + 'px - 60px)',
      justifyContent: 'space-between'
    });
    this.addAttrName('body-wrapper');
    // 可以传参给子节点。
    this.left = new BodyLeft(this);
    this.content = new BodyMainContent(this);
    this.right = new BodyRight(this);
    this.childNodes = [this.left, this.content, this.right];
  }
}
