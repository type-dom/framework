import { ITypeDiv } from '../../../../type-dom/type-element/type-html/div/div.interface';
import { IWebPage } from '../../page/web-page.interface';

export interface IWebDocumentContents extends ITypeDiv {
  nodeName: 'div',
  className: 'WebDocumentContents',
  childNodes: IWebPage[],
}
