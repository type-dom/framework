import { TypeNode } from '../../../../core/type-node/type-node.abstract';
import { TypeOptGroup } from '../../../../core/components/type-html/opt-group/opt-group.abstract';
import { TypeOptGroupProps } from '../../../../core/components/type-html/opt-group/opt-group.interface';
import { addAttrName } from '../../../modules/attribute';
import { TextNode } from '../../text-node/text-node.class';
import type { IOptGroup } from './opt-group.interface';

export class OptGroup extends TypeOptGroup implements IOptGroup {
  className: 'OptGroup';
  override childNodes: TypeNode[];
  override props: TypeOptGroupProps;

  override isBasic = true;

  constructor(params: TypeOptGroupProps = {}) {
    super();
    this.className = 'OptGroup';
    addAttrName(this, 'option');
    this.childNodes = [new TextNode('一个选项')];
    this.props = this.useParams(params);
  }
}
