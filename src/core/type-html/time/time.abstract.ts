import { TypeHtml } from '../type-html.abstract';
import { ITypeTime, TypeTimeProps } from './time.interface';

export abstract class TypeTime extends TypeHtml implements ITypeTime {
  props: TypeTimeProps;
  dom?: HTMLTimeElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'time'
    })
  }
}
