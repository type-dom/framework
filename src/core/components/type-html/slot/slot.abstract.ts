import { TypeHtml } from '../type-html.abstract';
import { ITypeSlot, SlotProps } from './slot.interface';

export abstract class TypeSlot<Props extends SlotProps = SlotProps> extends TypeHtml<Props> implements ITypeSlot {
  dom: HTMLSlotElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'slot'
    } as Props);
    this.dom = document.createElement('slot');
  }
}
