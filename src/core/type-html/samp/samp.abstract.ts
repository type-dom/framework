import { TypeHtml } from '../type-html.abstract';
import { ITypeSamp, ITypeSampConfig } from './samp.interface';

export abstract class TypeSamp extends TypeHtml implements ITypeSamp {
  props: ITypeSampConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'samp'
    })
  }
}
