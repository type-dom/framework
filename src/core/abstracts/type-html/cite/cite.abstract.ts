import { TypeHtml } from '../type-html.abstract';
import { ITypeCite, CiteProps } from './cite.interface';

export abstract class TypeCite<Props extends CiteProps = CiteProps> extends TypeHtml<Props> implements ITypeCite {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('cite');
  }
}
