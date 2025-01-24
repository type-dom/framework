import { TypeHtml } from '../type-html.abstract';
import { ITypeBdi, ITypeBdiConfig } from './bdi.interface';

export abstract class TypeBdi extends TypeHtml implements ITypeBdi {
  props: ITypeBdiConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'bdi',
    })
  }
}
