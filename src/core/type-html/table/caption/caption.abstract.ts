import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCaption, TypeTableCaptionProps } from './caption.interface';

export abstract class TypeTableCaption extends TypeHtml implements ITypeTableCaption {
  props: TypeTableCaptionProps;
  dom?: HTMLTableCaptionElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'caption'
    })
  }
}
