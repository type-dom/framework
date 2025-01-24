import { TypeHtml } from '../type-html.abstract';
import { ITypeIns, ITypeInsConfig } from './ins.interface';

export abstract class TypeIns extends TypeHtml implements ITypeIns {
  props: ITypeInsConfig;
  dom?: HTMLModElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'ins'
    })
  }
}
