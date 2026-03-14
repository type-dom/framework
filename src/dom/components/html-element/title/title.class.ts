import { TypeTitle } from '../../../../core/abstracts/type-html/title/title.abstract';
import { TitleProps } from '../../../../core/abstracts/type-html/title/title.interface';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  constructor(params: TitleProps = {}) {
    super(params);
    this.className = 'Title';
  }
}
