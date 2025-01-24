import { TypeHtml } from '../type-html.abstract';
import { ITypeSlot, ITypeSlotConfig } from './slot.interface';

export abstract class TypeSlot extends TypeHtml implements ITypeSlot {
  props: ITypeSlotConfig;
  dom?: HTMLSlotElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'slot'
    })
  }
}
