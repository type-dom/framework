import { TypeTableCaption } from '../../../../../core/abstracts/type-html/table/caption/caption.abstract';
import { TableCaptionProps } from '../../../../../core/abstracts/type-html/table/caption/caption.interface';
import type { ITableCaption } from './caption.interface';

export class TableCaption extends TypeTableCaption implements ITableCaption {
  className: 'TableCaption';
  constructor(params: TableCaptionProps) {
    super(params);
    this.className = 'TableCaption';
  }
}
