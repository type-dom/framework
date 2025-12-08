import { TypeHtml } from '../type-html.abstract';
import { ITypeTemplate, TemplateProps } from './template.interface';
import { defaultProps } from '../../../helpers/defaultProps';

export abstract class TypeTemplate<Props extends TemplateProps = TemplateProps> extends TypeHtml<Props> implements ITypeTemplate {
  dom: HTMLTemplateElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'template'
    } as Props));
    this.dom = document.createElement('template');
  }
}
