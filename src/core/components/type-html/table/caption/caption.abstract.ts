import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCaption, TableCaptionProps } from './caption.interface';

export abstract class TypeTableCaption<Props extends TableCaptionProps = TableCaptionProps> extends TypeHtml<Props> implements ITypeTableCaption {
  dom: HTMLTableCaptionElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'caption'
    } as Props);
    this.dom = document.createElement('caption');
  }
}
