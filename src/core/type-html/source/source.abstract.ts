import { TypeHtml } from '../type-html.abstract';
import { ITypeSource, TypeSourceProps } from './source.interface';

export abstract class TypeSource extends TypeHtml implements ITypeSource {
  props: TypeSourceProps;
  dom?: HTMLSourceElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'source'
    })
  }
}
