import { TypeHtml } from '../type-html.abstract';
import { ITypeRt, ITypeRtConfig } from './rt.interface';

export abstract class TypeRt extends TypeHtml implements ITypeRt {
  props: ITypeRtConfig
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'rt'
    })
  }
}
