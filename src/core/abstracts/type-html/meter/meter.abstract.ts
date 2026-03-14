import { TypeHtml } from '../type-html.abstract';
import { ITypeMeter, MeterProps } from './meter.interface';

export abstract class TypeMeter<Props extends MeterProps = MeterProps>
  extends TypeHtml<Props> implements ITypeMeter {
  dom: HTMLMeterElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('meter');
  }
}
