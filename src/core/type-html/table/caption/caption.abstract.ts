import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCaption, ITypeTableCaptionConfig } from './caption.interface';

export abstract class TypeTableCaption extends TypeHtml implements ITypeTableCaption {
  props: ITypeTableCaptionConfig;
  dom?: HTMLTableCaptionElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'caption'
    })
  }
}
