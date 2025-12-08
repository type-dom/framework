import { TypeHtml } from '../type-html.abstract';
import { ITypeCode, CodeProps } from './code.interface';

export abstract class TypeCode<Props extends CodeProps = CodeProps> extends TypeHtml<Props> implements ITypeCode {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'code'
    } as Props);
    this.dom = document.createElement('code');
  }
}
