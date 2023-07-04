import { TypeDiv } from '../../../../../type-dom/type-element/type-html/div/div.abstract';
import { BodyWrapper } from '../body';
import { LeftContents } from './contents/contents';

export class BodyLeft extends TypeDiv {
  className: 'BodyLeft';
  childNodes: [LeftContents];
  contents: LeftContents;
  constructor(public parent: BodyWrapper) {
    super();
    this.className = 'BodyLeft';
    this.addStyleObj({
      height: '100%',
      minWidth: '240px',
      width: '240px',
      backgroundColor: '#ffffff',
      boxSizing: 'border-box',
      // paddingBottom: '38px',
      // borderTop: '1px solid #ddd',
    });
    this.addAttrName('body-left');
    this.contents = new LeftContents(this);
    this.childNodes = [this.contents];
  }
}
