import { TypeHtml } from '../type-html.abstract';
import { ITypeHr, HrProps } from './hr.interface';

export abstract class TypeHr<Props extends HrProps = HrProps> extends TypeHtml<Props> implements ITypeHr {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'hr'
    } as Props);
    this.dom = document.createElement('hr');
  }
}
