import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import type { IOption, IOptionConfig } from './option.interface';
import { TypeOption } from '../../../core';

export class Option extends TypeOption implements IOption {
  className: 'Option';
  override childNodes: TypeNode[];
  override props: IOptionConfig;

  constructor(params = {} as IOptionConfig) {
    super();
    this.className = 'Option';
    this.attr.addName('option');
    this.childNodes = [new TextNode('一个选项')];
    this.props = this.useParams(params);
  }
}
