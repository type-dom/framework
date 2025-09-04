import { TypeTitle } from '../../../../core/components/type-html/title/title.abstract';
import { TypeTitleProps } from '../../../../core/components/type-html/title/title.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  override isBasic = true;

  constructor(params: TypeTitleProps = {}) {
    super();
    this.className = 'Title';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
