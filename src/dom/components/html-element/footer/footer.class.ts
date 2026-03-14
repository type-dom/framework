import { TypeFooter } from '../../../../core/abstracts/type-html/footer/footer.abstract';
import { FooterProps } from '../../../../core/abstracts/type-html/footer/footer.interface';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';
  constructor(params: FooterProps = {}) {
    super(params);
    this.className = 'Footer';
  }
}
