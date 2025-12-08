import { TypeHtml } from '../type-html.abstract';
import { ITypeMeter, MeterProps } from './meter.interface';

export abstract class TypeMeter<Props extends MeterProps = MeterProps>
  extends TypeHtml<Props> implements ITypeMeter {
  dom: HTMLMeterElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'meter'
    } as Props);
    this.dom = document.createElement('meter');
  }
}
