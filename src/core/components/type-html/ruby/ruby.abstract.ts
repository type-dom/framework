import { TypeHtml } from '../type-html.abstract';
import { ITypeRuby, RubyProps } from './ruby.interface';

export abstract class TypeRuby<Props extends RubyProps = RubyProps> extends TypeHtml<Props> implements ITypeRuby {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'ruby'
    } as Props);
    this.dom = document.createElement('ruby');
  }
}
