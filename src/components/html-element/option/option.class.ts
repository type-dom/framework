import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeOption } from '../../../core/type-html/option/option.abstract';
import { TypeOptionProps } from '../../../core/type-html/option/option.interface';
import type { IOption } from './option.interface';

export class Option extends TypeOption implements IOption {
  className: 'Option';
  override childNodes: TypeNode[];

  override isBasic = true;

  constructor(params: TypeOptionProps= {}) {
    super();
    this.className = 'Option';

    this.childNodes = [new TextNode('一个选项')];
    this.props = this.useParams(params);
  }
}
