import { TypeHtml } from '../type-html.abstract';
import { ITypeTitle, TypeTitleProps } from './title.interface';

export abstract class TypeTitle extends TypeHtml implements ITypeTitle {
  props: TypeTitleProps;
  dom?: HTMLTitleElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'title'
    })
  }
}
