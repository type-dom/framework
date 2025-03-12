import { TypeHtml } from '../type-html.abstract';
import { ITypeSlot, TypeSlotProps } from './slot.interface';

export abstract class TypeSlot extends TypeHtml implements ITypeSlot {
  props: TypeSlotProps;
  dom?: HTMLSlotElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'slot'
    })
  }
}
