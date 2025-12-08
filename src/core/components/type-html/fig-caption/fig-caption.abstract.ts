import { TypeHtml } from '../type-html.abstract';
import { ITypeFigCaption, FigCaptionProps } from './fig-caption.interface';

export abstract class TypeFigCaption<Props extends FigCaptionProps = FigCaptionProps> extends TypeHtml<Props> implements ITypeFigCaption {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'figcaption'
    } as Props);
    this.dom = document.createElement('figcaption');
  }
}
