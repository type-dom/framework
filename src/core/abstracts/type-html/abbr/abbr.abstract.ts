import { TypeHtml } from '../type-html.abstract';
import type { ITypeAbbr, AbbrProps } from './abbr.interface';

export abstract class TypeAbbr<Props extends AbbrProps = AbbrProps>
  extends TypeHtml<Props> implements ITypeAbbr {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('abbr');
  }
}
