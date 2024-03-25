import type { IAttr } from '../type-node/type-node.interface';

export interface IContent {
  name: string;
  attributes: IAttr[]; // ToDo 为什么用数组方式，而不是键值对？？？？
  parsed: number;
}

// 指令接口
export interface IInstruction {
  name: string;
  value: string;
  parsed: number;
}

export interface IComponent {
  pos: number;
  name: string;
}

// 解析器参数
export interface IParserParam {
  hasAttributes?: boolean;
  lowerCaseName?: boolean;
}
