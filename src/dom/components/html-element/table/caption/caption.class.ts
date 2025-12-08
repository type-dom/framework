import { TypeTableCaption } from '../../../../../core/components/type-html/table/caption/caption.abstract';
import { TableCaptionProps } from '../../../../../core/components/type-html/table/caption/caption.interface';
import { transformSlot } from '../../../../../core/helpers/transformSlot';
import type { ITableCaption } from './caption.interface';

export class TableCaption extends TypeTableCaption implements ITableCaption {
  className: 'TableCaption';

  override isBasic = true;

  constructor(params: TableCaptionProps) {
    super(params);
    this.className = 'TableCaption';
    transformSlot(this, params.slot);
  }
}
