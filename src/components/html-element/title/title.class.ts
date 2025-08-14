import { TypeTitle } from '../../../core/type-html/title/title.abstract';
import { TypeTitleProps } from '../../../core/type-html/title/title.interface';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  override isBasic = true;

  constructor(params: TypeTitleProps = {}) {
    super();
    this.className = 'Title';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
