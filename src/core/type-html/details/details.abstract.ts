import { TypeHtml } from '../type-html.abstract';
import { ITypeDetails, ITypeDetailsConfig } from './details.interface';

export abstract class TypeDetails extends TypeHtml implements ITypeDetails {
  props: ITypeDetailsConfig;
  dom?: HTMLDetailsElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'details'
    })
  }
}
