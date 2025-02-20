import { TypeNode } from '../../../core/type-node/type-node.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import { TypeOptGroup } from '../../../core/type-html/opt-group/opt-group.abstract';
import type { IOptGroup, IOptGroupConfig } from './opt-group.interface';

export class OptGroup extends TypeOptGroup implements IOptGroup {
  className: 'OptGroup';
  override childNodes: TypeNode[];
  override props: IOptGroupConfig;

  constructor(params = {} as IOptGroupConfig) {
    super();
    this.className = 'OptGroup';
    this.attr.addName('option');
    this.childNodes = [new TextNode('一个选项')];
    this.props = this.useParams(params);
  }
}
