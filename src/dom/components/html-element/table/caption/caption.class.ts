import { TypeTableCaption } from '../../../../../core/components/type-html/table/caption/caption.abstract';
import { TypeTableCaptionProps } from '../../../../../core/components/type-html/table/caption/caption.interface';
import type { ITableCaption } from './caption.interface';

export class TableCaption extends TypeTableCaption implements ITableCaption {
  className: 'TableCaption';
  override props: TypeTableCaptionProps;

  override isBasic = true;

  constructor(params: TypeTableCaptionProps) {
    super();
    this.className = 'TableCaption';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
