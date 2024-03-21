/**
 * 虚拟dom的数据结构字面量接口。
 */
import type { ITypeNode } from '../type-node/type-node.interface';
import type { IStyle } from '../style/style.interface';
// import {
//   A,
//   Area,
//   Article,
//   Aside,
//   Audio,
//   B,
//   Br,
//   Button,
//   Canvas,
//   Code,
//   Div,
//   Division,
//   Form,
//   Header,
//   Hr,
//   I,
//   Img,
//   Input,
//   Label,
//   Main,
//   Map,
//   Menu,
//   Option,
//   P,
//   Picture,
//   Pre,
//   Progress,
//   Section,
//   Select,
//   Slot,
//   Span,
//   SvgCircle,
//   SvgEllipse,
//   SvgImage,
//   SvgLine,
//   SvgPath,
//   SvgRect,
//   SvgSvg,
//   SvgText,
//   Table,
//   TableBody,
//   TableDataCell,
//   TableFoot,
//   TableHead,
//   TableHeaderCell,
//   TableRow,
//   Template,
//   Textarea,
//   Title,
//   Track,
//   UnorderedList,
//   Video,
// } from '../element';

export interface ITypeAttribute {
  id?: string;
  class?: string;
  name?: string;
  type?: string;

  [key: string]: string | number | boolean | unknown | undefined | never;
}

/**
 * 虚拟 DOM 节点的 *字面量* 表示。
 */
export interface ITypeElement extends ITypeNode {
  className: string; // todo enum ??
  nodeName: string;
  nodeValue?: undefined;
  attrObj: Partial<ITypeAttribute>;
  styleObj: Partial<IStyle>;
  childNodes: Array<ITypeNode>; // contents
}

export interface IBoundBox {
  top: string;
  left: string;
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
//     | typeof Division
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
