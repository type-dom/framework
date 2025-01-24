import { TypeHtml } from '../type-html.abstract';
import { ITypeTitle, ITypeTitleConfig } from './title.interface';

export abstract class TypeTitle extends TypeHtml implements ITypeTitle {
  props: ITypeTitleConfig;
  dom?: HTMLTitleElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'title'
    })
  }
}
