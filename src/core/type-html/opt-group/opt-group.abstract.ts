import { TypeHtml } from '../type-html.abstract';
import { ITypeOptGroup, ITypeOptGroupConfig } from './opt-group.interface';

export abstract class TypeOptGroup extends TypeHtml implements ITypeOptGroup {
  props: ITypeOptGroupConfig;
  dom?: HTMLOptGroupElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'optgroup'
    })
  }
}
