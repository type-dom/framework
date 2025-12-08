import { TypeNode } from '../../../../core/type-node/type-node.abstract';
import { TextNode } from '../../text-node/text-node.class';
import { TypeOption } from '../../../../core/components/type-html/option/option.abstract';
import { OptionProps } from '../../../../core/components/type-html/option/option.interface';
import type { IOption } from './option.interface';

export class Option extends TypeOption implements IOption {
  className: 'Option';
  override childNodes: TypeNode[];

  override isBasic = true;

  constructor(params: OptionProps= {}) {
    super(params);
    this.className = 'Option';

    this.childNodes = [new TextNode('一个选项')];
  }
}
