import { ITypeFragment, FragmentProps } from '../../../core/components/type-fragment/type-fragment.interface';
import { MaybeRef } from '../../../reactivity';

export interface ITeleport extends ITypeFragment {
  className: 'Teleport';
}

export interface TeleportProps extends FragmentProps {
  // to?: MaybeRef<string | HTMLElement>;
  disabled?: MaybeRef<boolean | undefined>;
}
