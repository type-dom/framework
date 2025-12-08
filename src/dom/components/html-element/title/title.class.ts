import { TypeTitle } from '../../../../core/components/type-html/title/title.abstract';
import { TitleProps } from '../../../../core/components/type-html/title/title.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';
  override isBasic = true;

  constructor(params: TitleProps = {}) {
    super(params);
    this.className = 'Title';
    transformSlot(this, params.slot);
  }
}
