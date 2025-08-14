import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeOptGroup } from '../../../core/type-html/opt-group/opt-group.abstract';
import { TypeOptGroupProps } from '../../../core/type-html/opt-group/opt-group.interface';
import type { IOptGroup } from './opt-group.interface';

export class OptGroup extends TypeOptGroup implements IOptGroup {
  className: 'OptGroup';
  override childNodes: TypeNode[];
  override props: TypeOptGroupProps;

  override isBasic = true;

  constructor(params: TypeOptGroupProps = {}) {
    super();
    this.className = 'OptGroup';
    this.attr.addName('option');
    this.childNodes = [new TextNode('一个选项')];
    this.props = this.useParams(params);
  }
}
