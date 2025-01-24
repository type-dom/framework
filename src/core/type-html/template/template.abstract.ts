import { TypeHtml } from '../type-html.abstract';
import { ITypeTemplate, ITypeTemplateConfig } from './template.interface';

export abstract class TypeTemplate extends TypeHtml implements ITypeTemplate {
  props: ITypeTemplateConfig;
  dom?: HTMLTemplateElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'template'
    })
  }
}
