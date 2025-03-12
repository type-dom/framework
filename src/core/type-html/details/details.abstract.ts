import { TypeHtml } from '../type-html.abstract';
import { ITypeDetails, TypeDetailsProps } from './details.interface';

export abstract class TypeDetails extends TypeHtml implements ITypeDetails {
  props: TypeDetailsProps;
  dom?: HTMLDetailsElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'details'
    })
  }
}
