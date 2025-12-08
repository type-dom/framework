import { TypeHtml } from '../type-html.abstract';
import type { ITypeAbbr, AbbrProps } from './abbr.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeAbbr<Props extends AbbrProps = AbbrProps>
  extends TypeHtml<Props> implements ITypeAbbr {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'abbr',
    } as Props));
    this.dom = document.createElement('abbr');
  }
}
