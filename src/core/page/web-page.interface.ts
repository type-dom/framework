import { ITypeDiv } from '../../../type-dom/type-element/type-html/div/div.interface';
import { IWebControl } from '../controls/web-control.interface';

export interface IWebPageBackground {
  type: number, // 背景类型，0：无背景；1：颜色背景；2：图像背景
  color: string, // 背景颜色，type为1时有效
  image: string, // 图像背景，type为2是有效
}

export interface IWebPage extends ITypeDiv {
  className: 'WebPage',
  childNodes: IWebControl[],
}
