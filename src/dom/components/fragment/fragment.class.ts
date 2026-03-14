import { TypeFragment } from '../../../core/abstracts/type-fragment/type-fragment.abstract';
import { FragmentProps } from '../../../core/abstracts/type-fragment/type-fragment.interface';
import { IFragment } from './fragment.interface';

export class Fragment<Props extends FragmentProps = FragmentProps> extends TypeFragment<Props> implements IFragment {
  override className = 'Fragment';

  constructor(params: Props = {} as Props) {
    super(params);
  }
}
