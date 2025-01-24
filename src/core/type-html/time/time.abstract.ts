import { TypeHtml } from '../type-html.abstract';
import { ITypeTime, ITypeTimeConfig } from './time.interface';

export abstract class TypeTime extends TypeHtml implements ITypeTime {
  props: ITypeTimeConfig;
  dom?: HTMLTimeElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'time'
    })
  }
}
