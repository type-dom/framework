import { TypeHtml } from '../type-html.abstract';
import { ITypeSource, ITypeSourceConfig } from './source.interface';

export abstract class TypeSource extends TypeHtml implements ITypeSource {
  props: ITypeSourceConfig;
  dom?: HTMLSourceElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'source'
    })
  }
}
