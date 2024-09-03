/**
 * 虚拟dom的数据结构字面量接口。
 */
import type { ITypeConfig, ITypeNode } from '../type-node/type-node.interface';

export interface ITypeAttribute {
  id?: string;
  class?: string;
  name?: string;
  type?: string;

  [key: string]: string | number | boolean | undefined | ITypeAttribute;
}

/**
 * 虚拟 DOM 节点的 *字面量* 表示。
 */
export interface ITypeElement extends ITypeNode {
  className: string; // todo enum ??
  nodeName: string;
  nodeValue?: undefined;
  params: ITypeConfig;
  // props: ITypeConfig; // 不会在json中出现
  // 绑定的事件集合, TypeElement 才有
  // events?: Partial<IEvents>;
  // subscriptions?: Subscription[];
  childNodes: Array<ITypeNode>; // contents todo 也是可以为空的啊 ？？？
}

export interface IBoundBox {
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
}

// export interface IElementItem extends ITypeNode {
//   TypeClass:
//     | typeof A
//     | typeof Area
//     | typeof Article
//     | typeof Aside
//     | typeof Audio
//     | typeof B
//     | typeof Br
//     | typeof Button
//     | typeof Canvas
//     | typeof Code
//     | typeof Div
//     | typeof Form
//     | typeof Header
//     | typeof Hr
//     | typeof I
//     | typeof Img
//     | typeof Input
//     | typeof Label
//     | typeof Main
//     | typeof Map
//     | typeof Menu
//     | typeof Option
//     | typeof P
//     | typeof Picture
//     | typeof Pre
//     | typeof Progress
//     | typeof Section
//     | typeof Select
//     | typeof Slot
//     | typeof Span
//     | typeof Table
//     | typeof TableRow
//     | typeof TableBody
//     | typeof TableFoot
//     | typeof TableHead
//     | typeof TableDataCell
//     | typeof TableHeaderCell
//     | typeof Template
//     | typeof Textarea
//     | typeof Title
//     | typeof Track
//     | typeof UnorderedList
//     | typeof Video
//     | typeof SvgCircle
//     | typeof SvgEllipse
//     | typeof SvgImage
//     | typeof SvgLine
//     | typeof SvgPath
//     | typeof SvgRect
//     | typeof SvgSvg
//     | typeof SvgText
//     | any;
// }
