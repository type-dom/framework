import { TypeHtml } from '../type-html.abstract';
import type { ITypeSection, SectionProps } from './section.interface';

export abstract class TypeSection<Props extends SectionProps = SectionProps> extends TypeHtml<Props> implements ITypeSection {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'section'
    } as Props);
    this.dom = document.createElement('section');
  }
}
